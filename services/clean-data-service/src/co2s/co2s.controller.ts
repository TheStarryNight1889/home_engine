import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Co2sService } from './co2s.service';
import { CreateCo2Dto } from './dto/create-co2.dto';
import { UpdateCo2Dto } from './dto/update-co2.dto';

@Controller('co2s')
export class Co2sController {
  constructor(private readonly co2sService: Co2sService) {}

  @Post()
  create(@Body() createCo2Dto: CreateCo2Dto) {
    return this.co2sService.create(createCo2Dto);
  }

  @Get()
  findAll() {
    return this.co2sService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.co2sService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCo2Dto: UpdateCo2Dto) {
    return this.co2sService.update(+id, updateCo2Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.co2sService.remove(+id);
  }
}
