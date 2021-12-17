import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { SellerconsoleService } from './sellerconsole.service';
import { CreateSellerconsoleDto } from './dto/create-sellerconsole.dto';
import { UpdateSellerconsoleDto } from './dto/update-sellerconsole.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { PrismaClient } from '@prisma/client';

@Controller('sellerconsole')
export class SellerconsoleController {
	constructor(private readonly sellerconsoleService: SellerconsoleService) {}

	@Get(':id/discounthistory')
	@Public()
	getHistoryDiscount(@Param('id') id: number) {
		const res = this.sellerconsoleService.getdiscountHistory(+id);
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
	 getStock(@Param('id') id : number){
		 return this.sellerconsoleService.getStock(+id);
	 }
	
	 @Post(':id/stockLog')
	 async getStockLog(@Body()request  , @Res() res ) : Promise <any>  {
		 var id = request.id;
		 var shop_id = request.shop_id;
		 var title = request.title;
		 var sub_title = request.sub_title;
		 var price = request.price;
		 var quantity = request.quantity;
		 var category_id = request.category_id;
		 var sold = request.sold;
		 var suggest_products = request.suggest_products;
		 var rating = request.rating;
		console.log(shop_id)
		const a = await this.sellerconsoleService.AddToStock(id ,shop_id,title,sub_title,price,quantity,category_id, sold,suggest_products,rating);
		const b = await this.sellerconsoleService.UpdatetoStockLog(id, shop_id , quantity );
		console.log(a,b);
		// res.send(a);
		res.send(b);
	}

	@Get(':id/orderHistory')
	async getOrderhistory(@Param('id') id:number){
		const res = await this.sellerconsoleService.getOrderHistory(+id);
		return res
	}

	@Post(':id/acceptOrderStatus')
	async acceptOrderStatus(@Body() Order,@Res() res){
		let order_id= Order.order_id
		let product_id= Order.product_id
		let shop_id= Order.shop_id
		let started_date = Order.started_date
		let status= 'Accept'
		const addToOrderHistory = await this.sellerconsoleService.addOrderStatusToOrderHistory(order_id,product_id,shop_id,started_date,status)
		const removeOrderFromOrderStatus = await this.sellerconsoleService.removeOrderFromOrderStatus(order_id)
		res.send(addToOrderHistory)
		res.send(removeOrderFromOrderStatus)
	}

	@Post(':id/cancelOrderStatus')
	async cancelOrderStatus(@Body() Order,@Res() res){
		let order_id= Order.order_id
		let product_id= Order.product_id
		let shop_id= Order.shop_id
		let started_date = Order.started_date
		let status= 'Cancel'
		const addToOrderHistory = await this.sellerconsoleService.addOrderStatusToOrderHistory(order_id,product_id,shop_id,started_date,status)
		const removeOrderFromOrderStatus = await this.sellerconsoleService.removeOrderFromOrderStatus(order_id)
		res.send(addToOrderHistory)
		res.send(removeOrderFromOrderStatus)
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
