# syntax=docker/dockerfile:1.7
# ---------- Build stage ----------
# Installs ALL deps (incl. dev) and compiles TypeScript. Used both for prod
# images and for the dev workflow (docker-compose.yml's `target: builder`
# keeps the dev `nest` CLI on PATH so `npm run start:dev` can run
# `nest start --watch`). We deliberately do NOT prune devDeps here.
FROM node:24-alpine AS builder

# dumb-init is used as PID 1 in both the runtime and dev (builder-target)
# configurations. Installing it in the builder keeps the dev override's
# `command: dumb-init -- ...` working as written.
RUN apk add --no-cache dumb-init

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Generate the Prisma client inside the image so the build never depends on
# host-generated artifacts (prisma/generated is gitignored + dockerignored).
# `prisma generate` loads prisma.config.ts, which insists on POSTGRES_PASSWORD
# even though generate never touches a database — feed it a placeholder for
# this one command only (no ENV, so nothing leaks into later layers).
COPY prisma.config.ts ./
COPY prisma ./prisma
RUN POSTGRES_PASSWORD=build-time-placeholder npx prisma generate

COPY tsconfig*.json nest-cli.json ./
COPY src ./src
RUN npm run build

# ---------- Runtime stage ----------
# Fresh `npm ci --omit=dev` here so the final image carries only production
# dependencies (smaller attack surface, smaller image). The dev path uses the
# builder stage above, which keeps devDeps.
FROM node:24-alpine AS runner

RUN apk add --no-cache dumb-init wget

ENV NODE_ENV=production \
    PORT=8080

WORKDIR /app

# Non-root user
RUN addgroup -S app && adduser -S app -G app

# Install production deps fresh in the runtime stage
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy compiled output and a small amount of metadata
COPY --from=builder --chown=app:app /app/dist ./dist
COPY --from=builder --chown=app:app /app/package.json ./package.json
# The generated Prisma client (dist/prisma/prisma.service.js requires
# ../../prisma/generated/client/client → /app/prisma/generated/client/client).
COPY --from=builder --chown=app:app /app/prisma/generated ./prisma/generated

USER app

EXPOSE 8080

HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=5 \
  CMD wget -qO- http://localhost:8080/api/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main"]
