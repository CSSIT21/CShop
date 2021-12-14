import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res } from '@nestjs/common';
import { ShopcustomizationService } from './shopcustomization.service';
import { CreateShopcustomizationDto } from './dto/create-shopcustomization.dto';
import { UpdateShopcustomizationDto } from './dto/update-shopcustomization.dto';
import { Prisma } from '.prisma/client';

@Controller('shopcustomization')
export class ShopcustomizationController {
	constructor(private readonly shopcustomizationService: ShopcustomizationService) {}

	@Patch()
	public async updateSection(@Body() shop_sectionUpdateInput: Prisma.shop_sectionUpdateInput, @Res() res) {
		const result = await this.shopcustomizationService.updateSection(shop_sectionUpdateInput);
		if (result) {
			res.send({ Success: true, result });
		} else {
			res.send({ Success: false });
		}
	}

	@Post('/banner')
	public async createBanner(@Body() shop_bannerCreateInput: Prisma.shop_bannerCreateInput, @Res() res) {
		const result = await this.shopcustomizationService.createBanner(shop_bannerCreateInput);
		if (result) {
			res.send({ Success: true, result });
		} else {
			res.send({ Success: false });
		}
	}

	@Patch('/banner')
	public async updateBanner(
		@Body() shop_bannerWhereUniqueInput: Prisma.shop_bannerWhereUniqueInput,
		@Body() shop_bannerCreateInput: Prisma.shop_bannerCreateInput,
		@Res() res,
	) {
		const result = await this.shopcustomizationService.updateBanner(
			shop_bannerWhereUniqueInput,
			shop_bannerCreateInput,
		);
		if (result) {
			res.send({ Success: true, result });
		} else {
			res.send({ Success: false });
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
