import { AIR_QUALITY_REPOSITORY } from '../core/constants';
import { AirQuality } from './entity/air-quality.entity';

export const tasksProviders = [
  {
    provide: AIR_QUALITY_REPOSITORY,
    useValue: AirQuality,
  },
];
