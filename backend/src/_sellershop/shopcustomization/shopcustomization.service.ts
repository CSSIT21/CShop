import { HttpException, Injectable } from '@nestjs/common';
import { CreateShopcustomizationDto } from './dto/create-shopcustomization.dto';
import { UpdateShopcustomizationDto } from './dto/update-shopcustomization.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Shop_section } from '.prisma/client';

@Injectable()
export class ShopcustomizationService {
	constructor(private readonly prisma: PrismaService) {}

	async getSection(id: number) {
		try {
			const sections = await this.prisma.shop_section.findUnique({
				where: {
					shop_id: id,
				},
			});

			return sections.sections;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error updating shop sections please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error updating shop sections request body incorrect', 500);
		}
	}

	async getSectionInfo(id: number) {
		try {
			try {
				const shopsections = await this.prisma.shop_section.findUnique({
					where: {
						shop_id: id,
					},
				});
				const sections = shopsections.sections;
				if (shopsections.sections !== null) {
					var parsedsections = JSON.parse(JSON.stringify(sections));
					let resultSections = {};
					console.log(sections);

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
							case Shop_section.ProductCarouselSelect:
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
						let section_id = section.id;
						resultSections = { ...resultSections, [section_id]: { content: { ...section } } };
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
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error updating shop sections please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error updating shop sections request body incorrect', 500);
		}
	}

	async updateSection(id: number, shop_sectionUpdateInput: Prisma.shop_sectionUpdateInput) {
		try {
			await this.prisma.shop_section.update({
				where: {
					shop_id: id,
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

	async saveBanner(
		shop_bannerWhereUniqueInput: Prisma.shop_bannerWhereUniqueInput,
		shop_bannerCreateInput: Prisma.shop_bannerCreateInput,
	) {
		try {
			const section = await this.prisma.shop_banner.findFirst({
				where: {
					id: shop_bannerWhereUniqueInput.id,
				},
			});

			if (section) {
				return this.updateBanner(shop_bannerWhereUniqueInput, shop_bannerCreateInput);
			} else {
				return this.createBanner(shop_bannerCreateInput);
			}
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error creating shop video please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error creating shop video request body incorrect', 500);
		}
	}

	async createBanner(shop_bannerCreateInput: Prisma.shop_bannerCreateInput) {
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

	async updateBanner(
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

	async saveBannerCarousel(
		shop_banner_carouselWhereUniqueInput: Prisma.shop_banner_carouselWhereUniqueInput,
		shop_banner_carouselCreateInput: Prisma.shop_banner_carouselCreateInput,
	) {
		try {
			const section = await this.prisma.shop_banner_carousel.findFirst({
				where: {
					id: shop_banner_carouselWhereUniqueInput.id,
				},
			});

			if (section) {
				return this.updateBannerCarousel(shop_banner_carouselWhereUniqueInput, shop_banner_carouselCreateInput);
			} else {
				return this.createBannerCarousel(shop_banner_carouselCreateInput);
			}
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error creating shop video please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error creating shop video request body incorrect', 500);
		}
	}

	async createBannerCarousel(shop_banner_carouselCreateInput: Prisma.shop_banner_carouselCreateInput) {
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

	async updateBannerCarousel(
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

	async saveVideo(
		shop_videoWhereUniqueInput: Prisma.shop_videoWhereUniqueInput,
		shop_videoCreateInput: Prisma.shop_videoCreateInput,
	) {
		try {
			const section = await this.prisma.shop_video.findFirst({
				where: {
					id: shop_videoWhereUniqueInput.id,
				},
			});
			if (section) {
				return this.updateVideo(shop_videoWhereUniqueInput, shop_videoCreateInput);
			} else {
				return this.createVideo(shop_videoCreateInput);
			}
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error creating shop video please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error creating shop video request body incorrect', 500);
		}
	}

	async createVideo(shop_videoCreateInput: Prisma.shop_videoCreateInput) {
		try {
			await this.prisma.shop_video.create({
				data: {
					id: shop_videoCreateInput.id,
					path: shop_videoCreateInput.path,
					title: 'Youtube video',
				},
			});
			return 'Video Created';
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error creating shop video please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error creating shop video request body incorrect', 500);
		}
	}

	async updateVideo(
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
			return 'Video Updated';
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error updating shop video please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error updating shop video request body incorrect', 500);
		}
	}

	async saveProductCarousel(
		shop_product_carouselWhereUniqueInput: Prisma.shop_product_carouselWhereUniqueInput,
		shop_product_carouselCreateInput: Prisma.shop_product_carouselCreateInput,
	) {
		try {
			const section = await this.prisma.shop_video.findFirst({
				where: {
					id: shop_product_carouselWhereUniqueInput.id,
				},
			});
			if (section) {
				return this.updateProductCarousel(
					shop_product_carouselWhereUniqueInput,
					shop_product_carouselCreateInput,
				);
			} else {
				return this.createProductCarousel(shop_product_carouselCreateInput);
			}
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error creating shop video please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error creating shop video request body incorrect', 500);
		}
	}

	async createProductCarousel(shop_product_carouselCreateInput: Prisma.shop_product_carouselCreateInput) {
		try {
			await this.prisma.shop_product_carousel.create({
				data: shop_product_carouselCreateInput,
			});
			return 'Product Carousel Created';
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error creating shop product carousel please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error creating shop product carousel request body incorrect', 500);
		}
	}

	async updateProductCarousel(
		shop_product_carouselWhereUniqueInput: Prisma.shop_product_carouselWhereUniqueInput,
		shop_product_carouselCreateInput: Prisma.shop_product_carouselCreateInput,
	) {
		try {
			await this.prisma.shop_product_carousel.update({
				where: {
					id: shop_product_carouselWhereUniqueInput.id,
				},
				data: shop_product_carouselCreateInput,
			});
			return 'Product Carousel Updated';
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error updating shop video please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error updating shop video request body incorrect', 500);
		}
	}

	// async createProductCarousel(shop_product_carouselCreateInput) {
	// 	try {
	// 		await this.prisma.shop_product_carousel.create({
	// 			data: shop_product_carouselCreateInput,
	// 		});
	// 		return 'Product Carousel Created';
	// 	} catch (e) {
	// 		if (e instanceof Prisma.PrismaClientKnownRequestError) {
	// 			console.log(e.message);
	// 			throw new HttpException('Error creating shop product carousel please check your information!', 500);
	// 		}
	// 		console.log(e.message);
	// 		throw new HttpException('Error creating shop product carousel request body incorrect', 500);
	// 	}
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
