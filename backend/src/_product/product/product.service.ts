import { Injectable, Catch, HttpException } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) { }
    
    public async getProductDetails(id: number) {
		try {
			const product = await this.prisma.product.findUnique({
				where: {
					id: id,
				}, include: {
                    shop_id_from_product:true
                }
			});
			const comments = await this.prisma.product_reviews.findMany({
				where: {
					id: id,
				},
            });
            const fetchrating = await this.prisma.product.aggregate({
                where: {
                    shop_id: product.shop_id_from_product.id,
                },
                _avg: {
                    rating: true,
                },
            });

            let avg_rating = fetchrating._avg.rating;

            return { product, comments, avg_rating };
            
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
