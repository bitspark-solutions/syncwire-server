# SyncWire Server

A realtime notification relay: capture SMS and system notifications on one Android device and mirror them to another Android device or a web dashboard, in real time.

> **Status:** v0 — Phase 0 (Foundation) complete. Phase 1 (Identity, devices, pairings — REST control plane) is next. See [`.plan/2026-06-16_plan.md`](./.plan/2026-06-16_plan.md) for the full design and roadmap, and [`.progress/2026-06-19_phase0_foundation_progress_report.md`](./.progress/2026-06-19_phase0_foundation_progress_report.md) for what's done.

---

## What it does

Phone A has the SyncWire Android app. The app reads its own SMS messages and listens to system notifications, then forwards them to this server over MQTT. The server fans them out to Phone B (or a web client) that the owner of Phone A has paired it with.

Use cases:
- See your phone's notifications on a tablet, laptop, or second phone
- Keep a single dashboard of SMS messages from multiple phones (e.g. a shared work number)
- Mirror one phone to another for testing, accessibility, or development

---

## Goals (v1)

- **Pairing** — pair any two devices (or a device and a web session) with a short code, no account friction
- **Realtime relay** — sub-second delivery from source to viewer, broker-mediated
- **Offline resilience** — messages queued for offline viewers, catch-up via REST history on reconnect
- **Presence** — each device's online/offline status visible to its paired peers (broker LWT)
- **Multi-source, multi-viewer** — one source can fan out to many viewers; one viewer can aggregate many sources
- **Self-hostable** — runs as a single Docker Compose stack (server + Postgres + EMQX)

## Non-goals (v1)

- iOS client
- End-to-end encryption of notification content (server-readable in v1; E2E is a v1.1 follow-up)
- Group / team / organization accounts
- Cross-region data residency
- FCM push fallback for very-long-offline viewers

See the [plan](./.plan/2026-06-16_plan.md) §1 and §13 for the full scope and phasing.

---

## How it works

```
┌──────────┐    MQTT publish     ┌──────────┐    MQTT publish     ┌──────────┐
│ Phone A  │ ──────────────────► │  Server  │ ──────────────────► │ Phone B  │
│ (source) │   relay/<src>       │  EMQX +  │   inbox/<viewer>   │ (viewer) │
│ Android  │                     │  NestJS  │                    │ Android  │
└──────────┘                     └──────────┘                    └──────────┘
                                      │
                                      │ REST: /api/auth, /api/pairings,
                                      │       /api/devices, /api/notifications
                                      ▼
                                 ┌──────────┐
                                 │ Postgres │
                                 └──────────┘
```

- **Data plane (MQTT):** notifications flow over MQTT topics. EMQX handles routing, queueing, presence (LWT), and per-device ACLs.
- **Control plane (REST/HTTP):** auth, pairing, device management, history query.
- **Bridge service (NestJS, Phase 3):** subscribes to inbound MQTT, persists to Postgres, fans out to each paired viewer's inbox topic.
- **Clients:** Android app (companion repo) and a separate web client repo. Both consume the same wire contracts defined in the plan.

See [`.plan/2026-06-16_plan.md`](./.plan/2026-06-16_plan.md) for the full design — topic layout, message contracts, data model, edge cases, and security model.

---

## Tech stack (current)

| Layer | Choice | Version |
|---|---|---|
| HTTP framework | NestJS | 11.1.x |
| Runtime | Node.js | 24.x (LTS) on Alpine 3.24 |
| MQTT broker | EMQX | 5.8.9 (last truly open-source; 5.9+ is BSL) |
| Database | Postgres | 18.x on Alpine |
| ORM | Prisma | (added in Phase 1) |
| Auth | JWT (HS256) with rotating refresh tokens | (added in Phase 1) |
| Validation | class-validator, zod (for env) | 0.15 / 3.x |
| Testing | Jest, supertest | 30.x |
| Container | Docker + Compose V2 | 29.x / 5.x |
| Reverse proxy (prod) | Caddy 2 | (wired in Phase 6) |

---

## Getting started

### Prerequisites

- Docker with Compose V2 (`docker compose version` >= 2.20)
- (Optional, for host-side `make test` / `make lint` / `make format`) Node 24+, GNU Make 4+
- The dev stack does NOT need a local Node install — everything runs in the container

### One command

From the project root:

```bash
make up
```

This builds the app image and starts three services on the `syncwire-net` bridge network:

| Service | Image | Host port → container port | Notes |
|---|---|---|---|
| `app` | built from `Dockerfile` | 18080 → 8080, 9229 (debug) | NestJS, hot-reload, source bind-mounted |
| `postgres` | `postgres:18-alpine` | 15432 → 5432 | pgcrypto, `syncwire`/`syncwire` (dev) |
| `emqx` | `emqx/emqx:5.8.9` | 11883 → 1883, 18083 → 8083, 18084 → 18083 | Anonymous + allow-all in Phase 0 |

Hit the endpoints:

```bash
curl http://127.0.0.1:18080/api/health
curl -X POST http://127.0.0.1:18080/api/notifications \
  -H 'Content-Type: application/json' \
  -d '{"id":"demo1","sourceType":"SMS","sender":"+1****0000","content":"hello","timestamp":1718540000000,"packageName":"com.demo"}'
curl http://127.0.0.1:18080/api/notifications
```

EMQX dashboard: <http://127.0.0.1:18084> (login `syncwire` / `syncwire`).

### Other common commands

```bash
make help           # list all targets
make logs           # tail logs for all services
make logs-app       # tail app logs only
make test           # run unit tests (on host, needs Node 24+)
make lint           # run ESLint (on host)
make format         # run Prettier (on host)
make verify         # build + test + lint
make shell          # open a shell in the app container
make db-shell       # open psql in the postgres container
make mqtt-shell     # open a shell in the EMQX container
make down           # tear the stack down (keeps volumes)
make down-v         # tear down + delete volumes (nuke all state)
make clean          # down -v + remove dist/coverage artifacts
make version        # print versions of docker, compose, node, npm, make
```

Run `make help` for the full list.

### Direct (no Make) — same commands work

If you don't have make, you can use `docker compose` directly:

```bash
docker compose up -d
docker compose logs -f
docker compose exec app sh
docker compose exec postgres psql -U syncwire -d syncwire
docker compose down
```

---

## Environment variables

See `.env.example` for the full template. The schema is validated at boot by `src/config/env.ts` (zod); missing or malformed values cause the process to exit with a clear error.

Phase 0 keys:

```
NODE_ENV=development
PORT=8080
LOG_LEVEL=info
NOTIFICATION_RETENTION_DAYS=30
```

Phase 1+ keys (placeholders in the schema, currently optional):

```
DATABASE_URL=postgresql://syncwire:***@postgres:5432/syncwire
JWT_SECRET=<openssl rand -hex 32>
JWT_SECRET_PREVIOUS=<previous secret for rotation>
JWT_ACCESS_TTL_SECONDS=3600
JWT_REFRESH_TTL_SECONDS=7776000
EMQX_URL=mqtt://emqx:1883
EMQX_BRIDGE_USERNAME=bridge
EMQX_BRIDGE_PASSWORD=
```

The host-side `POSTGRES_PASSWORD` (for the Postgres service) lives in your shell env or a `.env` file consumed by Compose; it's not in `src/config/env.ts`.

---

## Repository layout

```
syncwire-server/
├── .plan/                             # design documents (full project plan, 17 sections)
├── .progress/                         # progress reports (one per phase + supplementary audits)
├── .github/workflows/ci.yml           # CI: lint + test + build + e2e on PRs
├── src/
│   ├── main.ts                        # bootstrap
│   ├── app.module.ts                  # module wiring (Config + Health + Notifications)
│   ├── config/env.ts                  # zod-validated env loader
│   ├── health/                        # /api/health (placeholder db/mqtt probes)
│   └── notifications/                 # current feature module (HTTP + in-memory store)
├── test/                              # e2e tests (config in test/jest-e2e.json)
├── prisma/                            # (added in Phase 1)
├── deploy/
│   ├── postgres/init.sql              # pgcrypto + role grants
│   ├── emqx/                          # broker config (Phase 2: JWT auth chain)
│   └── caddy/Caddyfile                # (Phase 6) TLS reverse proxy
├── dist/                              # build output (gitignored)
├── node_modules/
├── .env                               # (gitignored) local dev secrets
├── .env.example                       # template
├── .dockerignore
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── nest-cli.json
├── tsconfig.json
├── tsconfig.build.json
├── package.json
├── package-lock.json
├── Dockerfile                         # multi-stage, node:24-alpine, non-root, dumb-init
├── docker-compose.yml                 # single dev file
├── Makefile                           # 24 dev workflow targets
└── README.md                          # this file
```

---

## Companion repositories

- **Android app** — `C:\Users\Mohsin\AndroidStudioProjects\syncwire` (paired via `syncwire.code-workspace`)
- **Web client** — separate repo, TBD
- **Plan / design** — [`.plan/2026-06-16_plan.md`](./.plan/2026-06-16_plan.md)
- **Progress** — [`.progress/2026-06-19_phase0_foundation_progress_report.md`](./.progress/2026-06-19_phase0_foundation_progress_report.md) and [`..._phase0_codebase_audit_progress_report.md`](./.progress/2026-06-19_phase0_codebase_audit_progress_report.md)

---

## License

UNLICENSED (private).
