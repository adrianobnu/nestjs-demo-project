import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Address } from './address.schema';

export type QuoteDocument = Quote & Document;

@Schema()
export class Quote {
  @Prop({ type: mongoose.Schema.Types.Date })
  ship_date: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  origin: Address;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  destination: Address;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  packages: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  packages_meta: string;
}

export const quoteSchema = SchemaFactory.createForClass(Quote);
