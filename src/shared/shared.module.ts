import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FetchService } from './fetch.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [FetchService],
  exports: [FetchService],
})
export class SharedModule {}
