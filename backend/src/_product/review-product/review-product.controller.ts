import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ReviewProductService } from './review-product.service';
import { PictureListDto } from './dto/pictureList.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('review-product')
export class ReviewProductController {
	constructor(private readonly reviewProductService: ReviewProductService) {}

	@Post('/:product_id/:customer_id/create-product-review')
	@Public()
	async createProductReview(
		@Param('product_id', ParseIntPipe) product_id: number,
		@Param('customer_id', ParseIntPipe) customer_id: number,
		@Body() reviewInput: Prisma.product_reviewsCreateInput,
		@Body() reviewPictureList: PictureListDto,
	) {
		const review = await this.reviewProductService.createProductReview(
			reviewInput,
			reviewPictureList,
			product_id,
			customer_id,
		);
		return {
			success: true,
			review,
		};
	}

	@Post('/:shop_id/:customer_id/create-shop-review')
	@Public()
	async createShopReview(
		@Param('shop_id', ParseIntPipe) shop_id: number,
		@Param('customer_id', ParseIntPipe) customer_id: number,
		@Body() reviewInput: Prisma.shop_commentCreateInput,
	) {
		const review = await this.reviewProductService.createShopReview(reviewInput, shop_id, customer_id);
		return {
			success: true,
			review,
		};
	}
}
