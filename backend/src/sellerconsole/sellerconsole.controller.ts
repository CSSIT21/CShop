import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { SellerconsoleService } from './sellerconsole.service';
import { CreateSellerconsoleDto } from './dto/create-sellerconsole.dto';
import { UpdateSellerconsoleDto } from './dto/update-sellerconsole.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { PrismaClient } from '@prisma/client';
import { addProductSellerconsoleDto } from './dto/addProduct-sellerconsole.dto';

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

	@Get('id:/orderhistory')
	@Public()
	getOrderhistory(@Param('id') id: number) {}

	@Get(':id/stock')
	@Public()
	getStock(@Param('id') id: number) {
		return this.sellerconsoleService.getStock(+id);
	}

	@Post(':id/stockLog')
	async getStockLog(@Body() request, @Res() res): Promise<any> {
		var id = request.id;
		var shop_id = request.shop_id;
		var title = request.title;
		var sub_title = request.sub_title;
		var price = request.price;
		var quantity = request.quantity;
		var category_id = request.category_id;
		var sold = request.sold;
		var added_date = request.added_date;
		var suggest_products = request.suggest_products;
		var rating = request.rating;
		console.log(shop_id);
		const a = await this.sellerconsoleService.addStock(
			id,
			shop_id,
			title,
			sub_title,
			price,
			quantity,
			category_id,
			sold,
			new Date(added_date),
			suggest_products,
			rating,
		);
		const b = await this.sellerconsoleService.UpdatetoStockLog(id, shop_id, quantity, new Date(added_date));
		console.log(a, b);
		// res.send(a);
		res.send(b);
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
