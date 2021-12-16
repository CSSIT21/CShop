import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { SellerconsoleService } from './sellerconsole.service';
import { CreateSellerconsoleDto } from './dto/create-sellerconsole.dto';
import { UpdateSellerconsoleDto } from './dto/update-sellerconsole.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('sellerconsole')
export class SellerconsoleController {
	constructor(private readonly sellerconsoleService: SellerconsoleService) {}

	@Get(':id/dashboard')
	@Public()
	seller_dashboard(@Param('id') id: string) {
		return this.sellerconsoleService.seller_dashboard(+id);
	}

	@Get(':id/discountHistory')
    @Public()
     async getHistoryDiscount(@Param('id') id : string){
        return this.sellerconsoleService.getHistoryDiscount();
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
		 var added_date = request.added_date;
		 var suggest_products = request.suggest_products;
		 var rating = request.rating;
		console.log(shop_id)
		const a = await this.sellerconsoleService.AddToStock(id ,shop_id,title,sub_title,price,quantity,category_id, sold,new Date (added_date),suggest_products,rating);
		const b = await this.sellerconsoleService.UpdatetoStockLog(id, shop_id , quantity ,new Date (added_date));
		console.log(a,b);
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
