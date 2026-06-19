import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type CheckResult = { status: 'ok' | 'down'; detail?: string };

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async check(): Promise<{
    status: 'ok' | 'down';
    uptimeSeconds: number;
    timestamp: string;
    checks: Record<string, CheckResult>;
  }> {
    const checks: Record<string, CheckResult> = {
      database: await this.probeDb(),
      mqtt: { status: 'ok', detail: 'not_probed_yet' }, // Phase 2
    };

    const allOk = Object.values(checks).every((c) => c.status === 'ok');
    return {
      status: allOk ? 'ok' : 'down',
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
      checks,
    };
  }

  private async probeDb(): Promise<CheckResult> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok' };
    } catch (e) {
      return { status: 'down', detail: (e as Error).message };
    }
  }
}
