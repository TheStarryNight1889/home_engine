import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationDocument } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private deviceModel: Model<LocationDocument>,
  ) {}
  create(createLocationDto: CreateLocationDto) {
    const createdLocation = new this.deviceModel(createLocationDto);
    return createdLocation.save();
  }

  findAll() {
    return this.deviceModel.find();
  }

  findOne(id: number) {
    return this.deviceModel.findById(id);
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return this.deviceModel.findByIdAndUpdate(id, updateLocationDto);
  }

  remove(id: number) {
    return this.deviceModel.findByIdAndDelete(id);
  }
}
