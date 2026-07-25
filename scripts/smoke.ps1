# =============================================================================
# SyncWire — live smoke test (PowerShell)
# =============================================================================
# Exercises the running docker stack end-to-end with real Postgres.
# Tests: register → login → post notification with JWT → per-user isolation.
#
# Usage:
#   .\scripts\smoke.ps1
#   $env:APP_URL = "http://192.168.1.10:18080"; .\scripts\smoke.ps1
# =============================================================================

$ErrorActionPreference = 'Stop'
$APP_URL = if ($env:APP_URL) { $env:APP_URL } else { 'http://127.0.0.1:18080' }
$TIMESTAMP = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()

function Banner($msg) { Write-Host "`n$msg" -ForegroundColor Cyan }
function Pass($msg)   { Write-Host "  PASS $msg" -ForegroundColor Green }
function Fail($msg)   { Write-Host "  FAIL $msg" -ForegroundColor Red; exit 1 }

# -----------------------------------------------------------------------------
# 0. Health
# -----------------------------------------------------------------------------
Banner "0. Probe $APP_URL/api/health"
try {
  $health = Invoke-RestMethod -Uri "$APP_URL/api/health" -Method Get
} catch {
  Fail "Health request failed: $_"
}
if ($health.status -ne 'ok') { Fail "health.status != ok (got $($health.status))" }
if ($health.checks.database.status -ne 'ok') { Fail "db probe != ok" }
Pass "health + db probe ok"

# -----------------------------------------------------------------------------
# 1. Register two users
# -----------------------------------------------------------------------------
Banner "1. POST /api/auth/register (2 users)"

$userA = @{
  email = "smoke_a_$TIMESTAMP@test.com"
  password = "password123"
  displayName = "Smoke User A"
  device = @{ name = "Smoke Device A"; platform = "android" }
} | ConvertTo-Json -Compress

$userB = @{
  email = "smoke_b_$TIMESTAMP@test.com"
  password = "password123"
  displayName = "Smoke User B"
  device = @{ name = "Smoke Device B"; platform = "android" }
} | ConvertTo-Json -Compress

try {
  $authA = Invoke-RestMethod -Uri "$APP_URL/api/auth/register" -Method Post `
    -ContentType 'application/json' -Body $userA
  Pass "registered user A: $($authA.user.email)"
} catch {
  Fail "register user A failed: $_"
}

try {
  $authB = Invoke-RestMethod -Uri "$APP_URL/api/auth/register" -Method Post `
    -ContentType 'application/json' -Body $userB
  Pass "registered user B: $($authB.user.email)"
} catch {
  Fail "register user B failed: $_"
}

$tokenA = $authA.accessToken
$tokenB = $authB.accessToken
$deviceA = $authA.device.id
$deviceB = $authB.device.id

# -----------------------------------------------------------------------------
# 2. Login as user A
# -----------------------------------------------------------------------------
Banner "2. POST /api/auth/login (user A)"

$loginBody = @{
  email = "smoke_a_$TIMESTAMP@test.com"
  password = "password123"
  device = @{ name = "Smoke Device A"; platform = "android" }
} | ConvertTo-Json -Compress

try {
  $loginA = Invoke-RestMethod -Uri "$APP_URL/api/auth/login" -Method Post `
    -ContentType 'application/json' -Body $loginBody
  Pass "login user A ok, got new tokens"
} catch {
  Fail "login user A failed: $_"
}

# -----------------------------------------------------------------------------
# 3. Post notifications as both users
# -----------------------------------------------------------------------------
Banner "3. POST /api/notifications (both users)"

$notifA = @{
  id = "smoke_notif_a_$TIMESTAMP"
  deviceId = $deviceA
  sourceType = "NOTIFICATION"
  sender = "WhatsApp"
  content = "Hello from User A"
  timestamp = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
  packageName = "com.whatsapp"
} | ConvertTo-Json -Compress

$notifB = @{
  id = "smoke_notif_b_$TIMESTAMP"
  deviceId = $deviceB
  sourceType = "NOTIFICATION"
  sender = "Telegram"
  content = "Hello from User B"
  timestamp = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
  packageName = "org.telegram.messenger"
} | ConvertTo-Json -Compress

try {
  Invoke-RestMethod -Uri "$APP_URL/api/notifications" -Method Post `
    -ContentType 'application/json' -Body $notifA `
    -Headers @{ Authorization = "Bearer $tokenA" } | Out-Null
  Pass "posted notification as user A"
} catch {
  Fail "post notification as user A failed: $_"
}

try {
  Invoke-RestMethod -Uri "$APP_URL/api/notifications" -Method Post `
    -ContentType 'application/json' -Body $notifB `
    -Headers @{ Authorization = "Bearer $tokenB" } | Out-Null
  Pass "posted notification as user B"
} catch {
  Fail "post notification as user B failed: $_"
}

# -----------------------------------------------------------------------------
# 4. Verify per-user isolation
# -----------------------------------------------------------------------------
Banner "4. GET /api/notifications (per-user isolation)"

$listA = Invoke-RestMethod -Uri "$APP_URL/api/notifications" -Method Get `
  -Headers @{ Authorization = "Bearer $tokenA" }
if ($listA.Count -ne 1) { Fail "user A expected 1 notification, got $($listA.Count)" }
if ($listA[0].id -ne "smoke_notif_a_$TIMESTAMP") { Fail "user A got wrong notification: $($listA[0].id)" }
if ($listA[0].sender -ne "WhatsApp") { Fail "user A wrong sender: $($listA[0].sender)" }
Pass "user A sees only their own notification"

$listB = Invoke-RestMethod -Uri "$APP_URL/api/notifications" -Method Get `
  -Headers @{ Authorization = "Bearer $tokenB" }
if ($listB.Count -ne 1) { Fail "user B expected 1 notification, got $($listB.Count)" }
if ($listB[0].id -ne "smoke_notif_b_$TIMESTAMP") { Fail "user B got wrong notification: $($listB[0].id)" }
if ($listB[0].sender -ne "Telegram") { Fail "user B wrong sender: $($listB[0].sender)" }
Pass "user B sees only their own notification"

# -----------------------------------------------------------------------------
# 5. Cross-user access blocked (404)
# -----------------------------------------------------------------------------
Banner "5. GET /api/notifications/{other-user-id} -> 404"

try {
  $null = Invoke-RestMethod -Uri "$APP_URL/api/notifications/smoke_notif_b_$TIMESTAMP" -Method Get `
    -Headers @{ Authorization = "Bearer $tokenA" }
  Fail "expected 404, got 200"
} catch {
  if ($_.Exception.Response.StatusCode -ne 404) {
    Fail "expected 404, got $($_.Exception.Response.StatusCode)"
  }
}
Pass "user A cannot access user B's notification (404)"

# -----------------------------------------------------------------------------
# 6. Unauthenticated rejected (401)
# -----------------------------------------------------------------------------
Banner "6. GET /api/notifications (no auth) -> 401"

try {
  $null = Invoke-RestMethod -Uri "$APP_URL/api/notifications" -Method Get
  Fail "expected 401, got 200"
} catch {
  if ($_.Exception.Response.StatusCode -ne 401) {
    Fail "expected 401, got $($_.Exception.Response.StatusCode)"
  }
}
Pass "unauthenticated request rejected (401)"

# -----------------------------------------------------------------------------
# 7. Clear own notifications only
# -----------------------------------------------------------------------------
Banner "7. DELETE /api/notifications (clear own only)"

Invoke-RestMethod -Uri "$APP_URL/api/notifications" -Method Delete `
  -Headers @{ Authorization = "Bearer $tokenA" } | Out-Null

$listA = Invoke-RestMethod -Uri "$APP_URL/api/notifications" -Method Get `
  -Headers @{ Authorization = "Bearer $tokenA" }
if ($listA.Count -ne 0) { Fail "user A expected 0 after clear, got $($listA.Count)" }
Pass "user A cleared their notifications"

$listB = Invoke-RestMethod -Uri "$APP_URL/api/notifications" -Method Get `
  -Headers @{ Authorization = "Bearer $tokenB" }
if ($listB.Count -ne 1) { Fail "user B expected 1 after A cleared, got $($listB.Count)" }
Pass "user B's notifications unaffected"

# -----------------------------------------------------------------------------
# 8. Cleanup
# -----------------------------------------------------------------------------
Banner "8. Cleanup (delete user B's notifications)"

Invoke-RestMethod -Uri "$APP_URL/api/notifications" -Method Delete `
  -Headers @{ Authorization = "Bearer $tokenB" } | Out-Null
Pass "cleared user B's notifications"

Write-Host "`nAll smoke checks passed." -ForegroundColor Green
