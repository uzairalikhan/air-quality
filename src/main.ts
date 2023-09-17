import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { Documentation } from './bootstrap/documentation';

const whiteListUrls = ['http://localhost:4200'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.use(helmet());
  app.enableCors({
    origin: whiteListUrls,
  });
  app.setGlobalPrefix('api');
  app.enableVersioning({ defaultVersion: '1', type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe());

  Documentation.setup(app);

  await app.listen(process.env.PORT);
}
bootstrap();
