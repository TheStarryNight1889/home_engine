import { Module } from '@nestjs/common';
import { HumiditysService } from './humiditys.service';
import { HumiditysController } from './humiditys.controller';

@Module({
  controllers: [HumiditysController],
  providers: [HumiditysService]
})
export class HumiditysModule {}
