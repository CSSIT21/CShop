import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
	Res,
	Query,
	DefaultValuePipe,
	ParseBoolPipe,
	ParseFloatPipe,
} from '@nestjs/common';
import { SellershopService } from './sellershop.service';
import { CreateSellershopDto } from './dto/create-sellershop.dto';
import { UpdateSellershopDto } from './dto/update-sellershop.dto';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import internal from 'stream';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('sellershop')
export class SellershopController {
	constructor(private readonly sellershopService: SellershopService, private readonly prisma: PrismaService) { }

	@Get(':id')
	@Public()
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

	@Get('/products/:id')
	@Public()
	public async findProducts(
		@Param('id', ParseIntPipe) id: number,
		@Query('page', ParseIntPipe) page: number,
		@Query('category', new DefaultValuePipe(0), ParseIntPipe) category_id: number,
		@Query('priceLow', new DefaultValuePipe(0), ParseFloatPipe) priceLow: number,
		@Query('priceHigh', new DefaultValuePipe(50000), ParseFloatPipe) priceHigh: number,
		@Query('readyToShip', new DefaultValuePipe(true), ParseBoolPipe) readyToShip: boolean,
		@Query('outOfStock', new DefaultValuePipe(false), ParseBoolPipe) outOfStock: boolean,
		@Query('rating', new DefaultValuePipe(0), ParseFloatPipe) rating: number,
		@Query('customer_id', new DefaultValuePipe(0), ParseIntPipe) customer_id: number,
		@Res() res,
	) {
		const products = await this.sellershopService.getShopProduct(
			id,
			page,
			category_id,
			priceLow,
			priceHigh,
			readyToShip,
			outOfStock,
			rating,
			customer_id,
		);

		if (products) {
			res.send({ success: true, ...products });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Get('/follow/:id')
	@Public()
	public async checkFollowShop(
		@Query('customer_id', ParseIntPipe) customer_id: number,
		@Param('id', ParseIntPipe) shop_id: number,
		@Res() res,
	) {
		const result = await this.sellershopService.checkFollow(customer_id, shop_id);
		if (result) {
			res.send({ success: true, result });
		} else {
			res.send({ success: true, result });
		}
	}

	@Post('/follow/:id')
	@Public()
	public async followShop(
		@Body() customer_followed_shopCreateManyInput: Prisma.customer_followed_shopCreateManyInput,
		@Param('id', ParseIntPipe) id: number,
		@Res() res,
	) {
		const result = await this.sellershopService.followShop(customer_followed_shopCreateManyInput, id);
		if (result) {
			res.send({ success: true, result });
		} else {
			res.send({ success: false });
		}
	}

	@Get('sections/:id')
	@Public()
	public async findSections(
		@Param('id', ParseIntPipe) id: number,
		@Query('customer_id', ParseIntPipe) customer_id: number,
		@Res() res,
	) {
		const sections = await this.sellershopService.getShopSection(id, customer_id);
		if (sections) {
			res.send({ success: true, sections });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Get(':id/shopcomments')
	@Public()
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
	@Public()
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

	@Post(':id/shopdiscounts')
	@Public()
	public async findShopDiscount(
		@Param('id', ParseIntPipe) id: number,
		@Body() discount_user_codeWhereInput: Prisma.discount_user_codeWhereInput,
		@Res() res,
	) {
		const shopvouchers = await this.sellershopService.getShopDiscount(id, discount_user_codeWhereInput);
		if (shopvouchers) {
			res.send({ success: true, shopvouchers });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Get(':id/flashsale')
	@Public()
	public async findFlashSales(
		@Param('id', ParseIntPipe) id: number,
		@Query('customer_id', ParseIntPipe) customer_id: number,
		@Res() res,
	) {
		const flashsale = await this.sellershopService.getFlashSale(id, customer_id);
		if (flashsale) {
			res.send({ success: true, flashsale });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Post()
	@Public()
	public async create(
		@Body() shop_pictureCreateInput: Prisma.shop_pictureCreateInput,
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
			shop_pictureCreateInput,
		);
		if (shop) {
			res.send({ success: true, shop });
		} else {
			res.send({
				success: false,
			});
		}
	}
}
