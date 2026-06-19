import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
// Prisma 7: the generated client lives at the path set by the generator's
// `output` in schema.prisma. We import from there (not from `@prisma/client`,
// which has a broken `exports` map for direct client imports). The path
// is relative to the source file: ../../prisma/generated/client/client.
import { PrismaClient } from '../../prisma/generated/client/client';
import type { AppEnv } from '../config/env';

/**
 * PrismaService — the application's Prisma client.
 *
 * Prisma 7: we no longer extend PrismaClient and rely on a hidden DATABASE_URL.
 * Instead, we read DATABASE_URL from validated config and pass it to a
 * `PrismaPg` driver adapter, which is what the PrismaClient connects through.
 *
 * Connection lifecycle is managed by Nest's module hooks:
 *   onModuleInit    → $connect() (lazy at boot)
 *   onModuleDestroy → $disconnect() (clean shutdown)
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(config: ConfigService<AppEnv, true>) {
    const url = config.get('DATABASE_URL', { infer: true });
    if (!url) {
      throw new Error(
        'PrismaService: DATABASE_URL is not set. Check src/config/env.ts and your env vars.',
      );
    }
    const adapter = new PrismaPg({ connectionString: url });
    super({ adapter });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
    this.logger.log('Prisma connected to database');
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
