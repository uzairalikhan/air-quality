import { Injectable, Inject } from '@nestjs/common';

import { AIR_QUALITY_REPOSITORY } from '../core/constants';
import { CreateAirQualityDTO } from './dto/create-air-quality.dto';
import { AirQuality } from './entity/air-quality.entity';

@Injectable()
export class AirQualityRepository {
  constructor(
    @Inject(AIR_QUALITY_REPOSITORY)
    private readonly airQualityRepository: typeof AirQuality,
  ) {}

  async create(payload: CreateAirQualityDTO): Promise<AirQuality> {
    return this.airQualityRepository.create<AirQuality>(payload);
  }

  async findMostPollutedAirQuality(lat, lon) {
    return this.airQualityRepository.findOne({
      where: { latitude: lat, longitude: lon },
      order: [['aqius', 'DESC']],
      limit: 1,
    });
  }
}
