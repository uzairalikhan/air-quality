import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateAirQualityDTO {
  @ApiProperty({ type: String })
  @IsString()
  ts: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  aqius: number;

  @ApiProperty({ type: String })
  @IsString()
  mainus: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  aqicn: number;

  @ApiProperty({ type: String })
  @IsString()
  maincn: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  latitude: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  longitude: number;

  @ApiProperty({ type: Date })
  @IsNumber()
  createdAt: Date;
}
