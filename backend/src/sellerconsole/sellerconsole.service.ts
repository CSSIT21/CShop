import { HttpException, Injectable } from '@nestjs/common';
import { CreateSellerconsoleDto } from './dto/create-sellerconsole.dto';
import { UpdateSellerconsoleDto } from './dto/update-sellerconsole.dto';
import { DiscountClass, DiscountTypes, OrderStatus, PrismaClient, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Timestamp } from 'rxjs';
import e from 'express';

@Injectable()
export class SellerconsoleService {
	constructor(private readonly prisma: PrismaService) {}

	async getstockHistory(shopid: number) {
		const res = await this.prisma.sconsole_stock_history.findMany({
			where: {
				shop_id: shopid,
			},
			select: {
				product_id: true,
				product_id_from_sconsole_stock_history: {
					select: {
						title: true,
						quantity: true,
						product_picture: {
							select: {
								path: true,
							},
						},
					},
				},
				quantity: true,
				updated_date: true,
			},
		});

		return res;
	}

	async getmyDiscount(shopid: number) {
		const res = await this.prisma.discount_shop.findMany({
			where: {
				shop_id: shopid,
			},
			select: {
				shop_id: true,
				discount_id: true,
				max_quantity: true,
				// customer_id_from_sconsole_discount_log: true,
				// product_id_from_sconsole_discount_log: true,
			},
		});
		return res;
	}

	// async getOrderHistory(shopid: number) {
	// 	const res = await this.prisma.sconsole_order_history.findMany({
	// 		where: {
	// 			shop_id: shopid,
	// 		},
	// 		select: {
	// 			order_id_from_sconsole_order_history: {
	// 				select: {
	// 					id: true,
	// 					customer_id_from_order: {
	// 						select: {
	// 							customer_info: {
	// 								select: {
	// 									firstname: true,
	// 									lastname: true,
	// 								},
	// 							},
	// 						},
	// 					},
	// 					total_price: true,
	// 					order_date: true,
	// 				},
	// 			},
	// 			product_id_from_sconsole_order_history: {
	// 				select: {
	// 					title: true,
	// 				},
	// 			},
	// 			status: true,
	// 		},
	// 	});

	// 	return res;
	// }

	async getOrderLog(shopid: number) {
		const result = await this.prisma.$queryRaw`SELECT order_item.order_id as order_id,
		customer_picture_file.path as avatar,
		product.title as productname,
		CONCAT(customer_info.firstname, ' ', customer_info.lastname) as customername,
		order_item.quantity as amount,
		order_item.quantity * order_item.price as totalprice,
		"order".status as status,
		"order".order_date as orderdate
		FROM product
		INNER JOIN order_item ON product.id = order_item.product_id
		INNER JOIN "order" ON "order".id = order_item.order_id
		INNER JOIN customer_info ON customer_info.customer_id = "order".customer_id
		INNER JOIN customer_picture ON customer_picture.customer_id = "order".customer_id
		INNER JOIN customer_picture_file ON customer_picture_file.id = customer_picture.picture_id
		WHERE product.shop_id = ${shopid}`;
		return result;
	}

	async getOrderStatus(orderid: number) {
		const res = await this.prisma.sconsole_order_status.findMany({
			where: {
				order_id: orderid,
			},
			select: {},
		});
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
		const res = await this.prisma.product.findMany({
			where: {
				shop_id: id,
			},
			select: {
				id: true,
				title: true,
				quantity: true,
				price: true,
				added_date: true,
				product_picture: {
					select: {
						path: true,
					},
				},
			},
		});
		return res;
	}

	async AddToStock(
		id: number,
		shopId: number,
		title: string,
		sub_title: string,
		price: number,
		quantity: number,
		categoryId: number,
		// sold: number,
		// suggest_product: number[],
		// rating: number,
	) {
		const productId = await this.prisma.product.create({
			data: {
				shop_id: shopId,
				title: title,
				sub_title: sub_title,
				price: price,
				quantity: quantity,
				category_id: categoryId,
				sold: 0,
				suggest_products: [],
				rating: 0,
			},
		});
		return productId.id;
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

	async CardOfProduct(id: number) {
		return await this.prisma.product.count({
			where: {
				shop_id: id,
			},
			select: {
				quantity: true,
			},
		});
	}
	async CardOfFollows(id: number) {
		return await this.prisma.shop_info.findUnique({
			where: {
				id: id,
			},
			select: {
				followers: true,
			},
		});
	}
	async CardOfRating(id: number) {
		return await this.prisma.product.aggregate({
			where: {
				shop_id: id,
			},
			_avg: {
				rating: true,
			},
		});
	}
	async CardOfSales(id: number) {
		const temp = await this.prisma.product.findMany({
			where: {
				shop_id: id,
			},
			select: {
				sold: true,
				price: true,
			},
		});

		const prices = temp.map((el) => el.price * el.sold);

		let price = 0;
		prices.forEach((el) => (price += el));
		return { price };
	}

	// async Cheat(id: number){
	// 	return await this.prisma.order.aggregate({
	// 		where : {
	// 			customer_id : id,
	// 		},
	// 		_sum : {
	// 			total_price : true,
	// 		}
	// 	})
	// }

	async Discount(
		code: string,
		starte_date: Date,
		end_date: Date,
		description: string,
		class_types: DiscountClass,
		min_price: number,
		reduce_price: number,
		picture_path: string,
		picture_thumbnail: string,
		picture_title: string,
	) {
		if (class_types === DiscountClass.ReducePrice) {
			const reducePrice = await this.prisma.discount.create({
				data: {
					code: code,
					start_date: starte_date,
					end_date: end_date,
					description: description,
					class: 'ReducePrice',
					min_price: min_price,
					reduce_price: reduce_price,
					discount_types: 'Shop',
					added_date: new Date(),
					picture_path: picture_path,
					picture_thumbnail: picture_thumbnail,
					picture_title: picture_title,
				},
			});
			return reducePrice.id;
		} else {
			const FreeShipping = await this.prisma.discount.create({
				data: {
					code: code,
					start_date: new Date(starte_date),
					end_date: new Date(end_date),
					description: description,
					class: 'FreeShipping',
					min_price: min_price,
					reduce_price: reduce_price,
					discount_types: 'Shop',
					added_date: new Date(),
					picture_path: picture_path,
					picture_thumbnail: picture_thumbnail,
					picture_title: picture_title,
				},
			});
			return FreeShipping.id;
		}
	}
	async DiscountShop(id: number, discount_id: number, quantity: number, max_quantity: number) {
		await this.prisma.discount_shop.create({
			data: {
				shop_id: id,
				discount_id: discount_id,
				quantity: quantity,
				max_quantity: max_quantity,
			},
		});
		return this.prisma.discount_shop.findUnique({
			where: {
				discount_id: id,
			},
			select: {
				discount_id: true,
				quantity: true,
				max_quantity: true,
			},
		});
	}

	async getShopInfo(shopid: number) {
		const shopinfo = await this.prisma.shop_info.findUnique({
			where: {
				id: shopid,
			},
			select: {
				shop_name: true,
				phone_number: true,
				description: true,
				followers: true,
				shop_picture: true,
			},
		});
		return shopinfo;
	}

	async updateShopInfo(shopid: number, shopname: string, phonenumber: string, description: string) {
		const shopinfo = await this.prisma.shop_info.update({
			where: {
				id: shopid,
			},
			data: {
				shop_name: shopname,
				phone_number: phonenumber,
				description: description,
			},
		});
		return shopinfo;
	}

	async getMyCoupon(shopid: number) {
		const MyCoupon = await this.prisma.discount_shop.findMany({
			where: {
				shop_id: shopid,
			},
			include: {
				discount_id_from_discount_shop: true,
			},
		});
		return MyCoupon;
	}

	async getCustomerViews(shopid: number) {
		const res = await this.prisma.home_shop_log.findMany({
			where: {
				shop_id: shopid,
			},
			select: {
				id: true,
				customer_id_from_home_shop_log: {
					select: {
						customer_info: {
							select: {
								firstname: true,
								lastname: true,
								gender: true,
							},
						},
					},
				},
				view_date: true,
			},
		});
		return res;
	}

	async getFlashsales(shopid: number) {
		const res = await this.prisma.shop_flashsale.findMany({
			where: {
				shop_id: shopid,
			},
			select: {
				id: true,
				title: true,
				started_date: true,
				ended_date: true,
				path: true,
			},
		});
		return res;
	}

	// async createFlashShell(shopid: number, title: string, path: string, thumbnail: string, description: string) {
	// 	await this.prisma.shop_flashsale.create({
	// 		data: {
	// 			shop_id: shopid,
	// 			title: title,
	// 			path: path,
	// 			thumbnail: thumbnail,
	// 			description: description,
	// 			started_date: new Date(),
	// 			ended_date: new Date(),
	// 		},
	// 	});
	// 	const flash = await this.prisma.shop_flashsale.findMany({
	// 		where: {
	// 			shop_id: shopid,
	// 		},
	// 		select: {
	// 			title: true,
	// 			path: true,
	// 			thumbnail: true,
	// 			description: true,
	// 			started_date: true,
	// 			ended_date: true,
	// 		},
	// 	});
	// 	return flash;
	// }

	async newFlashsales(
		shopid: number,
		title: string,
		path: string,
		thumbnail: string,
		description: string,
		started_date: Date,
		ended_date: Date,
	) {
		const product = await this.prisma.product.findMany({
			where: {
				shop_id: shopid,
			},
			select: {
				id: true,
			},
		});

		const newFlashSales = await this.prisma.shop_flashsale.create({
			data: {
				shop_id: shopid,
				title: title,
				path: path,
				thumbnail: thumbnail,
				description: description,
				started_date: new Date(started_date),
				ended_date: new Date(ended_date),
				products: { product },
			},
		});
		return newFlashSales;
	}
}
