# =============================================================================
# SyncWire — development Makefile
# =============================================================================
# Common dev workflow, wrapped around `docker compose` and `npm`.
# Run `make help` for a list of targets.
#
# Prerequisites:
#   - Docker with Compose V2 (`docker compose version` >= 2.20)
#   - Node 24+ (only required for host-side `make test`, `make lint`,
#     `make format`; not needed if you only use the in-container equivalents)
#   - GNU make (4.x)
# =============================================================================

SHELL       := /bin/bash
COMPOSE     := docker compose
NODE        := node
NPM         := npm
APP         := $(COMPOSE) exec -T app
POSTGRES    := $(COMPOSE) exec -T postgres
EMQX        := $(COMPOSE) exec -T emqx

.DEFAULT_GOAL := help

.PHONY: help up down down-v ps logs logs-app logs-db logs-emqx \
        build rebuild restart exec \
        test test-watch test-cov lint format verify \
        shell db-shell mqtt-shell \
        clean install version

# -----------------------------------------------------------------------------
# Help
# -----------------------------------------------------------------------------

help: ## show this help
	@echo ""
	@echo "SyncWire — make targets"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'
	@echo ""

# -----------------------------------------------------------------------------
# Stack lifecycle
# -----------------------------------------------------------------------------

up: ## bring the dev stack up (detached)
	$(COMPOSE) up -d
	@echo ""
	@echo "Stack is up. Try: curl http://127.0.0.1:$${APP_HOST_PORT:-18080}/api/health"
	@echo "EMQX dashboard: http://127.0.0.1:$${EMQX_DASHBOARD_HOST_PORT:-18084}  (login: syncwire / syncwire)"
	@echo ""

down: ## tear the stack down (keeps volumes)
	$(COMPOSE) down

down-v: ## tear down and delete volumes (nuke all state)
	$(COMPOSE) down -v

ps: ## list running containers
	$(COMPOSE) ps

logs: ## tail logs for all services
	$(COMPOSE) logs -f

logs-app: ## tail app logs only
	$(COMPOSE) logs -f app

logs-db: ## tail postgres logs only
	$(COMPOSE) logs -f postgres

logs-emqx: ## tail emqx logs only
	$(COMPOSE) logs -f emqx

build: ## rebuild the app image (uses cache)
	$(COMPOSE) build app

rebuild: ## force-rebuild the app image (no cache)
	$(COMPOSE) build --no-cache app

restart: ## restart the app container
	$(COMPOSE) restart app

exec: ## open a shell in the app container
	$(COMPOSE) exec app sh

# -----------------------------------------------------------------------------
# Code quality (run on host — requires Node 24+)
# -----------------------------------------------------------------------------

test: ## run unit tests
	$(NPM) test

test-watch: ## run tests in watch mode
	$(NPM) run test:watch

test-cov: ## run tests with coverage
	$(NPM) run test:cov

lint: ## run ESLint with --fix
	$(NPM) run lint

format: ## run Prettier --write
	$(NPM) run format

verify: build test lint ## build + test + lint, sequentially
	@echo ""
	@echo "All checks passed."

# -----------------------------------------------------------------------------
# Database / broker shells
# -----------------------------------------------------------------------------

shell: ## alias for `make exec`
	$(MAKE) exec

db-shell: ## open psql in the postgres container
	$(POSTGRES) psql -U $${POSTGRES_USER:-syncwire} -d $${POSTGRES_DB:-syncwire}

mqtt-shell: ## open a shell in the emqx container
	$(EMQX) sh

# -----------------------------------------------------------------------------
# Housekeeping
# -----------------------------------------------------------------------------

clean: ## tear down and remove build artifacts
	$(COMPOSE) down -v
	rm -rf dist coverage .tsbuildinfo

install: ## install npm dependencies
	$(NPM) install

version: ## print versions of docker, compose, node, npm
	@echo "docker:    $$(docker --version)"
	@echo "compose:   $$($(COMPOSE) version --short 2>/dev/null || echo 'not available')"
	@echo "node:      $$($(NODE) --version 2>/dev/null || echo 'not installed')"
	@echo "npm:       $$($(NPM) --version 2>/dev/null || echo 'not installed')"
	@echo "make:      $$(make --version | head -1)"
