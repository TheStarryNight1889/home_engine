import { PartialType } from '@nestjs/mapped-types';
import { CreateCo2Dto } from './create-co2.dto';

export class UpdateCo2Dto extends PartialType(CreateCo2Dto) {}
