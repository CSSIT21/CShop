import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ReviewDto } from './dto/review.dto';
import { ReviewProductService } from './review-product.service';

@Controller('review-product')
export class ReviewProductController {
    constructor(private readonly reviewProductService: ReviewProductService){}
 
    @Get()
    async getProduct(@Body() data: ReviewDto){
        return 
    }

    @Post('/:product_id/create-review')
    async createReview(
        @Param('product_id', ParseIntPipe) productId: number, 
        @Body() reviewDto: ReviewDto){
            const review = await this.reviewProductService.createReview(reviewDto,productId);
            return {
                success:true, review
            }
    }
}
