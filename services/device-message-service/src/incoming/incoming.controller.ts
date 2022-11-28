import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('incoming')
export class IncomingController {
  // type/device_id/location_id
  @MessagePattern('sensor/+/+')
  async handleAirSensorMessage(@Payload() data: any) {
    console.log(data);
  }
}
