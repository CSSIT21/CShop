import { HttpException, Injectable } from '@nestjs/common';
import { CreateAddToCardLogDto } from './dto/create-add-to-card-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LogSystemService {
  constructor(private readonly prisma: PrismaService) { }
  async createAddToCard(addToCardDto: CreateAddToCardLogDto, customer_id: number, product_id: number) {
    return this.prisma.home_add_to_cart_log.create({
      data: {
        added_date: addToCardDto.added_date,
        customer_id,
        product_id
      }

    })
  }
  throwError(err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(err.message);
      throw new HttpException('Error querying comments please check your information!', 500);
    }
    console.log(err.message);
    throw new HttpException('Error querying comments request body incorrect', 500);
  }
  
}
