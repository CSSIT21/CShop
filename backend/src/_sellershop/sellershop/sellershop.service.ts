import { Catch, HttpException, Injectable } from '@nestjs/common';
import { CreateSellershopDto } from './dto/create-sellershop.dto';
import { UpdateSellershopDto } from './dto/update-sellershop.dto';
import { Prisma, Shop_section } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/authentication/dto/user.dto';

@Injectable()
export class SellershopService {
	constructor(private readonly prisma: PrismaService) {}

	public async findOne(id: number) {
		try {
			const shopinfo = await this.prisma.shop_info.findUnique({
				where: {
					id: id,
				},
				include: {
					shop_picture: true,
				},
			});
			const fetchrating = await this.prisma.product.aggregate({
				where: {
					shop_id: shopinfo.id,
				},
				_avg: {
					rating: true,
				},
			});
			const products = await this.prisma.product.count({
				where: {
					shop_id: shopinfo.id,
				},
			});
			const categories = await this.prisma.shop_category.findMany({
				where: {
					shop_id: shopinfo.id,
				},
			});
			let rating = fetchrating._avg.rating;

			return { ...shopinfo, products, categories, rating };
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying shop infomation please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying shop infomation request body incorrect', 500);
		}
	}

	public async getShopProduct(id: number) {
		try {
			const products = await this.prisma.product.findMany({
				where: {
					shop_id: id,
				},
			});
			return products;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying products please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying products request body incorrect', 500);
		}
	}

	public async getShopSection(id: number) {
		try {
			// await this.prisma.shop_section.create({
			// 	data: {
			// 		shop_id: 1,
			// 		sections: [
			// 			{ id: '1234', type: 2 },
			// 			{ id: '5678', type: 1 },
			// 			{ id: '9101', type: 3 },
			// 		],
			// 	},
			// });
			const shopsections = await this.prisma.shop_section.findUnique({
				where: {
					shop_id: id,
				},
			});
			const sections = shopsections.sections;
			if (shopsections.sections !== null) {
				var parsedsections = JSON.parse(JSON.stringify(sections));
				let resultSections = [];
				for (let index = 0; index < parsedsections.length; index++) {
					let section;

					switch (parsedsections[index].type) {
						case Shop_section.Banner:
							section = await this.prisma.shop_banner.findUnique({
								where: {
									id: parsedsections[index].id,
								},
							});
							section = { ...section, type: 1 };
							break;
						case Shop_section.BannerCarousel:
							section = await this.prisma.shop_banner_carousel.findUnique({
								where: {
									id: parsedsections[index].id,
								},
							});
							section = { ...section, type: 2 };
							break;
						case Shop_section.ProductCarousel:
							section = await this.prisma.shop_product_carousel.findUnique({
								where: {
									id: parsedsections[index].id,
								},
							});
							section = { ...section, type: 3 };
							break;
						case Shop_section.Video:
							section = await this.prisma.shop_video.findUnique({
								where: {
									id: parsedsections[index].id,
								},
							});
							section = { ...section, type: 4 };
							break;
					}
					resultSections = [...resultSections, section];
				}

				return resultSections;
			} else {
				return [];
			}
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying sections please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying sections request body incorrect', 500);
		}
	}

	public async getShopComments(id: number, page: number) {
		try {
			const comments = await this.prisma.shop_comment.findMany({
				where: {
					shop_id: id,
				},
				include: {
					customer_id_from_shop_comment: {
						include: {
							customer_info: true,
							customer_picture: true,
						},
					},
				},
				skip: (page - 1) * 10,
				take: 10,
			});
			return comments;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying comments please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying comments request body incorrect', 500);
		}
	}

	public async getShopProductComments(id: number, page: number) {
		try {
			const comments = await this.prisma.product_reviews.findMany({
				where: {
					product_id_from_product_reviews: {
						shop_id: id,
					},
				},
				skip: (page - 1) * 10,
				take: 10,
			});
			return comments;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying comments please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying comments request body incorrect', 500);
		}
	}

	public async getShopDiscount(id: number) {
		try {
			const vouchers = await this.prisma.discount_shop.findMany({
				where: {
					shop_id: id,
				},
				include: {
					discount_id_from_discount_shop: {
						include: {
							discount_user_code: true,
						},
					},
				},
			});
			return vouchers;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying vochers please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying vochers request body incorrect', 500);
		}
	}

	public async getFlashSale(id: number) {
		try {
			const flashsale = await this.prisma.shop_flashsale.findFirst({
				where: {
					shop_id: id,
					started_date: {
						lte: new Date(Date.now()),
					},
					ended_date: {
						gt: new Date(Date.now()),
					},
				},
			});
			let productsinfo = [];
			let productsId = JSON.parse(JSON.stringify(flashsale.products));
			console.log(productsId);

			for (let index = 0; index < productsId.length; index++) {
				const e = productsId[index];
				const product = await this.prisma.product.findUnique({
					where: {
						id: e.id,
					},
				});
				productsinfo = [...productsinfo, product];
			}

			return { ...flashsale, productsinfo };
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying vochers please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying vochers request body incorrect', 500);
		}
	}

	public async create(createSellershopDto: CreateSellershopDto) {
		try {
			await this.prisma.shop_info.create({
				data: {
					shop_name: createSellershopDto.name,
					customer_id: createSellershopDto.customer_id,
					shop_address_id: createSellershopDto.shop_address_id,
					phone_number: createSellershopDto.phoneNumber,
					description: '',
					shop_section: {
						create: {
							sections: [],
						},
					},
				},
			});
			return 'Shop created!';
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error creating shop please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error creating shop request body incorrect', 500);
		}
	}

	findAll() {
		return `This action returns all sellershop`;
	}

	update(id: number, updateSellershopDto: UpdateSellershopDto) {
		return `This action updates a #${id} sellershop`;
	}

	remove(id: number) {
		return `This action removes a #${id} sellershop`;
	}
}
