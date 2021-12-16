import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }
    
    @Get('/:id')
	public async findProductDetails(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const product_details = await this.productService.getProductDetails(id);
		if (product_details) {
			res.send({ success: true, product_details });
		} else {
			res.send({
				success: false,
			});
		}
	}
    
	@Get('/:id/suggest')
	public async findSuggestProducts(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const suggest_products = await this.productService.getSuggestProducts(id);
		if (suggest_products) {
			res.send({ success: true, suggest_products });
		} else {
			res.send({
				success: false,
			});
		}
	}

	@Get('/shortlink/:id')
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
