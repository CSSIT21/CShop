import { Injectable, HttpException } from '@nestjs/common';
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
					shop_id_from_product: {
						include: {
							_count: {
								select: {
									product: true
								}
							}
						}
					}
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
			// Product Picture
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying products please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying products request body incorrect', 500);
		}
	}

    public async getShopPictures(id: number) {
		try {
			// Shop Picture
			const product = await this.prisma.product.findUnique({
				where: {
					id: id,
				}, select: {
					shop_id:true
				}
			});
			const shop_id = await this.prisma.shop_info.findUnique({
				//รอเพิ่มจากโฟลต
				where: {
					id: product.shop_id,
				}
			});
			return shop_id
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
            const short_link = await this.prisma.product_short_link.findUnique({
                where: {
                    product_id:id
                }, 
            })

            if (short_link.shorted_link) {
                return short_link.shorted_link
			} else {
				const generatedString = Math.random()
					.toString(36)
					.replace(/[^a-z]+/g, "")
					.substring(0, 10);
                const short_link = await this.prisma.product_short_link.create({
                    data: {
                        product_id:id,
                        shorted_link: `l/${generatedString}`,
                    },
                })
                return short_link.shorted_link;
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
