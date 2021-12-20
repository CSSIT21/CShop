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
	async AddToStock(@Body() request, @Res() res): Promise<any> {
		// shopId: number,
		// title: string,
		// sub_title: string,
		// price: number,
		// quantity: number,
		// categoryId: number,
		// path: string,
		// thumbnail: string,
		let shop_id = request.shop_id;
		let title = request.title;
		let sub_title = request.sub_title;
		let price = request.price;
		let quantity = request.quantity;
		let category_id = request.category_id;
		let path = request.path;
		let thumbnail = request.thumbnail;
		const addtostock_id = await this.sellerconsoleService.AddToStock(
			shop_id,
			title,
			sub_title,
			price,
			quantity,
			category_id,
			path,
			thumbnail,
		);
		const updateTostocklog = await this.sellerconsoleService.UpdatetoStockLog(shop_id, addtostock_id, quantity);
		res.send(updateTostocklog);
	}

	// @Post(':id/addToProductPicture')
	// @Public()
	// async AddToStock_Picture(@Body() request,@Res() res) {
	// 	let product_id = request.product_id;
	// 	let title = request.title;
	// 	let path = request.path;
	// 	let thumbnail = request.thumbnail;

	// 	// product_id: product_id,
	// 	// title: title,
	// 	// path: path,
	// 	// thumbnail: thumbnail,
	// 	const addtostock_picture = await this.sellerconsoleService.AddToStock_Picture(
	// 		product_id,
	// 		title,
	// 		path,
	// 		thumbnail
	// 	);
	// 	res.send(addtostock_picture)
	// }

	// @Post(':id/acceptOrderStatus')
	// async acceptOrderStatus(@Body() Order, @Res() res) {
	// 	let order_id = Order.order_id;
	// 	let product_id = Order.product_id;
	// 	let shop_id = Order.shop_id;
	// 	let started_date = Order.started_date;
	// 	let status = 'Accept';
	// 	const addToOrderHistory = await this.sellerconsoleService.addOrderStatusToOrderHistory(
	// 		order_id,
	// 		product_id,
	// 		shop_id,
	// 		started_date,
	// 		status,
	// 	);
	// 	const removeOrderFromOrderStatus = await this.sellerconsoleService.removeOrderFromOrderStatus(order_id);
	// 	res.send(addToOrderHistory);
	// 	res.send(removeOrderFromOrderStatus);
	// }

	// @Post(':id/cancelOrderStatus')
	// async cancelOrderStatus(@Body() Order, @Res() res) {
	// 	let order_id = Order.order_id;
	// 	let product_id = Order.product_id;
	// 	let shop_id = Order.shop_id;
	// 	let started_date = Order.started_date;
	// 	let status = 'Cancel';
	// 	const addToOrderHistory = await this.sellerconsoleService.addOrderStatusToOrderHistory(
	// 		order_id,
	// 		product_id,
	// 		shop_id,
	// 		started_date,
	// 		status,
	// 	);
	// 	const removeOrderFromOrderStatus = await this.sellerconsoleService.removeOrderFromOrderStatus(order_id);
	// 	res.send(addToOrderHistory);
	// 	res.send(removeOrderFromOrderStatus);
	// }

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
		let title = request.title;
		let path = request.path;
		let thumbnail = request.thumbnail;
		const result = await this.sellerconsoleService.updateShopInfo(
			shopid,
			shopname,
			phonenumber,
			description,
			title,
			path,
			thumbnail,
		);
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

	// @Post(':id/createflashsales')
	// @Public()
	// async createFlashShell(@Param('id', ParseIntPipe) shop_id: number, @Body() flash, @Res() res) {
	// 	// var shop_id = flash.shop_id;
	// 	var title = flash.title;
	// 	var path = flash.path;
	// 	var thumbnail = flash.thumbnail;
	// 	var description = flash.description;
	// 	// var started_date = flash.started_date;
	// 	// var ended_date = flash.ended_date;
	// 	const answer = await this.sellerconsoleService.createFlashShell(shop_id, title, path, thumbnail, description);
	// 	return answer;
	// }

	@Post(':id/newflashsales')
	@Public()
	async newFlashsales(@Param('id', ParseIntPipe) shopid: number, @Body() req, @Res() res) {
		// shop_id: shopid,
		// title: title,
		// path: path,
		// thumbnail: thumbnail,
		// description: description,
		// started_date: started_date,
		// ended_date: ended_date,
		// products: [product],
		let shop_id = shopid;
		let title = req.title;
		let path = req.path;
		let thumbnail = req.thumbnail;
		let description = req.description;
		let started_date = req.started_date;
		let ended_date = req.ended_date;
		const result = await this.sellerconsoleService.newFlashsales(
			shop_id,
			title,
			path,
			thumbnail,
			description,
			started_date,
			ended_date,
		);
		res.send(result);
	}

	@Get(':id/getFlashsales')
	@Public()
	async getFlashsales(@Param('id', ParseIntPipe) shopid: number, @Res() res) {
		const result = await this.sellerconsoleService.getFlashsales(shopid);
		res.send(result);
	}

	@Get(':id/getorderlog')
	@Public()
	async getOrderlog(@Param('id', ParseIntPipe) shopid: number, @Res() res) {
		const result = await this.sellerconsoleService.getOrderLog(shopid);
		res.send(result);
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
