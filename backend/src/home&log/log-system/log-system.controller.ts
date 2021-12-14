import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { LogSystemService } from './log-system.service';
import { CreateAddToCardLogDto } from './dto/create-add-to-card-log.dto';
import { CreateDiscountLogDto } from './dto/create-discount-log.dto';
import { CreatePaymentLogDto } from './dto/create-payment-log.dto';

@Controller('log-system')
export class LogSystemController {
  constructor(private readonly logSystemService: LogSystemService) { }

  @Post("addToCard/:customer_id/:product_id")
  async createAddToCard(@Param('customer_id', ParseIntPipe) customer_id: number, @Param('product_id', ParseIntPipe) product_id: number, @Body() addTocardDto: CreateAddToCardLogDto) {
    try {
      return this.logSystemService.createAddToCard(addTocardDto, customer_id, product_id)
    }
    catch (err) {
      this.logSystemService.throwError(err);
    }
  }

  @Post("discount/:customer_id/:discount_id")
  async createDiscount(@Param('customer_id', ParseIntPipe) customer_id: number, @Param('discount_id', ParseIntPipe) discount_id: number, @Body() discountDto: CreateDiscountLogDto) {
    try {
      return this.logSystemService.createDiscount(discountDto, customer_id, discount_id,)
    }
    catch (err) {
      this.logSystemService.throwError(err);
    }
  } 
  
  @Post("payment/:customer_id/:payment_id")
  async createPayment(@Param('customer_id',ParseIntPipe) customer_id: number,@Param('payment_id',ParseIntPipe) payment_id:number,@Body() paymentDto: CreatePaymentLogDto ) {
    try {
      return this.logSystemService.createPayment(paymentDto, customer_id, payment_id)
    }
    catch (err) { 
      this.logSystemService.throwError(err);
      
    }
  }
}
