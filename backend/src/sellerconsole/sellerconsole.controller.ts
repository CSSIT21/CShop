import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, ParseIntPipe } from '@nestjs/common';
import { SellerconsoleService } from './sellerconsole.service';
import { CreateSellerconsoleDto } from './dto/create-sellerconsole.dto';
import { UpdateSellerconsoleDto } from './dto/update-sellerconsole.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { PrismaClient } from '@prisma/client';
import { request } from 'http';

@Controller('sellerconsole')
export class SellerconsoleController {
	constructor(private readonly sellerconsoleService: SellerconsoleService) {}

	@Get(':id/mydiscount')
	@Public()
	getMyDiscount(@Param('id') id: number) {
		const res = this.sellerconsoleService.getmyDiscount(+id);
		// const title = this.sellerconsoleService.getProductName(discountid);
		return res;
	}

	@Get(':id/stockhistory')
	@Public()
	getHistoryStock(@Param('id') id: number) {
		const res = this.sellerconsoleService.getstockHistory(+id);
		return res;
	}

	@Get(':id/stock')
	@Public()
	async getStock(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const result = await this.sellerconsoleService.getStock(+id);
		res.send(result);
	}

	@Get(':id/cardToProduct')
	@Public()
	getCardToProduct(@Param('id') id: number) {
		return this.sellerconsoleService.CardOfProduct(+id);
	}

	@Get(':id/cardToFollows')
	@Public()
	getCardToFollows(@Param('id') id: number) {
		return this.sellerconsoleService.CardOfFollows(+id);
	}

	@Get(':id/cardToRating')
	@Public()
	getCardToRating(@Param('id') id: number) {
		return this.sellerconsoleService.CardOfRating(+id);
	}

	@Get(':id/cardToSales')
	@Public()
	getCardToSales(@Param('id', ParseIntPipe) id: number) {
		return this.sellerconsoleService.CardOfSales(+id);
	}

	@Post(':id/addToProduct')
	@Public()
	async getStockLog(@Body() request, @Res() res): Promise<any> {
		var id = request.id;
		var shop_id = request.shop_id;
		var title = request.title;
		var sub_title = request.sub_title;
		var price = request.price;
		var quantity = request.quantity;
		var category_id = request.category_id;
		// var sold = request.sold;
		// var suggest_products = request.suggest_products;
		// var rating = request.rating;
		console.log(shop_id);
		const a = await this.sellerconsoleService.AddToStock(
			id,
			shop_id,
			title,
			sub_title,
			price,
			quantity,
			category_id,
		);
		console.log(a);
		const b = await this.sellerconsoleService.UpdatetoStockLog(shop_id, a, quantity);
		console.log(a, b);
		// res.send(a);
		res.send(b);
	}

	@Get(':id/orderHistory')
	async getOrderhistory(@Param('id') id: number) {
		const res = await this.sellerconsoleService.getOrderHistory(+id);
		return res;
	}

	@Post(':id/acceptOrderStatus')
	async acceptOrderStatus(@Body() Order, @Res() res) {
		let order_id = Order.order_id;
		let product_id = Order.product_id;
		let shop_id = Order.shop_id;
		let started_date = Order.started_date;
		let status = 'Accept';
		const addToOrderHistory = await this.sellerconsoleService.addOrderStatusToOrderHistory(
			order_id,
			product_id,
			shop_id,
			started_date,
			status,
		);
		const removeOrderFromOrderStatus = await this.sellerconsoleService.removeOrderFromOrderStatus(order_id);
		res.send(addToOrderHistory);
		res.send(removeOrderFromOrderStatus);
	}

	@Post(':id/cancelOrderStatus')
	async cancelOrderStatus(@Body() Order, @Res() res) {
		let order_id = Order.order_id;
		let product_id = Order.product_id;
		let shop_id = Order.shop_id;
		let started_date = Order.started_date;
		let status = 'Cancel';
		const addToOrderHistory = await this.sellerconsoleService.addOrderStatusToOrderHistory(
			order_id,
			product_id,
			shop_id,
			started_date,
			status,
		);
		const removeOrderFromOrderStatus = await this.sellerconsoleService.removeOrderFromOrderStatus(order_id);
		res.send(addToOrderHistory);
		res.send(removeOrderFromOrderStatus);
	}

	@Post(':id/discount')
	@Public()
	async discount(@Body() request, @Res() res) {
		var id = request.id;
		var code = request.code;
		var start_date = request.start_date;
		var end_date = request.end_date;
		var description = request.description;
		var class_types = request.class;
		var min_price = request.min_price;
		var reduce_price = request.reduce_price;
		var picture_path = request.picture_path;
		var picture_thumbnail = request.picture_thumbnail;
		var picture_title = request.picture_title;
		var quantity = request.quantity;
		var max_quantity = request.max_quantity;
		const discountReduce = await this.sellerconsoleService.Discount(
			code,
			start_date,
			end_date,
			description,
			class_types,
			min_price,
			reduce_price,
			picture_path,
			picture_thumbnail,
			picture_title,
		);
		const discountShop = await this.sellerconsoleService.DiscountShop(id, discountReduce, quantity, max_quantity);
		res.send(discountShop);
	}

	@Get(':id/shopinfo')
	@Public()
	async getOneshopinfo(@Param('id', ParseIntPipe) shopid: number) {
		const result = await this.sellerconsoleService.getShopInfo(shopid);
		return result;
	}

	@Post(':id/updateShopinfo')
	@Public()
	async updateShopinfo(@Param('id', ParseIntPipe) shopid: number, @Body() request, @Res() res) {
		let shopname = request.shop_name;
		let phonenumber = request.phone_number;
		let description = request.description;
		const result = await this.sellerconsoleService.updateShopInfo(shopid, shopname, phonenumber, description);
		res.send(result);
	}

	@Get(':id/myCoupon')
	@Public()
	async getMyCoupon(@Param('id', ParseIntPipe) shopid: number, @Res() res) {
		const result = await this.sellerconsoleService.getMyCoupon(shopid);
		res.send(result);
	}

	@Get(':id/getcustomerviews')
	@Public()
	async getCustomerViews(@Param('id', ParseIntPipe) shopid: number, @Res() res) {
		const result = await this.sellerconsoleService.getCustomerViews(shopid);
		res.send(result);
	}

	@Post(':id/flashShell')
	@Public()
	async  getflashShell (@Param('id', ParseIntPipe) shop_id: number, @Body() flash, @Res() res ) {
		// var shop_id = flash.shop_id;
		var title = flash.title;
		var path = flash.path;
		var thumbnail = flash.thumbnail;
		var description  = flash.description;
		// var started_date = flash.started_date;
		// var ended_date = flash.ended_date;
		const answer = await this.sellerconsoleService.getFlashShell(shop_id,title,path,thumbnail,description)
		return answer;
	}
}

	

// @Post()
//   @Public()
//   create(@Body() createSellerconsoleDto: CreateSellerconsoleDto) {
//     return this.sellerconsoleService.create(createSellerconsoleDto);
//   }

//   @Patch(':id')
//   @Public()
//   update(@Param('id') id: string, @Body() updateSellerconsoleDto: UpdateSellerconsoleDto) {
//     return this.sellerconsoleService.update(+id, updateSellerconsoleDto);
//   }

//   @Delete(':id')
//   @Public()
//   remove(@Param('id') id: string) {
//     return this.sellerconsoleService.remove(+id);
//   }
