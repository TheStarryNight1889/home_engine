import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAirDto } from './dto/create-air.dto';
import { IncomingService } from './incoming.service';

@Controller('incoming')
export class IncomingController {
  constructor(private readonly incomingService: IncomingService) {}
  // type/device_id/location_id
  @MessagePattern('sensor/+/+')
  async handleAirSensorMessage(@Payload() data: any) {
    return this.incomingService.create(data);
  }
}
