import { Logger } from '@nestjs/common';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { ENTITIES } from './database.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (logger: Logger = new Logger('DatabaseProvider')) => {
      const dbConfig: SequelizeOptions = {
        dialect: process.env.DB_DIALECT as any,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: process.env.DB_SSL === 'true',
        logQueryParameters: true,
        benchmark: true,
        logging: (query, timing) =>
          logger.log(`[Execution time: ${timing}ms] ${query}`),
      };
      const sequelize = new Sequelize(dbConfig);
      sequelize.addModels(ENTITIES);
      await sequelize.authenticate();
      logger.log('Database Connected');
      return sequelize;
    },
  },
];
