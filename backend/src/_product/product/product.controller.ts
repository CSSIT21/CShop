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
}
