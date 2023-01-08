import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeviceDocument = HydratedDocument<Device>;

@Schema({ timestamps: true })
export class Device {
  @Prop()
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  location_id: string;

  @Prop({ required: true, unique: true })
  hw_id: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
