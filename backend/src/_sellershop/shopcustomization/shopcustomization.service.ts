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
			console.log(shop_sectionUpdateInput);

			await this.prisma.shop_section.update({
				where: {
					shop_id: 11,
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
				throw new HttpException('Error creating shop banner please check your information!', 500);
			}
			console.log(e.message);
		}
	}

	public async createBannerCarousel(shop_banner_carouselCreateInput: Prisma.shop_banner_carouselCreateInput) {
		try {
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
				throw new HttpException('Error creating shop banner please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error creating shop banner request body incorrect', 500);
		}
	}

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
