import { Injectable, HttpException } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
    constructor(private readonly prisma: PrismaService) { }

    public async getComments(id: number) {
		try {
			const comment_list = await this.prisma.product_reviews.findMany({
				where: {
					product_id: id,
                },
                include: {
                    customer_id_from_product_reviews: {
						select: {
                            customer_info: true,
							customer_picture: {
								include: {
									picture_id_from_customer_picture: true
								}
                            },
                        },
					}
                },
            });
            
			const fetch_product_hrating = await this.prisma.product_reviews.aggregate({
                where: {
                    product_id: id,
                },
                _avg: {
                    rating: true,
                },
			});
			
            let avg_product_rating = fetch_product_hrating._avg.rating;

            return {comment_list,avg_product_rating} ;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying products please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying products request body incorrect', 500);
		}
    }
    
    public async getCommentPictures(id: number) {
		try {
            const comment_pictures = await this.prisma.product_reviews.findMany({
                where: {
                    // Comment Picture
                }
            })
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying products please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying products request body incorrect', 500);
		}
	}
}
