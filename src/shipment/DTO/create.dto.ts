import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class AddressCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(2)
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(2)
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5)
  postal_code: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  street_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  is_residencial_address: boolean;

  @ApiProperty()
  @IsEmpty()
  complement_address?: string;
}

class ShipmentQuotePackageContainDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly perfume: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly battery: boolean;
}

class ShipmentQuotePackagesItemCommodityDetailDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly hts_no: string;
}

class ShipmentQuotePackagesItemCommodityDto {
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ShipmentQuotePackagesItemCommodityDetailDto)
  readonly value: ShipmentQuotePackagesItemCommodityDetailDto;
}

class ShipmentQuotePackagesItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ShipmentQuotePackagesItemCommodityDto)
  readonly commodity: ShipmentQuotePackagesItemCommodityDto;

  @ApiProperty()
  @IsNotEmpty()
  readonly unit_price: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;
}

class ShipmentQuotePackageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly weight: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly width: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly height: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly length: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly quantity: string;

  @ApiProperty({
    isArray: true,
    type: ShipmentQuotePackagesItemDto
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ShipmentQuotePackagesItemDto)
  items: ShipmentQuotePackagesItemDto[];

  @ApiProperty({
    isArray: true,
    type: ShipmentQuotePackageContainDto
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ShipmentQuotePackageContainDto)
  contains: ShipmentQuotePackageContainDto[];
}

class ShipmentQuotePackagesMetaCurrencyDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(3)
  readonly code: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly symbol: string;
}

class ShipmentQuotePackagesMetaDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly package_quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly weight_total: number;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(3)
  readonly weight_unit: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(2)
  readonly measure_unit: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly cargo_value: number;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ShipmentQuotePackagesMetaCurrencyDto)
  readonly currency: ShipmentQuotePackagesMetaCurrencyDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly has_perfume: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly has_battery: boolean;
}

class ShipmentQuoteDto {
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressCreateDto)
  readonly origin: AddressCreateDto;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressCreateDto)
  readonly destination: AddressCreateDto;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  readonly ship_date: string;

  @ApiProperty({
    isArray: true,
    type: ShipmentQuotePackageDto
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ShipmentQuotePackageDto)
  packages: ShipmentQuotePackageDto[];

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ShipmentQuotePackagesMetaDto)
  packages_meta: ShipmentQuotePackagesMetaDto;
}

export class ShipmentCreateRecipientSenderPhoneDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly prefix: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly number: string;
}

export class ShipmentCreateRecipientSenderDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly tax_id: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly category: string;

  @ApiProperty()
  @ValidateNested()
  readonly address: AddressCreateDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ShipmentCreateRecipientSenderPhoneDto)
  readonly phone: ShipmentCreateRecipientSenderPhoneDto;
}

export class ShipmentCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly user_uuid: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ShipmentQuoteDto)
  readonly quote: ShipmentQuoteDto;

  @ApiProperty()
  @IsNotEmpty()
  readonly parcel_rate_source: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ShipmentCreateRecipientSenderDto)
  readonly recipient: ShipmentCreateRecipientSenderDto;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ShipmentCreateRecipientSenderDto)
  readonly sender: ShipmentCreateRecipientSenderDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly estimated_date: string;
}
