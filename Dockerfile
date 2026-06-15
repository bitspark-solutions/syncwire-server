# syntax=docker/dockerfile:1.7
# ---------- Build stage ----------
# Installs ALL deps (incl. dev) and compiles TypeScript. The dev override
# (docker-compose.override.yml) re-uses this stage with `target: builder` so
# it can run `nest start --watch` — that needs the dev `nest` CLI binary,
# so we deliberately do NOT prune devDeps here.
FROM node:20-alpine AS builder

# dumb-init is used as PID 1 in both the runtime and dev (builder-target)
# configurations. Installing it in the builder keeps the dev override's
# `command: dumb-init -- ...` working as written.
RUN apk add --no-cache dumb-init

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig*.json nest-cli.json ./
COPY src ./src
RUN npm run build

# ---------- Runtime stage ----------
# Fresh `npm ci --omit=dev` here so the final image carries only production
# dependencies (smaller attack surface, smaller image). The dev path uses the
# builder stage above, which keeps devDeps.
FROM node:20-alpine AS runner

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

USER app

EXPOSE 8080

HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=5 \
  CMD wget -qO- http://localhost:8080/api/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main"]
