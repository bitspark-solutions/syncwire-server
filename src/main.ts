import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
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

  const port = process.env.PORT ?? 8080;
  await app.listen(port);
  console.log(`SyncWire Server is running on: http://localhost:${port}/api`);
}
bootstrap();
