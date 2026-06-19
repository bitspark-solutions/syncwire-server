# Progress report — Phase 0 cleanup (review fixes)

**Date:** 2026-06-19
**Type:** Cleanup session — addresses the 10 issues found in `.progress/2026-06-19_phase0_codebase_audit_progress_report.md`
**Phase:** 0 of 7 (Foundation & cleanup)
**Status:** DONE — all fixes applied, build/test/e2e/lint all green, stack healthy
**Companion files:**
- `.progress/2026-06-19_phase0_foundation_progress_report.md` — the original chronological phase log
- `.progress/2026-06-19_phase0_codebase_audit_progress_report.md` — the deep audit that surfaced these 10 issues

---

## What got fixed

The 10 issues from the audit, addressed one by one. All verified end-to-end (build, unit, e2e, lint, live stack smoke test).

### #1 — `test/app.e2e-spec.ts` was broken

**Before:** tested the deleted `AppController`, expected `GET /` to return "Hello World!" — failed with 404 on every run.
**After:** rewritten to 3 e2e tests against the real API:
- `GET /api/health` returns 200 with the stable shape (status, uptimeSeconds, timestamp, checks.{database,mqtt})
- `POST /api/notifications` returns 201 with `receivedAt` set
- `GET /api/notifications` returns an array containing the seeded notification

**Result:** `npm run test:e2e` now passes — 3/3 green.

### #2 — `README.md` was out of date

**Before:** said Postgres 16 (we're on 18), Node 20.10+ (we're on 24), referenced the deleted `deploy/docker-compose.yml`, said "the architecture is being migrated to MQTT" (already done).
**After:** full rewrite — accurate tech stack table, accurate getting-started section, references the single `docker-compose.yml` and the Makefile, links to both progress reports.

### #3 — `Dockerfile` had a stale comment

**Before:** referenced the deleted `docker-compose.override.yml` in the builder-stage header comment.
**After:** comment now describes the actual flow — `target: builder` in the single `docker-compose.yml` keeps devDeps for hot-reload.

### #4 — `deploy/emqx/authn-jwt.conf` had the EMQX bug-in-waiting

**Before:** commented example used `backend = "built-in-database"` (dash) — the exact same syntax error that broke `emqx.conf` in Phase 0.
**After:** now `backend = "built_in_database"` (underscore) with a comment cross-referencing `emqx.conf`. (Note: I almost accidentally uncommented the whole block during the fix — caught and reverted in the same turn.)

### #5 — `NotificationsService.findAll()` returned the live internal array

**Before:** `return this.notifications;` — callers could mutate the store.
**After:** `return [...this.notifications];` — defensive copy. Comment added.

### #6 — REVERTED, not a bug

I bumped `@nestjs/cli` from `^11.0.23` to `^11.1.0` to "match" `@nestjs/schematics`. **`npm install` immediately failed** with `ETARGET: No matching version found for @nestjs/cli@^11.1.0`. Checked npm: `@nestjs/cli` latest stable is `11.0.23` (the 12.0.0 line is still alpha). The version "skew" was not a bug — the two packages are released on different cadences. Reverted to `^11.0.23`. Lesson logged: don't "fix" things that aren't broken without checking the registry first.

### #7 — `tsconfig.json` added `useUnknownInCatchVariables: true`

**Before:** TS default `false` — `catch (e)` gave `e` the type `any`.
**After:** `true` — `e` is `unknown`, forcing explicit narrowing. Standard hardening for new TS code.

### #8 — Added `.github/workflows/ci.yml`

**Before:** no CI at all. The plan §12 referenced it; not done.
**After:** GitHub Actions workflow that runs on push/PR to `master` or `main`:
- Node 24
- `npm ci` → `npm run lint` → `npm run test` → `npm run build` → `npm run test:e2e`

No Docker in CI (intentional — the e2e tests use the in-memory app, no need for the full stack). When we add GHCR image push later, a separate `docker.yml` will appear.

### #9 — `CreateNotificationDto.content` got `@IsNotEmpty`

**Before:** `content` had only `@IsString()` — empty strings passed.
**After:** `content` has `@IsString() @IsNotEmpty()`. **Verified live**: `POST /api/notifications` with `"content": ""` now returns 400 with `"content should not be empty"`.

### #10 — Removed dead `exports: [NotificationsService]`

**Before:** `NotificationsModule` re-exported `NotificationsService` but nothing imported it.
**After:** removed. Keeps the module's public surface clean.

---

## Bonus cleanup

### Orphaned volume removed

`syncwire-pg-data` (PG 16 era) was orphaned on disk. Confirmed the running `syncwire-postgres` container is using `syncwire-pg-data-v18` (not the old one), then `docker volume rm syncwire-pg-data` per user direction. Remaining volumes: `syncwire-pg-data-v18`, `syncwire-emqx-data`, `syncwire-emqx-log`.

### Cosmetic note: stale Compose labels on the EMQX container

When I checked `docker compose ps --format json`, the EMQX container's label `com.docker.compose.config_files` still says `docker-compose.yml,docker-compose.override.yml` — a leftover from when the override existed. Cosmetic only; container works fine and the new compose file takes effect on next `up`. Will go away naturally when EMQX is recreated (next `make rebuild` or fresh `make up`).

---

## Verification log

After all fixes:

```
=== build ===
> syncwire-server@0.0.1 build
> nest build
(exit 0, no output)

=== test (unit) ===
Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total

=== test:e2e ===
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
    √ GET /api/health returns 200 with the stable shape (174 ms)
    √ POST /api/notifications creates and returns 201 with receivedAt (26 ms)
    √ GET /api/notifications returns the in-memory list as an array (8 ms)

=== lint ===
(9 pre-existing auto-fixable warnings — exit 0; --fix handles them)

=== live stack smoke test ===
$ curl http://127.0.0.1:18080/api/health
{"status":"ok","uptimeSeconds":50,...}                                    HTTP 200

$ curl -X POST ... -d '{"...content":""...}' 
{"message":["content should not be empty"],"error":"Bad Request",...}    HTTP 400

$ curl -X POST ... -d '{"...content":"phase 0 fixes verified"...}'
{"id":"phase0_fix_verify",...,"receivedAt":"..."}                        HTTP 201
```

---

## Files changed

```
M Dockerfile                                  # Fix #3
M README.md                                   # Fix #2 (full rewrite)
M deploy/emqx/authn-jwt.conf                  # Fix #4
M src/notifications/dto/create-notification.dto.ts  # Fix #9
M src/notifications/notifications.module.ts  # Fix #10
M src/notifications/notifications.service.ts # Fix #5
M test/app.e2e-spec.ts                        # Fix #1
M tsconfig.json                               # Fix #7
?? .github/workflows/ci.yml                   # Fix #8
?? .progress/                                 # the two progress reports
```

`package.json` was touched and reverted (no net change).

User will commit; not done by the agent. (`fix #6` was an attempted "fix" that was reverted; not in the final list.)

---

## Conventions worth remembering (carried from memory)

- Plans: `<project>/.plan/YYYY-MM-DD_plan.md`
- Progress: `<project>/.progress/YYYY-MM-DD_<title>_progress_report.md` — `_progress_report.md` is a literal suffix, `<title>` is a descriptive slug
- **User commits** — agent never commits, pushes, or tags unless explicitly asked
- Always search the internet first when picking a pattern/strategy
- `make` at `~/.local/bin/make.exe` (ezwinports portable, GNU Make 4.4.1)
- `ddgs` for web search must be in `~/.hermes/hermes-agent/venv/`
- Postgres 18+ requires `PGDATA=/var/lib/postgresql/18/docker` + mount at `/var/lib/postgresql`
- EMQX 5.8.x is the last truly OSS; 5.9+ / 6.x is BSL
- TS decorator metadata (`useDefineForClassFields: false`, `emitDecoratorMetadata: true`) is required for NestJS

---

## Next: Phase 1 (Identity, devices, pairings — REST control plane)

Per `.plan/2026-06-16_plan.md` §13:

1. Prisma schema: 5 tables (`users`, `devices`, `refresh_tokens`, `pairings`, `pairing_codes`)
2. `auth` module: register, login, refresh with reuse detection, logout
3. `devices` module: list, create, revoke
4. `pairings` module: start (6-digit code), claim, list, revoke
5. Unit + e2e tests
6. Tag `v0.2.0-identity`

Two ways to proceed (still pending from earlier in the session):

- **A — Start coding directly** — plan §6 (data model) and §7 (REST API surface) have the full spec.
- **B — Write a Phase 1 detail plan first** — bite-sized TDD tasks, exact file paths, code, verification steps. Matches the plan-skill pattern and the user's stated preference for reviewed plans.

User choice pending.
