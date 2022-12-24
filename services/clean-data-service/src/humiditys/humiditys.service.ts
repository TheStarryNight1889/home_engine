import { Injectable } from '@nestjs/common';
import { CreateHumidityDto } from './dto/create-humidity.dto';
import { UpdateHumidityDto } from './dto/update-humidity.dto';

@Injectable()
export class HumiditysService {
  create(createHumidityDto: CreateHumidityDto) {
    return 'This action adds a new humidity';
  }

  findAll() {
    return `This action returns all humiditys`;
  }

  findOne(id: number) {
    return `This action returns a #${id} humidity`;
  }

  update(id: number, updateHumidityDto: UpdateHumidityDto) {
    return `This action updates a #${id} humidity`;
  }

  remove(id: number) {
    return `This action removes a #${id} humidity`;
  }
}
