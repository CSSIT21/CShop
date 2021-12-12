import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res } from '@nestjs/common';
import { SellershopService } from './sellershop.service';
import { CreateSellershopDto } from './dto/create-sellershop.dto';
import { UpdateSellershopDto } from './dto/update-sellershop.dto';

@Controller('sellershop')
export class SellershopController {
	constructor(private readonly sellershopService: SellershopService) {}

	@Get(':id')
	public async findOne(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const shopinfo = await this.sellershopService.findOne(id);
		if (shopinfo) {
			res.send({ Success: true, shopinfo });
		} else {
			res.send({
				Success: false,
			});
		}
	}

	@Get(':id/products')
	public async findProducts(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const products = await this.sellershopService.getShopProduct(id);
		if (products) {
			res.send({ Success: true, products });
		} else {
			res.send({
				Success: false,
			});
		}
	}

	@Get(':id/sections')
	public async findSections(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const sections = await this.sellershopService.getShopSection(id);
		if (sections) {
			res.send({ Success: true, sections });
		} else {
			res.send({
				Success: false,
			});
		}
	}

	@Post()
	public async create(@Body() createSellershopDto: CreateSellershopDto, @Res() res) {
		const shop = await this.sellershopService.create(createSellershopDto);
		if (shop) {
			res.send({ Success: true, shop });
		} else {
			res.send({
				Success: false,
			});
		}
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
