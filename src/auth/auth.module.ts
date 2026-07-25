import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from './jwt.service';
import { JWT_OPTIONS, type JwtOptions } from './jwt.options';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import type { AppEnv } from '../config/env';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtAuthGuard,
    {
      // Snapshot of the validated env — keeps JwtService free of ConfigService.
      provide: JWT_OPTIONS,
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppEnv, true>): JwtOptions => ({
        secret: config.get('JWT_SECRET', { infer: true }),
        accessTtlSeconds: config.get('JWT_ACCESS_TTL_SECONDS', {
          infer: true,
        }),
        refreshTtlSeconds: config.get('JWT_REFRESH_TTL_SECONDS', {
          infer: true,
        }),
      }),
    },
  ],
  // Exported so other modules (notifications, sync) can guard their routes.
  exports: [JwtService, JwtAuthGuard],
})
export class AuthModule {}
