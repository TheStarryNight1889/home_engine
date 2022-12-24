import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TemperaturesService } from './temperatures.service';
import { CreateTemperatureDto } from './dto/create-temperature.dto';
import { UpdateTemperatureDto } from './dto/update-temperature.dto';

@Controller('temperatures')
export class TemperaturesController {
  constructor(private readonly temperaturesService: TemperaturesService) {}

  @Post()
  create(@Body() createTemperatureDto: CreateTemperatureDto) {
    return this.temperaturesService.create(createTemperatureDto);
  }

  @Get()
  findAll() {
    return this.temperaturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.temperaturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTemperatureDto: UpdateTemperatureDto) {
    return this.temperaturesService.update(+id, updateTemperatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.temperaturesService.remove(+id);
  }
}
