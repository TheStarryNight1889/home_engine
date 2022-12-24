import { Module } from '@nestjs/common';
import { TemperaturesService } from './temperatures.service';
import { TemperaturesController } from './temperatures.controller';

@Module({
  controllers: [TemperaturesController],
  providers: [TemperaturesService]
})
export class TemperaturesModule {}
