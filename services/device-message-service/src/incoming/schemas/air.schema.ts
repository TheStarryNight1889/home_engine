import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AirDocument = HydratedDocument<Air>;

@Schema()
export class Air {
  @Prop({ required: false })
  temperature: number;

  @Prop({ required: false })
  humidity: number;

  @Prop({ required: false })
  co2: number;
}

export const AirSchema = SchemaFactory.createForClass(Air);
