-- SyncWire Postgres bootstrap
-- Runs once on first container start (mounted into /docker-entrypoint-initdb.d/).

-- pgcrypto for gen_random_uuid() (used in Prisma schema, Phase 1+).
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- The POSTGRES_USER / POSTGRES_DB env vars are already created by the
-- official postgres image's entrypoint before this file runs. We only need
-- to ensure the user has the right privileges on the public schema.
GRANT ALL ON SCHEMA public TO syncwire;
ALTER SCHEMA public OWNER TO syncwire;
