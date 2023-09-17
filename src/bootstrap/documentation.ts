import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class Documentation {
  static setup(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Air Quality App')
      .setDescription('Air Quality App Documentation')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);
  }
}
