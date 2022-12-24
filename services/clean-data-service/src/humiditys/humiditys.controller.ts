import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HumiditysService } from './humiditys.service';
import { CreateHumidityDto } from './dto/create-humidity.dto';
import { UpdateHumidityDto } from './dto/update-humidity.dto';

@Controller('humiditys')
export class HumiditysController {
  constructor(private readonly humiditysService: HumiditysService) {}

  @Post()
  create(@Body() createHumidityDto: CreateHumidityDto) {
    return this.humiditysService.create(createHumidityDto);
  }

  @Get()
  findAll() {
    return this.humiditysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.humiditysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHumidityDto: UpdateHumidityDto) {
    return this.humiditysService.update(+id, updateHumidityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.humiditysService.remove(+id);
  }
}
