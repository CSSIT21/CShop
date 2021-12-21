import { Injectable, HttpException } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { nanoid } from 'nanoid';
import { SuggestionProductDto } from './dto/suggestion-product.dto';

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}

	public async getProductDetails(id: number, customerId : number) {
		try {
			const product = await this.prisma.product.findUnique({
				where: {
					id: id,
				},
				include: {
					product_detail: true,
					customer_wishlist: {
						where: {
							customer_id: customerId,
						},
					},
				},
			});

			return product;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying products please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying products request body incorrect', 500);
		}
	}
	
	public async updateSuggestionProducts(id: number, suggestionProductDto: SuggestionProductDto) {
		try {
			const update = await this.prisma.product.update({
				where: {
					id: id,
				},
				data: {
					suggest_products: suggestionProductDto.products,
				},
			});
			return update;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying products please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying products request body incorrect', 500);
		}
	}

	public async getSuggestProducts(id: number, customerId : number) {
		try {
			const suggest_products_id = await this.prisma.product.findFirst({
				where: {
					id: id,
				},
				select: {
					suggest_products: true,
				},
			});

			let suggest_products_list: Promise<any>[] = [];
			for (let i = 0; i < suggest_products_id.suggest_products.length; i++) {
				suggest_products_list.push(
					this.prisma.product.findFirst({
						where: {
							id: suggest_products_id.suggest_products[i],
						},
						select: {
							id: true,
							title: true,
							price: true,
							quantity:true,
							product_picture: { take: 1 },
							customer_wishlist: {
								where: {
									customer_id: customerId,
								},
							},
						},
					}),
				);
			}
			suggest_products_list = await Promise.all(suggest_products_list);

			return suggest_products_list;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying products please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying products request body incorrect', 500);
		}
	}

	public async getProductPictures(id: number) {
		try {
			const product_pictures = await this.prisma.product_picture.findMany({
				where: {
					product_id: id,
				},
			});

			return product_pictures.slice(0, 4);
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying products please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying products request body incorrect', 500);
		}
	}

	public async getShopDetails(id: number) {
		try {
			// Shop Picture
			const product = await this.prisma.product.findFirst({
				where: {
					id: id,
				},
				select: {
					shop_id: true,
				},
			});
			const shop_info = await this.prisma.shop_info.findFirst({
				where: {
					id: product.shop_id,
				},
				include: {
					shop_picture: true,
					_count: {
						select: {
							product: true,
						},
					},
				},
			});
			return shop_info;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying products please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying products request body incorrect', 500);
		}
	}

	public async getShortLink(id: number) {
		try {
			const link = await this.prisma.product_short_link.findUnique({
				where: {
					product_id: id,
				},
			});

			if (link && link.shorted_link) {
				return link.shorted_link;
			} else {
				const generatedString = nanoid(8);
				const link = await this.prisma.product_short_link.create({
					data: {
						product_id: id,
						shorted_link: generatedString,
					},
				});
				return link.shorted_link;
			}
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying products please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying products request body incorrect', 500);
		}
	}

	public async getOptions(id: number) {
		try {
			const options = await this.prisma.product_options.findMany({
				where: {
					product_id: id,
				},
				include: {
					product_choices: true,
				},
			});
			return options;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying products please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying products request body incorrect', 500);
		}
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
