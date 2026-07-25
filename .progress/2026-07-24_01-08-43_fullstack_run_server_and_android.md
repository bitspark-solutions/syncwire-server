# Worklog — Full-stack run: server stack + Android app end-to-end

**Date:** 2026-07-24 01:08 (local)
**Scope:** syncwire-server + syncwire (Android)

## What was done

- Started Docker Desktop (was not running) and verified the `syncwire` Compose
  stack: `syncwire-app` (18080), `syncwire-postgres` (15432), `syncwire-emqx`
  all healthy. `GET /api/health` → ok (db ok).
- `docker compose up -d --build` **fails to rebuild the app image**: the Docker
  build context lacks the generated Prisma client
  (`prisma/generated/client`), so `nest build` inside the image errors with
  TS2307/TS2339 (9 errors). The previously-built image + bind-mounted
  `prisma/` keeps the dev container working. **Open issue** — see below.
- Fixed a latent bug in `scripts/smoke.sh` (ordering check grepped raw JSON,
  so each `content: "hello smoke_x_..."` matched too — the check could never
  pass). Now greps `"id":"..."` occurrences only. `bash scripts/smoke.sh`
  → all 7 checks green. `scripts/smoke.ps1` parses JSON properly and was fine.
- Booted the `syncwire_test` emulator, built `:app:assembleDebug`, installed,
  launched `com.example.syncwire/.MainActivity`.
- Verified end-to-end forwarding: a real system notification
  ("Set a screen lock", pkg `android`) was forwarded by
  `SyncwireListenerService` → server → Postgres (confirmed in DB + logcat).
- **Found + fixed an Android bug:** "Send test" always failed on API 33+
  because `POST_NOTIFICATIONS` was missing from `AndroidManifest.xml` (the
  runtime check in `HomeViewModel.sendTest()` could never pass, and nothing
  requests the permission). Added the `<uses-permission>` line, rebuilt,
  reinstalled, granted via `adb shell pm grant`.
- Verified "Send test" end-to-end: 3 test notifications
  (`SyncWire test`, pkg `com.example.syncwire`) forwarded and stored.

## Current state

- Server stack running and healthy; smoke green.
- Emulator `syncwire_test` running the app; notification listener enabled;
  `POST_NOTIFICATIONS` granted (via adb); device id
  `0a8b03b3-865e-4b0d-899b-35ebbb590caa`; server URL
  `http://10.0.2.2:18080/api`.
- Files changed:
  - `scripts/smoke.sh` — ordering-check grep fix
  - `../syncwire/app/src/main/AndroidManifest.xml` — added POST_NOTIFICATIONS

## Open issues / next steps

1. **Docker image rebuild broken**: `docker compose up -d --build` fails
   because the build stage can't find `prisma/generated/client`. Either the
   Dockerfile should run `npx prisma generate` during build, or
   `.dockerignore` should stop excluding the generated client. Dev flow
   (bind-mount) is unaffected; prod/CI image builds will hit this.
2. `HomeViewModel.sendTest()` relies on the permission being granted
   elsewhere; nothing in the app requests `POST_NOTIFICATIONS` at runtime.
   Consider an in-app `rememberLauncherForActivityResult` prompt so the
   button works without adb.
3. Smoke ordering relies on Postgres `now()` microsecond resolution; fine in
   practice, but a tie-break on `id` in `findAll` orderBy would make it
   deterministic.
