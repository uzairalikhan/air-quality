import { config } from 'dotenv';
config();

interface iConfig {
  env: string;
  port: number;
  iqAir: {
    baseUrl: string;
    APIKey: string;
    APIVersion: string;
  };
  server: {
    tokenSecret: string;
    tokenExpiryInSec: number;
  };
  database: {
    dialect: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    ssl: boolean;
  };
}

export default (): Partial<iConfig> => ({
  env: process.env.NODE_ENV || 'local',
  port: parseInt(process.env.PORT, 10) || 3000,
  iqAir: {
    baseUrl: process.env.IQAIR_BASEURL || 'https://api.airvisual.com',
    APIKey: process.env.IQAIR_APIKEY,
    APIVersion: process.env.IQIR_APIVERSION || 'v2',
  },
  database: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true',
  },
});
