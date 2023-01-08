import { Module } from '@nestjs/common';
import { IncomingService } from './incoming.service';
import { IncomingController } from './incoming.controller';
import { Air, AirSchema } from './schemas/air.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Air.name, schema: AirSchema }])],
  providers: [IncomingService],
  controllers: [IncomingController],
})
export class IncomingModule {}
