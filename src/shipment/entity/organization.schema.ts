import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Address } from './address.schema';

export type OrganizationDocument = Organization & Document;

@Schema()
export class Organization {
  @Prop()
  full_name: string;

  @Prop()
  tax_id: string;

  @Prop()
  category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  address: Address;

  @Prop()
  email: string;

  @Prop(
    raw({
      prefix: { type: String },
      number: { type: String },
    }),
  )
  phone: Record<string, any>;
}

export const organizationSchema = SchemaFactory.createForClass(Organization);
