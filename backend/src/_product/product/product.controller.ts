import { Body,Controller, Get, Param, ParseIntPipe, Post, Query, Res } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { ProductService } from './product.service';
import { SuggestionProductDto } from './dto/suggestion-product.dto';
import { customer_info, Prisma } from '@prisma/client';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get('/:id')
	@Public()
	public async findProductDetails(@Param('id', ParseIntPipe) id: number, @Res() res, @Query('customerId',ParseIntPipe) customerId : number) {
		const product_details = await this.productService.getProductDetails(id,customerId);
		if (product_details) {
			res.send({ success: true, product_details });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Get(':id/getSuggest')
	@Public()
	public async findSuggestProducts(@Param('id', ParseIntPipe) id: number, @Res() res, @Query('customerId',ParseIntPipe) customerId : number) {
		const suggest_products = await this.productService.getSuggestProducts(id,customerId);
		if (suggest_products) {
			res.send({ success: true, suggest_products });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Post(':id/updateSuggest')
	@Public()
	public async updateSuggestProducts(
		@Body() suggestionProductDto: SuggestionProductDto,
		@Param('id', ParseIntPipe) id: number,
		@Res() res,
	) {
		const suggest_product = await this.productService.updateSuggestionProducts(id,suggestionProductDto);
		if (suggest_product) {
			res.send({ success: true, suggest_product });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Get('/shortlink/:id')
	@Public()
	public async copyShortLink(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const link = await this.productService.getShortLink(id);
		if (link) {
			res.send({ success: true, link });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Get('/:id/shop')
	@Public()
	public async findShopDetails(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const shop_details = await this.productService.getShopDetails(id);
		if (shop_details) {
			res.send({ success: true, shop_details });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Get('/:id/pictures')
	@Public()
	public async findProductPictures(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const pictures = await this.productService.getProductPictures(id);
		if (pictures) {
			res.send({ success: true, pictures });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Get('/:id/options')
	@Public()
	public async findOptions(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const options = await this.productService.getOptions(id);
		if (options) {
			res.send({ success: true, options });
		} else {
			res.send({
				success: false,
			});
		}
	}
}
