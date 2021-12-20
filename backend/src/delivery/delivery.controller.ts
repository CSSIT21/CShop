import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { Address } from './dto/address.dto';
import { ChangeStatus } from './dto/change-status.dto';
import { DeliveryLoginDTO } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { UpdateDetailDTO } from './dto/update-detail.dto';

@Controller('delivery')
export class DeliveryController {
	constructor(private readonly deliveryService: DeliveryService) { }

	@Post('login')
	public async login(@Body() createDeliveryDto: DeliveryLoginDTO, @Res() res) {
		try {
			const loginCheck = await this.deliveryService.login(createDeliveryDto);
			if (loginCheck.success) {
				res.cookie('cshop-delivery-admin', loginCheck.token)
				res.send({
					success: true
				})
			} else {
				res.send({
					success: false
				})
			}
		} catch (e) {
			res.send(e)
		}

	}

	@Post('generate-tracking')
	generateTrackingNumber(@Body() address: Address) {
		return this.deliveryService.generateTrackingNumber(address)
	}

	@Get('requests')
	getAllRequests() {
		return this.deliveryService.getAllRequests();
	}

	@Get('packages')
	getAllpackages() {
		return this.deliveryService.getAllpackages();
	}

	@Get('delivering')
	getAllDelivering() {
		return this.deliveryService.getAllDelivering();
	}

	@Get('success')
	getAllSuccess() {
		return this.deliveryService.getAllSuccess();
	}

	@Post('change-status')
	changeStatus(@Body() newStatus: ChangeStatus) {
		return this.deliveryService.changeStatus(newStatus)
	}

	@Post('update-detail')
	updateDetail(@Body() newDetail: UpdateDetailDTO) {
		return this.deliveryService.updateDetail(newDetail)
	}

	@Get('search')
	getDetail(@Query('tracking') trackingNumber: string) {
		return this.deliveryService.getDetail(trackingNumber)
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
