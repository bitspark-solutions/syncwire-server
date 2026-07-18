# SyncWire Server

A realtime notification relay. The Android companion app (`syncwire-app`) listens to system notifications on a phone and forwards them to this server over HTTP, where they're stored per-device and surfaced via REST.

> **Status:** v0 — **Phase 0 (Foundation)** and **Phase 1 M1 (Prisma + notification forwarding)** are done. Auth (Auth0) and the MQTT fanout are the next phases. See [`.plan/2026-06-16_plan.md`](./.plan/2026-06-16_plan.md) for the long-range design, and [`.progress/`](./.progress/) for what landed in each phase.

---

## What it does today

- Accepts a `POST /api/notifications` payload from a device and stores it in Postgres
- Returns notifications scoped by `deviceId` (the device identifies itself with a locally-generated UUID for M1; M2 swaps this for a server-issued id + api key)
- Exposes a stable `GET /api/health` with a real DB probe
- Validates every request with a global `ValidationPipe` (class-validator)
- Runs as a single Docker Compose stack: NestJS + Postgres + EMQX (EMQX is wired but not yet used by the data plane)

What's **not** in yet: auth, device registration, pairing, MQTT data plane, offline queue, fanout to viewers. All are scoped for the next phases.

---

## API

Base URL: `http://<host>:18080/api` (dev).

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/health` | Liveness + DB probe |
| `POST` | `/notifications` | Create a notification. Body: `id`, `deviceId`, `sourceType`, `sender`, `content`, `timestamp` (ms), `packageName` |
| `GET` | `/notifications?deviceId=...&limit=...` | List, newest-first. Default limit 50, max 200 |
| `GET` | `/notifications/:id` | Fetch one. 404 if missing |
| `DELETE` | `/notifications` | Clear all (dev only) |

Dedupe is by client-supplied `id` — re-posting the same id returns the original row.

Example:

```bash
curl -X POST http://127.0.0.1:18080/api/notifications \
  -H 'Content-Type: application/json' \
  -d '{
    "id": "demo-1",
    "deviceId": "dev-andy-pixel",
    "sourceType": "NOTIFICATION",
    "sender": "WhatsApp",
    "content": "hi from Mohsin",
    "timestamp": 1718540000000,
    "packageName": "com.whatsapp"
  }'
```

---

## Tech stack

| Layer | Choice | Version |
|---|---|---|
| HTTP framework | NestJS | 11.1.x |
| Runtime | Node.js | 24.x (LTS) on Alpine 3.24 |
| Database | Postgres | 18.x on Alpine |
| ORM | Prisma | 7.8.x (with `PrismaPg` driver adapter) |
| MQTT broker | EMQX | 5.8.9 (last truly open-source; 5.9+ is BSL) |
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

```bash
make up
```

This builds the app image and starts three services on the `syncwire-net` bridge network:

| Service | Image | Host port → container port | Notes |
|---|---|---|---|
| `app` | built from `Dockerfile` (`target: builder`) | 18080 → 8080, 9229 (debug) | NestJS, hot-reload, source bind-mounted |
| `postgres` | `postgres:18-alpine` | 15432 → 5432 | pgcrypto, `syncwire` / dev password |
| `emqx` | `emqx/emqx:5.8.9` | 11883 → 1883, 18083 → 8083, 18084 → 18083 | Phase 0 dev dashboard |

EMQX dashboard: <http://127.0.0.1:18084> (login `syncwire` / `syncwire`).

### Common commands

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

```bash
docker compose up -d
docker compose logs -f
docker compose exec app sh
docker compose exec postgres psql -U syncwire -d syncwire
docker compose down
```

### Apply a new migration

After pulling schema changes, run from the host:

```bash
npx prisma migrate deploy
```

This runs the new SQL against the in-stack Postgres (via `localhost:15432`).

---

## Live smoke test

With the stack up, hit it with the bundled smoke script:

```bash
npm run smoke           # PowerShell
npm run smoke:bash      # Git Bash
```

7 checks: health → 3× POST → dedupe → list+order → GET by id → 404 → validation 400 → DELETE.

---

## Environment variables

See `.env.example` for the full template. The schema is validated at boot by `src/config/env.ts` (zod); missing or malformed values cause the process to exit with a clear error.

Current keys:

```
NODE_ENV=development
PORT=8080
LOG_LEVEL=info
DATABASE_URL=postgresql://syncwire:<password>@postgres:5432/syncwire
NOTIFICATION_RETENTION_DAYS=30
```

The host-side `POSTGRES_PASSWORD` lives in your shell env or `.env`; the app container interpolates it into `DATABASE_URL` via docker-compose.

---

## Testing

```bash
npm test               # unit tests (mocked Prisma)
npm run test:e2e       # full HTTP e2e with mocked Prisma
npm run smoke          # live e2e against the running docker stack
npm run verify         # build + test + lint
```

All tests must not make real I/O — Prisma is mocked at the test boundary. Live connectivity is verified separately via `npm run smoke`.

---

## Repository layout

```
syncwire-server/
├── .plan/                             # long-range design docs
├── .progress/                         # one report per phase + audits
├── .github/workflows/                 # CI
├── src/
│   ├── main.ts                        # bootstrap (ValidationPipe, /api prefix)
│   ├── app.module.ts                  # module wiring
│   ├── config/env.ts                  # zod-validated env loader
│   ├── health/                        # /api/health
│   ├── prisma/                        # PrismaService + PrismaModule (global)
│   └── notifications/                 # POST/GET/DELETE /api/notifications
├── test/                              # e2e tests (test/jest-e2e.json)
├── prisma/
│   ├── schema.prisma                  # 6 models (User, Device, RefreshToken, Pairing, PairingCode, Notification)
│   ├── migrations/                    # applied via `npx prisma migrate deploy`
│   └── generated/client/              # (regenerated; tracked today, see roadmap)
├── scripts/
│   ├── smoke.sh                       # Git Bash live smoke
│   └── smoke.ps1                      # PowerShell live smoke
├── deploy/
│   ├── postgres/init.sql              # pgcrypto + role grants
│   ├── emqx/                          # broker config
│   └── caddy/Caddyfile                # (Phase 6) TLS reverse proxy
├── docker-compose.yml
├── Dockerfile                         # multi-stage, node:24-alpine, non-root, dumb-init
├── Makefile                           # 24 dev workflow targets
└── README.md                          # this file
```

---

## Companion repositories

- **Android app** — `bitspark-solutions/syncwire-app` (paired via `syncwire.code-workspace`)
- **Web client** — TBD
- **Plan** — [`.plan/2026-06-16_plan.md`](./.plan/2026-06-16_plan.md)
- **Progress** — [`.progress/`](./.progress/)

---

## License

UNLICENSED (private).
