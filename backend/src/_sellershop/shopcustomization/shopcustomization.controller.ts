import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res } from '@nestjs/common';
import { ShopcustomizationService } from './shopcustomization.service';
import { CreateShopcustomizationDto } from './dto/create-shopcustomization.dto';
import { UpdateShopcustomizationDto } from './dto/update-shopcustomization.dto';
import { Prisma } from '.prisma/client';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';

@Controller('shopcustomization')
export class ShopcustomizationController {
	constructor(private readonly shopcustomizationService: ShopcustomizationService) {}

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

	@Get(':id/info')
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

	@Patch(':id')
	async updateSection(
		@Param('id', ParseIntPipe) id: number,
		@Body() shop_sectionUpdateInput: Prisma.shop_sectionUpdateInput,
		@Res() res,
	) {
		const result = await this.shopcustomizationService.updateSection(id, shop_sectionUpdateInput);
		if (result) {
			res.send({ success: true, result });
		} else {
			res.send({ success: false });
		}
	}

	@Post('/banner')
	async createBanner(@Body() shop_bannerCreateInput: Prisma.shop_bannerCreateInput, @Res() res) {
		const result = await this.shopcustomizationService.createBanner(shop_bannerCreateInput);
		if (result) {
			res.send({ success: true, result });
		} else {
			res.send({ success: false });
		}
	}

	@Patch('banner/:id')
	async updateBanner(
		@Body() shop_bannerWhereUniqueInput: Prisma.shop_bannerWhereUniqueInput,
		@Body() shop_bannerCreateInput: Prisma.shop_bannerCreateInput,
		@Res() res,
	) {
		const result = await this.shopcustomizationService.updateBanner(
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
	async createBannerCarousel(
		@Body() shop_banner_carouselCreateInput: Prisma.shop_banner_carouselCreateInput,
		@Res() res,
	) {
		const result = await this.shopcustomizationService.createBannerCarousel(shop_banner_carouselCreateInput);
		if (result) {
			res.send({ success: true, result });
		} else {
			res.send({ success: false });
		}
	}

	@Patch('/bannercarousel')
	async updateBannerCarousel(
		@Body() shop_banner_carouselWhereUniqueInput: Prisma.shop_banner_carouselWhereUniqueInput,
		@Body() shop_banner_carouselUpdateInput: Prisma.shop_banner_carouselUpdateInput,
		@Res() res,
	) {
		const result = await this.shopcustomizationService.updateBannerCarousel(
			shop_banner_carouselWhereUniqueInput,
			shop_banner_carouselUpdateInput,
		);
		if (result) {
			res.send({ success: true, result });
		} else {
			res.send({ success: false });
		}
	}

	@Get()
	findAll() {
		return this.shopcustomizationService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.shopcustomizationService.findOne(+id);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.shopcustomizationService.remove(+id);
	}
}
