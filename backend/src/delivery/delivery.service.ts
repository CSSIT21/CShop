import { Injectable } from '@nestjs/common';
import { prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { HmacSHA512 } from 'crypto-js';
import { DeliveryLoginDTO } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

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
			console.log(adminInfo);
			if (adminInfo) {
				return { success: true }
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
