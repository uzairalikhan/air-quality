import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { CreateAirQualityDTO } from './create-air-quality.dto';

describe('Air Quality DTOs', () => {
  describe('create-air-quality', () => {
    it('should pass a valid DTO', async () => {
      const createAirQualityDto = plainToInstance(CreateAirQualityDTO, {
        ts: 'ts',
        aqius: 1,
        mainus: 'mainus',
        aqicn: 9,
        maincn: 'maincn',
        latitude: 12.22,
        longitude: 22.22,
        createdAt: new Date().getUTCDate(),
      });
      const result = await validate(createAirQualityDto);
      expect(result.length).toBe(0);
    });

    it('should fail on invalid DTO - ts must be string', async () => {
      const createAirQualityDto = plainToInstance(CreateAirQualityDTO, {
        ts: 1,
        aqius: 1,
        mainus: 'mainus',
        aqicn: 9,
        maincn: 'maincn',
        latitude: 12.22,
        longitude: 22.22,
        createdAt: new Date().getUTCDate(),
      });
      const result = await validate(createAirQualityDto);
      expect(result.length).not.toBe(0);
      expect(JSON.stringify(result)).toContain('ts must be a string');
    });

    it('should fail on invalid DTO - aquis must be number', async () => {
      const createAirQualityDto = plainToInstance(CreateAirQualityDTO, {
        ts: 'ts',
        aqius: 'asd',
        mainus: 'mainus',
        aqicn: 9,
        maincn: 'maincn',
        latitude: 12.22,
        longitude: 22.22,
        createdAt: new Date().getUTCDate(),
      });
      const result = await validate(createAirQualityDto);
      expect(result.length).not.toBe(0);
      expect(JSON.stringify(result)).toContain(
        'aqius must be a number conforming to the specified constraints',
      );
    });

    it('should fail on invalid DTO - mainus must be string', async () => {
      const createAirQualityDto = plainToInstance(CreateAirQualityDTO, {
        ts: 'ts',
        aqius: 1,
        mainus: 2,
        aqicn: 9,
        maincn: 'maincn',
        latitude: 12.22,
        longitude: 22.22,
        createdAt: new Date().getUTCDate(),
      });
      const result = await validate(createAirQualityDto);
      expect(result.length).not.toBe(0);
      expect(JSON.stringify(result)).toContain('mainus must be a string');
    });

    it('should fail on invalid DTO - aqicn must be number', async () => {
      const createAirQualityDto = plainToInstance(CreateAirQualityDTO, {
        ts: 'ts',
        aqius: 1,
        mainus: 'mainus',
        aqicn: 'asd',
        maincn: 'maincn',
        latitude: 12.22,
        longitude: 22.22,
        createdAt: new Date().getUTCDate(),
      });
      const result = await validate(createAirQualityDto);
      expect(result.length).not.toBe(0);
      expect(JSON.stringify(result)).toContain(
        'aqicn must be a number conforming to the specified constraints',
      );
    });

    it('should fail on invalid DTO - maincn must be string', async () => {
      const createAirQualityDto = plainToInstance(CreateAirQualityDTO, {
        ts: 'ts',
        aqius: 1,
        mainus: 'mainus',
        aqicn: 9,
        maincn: 1,
        latitude: 12.22,
        longitude: 22.22,
        createdAt: new Date().getUTCDate(),
      });
      const result = await validate(createAirQualityDto);
      expect(result.length).not.toBe(0);
      expect(JSON.stringify(result)).toContain('maincn must be a string');
    });

    it('should fail on invalid DTO - latitude must be number', async () => {
      const createAirQualityDto = plainToInstance(CreateAirQualityDTO, {
        ts: 'ts',
        aqius: 1,
        mainus: 'mainus',
        aqicn: 'asd',
        maincn: 'maincn',
        latitude: 'asd',
        longitude: 22.22,
        createdAt: new Date().getUTCDate(),
      });
      const result = await validate(createAirQualityDto);
      expect(result.length).not.toBe(0);
      expect(JSON.stringify(result)).toContain(
        'latitude must be a number conforming to the specified constraints',
      );
    });

    it('should fail on invalid DTO - longitude must be number', async () => {
      const createAirQualityDto = plainToInstance(CreateAirQualityDTO, {
        ts: 'ts',
        aqius: 1,
        mainus: 'mainus',
        aqicn: 'asd',
        maincn: 'maincn',
        latitude: 22.22,
        longitude: 'asd',
        createdAt: new Date().getUTCDate(),
      });
      const result = await validate(createAirQualityDto);
      expect(result.length).not.toBe(0);
      expect(JSON.stringify(result)).toContain(
        'longitude must be a number conforming to the specified constraints',
      );
    });
  });
});
