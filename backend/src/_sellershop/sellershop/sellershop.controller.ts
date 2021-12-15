import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res, Query } from '@nestjs/common';
import { SellershopService } from './sellershop.service';
import { CreateSellershopDto } from './dto/create-sellershop.dto';
import { UpdateSellershopDto } from './dto/update-sellershop.dto';
import { Prisma, Shop_section } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import internal from 'stream';

@Controller('sellershop')
export class SellershopController {
	constructor(private readonly sellershopService: SellershopService, private readonly prisma: PrismaService) {}

	@Get(':id')
	public async findOne(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const shopinfo = await this.sellershopService.findOne(id);
		if (shopinfo) {
			res.send({ success: true, shopinfo });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Get(':id/products')
	public async findProducts(
		@Param('id', ParseIntPipe) id: number,
		@Query('page', ParseIntPipe) page: number,
		@Res() res,
	) {
		const products = await this.sellershopService.getShopProduct(id, page);
		if (products) {
			res.send({ success: true, products });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Get(':id/sections')
	public async findSections(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const sections = await this.sellershopService.getShopSection(id);
		if (sections) {
			res.send({ success: true, sections });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Get(':id/shopcomments')
	public async findShopComments(
		@Param('id', ParseIntPipe) id: number,
		@Query('page', ParseIntPipe) page: number,
		@Res() res,
	) {
		const shopcomments = await this.sellershopService.getShopComments(id, page);
		if (shopcomments) {
			res.send({ success: true, shopcomments });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Get(':id/shopproductscomments')
	public async findShopProductsComments(
		@Param('id', ParseIntPipe) id: number,
		@Query('page', ParseIntPipe) page: number,
		@Res() res,
	) {
		const shopproductscomments = await this.sellershopService.getShopProductComments(id, page);
		if (shopproductscomments) {
			res.send({ success: true, shopproductscomments });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Get(':id/shopdiscounts')
	public async findShopDiscount(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const shopvouchers = await this.sellershopService.getShopDiscount(id);
		if (shopvouchers) {
			res.send({ success: true, shopvouchers });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Get(':id/flashsale')
	public async findFlashSales(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const flashsale = await this.sellershopService.getFlashSale(id);
		if (flashsale) {
			res.send({ success: true, flashsale });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Post()
	public async create(
		@Body() shop_infoCreateInput: Prisma.shop_infoCreateInput,
		@Body() addressCreateInput: Prisma.addressCreateInput,
		@Body() payment_shop_bank_accountCreateInput: Prisma.payment_shop_bank_accountCreateInput,
		@Body() Body: any,
		@Res() res,
	) {
		const shop = await this.sellershopService.create(
			Body,
			shop_infoCreateInput,
			addressCreateInput,
			payment_shop_bank_accountCreateInput,
		);
		if (shop) {
			res.send({ success: true, shop });
		} else {
			res.send({
				success: false,
			});
		}
		// this.prisma.shop_flashsale.create({
		// 	data: {
		// 		description: 'Sugoi Dekai',
		// 		ended_date: new Date(),
		// 		path: '',
		// 		products: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
		// 		shop_id: 1,
		// 		started_date: '',
		// 		title: '',
		// 	},
		// });
		// res.send({
		// 	success: true,
		// });
	}

	@Get()
	findAll() {
		return this.sellershopService.findAll();
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateSellershopDto: UpdateSellershopDto) {
		return this.sellershopService.update(+id, updateSellershopDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.sellershopService.remove(+id);
	}
}
