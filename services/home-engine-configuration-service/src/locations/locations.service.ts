import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
  ) {}
  create(createLocationDto: CreateLocationDto) {
    const createdLocation = new this.locationModel(createLocationDto);
    return createdLocation.save();
  }

  findAll() {
    return this.locationModel.find();
  }

  findOne(id: number) {
    return this.locationModel.findById(id);
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return this.locationModel.findByIdAndUpdate(id, updateLocationDto);
  }

  remove(id: number) {
    return this.locationModel.findByIdAndDelete(id);
  }
}
