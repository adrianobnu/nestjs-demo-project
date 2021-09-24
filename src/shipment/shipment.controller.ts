import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShipmentCreateDto } from './DTO/create.dto';
import { ShipmentService } from './shipment.service';

@Controller('shipment')
@ApiTags('Shipment')
export class ShipmentController {
  constructor(private shipmentService: ShipmentService) {}

  @Post()
  @ApiOperation({ summary: 'Endpoint to add a new shipment information.' })
  @ApiResponse({ status: 200, description: 'Shipment created' })
  @ApiResponse({ status: 500, description: 'Error for create the shipment' })
  @ApiBody({ type: [ShipmentCreateDto] })
  create(@Body() payload: ShipmentCreateDto) {
    return this.shipmentService.create(payload);
  }

  @Get()
  @ApiOperation({ summary: 'Endpoint to get all shipments into database.' })
  @ApiResponse({ status: 200, description: 'Shipments listed' })
  list() {
    return this.shipmentService.all();
  }
}
