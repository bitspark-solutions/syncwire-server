import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * PrismaModule — provides the singleton PrismaService.
 *
 * Marked @Global so any module can inject PrismaService without re-importing
 * this module. The service is a process-wide singleton; creating multiple
 * PrismaClients would exhaust the Postgres connection pool.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
