import { Global, Module } from '@nestjs/common';
import { HashService } from './hash.service';

// Global so auth (and later modules) can inject HashService without
// re-importing — same pattern as PrismaModule.
@Global()
@Module({
  providers: [HashService],
  exports: [HashService],
})
export class HashModule {}
