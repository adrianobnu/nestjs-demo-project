import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShipmentCreateDto } from './DTO/create.dto';
import { Address, AddressDocument } from './entity/address.schema';
import {
  Organization,
  OrganizationDocument,
} from './entity/organization.schema';
import { Quote, QuoteDocument } from './entity/quote.schema';
import { Shipment, ShipmentDocument } from './entity/shipment.schema';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectModel(Shipment.name) private shipmentModel: Model<ShipmentDocument>,
    @InjectModel(Quote.name) private quoteModel: Model<QuoteDocument>,
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
    @InjectModel(Organization.name)
    private organizationModel: Model<OrganizationDocument>,
  ) {}

  async all(): Promise<any> {
    return this.shipmentModel
      .find()
      .populate('quote')
      .populate({
        path: 'quote',
        populate: {
          path: 'destination',
          model: 'Address'
        }
      })
      .populate({
        path: 'quote',
        populate: {
          path: 'origin',
          model: 'Address'
        }
      })
      .populate('sender')
      .populate({
        path: 'sender',
        populate: {
          path: 'address',
          model: 'Address'
        }
      })
      .populate('recipient')
      .populate({
        path: 'recipient',
        populate: {
          path: 'address',
          model: 'Address'
        }
      })
      .exec();
  }

  async create(payload: ShipmentCreateDto): Promise<any> {
    const session = await this.shipmentModel.db.startSession();
    session.startTransaction();
    try {
      const recipientAddress = new this.addressModel(payload.recipient.address);
      await recipientAddress.replaceOne(payload.recipient.address, {
        upsert: true,
      });

      const recipient = new this.organizationModel({
        ...payload.recipient,
        address: recipientAddress,
      });
      await recipient.save();

      const senderAddress = new this.addressModel(payload.sender.address);
      await senderAddress.replaceOne(payload.sender.address, {
        upsert: true,
      });

      const sender = new this.organizationModel({
        ...payload.sender,
        address: senderAddress,
      });
      await sender.save();

      const quoteOriginAddress = new this.addressModel(payload.quote.origin);
      await quoteOriginAddress.replaceOne(payload.quote.origin, {
        upsert: true,
      });

      const quoteDestinationAddress = new this.addressModel(
        payload.quote.destination,
      );
      await quoteDestinationAddress.replaceOne(payload.quote.destination, {
        upsert: true,
      });

      const { ship_date, packages, packages_meta } = payload.quote;
      const quote = new this.quoteModel({
        ship_date,
        packages,
        packages_meta,
        origin: quoteOriginAddress,
        destination: quoteDestinationAddress,
      });
      await quote.save();

      const { email, estimated_date, parcel_rate_source, user_uuid } = payload;
      const shipment = new this.shipmentModel({
        email,
        estimated_date,
        parcel_rate_source,
        user_uuid,
        quote,
        sender,
        recipient,
      });
      await shipment.save();
      await session.commitTransaction();

      return {
        id: shipment.id,
      };
    } catch (error) {
      await session.abortTransaction();
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      session.endSession();
    }
  }
}
