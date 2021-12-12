import { Catch, HttpException, Injectable } from '@nestjs/common';
import { CreateSellershopDto } from './dto/create-sellershop.dto';
import { UpdateSellershopDto } from './dto/update-sellershop.dto';
import { Prisma } from '.prisma/client';
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
			// const shopsections = await this.prisma.shop_section.findUnique({
			// 	where: {
			// 		shop_id: shopinfo.id,
			// 	},
			// });
			// const sections = shopsections.sections;

			return { ...shopinfo, products, categories };
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

			var parsedsections = JSON.parse(JSON.stringify(sections));
			let resultSections = [];
			for (let index = 0; index < parsedsections.length; index++) {
				let section;

				switch (parsedsections[index].type) {
					case 1:
						section = await this.prisma.shop_banner.findUnique({
							where: {
								id: parsedsections[index].id,
							},
						});
						section = { ...section, type: 1 };
						break;
					case 2:
						section = await this.prisma.shop_banner_carousel.findUnique({
							where: {
								id: parsedsections[index].id,
							},
						});
						section = { ...section, type: 2 };
						break;
					case 3:
						section = await this.prisma.shop_product_carousel.findUnique({
							where: {
								id: parsedsections[index].id,
							},
						});
						section = { ...section, type: 3 };
						break;
					case 4:
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
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying sections please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying sections request body incorrect', 500);
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
