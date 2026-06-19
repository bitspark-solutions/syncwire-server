import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// SyncWire — Prisma 7 config
//
// Connection URL construction:
//   For migrations (run on the host), we read POSTGRES_PASSWORD from .env
//   and point at the docker-mapped host port (default 15432). Override via
//   PG_HOST_PORT if you remapped it.
//
//   For the runtime client (in src/prisma/prisma.service.ts), we read
//   DATABASE_URL directly — set in docker-compose.yml to the in-network
//   hostname `postgres:5432`. Keeping these separate means the same
//   prisma.config.ts works from both the host and inside a container.
const pgPassword = process.env.POSTGRES_PASSWORD;
if (!pgPassword) {
  throw new Error(
    'prisma.config.ts: POSTGRES_PASSWORD is not set. Add it to .env (or your shell env).',
  );
}
const pgHost = process.env.PG_HOST_PORT ?? '15432';
const databaseUrl =
  process.env.DATABASE_URL ??
  `postgresql://syncwire:${encodeURIComponent(pgPassword)}@localhost:${pgHost}/syncwire`;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: databaseUrl,
  },
});
