import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }
    
    @Get('/:id')
	public async findProductDetails(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const product_details = await this.productService.getProductDetails(id);
		if (product_details) {
			res.send({ Success: true, product_details });
		} else {
			res.send({
				Success: false,
			});
		}
	}

}
