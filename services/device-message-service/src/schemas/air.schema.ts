import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AirDocument = HydratedDocument<Air>;

@Schema()
export class Air {
  @Prop()
  temperature: number;

  @Prop()
  humidity: number;

  @Prop()
  co2: number;
}
