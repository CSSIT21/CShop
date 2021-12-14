import { HttpException, Injectable } from '@nestjs/common';
import { CreateAddToCardLogDto } from './dto/create-add-to-card-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateDiscountLogDto } from './dto/create-discount-log.dto';
import { CreatePaymentLogDto } from './dto/create-payment-log.dto';

@Injectable()
export class LogSystemService {
  constructor(private readonly prisma: PrismaService) { }
  async createAddToCard(addToCardDto: CreateAddToCardLogDto, customer_id: number, product_id: number) {
    return this.prisma.home_add_to_cart_log.create({
      data: {
        added_date: new Date(addToCardDto.added_date).toISOString(),
        customer_id,
        product_id
      },
    });
  }
      async createDiscount(discountDto: CreateDiscountLogDto , customer_id: number, discount_id: number) { 
        return this.prisma.home_discount_log.create({
          data: {
            view_date: new Date(discountDto.view_date).toISOString(),
            customer_id,
            discount_id

          },
          
        });
  }
  async createPayment(paymentDto: CreatePaymentLogDto, customer_id: number, payment_id: number) {
    return this.prisma.home_payment_log.create({
      data: {
        issue_at: new Date(paymentDto.issue_at).toISOString(),
        customer_id,
        payment_id
      },
    });
  
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
  
  

