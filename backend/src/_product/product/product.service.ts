import { Injectable, HttpException } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { nanoid } from 'nanoid';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) { }
    
    public async getProductDetails(id: number) {
		try {
			const product = await this.prisma.product.findUnique({
				where: {
					id: id,
				}
			});

			const product_description = await this.prisma.product_detail.findFirst({
				where: {
					product_id:id
				}
			})
            
            return  {product,product_description}  ;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying products please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying products request body incorrect', 500);
		}
	}

    public async getProductPictures(id: number) {
		try {

			const product = await this.prisma.product.findUnique({
				where: {
					id: id,
				}
			});



			// const picture_id_array = await this.prisma.product_reviews.findMany({
			// 	where: {
			// 		product_id: id,
			// 	},
			// 	select: {
			// 		review_picture_id: true,
			// 		id: true
			// 	},
			// });
			// let pictures: Object[] = [];
			// for (let i = 0; i < picture_id_array.length; i++) {
			// 	let comment_pictures: Promise<any>[] = [];
			// 	const id_comment = picture_id_array[i].id
			// 	for(let id of picture_id_array[i].review_picture_id){
			// 		comment_pictures.push(this.prisma.product_reviews_picture.findFirst({
			// 			where: {id},
			// 		}));
			// 	}
			// 	comment_pictures = await Promise.all(comment_pictures);
			// 	pictures = [...pictures,{ id_comment, comment_pictures}]
			// }
			// return pictures
			return product
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying products please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying products request body incorrect', 500);
		}
	}

    public async getShopDetails(id: number) {
		try {
			// Shop Picture
			const product = await this.prisma.product.findFirst({
				where: {
					id: id,
				}, select: {
					shop_id:true
				}
			});
			const shop_picture = await this.prisma.shop_info.findFirst({
				where: {
					id: product.shop_id,
				}, include: {
					shop_picture: true,
							_count: {
								select: {
									product: true
								}
							}
						
				}
			});
			return shop_picture
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying products please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying products request body incorrect', 500);
		}
	}

	public async getShortLink(id: number ) { 
        try {
            const link = await this.prisma.product_short_link.findUnique({
                where: {
                    product_id:id
                }, 
            })

            if (link && link.shorted_link) {
                return link.shorted_link
			} else {
				const generatedString = nanoid(8);
                const link = await this.prisma.product_short_link.create({
                    data: {
                        product_id:id,
                        shorted_link: `CShop/${generatedString}`,
                    },
                })
                return link.shorted_link;
            }


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
