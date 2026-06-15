# SyncWire Server

A realtime notification relay: capture SMS and system notifications on one Android device and mirror them to another Android device or a web dashboard.

> Status: v0 — under active development. The current `src/` is a NestJS scaffold with an in-memory notification store. The architecture is being migrated to MQTT (EMQX) with a NestJS bridge, REST control plane, and Postgres persistence. See [`.plan/2026-06-16_plan.md`](./.plan/2026-06-16_plan.md) for the full design and phased rollout.

---

## What it does

Phone A has the SyncWire Android app. The app reads its own SMS messages and listens to system notifications, then forwards them to this server. The server fans them out to Phone B (or a web client) that the owner of Phone A has paired it with.

Use cases:
- See your phone's notifications on a tablet, laptop, or second phone
- Keep a single dashboard of SMS messages from multiple phones (e.g. a shared work number)
- Mirror one phone to another for testing, accessibility, or development

---

## Goals (v1)

- **Pairing** — pair any two devices (or a device and a web session) with a short code, no accounts friction
- **Realtime relay** — sub-second delivery from source to viewer
- **Offline resilience** — messages queued for offline viewers, catch-up on reconnect via history API
- **Presence** — each device's online/offline status visible to its paired peers
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
- **Bridge service (NestJS):** subscribes to inbound MQTT, persists to Postgres, fans out to each paired viewer's inbox topic.
- **Clients:** Android app (companion repo) and a separate web client repo. Both consume the same wire contracts defined in the plan.

See [`.plan/2026-06-16_plan.md`](./.plan/2026-06-16_plan.md) for the full design — topic layout, message contracts, data model, edge cases, and security model.

---

## Repository layout

```
syncwire-server/
├── .plan/                # design documents and rollout plans
├── src/
│   ├── main.ts           # bootstrap
│   ├── app.module.ts     # module wiring
│   ├── notifications/    # current feature module (HTTP + persistence)
│   └── ...               # auth, devices, pairings, mqtt, prisma (added per phase)
├── test/                 # e2e tests
├── prisma/               # schema + migrations (added in phase 1)
├── deploy/               # docker-compose, EMQX config (added in phase 2)
└── ...
```

The current `src/` reflects pre-phase-0 state. The plan in `.plan/` describes the target layout.

---

## Tech stack

| Layer | Choice |
|---|---|
| HTTP framework | NestJS 11 (TypeScript) |
| MQTT broker | EMQX 5.x (self-hosted) |
| MQTT client (server) | mqtt.js |
| Database | Postgres 16 |
| ORM | Prisma |
| Auth | JWT (HS256) with rotating refresh tokens |
| Validation | class-validator, zod (for env) |
| Testing | Jest, supertest, mqtt.js test client |
| Container | Docker, Docker Compose |
| TLS | Caddy in front of EMQX (production) |

---

## Getting started

Prerequisites: Node 20.10+, Docker (for the broker + DB stack).

```bash
# install
npm install

# copy env template and edit
cp .env.example .env

# run tests
npm run test

# start the server (current scaffold: HTTP only, no MQTT yet)
npm run start:dev
```

Once the MQTT migration is in (phase 2 onward), the full stack runs via:

```bash
docker compose -f deploy/docker-compose.yml up
```

---

## Environment variables

See `.env.example` for the current template. The plan specifies the full set: database URL, JWT signing secret, JWT secret rotation pair, EMQX broker URL, server port, log level, retention window.

---

## Related repositories

- **Android app** — `C:\Users\Mohsin\AndroidStudioProjects\syncwire` (paired via `syncwire.code-workspace`)
- **Web client** — separate repo (TBD)
- **Plan / design** — [`.plan/2026-06-16_plan.md`](./.plan/2026-06-16_plan.md)

---

## License

UNLICENSED (private).
