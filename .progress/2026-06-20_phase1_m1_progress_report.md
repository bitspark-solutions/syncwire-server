# Phase 1 — Milestone 1 (Prisma + DB) — Progress Report

> **Status:** T1–T4 done. T5 in flight (tests pass; real docker verify blocked).
> **Date:** 2026-06-20
> **Companion plan:** `.plan/2026-06-19_phase1_plan.md`

---

## What landed

### Code (M1-T1 → T4, all green)
- `prisma/schema.prisma` — 5 tables (users, devices, refresh_tokens, pairings, pairing_codes), 2 enums, all FKs + indexes per plan §6
- `prisma/migrations/20260619204020_init/migration.sql` — initial migration, applied to running Postgres
- `prisma.config.ts` — Prisma 7 config (URL built from POSTGRES_PASSWORD + PG_HOST_PORT, since `url = env()` in schema is no longer supported in Prisma 7)
- `src/prisma/prisma.service.ts` — wraps PrismaClient + PrismaPg adapter, lifecycle hooks
- `src/prisma/prisma.module.ts` — `@Global()` provider
- `src/prisma/prisma.service.spec.ts` — **5 unit tests, all mocked, all pass**
- `src/health/health.controller.ts` — now injects PrismaService and runs `SELECT 1` for the DB probe
- `src/app.module.ts` — imports PrismaModule
- `docker-compose.yml` — un-commented `DATABASE_URL` (in-container: `postgres:5432`) and `JWT_SECRET` env vars on the app service
- `Dockerfile` — copies `prisma/` to the runtime image so the generated client is available

### Test results

```
=== unit ===
PASS src/prisma/prisma.service.spec.ts (5/5)
PASS src/notifications/notifications.service.spec.ts (5/5)
Tests: 10 passed, 10 total
=== e2e ===
PASS test/app.e2e-spec.ts (3/3)
  - GET /api/health returns 200 with stable shape and an ok DB probe
  - POST /api/notifications creates and returns 201 with receivedAt
  - GET /api/notifications returns the in-memory list as an array
Tests: 3 passed, 3 total
```

All tests mock PrismaService (per user's rule: tests must not make real I/O). The e2e `beforeEach` does `overrideProvider(PrismaService).useValue(mockPrisma)`.

---

## Two Prisma 7 gotchas hit and fixed

1. **Schema `url` is no longer supported.** Prisma 7 dropped the `url = env("DATABASE_URL")` line from the datasource block. Solution: leave the datasource block URL-less; put the URL in `prisma.config.ts` (used by the migrate CLI) and pass it via a `PrismaPg` driver adapter to the runtime `PrismaClient` (used by the app).

2. **`@prisma/client` direct import is broken.** The package's `exports` map redirects the default import to `default.js`, which re-exports from `.prisma/client/default`, which re-exports from `.prisma/client/index` — but TypeScript reports "no exported member 'PrismaClient'". Solution: set a custom `output` in the generator (`output = "../prisma/generated/client"`) and import from the generated path (`../../prisma/generated/client/client`).

Both workarounds are in the code with comments explaining why.

---

## What's still broken / blocked

### Real-DB probe in the running docker app — UNVERIFIED
The test suite uses mocks. To prove the real `PrismaService` works end-to-end, we need to:
- `docker compose build app` (compile inside the container)
- `docker compose up -d --force-recreate app` (restart with new image)
- `curl http://127.0.0.1:18080/api/health` → expect `"database": {"status": "ok"}`

**Last attempt failed** with:
```
Error: Cannot find module './generated/client/client'
Require stack: - /app/dist/prisma/prisma.service.js
```

This was the OLD code (import pointed at `./generated/client/client` relative to `dist/prisma/`). The patch in flight moved the generator output to `prisma/generated/client` (outside `src/`) and updated the Dockerfile to copy `prisma/` into the runtime image. **Need to re-run the build to verify the fix works.**

### Untracked work
- `.gitignore` should be updated to exclude `prisma/generated/` (generated, not source)
- The placeholder `JWT_SECRET` in compose is for dev only — real value comes from the user (per existing `.env`)

---

## Next session: pick up here

1. **Re-run** `docker compose build app && docker compose up -d --force-recreate app` to verify the new generator path resolves at runtime
2. **Verify** `curl http://127.0.0.1:18080/api/health` returns `"database": {"status": "ok"}`
3. **Hand off M1 to user for commit** (do NOT commit yourself)
4. **Add `prisma/generated/` to `.gitignore`**
5. **Start M2: Auth module** per `.plan/2026-06-19_phase1_plan.md` — install `@nestjs/jwt @nestjs/passport passport passport-jwt bcrypt`; write HashService, JwtService, AuthService, AuthController, JwtAuthGuard; tests for each

---

## Files changed (M1 scope)

```
A  prisma/schema.prisma
A  prisma/migrations/20260619204020_init/migration.sql
A  prisma.config.ts
A  src/prisma/prisma.service.ts
A  src/prisma/prisma.service.spec.ts
A  src/prisma/prisma.module.ts
M  src/app.module.ts (added PrismaModule)
M  src/health/health.controller.ts (real DB probe via PrismaService)
M  test/app.e2e-spec.ts (overrideProvider mockPrisma; assert DB probe ok)
M  src/test-setup.ts (placeholder DATABASE_URL; comment about real-DB tests)
M  package.json (added @prisma/client, prisma, @prisma/adapter-pg, pg, @types/pg, tsx, jest setupFiles)
M  docker-compose.yml (un-commented DATABASE_URL + JWT_SECRET for app service)
M  Dockerfile (COPY prisma ./prisma in builder; COPY --from=builder /app/prisma ./prisma in runner)
```

User commits all of the above when ready.
