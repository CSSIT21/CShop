import { Injectable, HttpException } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShortLinkService {
    constructor(private readonly prisma: PrismaService) { }
    //
    public async getLink(generatedString: string) { 
        try {
            const product_id = await this.prisma.product_short_link.findFirst({
                where: {
                    shorted_link:generatedString
                }, select: {
                    product_id:true
                }
            })
            

            return product_id.product_id
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
