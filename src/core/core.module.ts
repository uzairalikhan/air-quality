import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [LoggerModule.forRoot()],
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreModule {}
