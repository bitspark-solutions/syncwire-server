# Progress log — Phase 0 (Foundation)

**Date:** 2026-06-19
**Phase:** 0 of 7 (Foundation & cleanup)
**Status:** DONE — verified end-to-end, committed (no tag yet)
**Commits this session:**
- `699a18b` build: upgrade Node to 24, Postgres to 18, and bump NestJS deps
- `9427a54` feat: add health module, env validation, and Docker setup
- (Plus the 2 pre-existing: `ecfceb2` README rewrite, `a9ab863` NestJS scaffold init)

---

## What got built

A working NestJS 11 + Postgres + EMQX stack, fully dockerized, that boots with one command (`make up`) and serves:
- `GET  /api/health`       → 200 with uptime + placeholder db/mqtt checks
- `POST /api/notifications` → 201 with the created record (in-memory, cap 100)
- `GET  /api/notifications` → 200 with the array
- `DELETE /api/notifications` → 204
- EMQX dashboard at `http://127.0.0.1:18084` (login `syncwire` / `syncwire`)

## Key decisions made this phase

1. **MQTT (EMQX), not WebSocket.** The original code used Socket.IO; we moved to MQTT because topic-based routing, broker-managed LWT presence, and per-device ACLs are vastly simpler. Plan §2 has the full comparison.
2. **Single docker-compose.yml, not three.** User request after the initial base/override/prod split. Dev workflow only; prod compose is deferred to Phase 6. Hot-reload, debug port 9229, and bind-mounts are baked into the single file.
3. **Makefile for ergonomics.** `make up` / `make down` / `make test` / `make logs` / etc. — 24 targets total. `make help` lists them.
4. **Latest stable versions, with license awareness.** Bumped to Node 24, Postgres 18, NestJS 11.1.27. Kept EMQX on 5.8.9 (last truly OSS release — 5.9+ is BSL).
5. **Env validation via zod** at boot, not at use. `src/config/env.ts` parses `process.env` once; bad config → process exits with a clear error.

## Issues hit and fixed (worth remembering)

1. **EMQX 5.8 rejects `built-in-database` (dash) + `password_based`.** Use `built_in_database` (underscore). For Phase 0, just removed the auth block entirely — Phase 0 runs anonymous + allow-all.
2. **bcrypt sub-config used `salt_position` (old API).** Removed since we don't need built-in auth in Phase 0.
3. **Dev override couldn't find `dumb-init`.** It was only installed in the runtime stage. Added `apk add dumb-init` to the builder stage too. Also moved `npm prune --omit=dev` from builder to runtime so dev can use `nest` CLI.
4. **`PORT` env var was passed as the in-container port but mapped as the host port.** Removed the env override; in-container is always 8080, host is `${APP_HOST_PORT:-18080}`.
5. **Postgres 18 changed its data dir convention.** Old: mount at `/var/lib/postgresql/data`. New: mount at `/var/lib/postgresql` and set `PGDATA=/var/lib/postgresql/18/docker`. The entrypoint hard-errors on the old style. Used a new volume name `syncwire-pg-data-v18` to avoid breaking the old data.
6. **Docker Desktop daemon died mid-session.** Restarted manually; no data loss.

## Files in the repo (post-Phase 0)

```
syncwire-server/
├── .plan/
│   └── 2026-06-16_plan.md              # 17-section design + phased delivery
├── .progress/
│   └── 2026-06-19_phase0_foundation_progress_report.md            # this file
├── src/
│   ├── main.ts                          # bootstrap (CORS, ValidationPipe, /api prefix)
│   ├── app.module.ts                    # wires Config + Health + Notifications
│   ├── config/
│   │   └── env.ts                       # zod-validated env loader
│   ├── health/
│   │   ├── health.module.ts
│   │   └── health.controller.ts         # /api/health (db/mqtt probes are placeholders)
│   └── notifications/
│       ├── notifications.module.ts
│       ├── notifications.controller.ts  # POST/GET/DELETE
│       ├── notifications.service.ts     # in-memory store, cap 100, dedup by id
│       ├── notifications.service.spec.ts # 5 tests
│       └── dto/create-notification.dto.ts
├── test/
│   └── app.e2e-spec.ts                  # untouched starter
├── deploy/
│   ├── emqx/{emqx.conf, acl.conf, authn-jwt.conf}   # Phase 0: anonymous, allow-all
│   ├── postgres/init.sql                            # pgcrypto + role grants
│   └── caddy/Caddyfile                              # Phase 6 — reference for now
├── dist/                                # build output (gitignored)
├── node_modules/
├── .env                                 # gitignored
├── .env.example
├── .dockerignore
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── nest-cli.json
├── tsconfig.json
├── tsconfig.build.json
├── package.json                         # all deps at latest-within-major
├── package-lock.json
├── Dockerfile                           # multi-stage, node:24-alpine, non-root, dumb-init
├── docker-compose.yml                   # single file, dev workflow
├── Makefile                             # 24 targets
└── README.md                            # SyncWire intro, no more NestJS boilerplate
```

## Stack state (as of end of phase)

```
NAME                IMAGE                  STATUS          PORTS
syncwire-app        syncwire-app           Up (healthy)    127.0.0.1:18080→8080, 9229→9229
syncwire-emqx       emqx/emqx:5.8.9        Up (healthy)    127.0.0.1:11883→1883, 127.0.0.1:18083→8083, 127.0.0.1:18084→18083
syncwire-postgres   postgres:18-alpine     Up (healthy)    127.0.0.1:15432→5432
```

## Deferred / pending

- **Tag `v0.1.0-foundation`** — not yet created. Quick: `git tag -a v0.1.0-foundation -m "..."`.
- **Orphaned volume** `syncwire-pg-data` (PG 16 era) on disk. Safe to `docker volume rm syncwire-pg-data` whenever.
- **§14 open questions** in the plan — none block Phase 1.

## Next: Phase 1 (Identity, devices, pairings — REST control plane)

Per `.plan/2026-06-16_plan.md` §13:

1. Prisma schema: 5 tables (`users`, `devices`, `refresh_tokens`, `pairings`, `pairing_codes`)
2. `auth` module: register, login, refresh with reuse detection, logout
3. `devices` module: list, create, revoke
4. `pairings` module: start (issue 6-digit code), claim, list, revoke
5. Unit + e2e tests
6. Tag `v0.2.0-identity`

Two paths offered to user:
- (A) Start coding directly — plan §6 + §7 has full spec, no more planning needed.
- (B) Write a Phase 1 detail plan first (bite-sized TDD tasks) before any code.

User choice pending.

## Conventions worth remembering (carried from memory)

- User uses `.plan/YYYY-MM-DD_plan.md` for plans, `.progress/YYYY-MM-DD_phaseN.md` for progress.
- User pairs repos in a `*.code-workspace` file.
- User reviews plans before implementation.
- User wants plans to reference internet research up front.
- Always search the internet first when picking a pattern/strategy.
- On this Windows host, `make` lives at `~/.local/bin/make.exe` (installed this session, GNU Make 4.4.1, portable ezwinports build).
- `docker compose` here is V2 (`compose version 5.1.4`).
- `ddgs` for web search must be installed into `~/.hermes/hermes-agent/venv/` (not system Python).
