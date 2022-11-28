import { NestFactory } from '@nestjs/core';
import { IncomingModule } from './incoming/incoming.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    IncomingModule,
    {
      transport: Transport.MQTT,
      options: {
        url: 'mqtt://localhost:1883',
      },
    },
  );
  app.listen().then(() => console.log('Microservice is listening'));
}
bootstrap();
