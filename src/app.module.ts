import { Module } from '@nestjs/common';
import { ShipmentModule } from './shipment/shipment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_AUTH_STRING),
    ShipmentModule,
  ],
})
export class AppModule {}
