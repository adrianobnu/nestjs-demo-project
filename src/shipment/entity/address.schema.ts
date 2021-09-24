import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema({
  autoIndex: true,
})
export class Address {
  @Prop({
    required: true,    
  })
  country: string;

  @Prop({
    required: true,
  })
  state: string;

  @Prop({
    required: true,
  })
  city: string;

  @Prop({
    required: true,
  })
  postal_code: string;

  @Prop({
    required: true,
  })
  address: string;

  @Prop({
    required: true,
  })
  street: string;

  @Prop({
    required: true,
  })
  street_number: string;

  @Prop({
    default: false,
    required: true,
  })
  is_residencial_address: boolean;

  @Prop()
  complement_address: string;
}

export const addressSchema = SchemaFactory.createForClass(Address);