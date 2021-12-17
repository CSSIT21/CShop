import { HttpException, Injectable } from '@nestjs/common';
import { CreateShopcustomizationDto } from './dto/create-shopcustomization.dto';
import { UpdateShopcustomizationDto } from './dto/update-shopcustomization.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '.prisma/client';

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

			await this.prisma.shop_info.update({
				where: {
					id: id,
				},
				data: {
					last_active: new Date(Date.now()),
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
							case 'Banners':
								section = await this.prisma.shop_banner.findUnique({
									where: {
										id: parsedsections[index].id,
									},
								});
								section = { ...section, type: 1 };
								break;
							case 'BannersCarousel':
								section = await this.prisma.shop_banner_carousel.findUnique({
									where: {
										id: parsedsections[index].id,
									},
								});
								section = { ...section, type: 2 };
								break;
							case 'ProductCarousel':
								section = await this.prisma.shop_product_carousel.findUnique({
									where: {
										id: parsedsections[index].id,
									},
								});
								const shop_category = await this.prisma.shop_category.findFirst({
									where: {
										title: section.category,
									},
									select: {
										products: true,
										id: true,
									},
								});
								const products = await this.prisma.product.findMany({
									where: {
										id: {
											in: shop_category.products,
										},
									},
									include: {
										product_picture: true,
									},
								});
								section = { ...section, shop_category_id: shop_category.id, products, type: 3 };
								break;
							case 'ProductCarouselSelect':
								section = await this.prisma.shop_product_carousel_select.findUnique({
									where: {
										id: parsedsections[index].id,
									},
								});
								const products_info = await this.prisma.product.findMany({
									where: {
										id: {
											in: section.products,
										},
									},
									include: {
										product_picture: true,
									},
								});
								section = { ...section, products_info, type: 3 };
								break;
							case 'Video':
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

	async getShopProduct(id: number) {
		try {
			const products = await this.prisma.product.findMany({
				where: {
					shop_id: id,
				},
				include: {
					product_picture: true,
				},
				take: 20,
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

	async getCategory(id: number) {
		try {
			const categories = await this.prisma.shop_category.findMany({
				where: {
					shop_id: id,
				},
			});
			return categories;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying products please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying products request body incorrect', 500);
		}
	}

	async getProductFromCategory(id: number) {
		try {
			const shop_category = await this.prisma.shop_category.findFirst({
				where: {
					id: id,
				},
				select: {
					products: true,
					id: true,
				},
			});
			const products = await this.prisma.product.findMany({
				where: {
					id: {
						in: shop_category.products,
					},
				},
				include: {
					product_picture: true,
				},
			});
			return { products, shop_category_id: shop_category.id };
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying products please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying products request body incorrect', 500);
		}
	}

	async updateSection(
		id: number,
		shop_sectionUpdateInput: Prisma.shop_sectionUpdateInput,
		shop_section_logCreateInput: Prisma.shop_section_logCreateInput,
	) {
		try {
			await this.prisma.shop_section.update({
				where: {
					shop_id: id,
				},
				data: {
					sections: shop_sectionUpdateInput.sections,
				},
			});

			await this.prisma.shop_section_log.create({
				data: {
					device: shop_section_logCreateInput.device,
					shop_id: id,
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

	async saveProductCarousel(body) {
		try {
			const section = await this.prisma.shop_product_carousel.findFirst({
				where: {
					id: body.id,
				},
			});
			console.log(section);

			if (section) {
				return this.updateProductCarousel(body);
			} else {
				return this.createProductCarousel(body);
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

	async createProductCarousel(body) {
		try {
			await this.prisma.shop_product_carousel.create({
				data: {
					category: body.category,
					id: body.id,
				},
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

	async updateProductCarousel(body) {
		try {
			await this.prisma.shop_product_carousel.update({
				where: {
					id: body.id,
				},
				data: {
					category: body.category,
				},
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

	async saveProductCarouselSelect(
		shop_product_carouselWhereUniqueInput: Prisma.shop_product_carouselWhereUniqueInput,
		shop_product_carouselCreateInput: Prisma.shop_product_carouselCreateInput,
	) {
		try {
			const section = await this.prisma.shop_product_carousel_select.findFirst({
				where: {
					id: shop_product_carouselWhereUniqueInput.id,
				},
			});
			if (section) {
				return this.updateProductCarouselSelect(
					shop_product_carouselWhereUniqueInput,
					shop_product_carouselCreateInput,
				);
			} else {
				return this.createProductCarouselSelect(shop_product_carouselCreateInput);
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

	async createProductCarouselSelect(shop_product_carouselCreateInput: Prisma.shop_product_carouselCreateInput) {
		try {
			await this.prisma.shop_product_carousel_select.create({
				data: shop_product_carouselCreateInput,
			});
			return 'Product Carousel Select Created';
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error creating shop product carousel please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error creating shop product carousel request body incorrect', 500);
		}
	}

	async updateProductCarouselSelect(
		shop_product_carouselWhereUniqueInput: Prisma.shop_product_carouselWhereUniqueInput,
		shop_product_carouselCreateInput: Prisma.shop_product_carouselCreateInput,
	) {
		try {
			await this.prisma.shop_product_carousel_select.update({
				where: {
					id: shop_product_carouselWhereUniqueInput.id,
				},
				data: {
					filter_name: shop_product_carouselCreateInput.filter_name,
					products: shop_product_carouselCreateInput.products,
				},
			});
			return 'Product Carousel Select Updated';
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error updating shop video please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error updating shop video request body incorrect', 500);
		}
	}
}
