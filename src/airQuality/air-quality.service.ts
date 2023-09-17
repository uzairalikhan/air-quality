import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateAirQualityDTO } from './dto/create-air-quality.dto';
import { AirQualityRepository } from './air-quality.repository';
import { FetchService } from '../shared/fetch.service';
import { PARIS_ZONE_LATITUDE, PARIS_ZONE_LONGITUDE } from '../core/constants';

@Injectable()
export class AirQualityService {
  constructor(
    private readonly airQualityRepository: AirQualityRepository,
    private readonly fetchService: FetchService,
  ) {}

  async fetch(lat: number, lon: number) {
    const url = `${process.env.IQAIR_BASEURL}/${process.env.IQAIR_APIVERSION}/nearest_city?lat=${lat}&lon=${lon}&key=${process.env.IQAIR_APIKEY}`;
    const response = await this.fetchService.requestData(url);
    if (!response || response.status !== 'success') {
      throw new NotFoundException(
        'No result found for the provided latitude and longitude',
      );
    }
    return {
      Pollution: response.data.current.pollution,
    };
  }

  async create(payload: CreateAirQualityDTO) {
    return this.airQualityRepository.create(payload);
  }

  async fetchMostPollutedParisZone() {
    const result = await this.airQualityRepository.findMostPollutedAirQuality(
      PARIS_ZONE_LATITUDE,
      PARIS_ZONE_LONGITUDE,
    );
    return {
      dateTime: result.createdAt,
      aqius: result.aqius,
    };
  }
}
