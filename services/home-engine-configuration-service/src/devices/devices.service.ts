import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from './entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}
  create(createDeviceDto: CreateDeviceDto) {
    const createdDevice = new this.deviceModel(createDeviceDto);
    return createdDevice.save();
  }

  findAll() {
    return this.deviceModel.find();
  }

  findOne(id: number) {
    return this.deviceModel.findById(id);
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return this.deviceModel.findByIdAndUpdate(id, updateDeviceDto);
  }

  remove(id: number) {
    return this.deviceModel.findByIdAndDelete(id);
  }
}
