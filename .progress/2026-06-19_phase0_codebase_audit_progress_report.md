# Progress report — Phase 0 (Foundation) — full code-base review

**Date:** 2026-06-19
**Type:** Code-base review / audit (companion to `.progress/2026-06-19_phase0_foundation_progress_report.md`)
**Phase:** 0 of 7 (Foundation & cleanup)
**Status:** DONE — verified end-to-end, committed. **Issues found during this review noted below.**
**Commits in repo:**
- `699a18b` build: upgrade Node to 24, Postgres to 18, and bump NestJS deps
- `9427a54` feat: add health module, env validation, and Docker setup
- `ecfceb2` docs: rewrite README for SyncWire notification relay
- `a9ab863` chore: initialize NestJS project with base configuration

**No tag** — `v0.1.0-foundation` not yet created.
**Working tree clean** except for this `.progress/` directory (untracked).
**`.env`** is correctly gitignored (`git check-ignore .env` → `.env`).

---

## 1. Full file inventory

```
syncwire-server/
├── .plan/
│   └── 2026-06-16_plan.md              # 844 lines, 17 sections, full project design
├── .progress/
│   ├── 2026-06-19_phase0_foundation_progress_report.md            # the main phase log (chronological, decisions, what got built)
│   └── 2026-06-19_phase0_codebase_audit_progress_report.md     # this file (full code-base review, issues found)
├── src/
│   ├── main.ts                          # 38 lines  — bootstrap, /api prefix, CORS, ValidationPipe
│   ├── app.module.ts                    # 20 lines  — ConfigModule + HealthModule + NotificationsModule
│   ├── config/
│   │   └── env.ts                       # 55 lines  — zod schema for env, validates at boot
│   ├── health/
│   │   ├── health.module.ts             # 7 lines   — wraps HealthController
│   │   └── health.controller.ts         # 32 lines  — /api/health, placeholder db/mqtt checks
│   └── notifications/
│       ├── notifications.module.ts      # 10 lines  — wraps Controller + Service
│       ├── notifications.controller.ts  # 36 lines  — POST/GET/DELETE /api/notifications
│       ├── notifications.service.ts     # 49 lines  — in-memory store, cap 100, dedup by id
│       ├── notifications.service.spec.ts # 60 lines  — 5 tests, all passing
│       └── dto/create-notification.dto.ts # 25 lines — class-validator decorators
├── test/
│   ├── app.e2e-spec.ts                  # 29 lines  — **BROKEN** (see §3)
│   └── jest-e2e.json                    # 9 lines   — jest config for e2e
├── deploy/
│   ├── caddy/Caddyfile                  # 25 lines  — TLS reverse proxy, reference for Phase 6
│   ├── emqx/emqx.conf                   # 35 lines  — Phase 0: anonymous, no auth
│   ├── emqx/acl.conf                    # 13 lines  — Phase 0: allow-all
│   ├── emqx/authn-jwt.conf              # 28 lines  — Phase 2 stub, has bug-in-waiting
│   └── postgres/init.sql                # 11 lines  — pgcrypto + role grants
├── .env                                 # exists, gitignored, real values (read blocked)
├── .env.example                         # 21 lines  — template, no real secrets
├── .dockerignore                        # 20 lines
├── .gitignore                           # 56 lines  — standard NestJS ignore
├── .prettierrc                          # 4 lines
├── eslint.config.mjs                    # 35 lines  — flat config, TS + Prettier
├── nest-cli.json                        # 8 lines
├── package.json                         # 78 lines  — all deps at latest-within-major
├── package-lock.json                    # npm lock
├── tsconfig.json                        # 26 lines
├── tsconfig.build.json                  # 4 lines
├── Dockerfile                           # 55 lines  — multi-stage, node:24-alpine
├── docker-compose.yml                   # 154 lines — single dev file
├── Makefile                             # 138 lines — 24 targets
└── README.md                            # 146 lines — **OUT OF DATE** (see §3)
```

**What is NOT in the repo (deferred):**
- `prisma/` directory — Phase 1
- `src/auth/`, `src/devices/`, `src/pairings/` — Phase 1
- `src/mqtt/`, `src/mqtt-bridge.service.ts` — Phase 2/3
- `src/health/*.spec.ts` (unit test for health) — not written
- `.github/workflows/ci.yml`, `docker.yml` — CI/CD never created
- `test/auth.e2e-spec.ts`, `pairings.e2e-spec.ts` — Phase 1

**Confirmed deleted** (gone from tree, as planned):
- `src/app.controller.ts`
- `src/app.service.ts`
- `src/app.controller.spec.ts`
- `src/notifications/notifications.gateway.ts` (Socket.IO gateway)
- `docker-compose.override.yml`
- `docker-compose.prod.yml`

---

## 2. Stack state (right now)

```
NAME                IMAGE                  STATUS          PORTS
syncwire-app        syncwire-app           Up (healthy)    127.0.0.1:18080→8080, 9229→9229
syncwire-emqx       emqx/emqx:5.8.9        Up (healthy)    127.0.0.1:11883→1883, 127.0.0.1:18083→8083, 127.0.0.1:18084→18083
syncwire-postgres   postgres:18-alpine     Up (healthy)    127.0.0.1:15432→5432
```

**Inside the app container:**
- Node: v24.17.0 on Alpine 3.24.1
- Running `npm run start:dev` (`nest start --watch`) via `dumb-init` as PID 1
- Binds to 0.0.0.0:8080 inside container (mapped to host 18080)

**Inside the postgres container:**
- PostgreSQL 18.4
- Data at `/var/lib/postgresql/18/docker` (PG 18+ convention) on the `syncwire-pg-data-v18` named volume
- pgcrypto extension installed via `deploy/postgres/init.sql`
- Database `syncwire`, user `syncwire` (dev password in `.env`)

**Inside the EMQX container:**
- EMQX 5.8.9 (last true OSS; 5.9+ is BSL)
- Listeners: 1883 (MQTT), 8883 (MQTTS), 8083 (WS), 8084 (WSS), 18083 (Dashboard)
- Anonymous auth + allow-all ACL (Phase 0 posture)
- Dashboard at `http://127.0.0.1:18084` — login `syncwire` / `syncwire`

**End-to-end verified endpoints:**
- `GET  /api/health` → 200 with `status`, `uptimeSeconds`, `timestamp`, `checks.{database,mqtt}` (placeholders)
- `POST /api/notifications` → 201 with the created record + `receivedAt`
- `GET  /api/notifications` → 200 with the array (newest first, max 100)
- `DELETE /api/notifications` → 204

**`make` works:** 24 targets, `make help` lists them. `make test` and `make lint` run on host (Node 24 installed).

---

## 3. Issues found during this review (honest list)

The previous progress log said "verified end-to-end" — that was true for the unit tests + REST smoke test + docker healthchecks. But it missed these:

### 3.1 — `test/app.e2e-spec.ts` is **broken** (fails on every run)

```ts
// Lines 19-23:
it('/ (GET)', () => {
  return request(app.getHttpServer())
    .get('/')
    .expect(200)
    .expect('Hello World!');
});
```

AppController was deleted in Phase 0, so `GET /` returns 404, not 200. The e2e test has not been run since that deletion. **`npm run test:e2e` currently fails with: `expected 200 "OK", got 404 "Not Found"`.**

**Fix:** rewrite the test to hit `/api/notifications` and `/api/health`, or just delete the file (it was the boilerplate starter). Will fix in Phase 0 cleanup or at start of Phase 1.

### 3.2 — `README.md` is **out of date**

Specifically:
- Says **"Postgres 16"** — actually on 18 (alpine)
- Says **"Node 20.10+"** — actually requires 24
- Says **`docker compose -f deploy/docker-compose.yml up`** — that file no longer exists, the single compose is at the project root: `docker compose up` / `make up`
- Says **"The current `src/` is a NestJS scaffold with an in-memory notification store. The architecture is being migrated to MQTT"** — the migration is done; the scaffold is no longer pre-phase-0
- Tech stack table still says Postgres 16, NestJS 11, Caddy in front of EMQX (production) — fine, but the version rows are stale

**Fix:** rewrite the README to match the actual state. Easy, separate commit.

### 3.3 — `Dockerfile` has a **stale comment**

```dockerfile
# (docker-compose.override.yml) re-uses this stage with `target: builder` so
# it can run `nest start --watch` — that needs the dev `nest` CLI binary,
```

`docker-compose.override.yml` no longer exists; the dev settings are baked into the single `docker-compose.yml`. Comment should be updated.

### 3.4 — `deploy/emqx/authn-jwt.conf` has the **old EMQX bug** in a commented example

```hocon
# authentication = [
#   {
#     mechanism = "password_based"
#     backend = "built-in-database"     # ← dash, will fail when uncommented
#     user_id_type = "username"
#   }
# ]
```

When Phase 2 uncomments this block, it will hit the same `unsupported_mechanism` error we already fixed in `emqx.conf`. Should be `built_in_database` (underscore) now.

### 3.5 — `NotificationsService.findAll()` returns the **live internal array**

```ts
findAll(): NotificationRecord[] {
  return this.notifications;   // caller can mutate this
}
```

Plan §1 flagged this; not fixed. Anyone calling `findAll()` can `push`/`splice` the returned array and corrupt the store. Cheap fix: return `[...this.notifications]` or `.slice()`. Defer to Phase 1 (when we move to Postgres, the Prisma `findMany` returns a fresh array and this becomes moot).

### 3.6 — Minor: `package.json` has slight version skew

- `@nestjs/cli`: `^11.0.23` (resolves to 11.0.x line)
- `@nestjs/schematics`: `^11.1.0` (resolves to 11.1.x line)

Should both be on 11.1.x. Cosmetic — both work fine, but inconsistent. Quick patch.

### 3.7 — `tsconfig.json` is missing `useUnknownInCatchVariables`

TypeScript 5.x defaults to `false`. NestJS doesn't require it but if you `try { ... } catch (e) { ... }` and try to use `e` as a typed value, you'll get an `any` warning. Cosmetic.

### 3.8 — No CI / GitHub Actions

The plan §12 references `.github/workflows/{ci.yml,docker.yml}`. Neither exists. Not strictly Phase 0 (the plan put this as a final detail of Phase 0), but worth noting.

### 3.9 — Orphaned volume on disk

`syncwire-pg-data` (the old Postgres 16 volume) is still present. Safe to remove: `docker volume rm syncwire-pg-data`. Not blocking.

### 3.10 — `test/jest-e2e.json` is fine but stale

`rootDir: "."` works because e2e tests live in `test/`. If we add more e2e tests in the future, we'll likely consolidate to one Jest config. Not a problem now.

---

## 4. What is working (re-verified this session)

- `npm run build` → clean, 0 errors
- `npm run test` → 5/5 passing (NotificationsService unit tests)
- `npm run lint` → clean
- `docker compose up` → all 3 services healthy
- `curl http://127.0.0.1:18080/api/health` → 200
- `POST/GET/DELETE /api/notifications` → all return correct status codes
- `make help`, `make test`, `make lint`, `make version`, `make verify` → all work
- `.env` not in git, not in working tree changes

---

## 5. Phase plan progress (vs `.plan/2026-06-16_plan.md` §13)

| Phase | Title | Status | Notes |
|---|---|---|---|
| **0** | Foundation & cleanup | **DONE** | All 15 sub-tasks done. Issues 3.1–3.7 are minor cleanups, not blockers. |
| 1 | Identity, devices, pairings (REST) | NOT STARTED | Prisma schema, auth/devices/pairings modules, tests. No MQTT yet. |
| 2 | MQTT broker + ACL | NOT STARTED | JWT auth chain, per-device ACLs with placeholders, ACL rules from §5. |
| 3 | Relay core (MQTT data plane) | NOT STARTED | mqtt-bridge.service.ts, outbox sweeper, history endpoint. |
| 4 | Android client | NOT STARTED | Sibling repo at `C:\Users\Mohsin\AndroidStudioProjects\syncwire` — empty scaffold. |
| 5 | Web client | NOT STARTED | Separate repo, TBD. Framework still undecided (Svelte out). |
| 6 | Hardening | NOT STARTED | E2E encryption, rate limiting, metrics, graceful shutdown, load tests. |

---

## 6. Pending decisions (from plan §14)

None of these block Phase 1, but they will block later phases or deployment:

1. **Web client framework** — Svelte out, need Next.js / Vite+React / other
2. **Web repo path/name** — proposed `C:\Users\Mohsin\Projects\syncwire-web\`
3. **Hosting target for v1** — self-host (VPS / PaaS / cloud)?
4. **Android plan location** — separate `.plan` in `C:\Users\Mohsin\AndroidStudioProjects\syncwire`?
5. **Multi-source-per-viewer in v1** — assumed yes
6. **Source-phone-sees-own-relay in v1** — assumed yes
7. **Notification filtering at receiver v1** — defer to v2
8. **FCM push fallback v1** — defer to v1.1
9. **Data residency** — single region
10. **Brand name `SyncWire`** — assumed clear; not searched

---

## 7. What's actually in the code (file-by-file summary)

### Application source

| File | Lines | What it does | Quality |
|---|---|---|---|
| `src/main.ts` | 38 | Bootstrap. Reads `ConfigService<AppEnv>`, sets `/api` prefix, enables CORS + global ValidationPipe, starts on `PORT`. | Clean |
| `src/app.module.ts` | 20 | Wires `ConfigModule.forRoot({isGlobal, validate: validateEnv})`, `HealthModule`, `NotificationsModule`. | Clean |
| `src/config/env.ts` | 55 | Zod schema for env vars. Phase 0 fields are required; Phase 1+ fields are optional placeholders so the schema is forward-compatible. `validateEnv` exits 1 on bad input. | Clean |
| `src/health/health.module.ts` | 7 | One-line wrapper. | Fine |
| `src/health/health.controller.ts` | 32 | `GET /api/health` returns stable shape with placeholder db/mqtt checks. Real probes come in Phase 1/2. | Placeholder, intentional |
| `src/notifications/notifications.module.ts` | 10 | Wires controller + service. Exports `NotificationsService` (but no one imports it — dead export, see plan §1). | Works; dead export |
| `src/notifications/notifications.controller.ts` | 36 | `POST` 201, `GET`, `DELETE` 204. No gateway anymore. | Clean |
| `src/notifications/notifications.service.ts` | 49 | In-memory `NotificationRecord[]`. Dedup by `id`. Newest-first. Cap 100. **Returns live array** (issue 3.5). | Works, one smell |
| `src/notifications/notifications.service.spec.ts` | 60 | 5 tests: create, dedup, order, cap, clearAll. | All pass |
| `src/notifications/dto/create-notification.dto.ts` | 25 | class-validator: `id` (string, not empty), `sourceType` (in SMS/NOTIFICATION), `sender`, `content` (no `@IsNotEmpty` — see plan §1), `timestamp` (number, no min), `packageName`. | Plan flagged `content` should require non-empty; not fixed. |
| `test/app.e2e-spec.ts` | 29 | Tests `GET /` returning "Hello World!". **BROKEN** (issue 3.1). | Broken |

### Configuration files

| File | What | Status |
|---|---|---|
| `Dockerfile` | Multi-stage, node:24-alpine, dumb-init, non-root runner, HEALTHCHECK. | Clean. Stale comment (3.3). |
| `docker-compose.yml` | Single dev file. 3 services + named volumes + healthchecks + depends_on. Hot-reload, debug port, EMQX dashboard, postgres port all exposed on host. | Clean. |
| `package.json` | 14 prod deps + 20 dev deps, all at latest-within-major. Engines: node >=24. Jest config. | Clean. Minor version skew (3.6). |
| `tsconfig.json` | nodenext, ES2023, strictNullChecks, decorators, ESM interop. | Clean |
| `eslint.config.mjs` | Flat config, TS recommendedTypeChecked, Prettier recommended. | Clean |
| `.env.example` | Template. No real secrets. | Clean |
| `.env` | Real values, gitignored. | (Read blocked — appropriate) |
| `.dockerignore` | Excludes node_modules, .plan, .progress, .env, etc. | Clean |
| `.prettierrc` | `singleQuote: true, trailingComma: all`. | Clean |
| `nest-cli.json` | Standard. | Clean |
| `.gitignore` | Standard NestJS ignores. | Clean |

### Deploy / broker config

| File | What | Phase | Status |
|---|---|---|---|
| `deploy/postgres/init.sql` | `CREATE EXTENSION pgcrypto`, grant `syncwire` user on `public`. Runs once on first boot. | 0 | Clean |
| `deploy/emqx/emqx.conf` | Node + log config. **No auth block** (Phase 0 runs anonymous). `authorization { no_match: "allow" }`. | 0 | Clean |
| `deploy/emqx/acl.conf` | `{allow, all, all, ["#"]}` — allow-all. | 0 | Intentional |
| `deploy/emqx/authn-jwt.conf` | Empty placeholder file, with a commented JWT auth chain reference for Phase 2. | 2 (stub) | Bug-in-waiting (3.4): `built-in-database` should be `built_in_database` |
| `deploy/caddy/Caddyfile` | Reverse-proxy + MQTT-over-WS routing. Domain `syncwire.example.com` (placeholder). | 6 (reference) | Reference only — not used in current dev compose |

### Plan + progress

| File | What | Status |
|---|---|---|
| `.plan/2026-06-16_plan.md` | 844 lines, 17 sections: goal, MQTT rationale, architecture, topic design, auth, data model, REST API, MQTT contracts, bridge service, security, edge cases, project layout, phased delivery, open questions, tech choices, sign-off scope, containerization. | Up to date |
| `.progress/2026-06-19_phase0_foundation_progress_report.md` | Main phase log: chronological record of what got built, decisions, issues fixed. | Current |
| `.progress/2026-06-19_phase0_codebase_audit_progress_report.md` | This file. Full code-base review / audit with per-file status and 10 issues found. | Current |

---

## 8. Conventions (carried from memory + this review)

- Plans: `.plan/YYYY-MM-DD_plan.md`
- Progress: `.progress/YYYY-MM-DD_phaseN.md`
- Additional reports (review, audit, hotfix, etc.): `.progress/YYYY-MM-DD_phaseN_<type>.md`
- Companion repos paired via `*.code-workspace`
- Always search the internet first when picking a pattern/strategy
- Phase 0+ should be planned end-to-end before implementation
- Tag each phase (e.g., `v0.1.0-foundation`, `v0.2.0-identity`, ...)
- Don't commit, push, deploy, or take destructive actions without asking
- Never overwrite a progress log — always add a new file with a formatted name

**Environment quirks worth remembering:**
- `make` lives at `~/.local/bin/make.exe` (GNU Make 4.4.1, ezwinports portable)
- `docker compose` here is V2 (5.1.4)
- `node` is v24.15.0 on the host
- `ddgs` for web search must be installed into `~/.hermes/hermes-agent/venv/` (not system Python 3.14)
- Docker Desktop on Windows can die mid-session; restart manually
- Postgres 18+ requires `PGDATA=/var/lib/postgresql/18/docker` + mount at `/var/lib/postgresql`
- EMQX 5.8.x is the last truly OSS; 5.9+ / 6.x is BSL
- Bash on Windows is Git Bash (MSYS); POSIX syntax, `/c/...` paths work

---

## 9. Next steps (suggested)

**Before Phase 1 starts**, fix the small Phase 0 leftovers (~15 min of work):

1. Fix `test/app.e2e-spec.ts` (rewrite to hit `/api/notifications` + `/api/health`, or delete)
2. Update `README.md` to reflect Postgres 18, Node 24, single compose at root
3. Fix stale comment in `Dockerfile` (reference to deleted `docker-compose.override.yml`)
4. Fix `built-in-database` → `built_in_database` in commented example in `authn-jwt.conf`
5. Fix `findAll()` to return a copy in `NotificationsService`
6. Sync `@nestjs/cli` and `@nestjs/schematics` versions
7. Add `@IsNotEmpty` to `content` in `CreateNotificationDto` (or document as deliberate)
8. Remove dead `exports: [NotificationsService]` from `NotificationsModule` (or document)
9. Tag `v0.1.0-foundation` once the above are committed
10. Remove orphaned `syncwire-pg-data` volume (optional)

**Then start Phase 1** (per the plan, 1–2 days of work):
- Prisma schema (5 tables)
- `auth` module: register, login, refresh with reuse detection, logout
- `devices` module: list, create, revoke
- `pairings` module: start (6-digit code), claim, list, revoke
- Unit + e2e tests for all of the above
- Tag `v0.2.0-identity`

User's call on A (start coding) vs B (write a Phase 1 detail-plan first) — pending.
