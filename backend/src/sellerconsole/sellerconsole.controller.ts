import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
	getOrderhistory(@Param('id') id: number){
		
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
