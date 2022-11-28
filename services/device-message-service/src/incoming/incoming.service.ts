import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class IncomingService implements OnModuleInit {
  onModuleInit() {
    console.log('IncomingService initialized');
  }
}

// import { Controller } from '@nestjs/common';
// import { MessagePattern, Payload } from '@nestjs/microservices';

// @Controller('incoming')
// export class IncomingController {
//   // type/device_id/location_id
//   @MessagePattern('sensor/+/+')
//   async handleSensorMessage(@Payload() message: any) {
//     console.log(message);
//   }
// }
