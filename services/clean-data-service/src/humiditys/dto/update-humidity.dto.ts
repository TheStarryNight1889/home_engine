import { PartialType } from '@nestjs/mapped-types';
import { CreateHumidityDto } from './create-humidity.dto';

export class UpdateHumidityDto extends PartialType(CreateHumidityDto) {}
