import { Module } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { AirQualityController } from './air-quality.controller';
import { AirQualityRepository } from './air-quality.repository';
import { tasksProviders } from './air-quality.provider';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [AirQualityController],
  providers: [AirQualityService, AirQualityRepository, ...tasksProviders],
  exports: [AirQualityService],
})
export class AirQualityModule {}
