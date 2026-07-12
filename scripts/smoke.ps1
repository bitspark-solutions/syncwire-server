# =============================================================================
# SyncWire — live smoke test (PowerShell)
# =============================================================================
# Same as scripts/smoke.sh but runs natively on Windows PowerShell.
# Exercises the running docker stack end-to-end.
#
# Usage:
#   .\scripts\smoke.ps1
#   $env:APP_URL = "http://192.168.1.10:18080"; .\scripts\smoke.ps1
# =============================================================================

$ErrorActionPreference = 'Stop'
$APP_URL = if ($env:APP_URL) { $env:APP_URL } else { 'http://127.0.0.1:18080' }
$DEVICE_ID = "smoke_$([DateTimeOffset]::UtcNow.ToUnixTimeSeconds())"
$IDS = @{
  A = "smoke_a_$([DateTimeOffset]::UtcNow.ToUnixTimeSeconds())"
  B = "smoke_b_$([DateTimeOffset]::UtcNow.ToUnixTimeSeconds())"
  C = "smoke_c_$([DateTimeOffset]::UtcNow.ToUnixTimeSeconds())"
}

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
# 1. POST three notifications
# -----------------------------------------------------------------------------
Banner "1. POST /api/notifications (3 inserts)"
foreach ($k in 'A','B','C') {
  $id = $IDS[$k]
  $body = @{
    id = $id
    deviceId = $DEVICE_ID
    sourceType = 'NOTIFICATION'
    sender = 'smoke'
    content = "hello $id"
    timestamp = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
    packageName = 'smoke'
  } | ConvertTo-Json -Compress
  Invoke-RestMethod -Uri "$APP_URL/api/notifications" -Method Post `
    -ContentType 'application/json' -Body $body | Out-Null
  Pass "posted $id"
}

# -----------------------------------------------------------------------------
# 2. Dedupe
# -----------------------------------------------------------------------------
Banner "2. Dedupe - re-post $($IDS.A)"
$body = @{
  id = $IDS.A
  deviceId = $DEVICE_ID
  sourceType = 'NOTIFICATION'
  sender = 'smoke'
  content = 'DIFFERENT CONTENT'
  timestamp = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
  packageName = 'smoke'
} | ConvertTo-Json -Compress
$dedupe = Invoke-RestMethod -Uri "$APP_URL/api/notifications" -Method Post `
  -ContentType 'application/json' -Body $body
if ($dedupe.content -ne "hello $($IDS.A)") {
  Fail "dedupe failed - expected original content, got '$($dedupe.content)'"
}
Pass "dedupe works (original content returned)"

# -----------------------------------------------------------------------------
# 3. GET list
# -----------------------------------------------------------------------------
Banner "3. GET /api/notifications?deviceId=$DEVICE_ID"
$list = Invoke-RestMethod -Uri "$APP_URL/api/notifications?deviceId=$DEVICE_ID" -Method Get
if ($list.Count -ne 3) { Fail "expected 3 rows, got $($list.Count)" }
Pass "list returned 3 rows"
$order = ($list | Select-Object -First 3) | ForEach-Object { $_.id }
if (($order[0] -ne $IDS.C) -or ($order[1] -ne $IDS.B) -or ($order[2] -ne $IDS.A)) {
  Fail "ordering wrong: $($order -join ',')"
}
Pass "newest-first ordering correct"

# -----------------------------------------------------------------------------
# 4. GET by id
# -----------------------------------------------------------------------------
Banner "4. GET /api/notifications/$($IDS.B)"
$one = Invoke-RestMethod -Uri "$APP_URL/api/notifications/$($IDS.B)" -Method Get
if ($one.id -ne $IDS.B) { Fail "id mismatch" }
Pass "single fetch ok"

# -----------------------------------------------------------------------------
# 5. 404
# -----------------------------------------------------------------------------
Banner "5. GET /api/notifications/does-not-exist -> 404"
try {
  $null = Invoke-RestMethod -Uri "$APP_URL/api/notifications/does-not-exist" -Method Get
  Fail "expected 404, got 200"
} catch {
  if ($_.Exception.Response.StatusCode -ne 404) {
    Fail "expected 404, got $($_.Exception.Response.StatusCode)"
  }
}
Pass "404 returned"

# -----------------------------------------------------------------------------
# 6. Validation: 400 on missing fields
# -----------------------------------------------------------------------------
Banner "6. POST with missing fields -> 400"
try {
  $null = Invoke-RestMethod -Uri "$APP_URL/api/notifications" -Method Post `
    -ContentType 'application/json' -Body '{"id":"incomplete"}'
  Fail "expected 400, got 200"
} catch {
  if ($_.Exception.Response.StatusCode -ne 400) {
    Fail "expected 400, got $($_.Exception.Response.StatusCode)"
  }
}
Pass "validation rejects incomplete payload"

# -----------------------------------------------------------------------------
# 7. Cleanup
# -----------------------------------------------------------------------------
Banner "7. DELETE /api/notifications (cleanup)"
Invoke-RestMethod -Uri "$APP_URL/api/notifications" -Method Delete | Out-Null
Pass "cleared"

Write-Host "`nAll smoke checks passed." -ForegroundColor Green
