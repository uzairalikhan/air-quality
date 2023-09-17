import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from './config';

// modules
import { DatabaseModule } from './bootstrap/database/database.module';
import { CoreModule } from './core/core.module';
import { AirQualityModule } from './airQuality/air-quality.module';

// controller
import { AppController } from './app.controller';

// services
import { AppService } from './app.service';

// interceptors
import { ResponseInterceptor } from './core/interceptor/response.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CoreModule,
    DatabaseModule,
    AirQualityModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
