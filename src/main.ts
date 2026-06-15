import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import type { AppEnv } from './config/env';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Read validated config (zod-validated at boot — see src/config/env.ts)
  const config = app.get(ConfigService<AppEnv, true>);

  // Set global route prefix
  app.setGlobalPrefix('api');

  // Enable CORS for frontend and Android client
  app.enableCors();

  // Enable global request payload validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = config.get('PORT', { infer: true });
  const nodeEnv = config.get('NODE_ENV', { infer: true });

  await app.listen(port);

  console.log(
    `SyncWire Server is running on http://localhost:${port}/api (env: ${nodeEnv})`,
  );
}

void bootstrap();
