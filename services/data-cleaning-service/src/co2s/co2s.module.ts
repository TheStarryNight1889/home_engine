import { Module } from '@nestjs/common';
import { Co2sService } from './co2s.service';
import { Co2sController } from './co2s.controller';

@Module({
  controllers: [Co2sController],
  providers: [Co2sService]
})
export class Co2sModule {}
