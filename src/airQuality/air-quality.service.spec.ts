import { Test, TestingModule } from '@nestjs/testing';

import { FetchService } from '../shared/fetch.service';
import { AirQualityService } from './air-quality.service';
import { AirQualityRepository } from './air-quality.repository';
import { CreateAirQualityDTO } from './dto/create-air-quality.dto';
import { AirQuality } from './entity/air-quality.entity';

jest.mock('../shared/fetch.service');
jest.mock('./air-quality.repository');

describe('AirQualityService', () => {
  let airQualityService: AirQualityService;
  let fetchService: jest.Mocked<FetchService>;
  let airQualityRepository: jest.Mocked<AirQualityRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AirQualityService, FetchService, AirQualityRepository],
    }).compile();

    airQualityService = module.get<AirQualityService>(AirQualityService);
    fetchService = module.get<jest.Mocked<FetchService>>(FetchService);
    airQualityRepository =
      module.get<jest.Mocked<AirQualityRepository>>(AirQualityRepository);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('AirQuality service should be defined', () => {
    expect(airQualityService).toBeDefined();
  });

  describe('fetch', () => {
    it('method should be defined', () => {
      expect(airQualityService.fetch).toBeDefined();
    });

    it('should throw if data not found', async () => {
      fetchService.requestData.mockResolvedValue(undefined);
      expect(airQualityService.fetch(123, 321)).rejects.toThrowError(
        'No result found for the provided latitude and longitude',
      );
      expect(fetchService.requestData).toHaveBeenCalled();
    });

    it('should return success response', async () => {
      const aqResp = {
        status: 'success',
        data: {
          city: 'Karachi',
          state: 'Sindh',
          country: 'Pakistan',
          current: {
            pollution: {
              ts: '2023-09-12T13:00:00.000Z',
              aqius: 69,
              mainus: 'p2',
              aqicn: 29,
              maincn: 'p2',
            },
          },
        },
      };
      const serviceResponse = {
        Pollution: {
          ts: '2023-09-12T13:00:00.000Z',
          aqius: 69,
          mainus: 'p2',
          aqicn: 29,
          maincn: 'p2',
        },
      };
      fetchService.requestData.mockResolvedValue(aqResp);
      expect(airQualityService.fetch(123, 321)).resolves.toEqual(
        serviceResponse,
      );
      expect(fetchService.requestData).toHaveBeenCalled();
    });
  });

  describe('fetchMostPollutedParisZone', () => {
    const testDate = new Date();
    it('method should be defined', () => {
      expect(airQualityService.fetchMostPollutedParisZone).toBeDefined();
    });

    it('should return the data', async () => {
      const aqData: CreateAirQualityDTO = {
        ts: '2023-09-12T13:00:00.000Z',
        aqius: 69,
        mainus: 'p2',
        aqicn: 29,
        maincn: 'p2',
        latitude: 12.22,
        longitude: 22.22,
        createdAt: testDate,
      };
      airQualityRepository.findMostPollutedAirQuality.mockResolvedValue(
        aqData as AirQuality,
      );
      expect(airQualityService.fetchMostPollutedParisZone()).resolves.toEqual({
        dateTime: testDate,
        aqius: 69,
      });
    });
  });

  describe('create', () => {
    it('create method should be defined', () => {
      expect(airQualityService.create).toBeDefined();
    });

    it('should create a new entry in DB', async () => {
      const aqData: CreateAirQualityDTO = {
        ts: '2023-09-12T13:00:00.000Z',
        aqius: 69,
        mainus: 'p2',
        aqicn: 29,
        maincn: 'p2',
        latitude: 12.22,
        longitude: 22.22,
        createdAt: new Date(),
      };
      airQualityRepository.create.mockResolvedValue(aqData as AirQuality);
      expect(airQualityService.create(aqData)).resolves.toEqual(aqData);
      expect(airQualityRepository.create).toHaveBeenCalledWith(aqData);
    });
  });
});
