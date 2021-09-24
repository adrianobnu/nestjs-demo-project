import { Module } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shipment, shipmentSchema } from './entity/shipment.schema';
import { Address, addressSchema } from './entity/address.schema';
import { Organization, organizationSchema } from './entity/organization.schema';
import { Quote, quoteSchema } from './entity/quote.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Address.name, schema: addressSchema },
      { name: Organization.name, schema: organizationSchema },
      { name: Quote.name, schema: quoteSchema },      
      { name: Shipment.name, schema: shipmentSchema },      
    ]),    
  ],
  providers: [ShipmentService],
  controllers: [ShipmentController],
})
export class ShipmentModule {}
