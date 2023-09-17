import { Test, TestingModule } from '@nestjs/testing';

import { AirQualityController } from './air-quality.controller';
import { AirQualityService } from './air-quality.service';

jest.mock('./air-quality.service');

describe('AirQualityController', () => {
  let airQualityController: AirQualityController;
  let airQualityService: jest.Mocked<AirQualityService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AirQualityController],
      providers: [AirQualityService],
    }).compile();

    airQualityController =
      module.get<AirQualityController>(AirQualityController);
    airQualityService =
      module.get<jest.Mocked<AirQualityService>>(AirQualityService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(airQualityController).toBeDefined();
  });

  describe('fetch', () => {
    it('should be defined', () => {
      expect(airQualityController.fetch).toBeDefined();
    });

    it('should return a data for provided lat long', async () => {
      const serviceResponse = {
        Pollution: {
          ts: '2023-09-12T13:00:00.000Z',
          aqius: 69,
          mainus: 'p2',
          aqicn: 29,
          maincn: 'p2',
        },
      };
      airQualityService.fetch.mockResolvedValue(serviceResponse);
      expect(airQualityController.fetch(123, 312)).resolves.toEqual(
        serviceResponse,
      );
      expect(airQualityService.fetch).toHaveBeenCalled();
    });
  });

  describe('fetchMostPollutedParisZone', () => {
    it('should be defined', () => {
      expect(airQualityController.fetchMostPollutedParisZone).toBeDefined();
    });

    it('should return a data', async () => {
      const serviceResponse = {
        dateTime: new Date(),
        aqius: 69,
      };
      airQualityService.fetchMostPollutedParisZone.mockResolvedValue(
        serviceResponse,
      );
      expect(
        airQualityController.fetchMostPollutedParisZone(),
      ).resolves.toEqual(serviceResponse);
    });
  });
});
