import { HttpException, Injectable } from '@nestjs/common';
import { CreateShopcustomizationDto } from './dto/create-shopcustomization.dto';
import { UpdateShopcustomizationDto } from './dto/update-shopcustomization.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '.prisma/client';

@Injectable()
export class ShopcustomizationService {
	constructor(private readonly prisma: PrismaService) {}

	public async updateSection(shop_sectionUpdateInput: Prisma.shop_sectionUpdateInput) {
		try {
			await this.prisma.shop_section.update({
				where: {
					shop_id: 1,
				},
				data: {
					sections: shop_sectionUpdateInput.sections,
				},
			});

			return 'Sections updated!';
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error updating shop sections please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error updating shop sections request body incorrect', 500);
		}
	}

	public async createBanner(shop_bannerCreateInput: Prisma.shop_bannerCreateInput) {
		try {
			await this.prisma.shop_banner.create({
				data: {
					id: shop_bannerCreateInput.id,
					path: shop_bannerCreateInput.path,
					thumbnail: shop_bannerCreateInput.thumbnail,
					title: shop_bannerCreateInput.title,
				},
			});
			return 'Banner created!';
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error creating shop banner please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error creating shop banner request body incorrect', 500);
		}
	}

	public async updateBanner(
		shop_bannerWhereUniqueInput: Prisma.shop_bannerWhereUniqueInput,
		shop_bannerUpdateInput: Prisma.shop_bannerUpdateInput,
	) {
		try {
			await this.prisma.shop_banner.update({
				where: {
					id: shop_bannerWhereUniqueInput.id,
				},
				data: {
					path: shop_bannerUpdateInput.path,
					thumbnail: shop_bannerUpdateInput.thumbnail,
					title: shop_bannerUpdateInput.title,
				},
			});
			return 'Banner updated!';
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error updating shop banner please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error updating shop banner request body incorrect', 500);
		}
	}

	public async createBannerCarousel(shop_banner_carouselCreateInput: Prisma.shop_banner_carouselCreateInput) {
		try {
			console.log(shop_banner_carouselCreateInput);

			await this.prisma.shop_banner_carousel.create({
				data: {
					id: shop_banner_carouselCreateInput.id,
					banners: shop_banner_carouselCreateInput.banners,
				},
			});
			return 'BannerCarousel created!';
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error creating shop banner carousel please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error creating shop banner carousel request body incorrect', 500);
		}
	}

	public async updateBannerCarousel(
		shop_banner_carouselWhereUniqueInput: Prisma.shop_banner_carouselWhereUniqueInput,
		shop_banner_carouselUpdateInput: Prisma.shop_banner_carouselUpdateInput,
	) {
		try {
			await this.prisma.shop_banner_carousel.update({
				where: {
					id: shop_banner_carouselWhereUniqueInput.id,
				},
				data: {
					banners: shop_banner_carouselUpdateInput.banners,
				},
			});
			return 'Banner updated!';
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error updating shop banner carousel please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error updating shop banner carousel request body incorrect', 500);
		}
	}

	public async createVideo(shop_videoCreateInput: Prisma.shop_videoCreateInput) {
		try {
			await this.prisma.shop_video.create({
				data: shop_videoCreateInput,
			});
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error creating shop video please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error creating shop video request body incorrect', 500);
		}
	}

	public async updateVideo(
		shop_videoWhereUniqueInput: Prisma.shop_videoWhereUniqueInput,
		shop_videoUpdateInput: Prisma.shop_videoUpdateInput,
	) {
		try {
			await this.prisma.shop_video.update({
				where: {
					id: shop_videoWhereUniqueInput.id,
				},
				data: {
					path: shop_videoUpdateInput.path,
					title: 'Youtube video',
				},
			});
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error updating shop video please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error updating shop video request body incorrect', 500);
		}
	}

	public async createProductCarousel(shop_product_carouselCreateInput: Prisma.shop_product_carouselCreateInput) {
		try {
			await this.prisma.shop_product_carousel.create({
				data: shop_product_carouselCreateInput,
			});
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error creating shop product carousel please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error creating shop product carousel request body incorrect', 500);
		}
	}

	// public async updateProductCarousel(
	// 	shop_product_carouselWhereUniqueInput: Prisma.shop_product_carouselWhereUniqueInput,
	// 	shop_product_carouselCreateInput: Prisma.shop_product_carouselCreateInput,
	// ) {
	// 	try {
	// 		await this.prisma.shop_product_carousel.update({
	// 			where: {
	// 				id: shop_product_carouselWhereUniqueInput.id,
	// 			},
	// 			data: {
	// 				filter_name: shop_product_carouselCreateInput.filter_name,
	// 				products: shop_product_carouselCreateInput.products,
	// 			},
	// 		});
	// 	} catch (error) {}
	// }

	findAll() {
		return `This action returns all shopcustomization`;
	}

	findOne(id: number) {
		return `This action returns a #${id} shopcustomization`;
	}

	remove(id: number) {
		return `This action removes a #${id} shopcustomization`;
	}
}
