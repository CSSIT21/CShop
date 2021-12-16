import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ReviewProductService } from './review-product.service';
import { PictureListDto } from './dto/pictureList.dto';

@Controller('review-product')
export class ReviewProductController {
    constructor(private readonly reviewProductService: ReviewProductService){}

    @Post('/:product_id/:customer_id/create-review')
    async createReview(
        @Param('product_id', ParseIntPipe) product_id: number, 
        @Param('customer_id', ParseIntPipe) customer_id: number, 
        @Body() reviewInput: Prisma.product_reviewsCreateInput,
        @Body() reviewPictureList: PictureListDto) {
            const review = await this.reviewProductService.createReview(reviewInput,reviewPictureList,product_id,customer_id);
            return {
                success:true, review
            }
    }
}
