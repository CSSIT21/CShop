import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import * as province from '../delivery/file/province.json';

@Injectable()
export class CartService {
	create(createCartDto: CreateCartDto) {
		return 'This action adds a new cart';
	}
	constructor(private readonly prisma: PrismaService) {}

	async findAll() {
		const prisma = this.prisma;
		const productDetail = await prisma.order_cart_item.findMany();
		const newProductDetail = await productDetail.map(async (item) => {
			const productName = await prisma.product.findUnique({ where: { id: item.product_id } });
			const productoption = await prisma.product_options.findMany({
				where: { product_id: item.product_id },
				include: { product_choices: true },
			});
			return {
				...item,
				productName,
				product_options: productoption,
			};
		});
		return Promise.all(newProductDetail);
	}

	async findOne(id: number) {
		const prisma = this.prisma;
		const productDetail = await prisma.order_cart_item.findMany({ where: { customer_id: id } });
		const newProductDetail = await productDetail.map(async (item) => {
			const productName = await prisma.product.findUnique({
				where: { id: item.product_id },
				include: { product_picture: true },
			});
			const productoption = await prisma.product_options.findMany({
				where: { product_id: item.product_id },
				include: { product_choices: true },
			});
			return {
				...item,
				productName,
				product_options: productoption,
			};
		});

		const customerDetail = await prisma.customer_address.findMany({
			where: { customer_id: id },
			include: {
				address_id_from_customer_address: true,
			},
		});

		const newD = await Promise.all(newProductDetail);

		const customerDiscount = await prisma.discount_user_code.findMany({
			where: { customer_id: id },
			include: {
				discount_id_from_iscount_user_code: true,
			},
		});

		return { customerDetail, newD, customerDiscount };
	}

	async addtocart(userID: number, productID: number, amount: number, firstchoiceID: number, seconedchoiceID: number) {
		const prisma = this.prisma;
		let additem: any = { customer_id: userID, product_id: productID, quantity: amount, added_time: new Date() };
		if (firstchoiceID) {
			let product_options = [firstchoiceID];
			if (seconedchoiceID) {
				product_options.push(seconedchoiceID);
			}
			additem = { ...additem, product_options };
		}
		await prisma.order_cart_item.create({ data: additem });
		return true;
	}

	async rebuy(
		userID: number,
		cartitems: {
			productID: number;
			amount: number;
			product_options: number[];
			price: number;
		}[],
	) {
		const prisma = this.prisma;
		const data = cartitems.map((item) => {
			return {
				customer_id: userID,
				product_id: item.productID,
				quantity: item.amount,
				added_time: new Date(),
				product_options: item.product_options,
			};
		});

		await prisma.order_cart_item.createMany({ data: data });

		const rebuydata = cartitems.map((item) => {
			return {
				customer_id: userID,
				product_id: item.productID,
				date: new Date(),
				price: item.price,
				product_option: item.product_options,
			};
		});
		await prisma.order_rebuy.createMany({ data: rebuydata });
		return true;
	}

	async removefromcart(orderID: number, userID: number, productID: number) {
		const prisma = this.prisma;
		await prisma.order_cart_item.delete({ where: { id: orderID } });
		await prisma.order_deleted_item.create({
			data: { customer_id: userID, product_id: productID, time: new Date() },
		});
		return true;
	}
	async removeallfromcart(userID: number) {
		const prisma = this.prisma;
		const data = await prisma.order_cart_item.findMany({ where: { customer_id: userID } });
		data.forEach(async (item) => {
			await prisma.order_deleted_item.create({
				data: { customer_id: userID, product_id: item.product_id, time: new Date() },
			});
		});
		await prisma.order_cart_item.deleteMany({ where: { customer_id: userID } });
		return true;
	}

	async generateTrackingNumber(address: { province: string; recipient_name: string }) {
		let provinceNumber = province[address.province];
		const createTrackingNumber = await this.prisma.delivery_product_status.create({
			data: {
				recipient_name: address.recipient_name,
				delivery_detail: {
					Time: Date.now(),
					detail: 'Received a request',
				},
				province: provinceNumber.toString(),
			},
		});

		const changeTrackingNumber = () => {
			const id = createTrackingNumber.id.toString();
			let length = id.length;
			let zero = '';

			for (let index = 1; index < 6 - length; index++) {
				zero += '0';
			}
			return 'CSC'.concat(provinceNumber, zero, id);
		};

		const trackingNumber = changeTrackingNumber();

		const updateTrackingnumber = await this.prisma.delivery_product_status.update({
			where: {
				id: createTrackingNumber.id,
			},
			data: {
				tracking_number: trackingNumber,
			},
		});

		return {
			id: updateTrackingnumber.id,
			tracking_number: updateTrackingnumber.tracking_number,
		};
	}

	async updateamount(
		userID: number,
		addressID: number,
		totalprice: number,
		newamount: { id: number; amount: number }[],
	) {
		const prisma = this.prisma;
		await Promise.all(
			newamount.map(async (data) => {
				await prisma.order_cart_item.update({ where: { id: data.id }, data: { quantity: data.amount } });
			}),
		);

		const orders = await prisma.order_cart_item.findMany({
			where: { customer_id: userID },
			include: { product_id_from_order_cart_item: true },
		});
		const address = await prisma.address.findUnique({ where: { id: addressID } });
		const trackingdata = await this.generateTrackingNumber({
			province: address.province,
			recipient_name: address.recipient_name,
		});
		const status = await prisma.order_status.create({ data: { status_id: trackingdata.id } });
		await prisma.order.create({
			data: {
				total_price: totalprice,
				order_date: new Date(),
				customer_id: userID,
				status: 'Received_a_request',
			},
		});

		const data = orders.map((item) => {
			return {
				order_id: 1,
				price: item.product_id_from_order_cart_item.price,
				product_id: item.id,
				quantity: item.quantity,
				status_id: status.id,
				product_options: item.product_options,
			};
		});
		await prisma.order_item.createMany({ data });
		await prisma.order_cart_item.deleteMany({ where: { customer_id: userID } });

		return true;
	}

	update(id: number, updateCartDto: UpdateCartDto) {
		return `This action updates a #${id} cart`;
	}

	remove(id: number) {
		return `This action removes a #${id} cart`;
	}
}