import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewProductService {
    constructor(private readonly prisma: PrismaService){}

    async getProduct(){

    }

    async createReview(reviewDto: ReviewDto, product_id: number,){
        return this.prisma.product_reviews.create({
            data: {
                review_time: new Date(reviewDto.review_time).toISOString(),
                product_id,
                customer_id: reviewDto.customerId,
                rating: reviewDto.rating,
                comment: reviewDto.comment,
                review_picture_id: reviewDto.review_picture_id,
            }
        });
    }
}
