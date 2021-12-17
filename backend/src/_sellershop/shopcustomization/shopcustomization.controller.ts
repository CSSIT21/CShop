import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res } from '@nestjs/common';
import { ShopcustomizationService } from './shopcustomization.service';
import { CreateShopcustomizationDto } from './dto/create-shopcustomization.dto';
import { UpdateShopcustomizationDto } from './dto/update-shopcustomization.dto';
import { Prisma } from '.prisma/client';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';


@Controller('shopcustomization')
export class ShopcustomizationController {
	constructor(private readonly shopcustomizationService: ShopcustomizationService) { }


	@Get(':id')
	async findSections(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const sections = await this.shopcustomizationService.getSection(id);
		if (sections) {
			res.send({ success: true, sections });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Get('info/:id')
	async findSectionsInfo(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const sections_info = await this.shopcustomizationService.getSectionInfo(id);
		if (sections_info) {
			res.send({ success: true, sections_info });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Get('products/:id')
	async findProducts(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const products = await this.shopcustomizationService.getShopProduct(id);
		if (products) {
			res.send({ success: true, products });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Get('category/:id')
	async findCategory(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const categories = await this.shopcustomizationService.getCategory(id);
		if (categories) {
			res.send({ success: true, categories });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Get('categoryproducts/:id')
	async findProductFromCategory(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const products = await this.shopcustomizationService.getProductFromCategory(id);
		if (products) {
			res.send({ success: true, products });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Patch(':id')
	async updateSection(
		@Param('id', ParseIntPipe) id: number,
		@Body() shop_sectionUpdateInput: Prisma.shop_sectionUpdateInput,
		@Body() shop_section_logCreateInput: Prisma.shop_section_logCreateInput,
		@Res() res,
	) {
		const result = await this.shopcustomizationService.updateSection(
			id,
			shop_sectionUpdateInput,
			shop_section_logCreateInput,
		);
		if (result) {
			res.send({ success: true, result });
		} else {
			res.send({ success: false });
		}
	}

	@Post('/banner')
	async saveBanner(
		@Body() shop_bannerWhereUniqueInput: Prisma.shop_bannerWhereUniqueInput,
		@Body() shop_bannerCreateInput: Prisma.shop_bannerCreateInput,
		@Res() res,
	) {
		const result = await this.shopcustomizationService.saveBanner(
			shop_bannerWhereUniqueInput,
			shop_bannerCreateInput,
		);
		if (result) {
			res.send({ success: true, result });
		} else {
			res.send({ success: false });
		}
	}

	@Post('/bannercarousel')
	async saveBannerCarousel(
		@Body() shop_banner_carouselWhereUniqueInput: Prisma.shop_banner_carouselWhereUniqueInput,
		@Body() shop_banner_carouselCreateInput: Prisma.shop_banner_carouselCreateInput,
		@Res() res,
	) {
		const result = await this.shopcustomizationService.saveBannerCarousel(
			shop_banner_carouselWhereUniqueInput,
			shop_banner_carouselCreateInput,
		);
		if (result) {
			res.send({ success: true, result });
		} else {
			res.send({ success: false });
		}
	}

	@Post('/video')
	async saveVideo(
		@Body() shop_videoWhereUniqueInput: Prisma.shop_videoWhereUniqueInput,
		@Body() shop_videoCreateInput: Prisma.shop_videoCreateInput,
		@Res() res,
	) {
		const result = await this.shopcustomizationService.saveVideo(shop_videoWhereUniqueInput, shop_videoCreateInput);
		if (result) {
			res.send({ success: true, result });
		} else {
			res.send({ success: false });
		}
	}

	@Post('/productcarousel')
	async saveProductcarousel(@Body() body, @Res() res) {
		const result = await this.shopcustomizationService.saveProductCarousel(body);
		if (result) {
			res.send({ success: true, result });
		} else {
			res.send({ success: false });
		}
	}

	@Post('/productcarouselselect')
	async saveProductcarouselselect(
		@Body() shop_product_carousel_selectWhereUniqueInput: Prisma.shop_product_carousel_selectWhereUniqueInput,
		@Body() shop_product_carousel_selectCreateInput: Prisma.shop_product_carousel_selectCreateInput,
		@Res() res,
	) {
		const result = await this.shopcustomizationService.saveProductCarouselSelect(
			shop_product_carousel_selectWhereUniqueInput,
			shop_product_carousel_selectCreateInput,
		);
		if (result) {
			res.send({ success: true, result });
		} else {
			res.send({ success: false });
		}
	}
}

