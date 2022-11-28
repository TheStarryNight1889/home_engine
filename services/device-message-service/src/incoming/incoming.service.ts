import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Air, AirDocument } from './schemas/air.schema';
import { CreateAirDto } from './dto/create-air.dto';

@Injectable()
export class IncomingService {
  constructor(@InjectModel(Air.name) private airModel: Model<AirDocument>) {}

  async create(createAirDto: CreateAirDto): Promise<Air> {
    const createdAir = new this.airModel(createAirDto);
    return createdAir.save();
  }
}
