import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Organization } from './organization.schema';
import { Quote } from './quote.schema';

export type ShipmentDocument = Shipment & Document;

@Schema()
export class Shipment {
  @Prop()
  user_uuid: string;

  @Prop()
  email: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Quote' })
  quote: Quote;

  @Prop()
  parcel_rate_source: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' })
  recipient: Organization;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' })
  sender: Organization;

  @Prop()
  estimated_date: string;
}

export const shipmentSchema = SchemaFactory.createForClass(Shipment);
