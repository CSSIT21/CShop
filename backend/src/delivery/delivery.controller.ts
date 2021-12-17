import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryLoginDTO } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Controller('delivery')
export class DeliveryController {
	constructor(private readonly deliveryService: DeliveryService) { }

	@Post('login')
	login(@Body() createDeliveryDto: DeliveryLoginDTO) {
		return this.deliveryService.login(createDeliveryDto);
	}

	@Get()
	findAll() {
		return this.deliveryService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.deliveryService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
		return this.deliveryService.update(+id, updateDeliveryDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.deliveryService.remove(+id);
	}
}
