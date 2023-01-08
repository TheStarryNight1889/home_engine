import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AirDocument = HydratedDocument<Air>;

@Schema({ timestamps: true })
export class Air {
  @Prop({ required: false })
  temperature: number;

  @Prop({ required: false })
  humidity: number;

  @Prop({ required: false })
  co2: number;

  @Prop({ required: true })
  device_id: string;

  @Prop({ required: true })
  location_id: string;
}

export const AirSchema = SchemaFactory.createForClass(Air);
