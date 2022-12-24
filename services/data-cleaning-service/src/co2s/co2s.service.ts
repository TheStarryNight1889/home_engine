import { Injectable } from '@nestjs/common';
import { CreateCo2Dto } from './dto/create-co2.dto';
import { UpdateCo2Dto } from './dto/update-co2.dto';

@Injectable()
export class Co2sService {
  create(createCo2Dto: CreateCo2Dto) {
    return 'This action adds a new co2';
  }

  findAll() {
    return `This action returns all co2s`;
  }

  findOne(id: number) {
    return `This action returns a #${id} co2`;
  }

  update(id: number, updateCo2Dto: UpdateCo2Dto) {
    return `This action updates a #${id} co2`;
  }

  remove(id: number) {
    return `This action removes a #${id} co2`;
  }
}
