import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize';
import * as request from 'supertest';

import { AppModule } from '../app.module';

describe('AirQuality Controller (e2e)', () => {
  let app: INestApplication;
  let httpServer;
  let sequelize: Sequelize;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    sequelize = app.get('SEQUELIZE');
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await sequelize.close();
    await httpServer.close();
    await app.close();
  });

  describe('GET /airQuality', () => {
    it('should return 200 status for the provided lat lon', () => {
      return request(httpServer)
        .get('/airQuality?latitude=123&longitude=321')
        .expect(HttpStatus.OK)
        .expect((response) => {
          expect(response.body.Result).toBeDefined();
        });
    });

    it('should return 400 if data not found', () => {
      return request(httpServer)
        .get('/airQuality?latitude=1&longitude=2')
        .expect(HttpStatus.NOT_FOUND)
        .expect((response) => {
          expect(response.body.statusCode).toEqual(404);
          expect(response.body.message).toEqual(
            'No result found for the provided latitude and longitude',
          );
        });
    });

    describe('GET /mostPolluted', () => {
      it('should return 200 status', () => {
        return request(httpServer)
          .get('/airQuality/mostPolluted')
          .expect(HttpStatus.OK)
          .expect((response) => {
            expect(response.body.Result).toBeDefined();
          });
      });
    });
  });
});
