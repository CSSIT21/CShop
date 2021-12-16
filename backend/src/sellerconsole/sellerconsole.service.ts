import { HttpException, Injectable } from '@nestjs/common';
import { CreateSellerconsoleDto } from './dto/create-sellerconsole.dto';
import { UpdateSellerconsoleDto } from './dto/update-sellerconsole.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { addProductSellerconsoleDto } from './dto/addProduct-sellerconsole.dto';
const prisma = new PrismaClient();
@Injectable()
export class SellerconsoleService {
	constructor(private readonly prisma: PrismaService) {}

	async getstockHistory(shopid: number) {
		const res = await this.prisma.product.findMany({
			where: {
				shop_id: shopid,
			},
			select: {
				id: true,
				title: true,
				sconsole_stock_history: {
					select: {
						quantity: true,
						updated_date: true,
					},
				},
			},
		});
		return res;
	}

	async getdiscountHistory(shopid: number) {
		const res = await this.prisma.customer.findMany({
			select: {
				customer_info: {
					select: {
						firstname: true,
						lastname: true,
					},
				},
				shop_info: {
					select: {
						product: {
							where: {
								shop_id: shopid,
							},
							select: {
								id: true,
								title: true,
								sconsole_discount_log: { select: { discount_id: true } },
							},
						},
					},
				},
			},
		});
		return res;
	}
}
