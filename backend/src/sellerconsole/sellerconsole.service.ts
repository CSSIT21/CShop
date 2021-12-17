import { HttpException, Injectable } from '@nestjs/common';
import { CreateSellerconsoleDto } from './dto/create-sellerconsole.dto';
import { UpdateSellerconsoleDto } from './dto/update-sellerconsole.dto';
import { OrderStatus, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Timestamp } from 'rxjs';

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
		const res = await this.prisma.sconsole_discount_log.findMany({
			where: {
				shop_id: shopid,
			},
			select: {
				discount_id: true,
				customer_id_from_sconsole_discount_log: true,
				product_id_from_sconsole_discount_log: true,
			},
		});
		return res;
	}

	async getOrderHistory(shopid: number) {
		const res = await this.prisma.sconsole_order_history.findMany({
			where: {
				shop_id: shopid,
			},
			select: {
				order_id_from_sconsole_order_history: {
					select: {
						id: true,
						customer_id_from_order: {
							select: {
								customer_info: {
									select: {
										firstname: true,
										lastname: true,
									},
								},
							},
						},
						total_price: true,
						order_date: true,
					},
				},
				product_id_from_sconsole_order_history: {
					select: {
						title: true,
					},
				},
				status: true,
			},
		});

		return res;
	}

	async getOrderStatus(orderid: number) {
		const res = await this.prisma.sconsole_order_status.findMany({
			where:{
				order_id:orderid
			},select: {}
		}) 
	}

	async findOneOrder(orderid: number) {
		const res = await this.prisma.order.findUnique({
			where: {
				id: orderid,
			},
		});
		return res;
	}

	async removeOrderFromOrderStatus(orderid: number) {
		const res = await this.prisma.sconsole_order_status.delete({
			where: {
				id: orderid, // wrong
			},
		});
		return res;
	}

	async addOrderStatusToOrderHistory(
		order_id: number,
		product_id: number,
		shop_id: number,
		started_date: Date,
		status: string,
	) {
		await this.prisma.sconsole_order_history.create({
			data: {
				order_id: order_id,
				product_id: product_id,
				shop_id: shop_id,
				started_date: started_date,
				ended_date: new Date(),
				status: status,
			},
		});
	}


	seller_refundhistory(id: number) {
		return `#${id}`;
	}

	async getStock(id: number) {
		return await this.prisma.product.findMany({
			where: {
				shop_id: id,
			},
			select: {
				id: true,
				title: true,
				quantity: true,
				price: true,
			},
		});
	}
	async AddToStock(
		id: number,
		shopId: number,
		title: string,
		sub_title: string,
		price: number,
		quantity: number,
		categoryId: number,
		sold: number,
		suggest_product: number[],
		rating: number,
	) {
		console.log({
			shop_id: shopId,
			title: title,
			sub_title: sub_title,
			price: price,
			quantity: quantity,
			category_id: categoryId,
			sold: sold,
			suggest_products: suggest_product,
			rating: rating,
		});
		await this.prisma.product.create({
			data: {
				shop_id: shopId,
				title: title,
				sub_title: sub_title,
				price: price,
				quantity: quantity,
				category_id: categoryId,
				sold: sold,
				suggest_products: suggest_product,
				rating: rating,
			},
		});
	}
	async UpdatetoStockLog(shopId: number, productId: number, quantity: number) {
		await this.prisma.sconsole_stock_history.create({
			data: {
				shop_id: shopId,
				product_id: productId,
				quantity: quantity,
				updated_date: new Date(),
			},
		});
		return this.prisma.sconsole_stock_history.findUnique({
			where: {
				id: productId,
			},
			select: {
				shop_id: true,
				product_id: true,
				quantity: true,
				updated_date: true,
			},
		});
	}
}
