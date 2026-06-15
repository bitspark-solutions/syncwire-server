import { Controller, Get } from '@nestjs/common';

/**
 * Liveness + dependency health endpoint.
 *
 * v0 reports the process is up and answering HTTP. Phase 1 will extend this
 * to also report Postgres reachability (via Prisma); Phase 2 will add EMQX
 * reachability (via the bridge MQTT client). The response shape is stable so
 * Docker healthcheck, load balancers, and uptime monitors can rely on it.
 */
@Controller('health')
export class HealthController {
  @Get()
  check(): {
    status: 'ok';
    uptimeSeconds: number;
    timestamp: string;
    checks: Record<string, { status: 'ok' | 'down'; detail?: string }>;
  } {
    return {
      status: 'ok',
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
      checks: {
        // Placeholders — real probes added in Phase 1 / 2.
        // The keys exist now so clients can rely on the shape.
        database: { status: 'ok', detail: 'not_probed_yet' },
        mqtt: { status: 'ok', detail: 'not_probed_yet' },
      },
    };
  }
}
