import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  MqttContext,
  Ctx,
} from '@nestjs/microservices';
import { IncomingService } from './incoming.service';

@Controller('incoming')
export class IncomingController {
  constructor(private readonly incomingService: IncomingService) {}
  // type/device_id/location_id
  @MessagePattern('sensor/+/+')
  async handleAirSensorMessage(
    @Payload() data: any,
    @Ctx() context: MqttContext,
  ) {
    const topic = context.getTopic().split('/');
    data.device_id = topic[1];
    data.location_id = topic[2];
    return this.incomingService.create(data);
  }
}
