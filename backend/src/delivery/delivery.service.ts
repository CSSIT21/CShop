import { Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HmacSHA512 } from 'crypto-js';
import { DeliveryLoginDTO } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { nanoid } from 'nanoid';
import * as province from './file/province.json'
import { Address } from './dto/address.dto';
import { DeliveryStatusDTO } from './dto/delivery-status.dto';

@Injectable()
export class DeliveryService {
	constructor(private readonly prisma: PrismaService) { }

	public async login(loginInfo: DeliveryLoginDTO) {
		let password = HmacSHA512(loginInfo.password, process.env.PASSWORD_KEY).toString()
		try {
			const adminInfo = await this.prisma.delivery_admin.findFirst({
				where: {
					username: loginInfo.username,
					password: password,
				}
			})
			let token = nanoid()
			const login = await this.prisma.delivery_admin.update({
				where: {
					id: adminInfo.id
				},
				data: {
					token: token
				}
			})

			console.log(login.username);
			if (login) {
				return {
					success: true,
					token: login.token
				}
			} else {
				return {
					success: false
				}
			}

		} catch (e) {
			return {
				success: false,
				e
			};
		}
	}

	public async generateTrackingNumber(address: Address) {
		let provinceNumber = province[address.province]

		const createTrackingNumber = await this.prisma.delivery_product_status.create({
			data: {
				recipient_name: address.recipient_name,
				delivery_detail: {
					status: 'Received a request',
					Time: Date.now(),
					detail: "Received a request"
				},
				province: provinceNumber.toString()
			}
		})

		//CS00XXXXXX (6)

		const changeTrackingNumber = () => {
			const id = createTrackingNumber.id.toString()
			let length = id.length
			let zero = ""

			for (let index = 1; index < 6 - length; index++) {
				zero += "0"
			}
			console.log("CSC".concat(provinceNumber, zero, id));


			return "CSC".concat(provinceNumber, zero, id)
		}

		const trackingNumber = changeTrackingNumber()

		const updateTrackingnumber = await this.prisma.delivery_product_status.update({
			where: {
				id: createTrackingNumber.id
			},
			data: {
				tracking_number: trackingNumber
			}
		})

		return {
			tracking_number: updateTrackingnumber.tracking_number
		}
	}

	findAll() {
		return `This action returns all delivery`;
	}

	findOne(id: number) {
		return `This action returns a #${id} delivery`;
	}

	update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
		return `This action updates a #${id} delivery`;
	}

	remove(id: number) {
		return `This action removes a #${id} delivery`;
	}
}
