import 'reflect-metadata'

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { SafeConsoleLogger } from './shared/infrastructure/logging/safe-console-logger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: new SafeConsoleLogger({json:true}),
    abortOnError: false
  });
  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
void bootstrap().catch(() => {
  Logger.error({ event:'bootstrap_failed' });
  process.exitCode = 1;
});
