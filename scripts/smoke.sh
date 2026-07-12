#!/usr/bin/env bash
# =============================================================================
# SyncWire — live smoke test
# =============================================================================
# Exercises the running docker stack end-to-end (Postgres + NestJS).
#
#   1. GET  /api/health                       → 200, db ok
#   2. POST /api/notifications  (x3)          → 201
#   3. POST same id again                     → 201, dedupe (same body)
#   4. GET  /api/notifications?deviceId=...   → 3 rows, newest first
#   5. GET  /api/notifications/:id            → 200
#   6. GET  /api/notifications/missing_id     → 404
#   7. DELETE /api/notifications              → 204
#
# Usage:
#   chmod +x scripts/smoke.sh
#   ./scripts/smoke.sh
#
# Override the host with APP_URL (default http://127.0.0.1:18080).
# =============================================================================

set -euo pipefail

APP_URL="${APP_URL:-http://127.0.0.1:18080}"
DEVICE_ID="smoke_$(date +%s)"
ID_A="smoke_a_$(date +%s)"
ID_B="smoke_b_$(date +%s)"
ID_C="smoke_c_$(date +%s)"

# Pretty banner
line() { printf '\n\033[1;36m%s\033[0m\n' "$1"; }
ok()   { printf '  \033[32m✓\033[0m %s\n' "$1"; }
fail() { printf '  \033[31m✗\033[0m %s\n' "$1"; exit 1; }

# -----------------------------------------------------------------------------
# 0. Sanity: stack reachable
# -----------------------------------------------------------------------------
line "0. Probe ${APP_URL}/api/health"
HEALTH=$(curl -fsS "${APP_URL}/api/health")
echo "$HEALTH" | grep -q '"status":"ok"' || fail "health status not ok"
echo "$HEALTH" | grep -q '"database":{"status":"ok"}' || fail "db probe not ok"
ok "health + db probe ok"

# -----------------------------------------------------------------------------
# 1. POST three notifications
# -----------------------------------------------------------------------------
line "1. POST /api/notifications (3 inserts)"
for id in "$ID_A" "$ID_B" "$ID_C"; do
  curl -fsS -X POST "${APP_URL}/api/notifications" \
    -H 'Content-Type: application/json' \
    -d "{
      \"id\":\"${id}\",
      \"deviceId\":\"${DEVICE_ID}\",
      \"sourceType\":\"NOTIFICATION\",
      \"sender\":\"smoke\",
      \"content\":\"hello ${id}\",
      \"timestamp\":$(date +%s)000,
      \"packageName\":\"smoke\"
    }" > /dev/null
  ok "posted ${id}"
done

# -----------------------------------------------------------------------------
# 2. Dedupe
# -----------------------------------------------------------------------------
line "2. Dedupe — re-post ${ID_A}"
RESP=$(curl -fsS -X POST "${APP_URL}/api/notifications" \
  -H 'Content-Type: application/json' \
  -d "{
    \"id\":\"${ID_A}\",
    \"deviceId\":\"${DEVICE_ID}\",
    \"sourceType\":\"NOTIFICATION\",
    \"sender\":\"smoke\",
    \"content\":\"DIFFERENT CONTENT\",
    \"timestamp\":$(date +%s)000,
    \"packageName\":\"smoke\"
  }")
echo "$RESP" | grep -q '"content":"hello '"${ID_A}"'"' \
  || fail "dedupe failed — second POST should return original content"
ok "dedupe works (original content returned)"

# -----------------------------------------------------------------------------
# 3. GET list
# -----------------------------------------------------------------------------
line "3. GET /api/notifications?deviceId=${DEVICE_ID}"
LIST=$(curl -fsS "${APP_URL}/api/notifications?deviceId=${DEVICE_ID}")
COUNT=$(echo "$LIST" | grep -o '"id":"smoke_' | wc -l | tr -d ' ')
[ "$COUNT" -eq 3 ] || fail "expected 3 rows, got $COUNT"
ok "list returned 3 rows"

# Verify ordering: newest first (C, B, A)
ORDER=$(echo "$LIST" | grep -oE 'smoke_[abc]_[0-9]+' | head -3 | tr '\n' ',')
echo "$ORDER" | grep -q "${ID_C},${ID_B},${ID_A}" \
  || fail "ordering wrong: got ${ORDER}"
ok "newest-first ordering correct (${ORDER})"

# -----------------------------------------------------------------------------
# 4. GET by id
# -----------------------------------------------------------------------------
line "4. GET /api/notifications/${ID_B}"
ONE=$(curl -fsS "${APP_URL}/api/notifications/${ID_B}")
echo "$ONE" | grep -q "\"id\":\"${ID_B}\"" || fail "id not found"
ok "single fetch ok"

# -----------------------------------------------------------------------------
# 5. 404
# -----------------------------------------------------------------------------
line "5. GET /api/notifications/does-not-exist → 404"
HTTP_CODE=$(curl -s -o /dev/null -w '%{http_code}' \
  "${APP_URL}/api/notifications/does-not-exist")
[ "$HTTP_CODE" = "404" ] || fail "expected 404, got $HTTP_CODE"
ok "404 returned"

# -----------------------------------------------------------------------------
# 6. Validation: 400 on missing fields
# -----------------------------------------------------------------------------
line "6. POST with missing fields → 400"
HTTP_CODE=$(curl -s -o /dev/null -w '%{http_code}' -X POST \
  "${APP_URL}/api/notifications" \
  -H 'Content-Type: application/json' \
  -d '{"id":"incomplete"}')
[ "$HTTP_CODE" = "400" ] || fail "expected 400, got $HTTP_CODE"
ok "validation rejects incomplete payload"

# -----------------------------------------------------------------------------
# 7. Cleanup
# -----------------------------------------------------------------------------
line "7. DELETE /api/notifications (cleanup)"
curl -fsS -X DELETE "${APP_URL}/api/notifications" -o /dev/null
ok "cleared"

printf '\n\033[1;32mAll smoke checks passed.\033[0m\n'
