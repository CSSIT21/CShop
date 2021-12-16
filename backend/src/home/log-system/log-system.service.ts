import { HttpException, Injectable } from '@nestjs/common';
import { CreateAddToCartLogDto } from './dto/create-add-to-cart-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateDiscountLogDto } from './dto/create-discount-log.dto';
import { CreatePaymentLogDto } from './dto/create-payment-log.dto';
import { CreateProductLogDto } from './dto/create-product-log.dto';
import { CreateShopLogDto } from './dto/create-shop-log.dto';

@Injectable()
export class LogSystemService {
	constructor(private readonly prisma: PrismaService) {}

	async createAddToCart(addToCartDto: CreateAddToCartLogDto, customer_id: number, product_id: number) {
		return this.prisma.home_add_to_cart_log.create({
			data: {
				added_date: new Date(addToCartDto.added_date).toISOString(),
				customer_id,
				product_id,
			},
		});
	}

	async getAddToCart(where?: Prisma.home_add_to_cart_logWhereInput) {
		return this.prisma.home_add_to_cart_log.findMany({
			where,
		});
	}

	async createDiscount(discountDto: CreateDiscountLogDto, customer_id: number, discount_id: number) {
		return this.prisma.home_discount_log.create({
			data: {
				view_date: new Date(discountDto.view_date).toISOString(),
				customer_id,
				discount_id,
			},
		});
	}

	async getDiscount(where?: Prisma.home_discount_logWhereInput) {
		return this.prisma.home_payment_log.findMany({
			where,
		});
	}

	async createPayment(paymentDto: CreatePaymentLogDto, customer_id: number, payment_id: number) {
		return this.prisma.home_payment_log.create({
			data: {
				issue_at: new Date(paymentDto.issue_at).toISOString(),
				customer_id,
				payment_id,
			},
		});
	}

	async getPayment(where?: Prisma.home_payment_logWhereInput) {
		return this.prisma.home_payment_log.findMany({
			where,
		});
	}

	async createProduct(productDto: CreateProductLogDto, customer_id: number, product_id: number) {
		return this.prisma.home_product_log.create({
			data: {
				view_date: new Date(productDto.view_date).toISOString(),
				customer_id,
				product_id,
			},
		});
	}

	async getProduct(where?: Prisma.home_product_logWhereInput) {
		return this.prisma.home_product_log.findMany({
			where,
		});
	}

	async crateShop(shopDto: CreateShopLogDto, customer_id: number, shop_id: number) {
		return this.prisma.home_shop_log.create({
			data: {
				customer_id,
				shop_id,
			},
		});
	}

	async getShop(where?: Prisma.home_shop_logWhereInput) {
		return this.prisma.home_shop_log.findMany({
			where,
		});
	}

	throwError(err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			console.log(err.message);
			throw new HttpException('Error querying comments please check your information!', 500);
		}
		console.log(err.message);
		throw new HttpException('Error querying comments request body incorrect', 500);
	}
}
