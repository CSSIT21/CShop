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

	@Get('admin')
	getAllRequests(@Query('status') status: string) {
		return this.deliveryService.getAdminCheckStatus(status);
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
}
