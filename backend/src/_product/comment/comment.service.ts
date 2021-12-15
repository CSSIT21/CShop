import { Injectable, HttpException } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
	constructor(private readonly prisma: PrismaService) {}

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
									picture_id_from_customer_picture: true,
								},
							},
						},
					},
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

			return { comment_list, avg_product_rating };
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
			
			const picture_id_array = await this.prisma.product_reviews.findMany({
				where: {
					product_id: id,
				},
				select: {
					review_picture_id: true,
					id: true
				},
			});
			let pictures: Object[] = [];
			for (let i = 0; i < picture_id_array.length; i++) {
				let comment_pictures: Promise<any>[] = [];
				const id_comment = picture_id_array[i].id
				for(let id of picture_id_array[i].review_picture_id){
					comment_pictures.push(this.prisma.product_reviews_picture.findFirst({
						where: {id},
					}));
				}
				comment_pictures = await Promise.all(comment_pictures);
				pictures = [...pictures,{ id_comment, comment_pictures}]
			}		
			return pictures
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
