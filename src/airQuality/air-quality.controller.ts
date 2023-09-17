import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cron, CronExpression } from '@nestjs/schedule';

import { AirQualityService } from './air-quality.service';
import { PARIS_ZONE_LATITUDE, PARIS_ZONE_LONGITUDE } from '../core/constants';

@Controller('airQuality')
@ApiTags('AirQuality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Get()
  fetch(@Query('latitude') lat: number, @Query('longitude') lon: number) {
    return this.airQualityService.fetch(lat, lon);
  }

  @Get('/mostPolluted')
  fetchMostPollutedParisZone() {
    return this.airQualityService.fetchMostPollutedParisZone();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    // Cron job that runs every minutes to fetch air quality for Paris zone and saves in DB
    const res = await this.airQualityService.fetch(
      PARIS_ZONE_LATITUDE,
      PARIS_ZONE_LONGITUDE,
    );
    await this.airQualityService.create({
      latitude: PARIS_ZONE_LATITUDE,
      longitude: PARIS_ZONE_LONGITUDE,
      ...res.Pollution,
    });
  }
}
