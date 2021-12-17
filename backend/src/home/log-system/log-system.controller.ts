import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { LogSystemService } from './log-system.service';
import { CreateAddToCartLogDto } from './dto/create-add-to-cart-log.dto';
import { CreateDiscountLogDto } from './dto/create-discount-log.dto';
import { CreatePaymentLogDto } from './dto/create-payment-log.dto';
import { CreateProductLogDto } from './dto/create-product-log.dto';
import { CreateShopLogDto } from './dto/create-shop-log.dto';
import { prisma } from '@prisma/client';
import { IsNumber } from 'class-validator';

@Controller('log-system')
export class LogSystemController {
  constructor(private readonly logSystemService: LogSystemService) { }

  @Post('add-to-cart/:customer_id/:product_id')
  async createAddToCart(
    @Param('customer_id', ParseIntPipe) customerId: number,
    @Param('product_id', ParseIntPipe) productId: number,
    @Body() addToCartDto: CreateAddToCartLogDto,
  ) {
    try {
      const addToCart = await this.logSystemService.createAddToCart(addToCartDto, customerId, productId);

      return {
        success: true,
        addToCart,
      };
    } catch (err) {
      this.logSystemService.throwError(err);
    }
  }

  // No condition
  @Get('add-to-cart-all')
  async getAllAddToCart() {
    try {
      const allAddToCart = await this.logSystemService.getAddToCart();
      return {
        success: true,
        allAddToCart,
      };
    } catch (err) {
      this.logSystemService.throwError(err);
    }
  }

  // With some conditions
  @Get('add-to-cart')
  async getAddToCart(
    @Query('customerId', ParseIntPipe) customerId?: number,
    @Query('productId', ParseIntPipe) productId?: number,
  ) {
    try {
      const addToCart = await this.logSystemService.getAddToCart({
        customer_id: customerId,
        product_id: productId,
      });

      return {
        succuss: true,
        addToCart,
      };
    } catch (err) {
      this.logSystemService.throwError(err);
    }
  }

  @Post('discount/:customer_id/:discount_id')
  async createDiscount(
    @Param('customer_id', ParseIntPipe) customerId: number,
    @Param('discount_id', ParseIntPipe) discountId: number,
    @Body() discountDto: CreateDiscountLogDto,
  ) {
    try {
      const discount = await this.logSystemService.createDiscount(discountDto, customerId, discountId);

      return {
        success: true,
        discount,
      };
    } catch (err) {
      this.logSystemService.throwError(err);
    }
  }

  // No condition
  @Get('get-discount-all')
  async getAllDiscount() {
    try {
      const allDiscount = await this.logSystemService.getDiscount();

      return {
        success: true,
        allDiscount,
      };
    } catch (err) {
      this.logSystemService.throwError(err);
    }
  }

  // With some conditions
  @Get('get-discount')
  async getDiscount(
    @Query('customerId', ParseIntPipe) customerId?: number,
    @Query('discountId', ParseIntPipe) discountId?: number,
  ) {
    try {
      const discount = await this.logSystemService.getDiscount({
        customer_id: customerId,
        discount_id: discountId,
      });
      return {
        success: true,
        discount,
      };
    } catch (err) {
      this.logSystemService.throwError(err);
    }
  }

  @Post('payment/:customer_id/:payment_id')
  async createPayment(
    @Param('customer_id', ParseIntPipe) customerId: number,
    @Param('payment_id', ParseIntPipe) paymentId: number,
    @Body() paymentDto: CreatePaymentLogDto,
  ) {
    try {
      const payment = await this.logSystemService.createPayment(paymentDto, customerId, paymentId);

      return {
        success: true,
        payment,
      };
    } catch (err) {
      this.logSystemService.throwError(err);
    }
  }

  // No condition
  @Get('get-payment-all')
  async getAllPayment() {
    try {
      const allPayment = await this.logSystemService.getPayment();
      return {
        success: true,
        allPayment,
      };
    } catch (err) {
      this.logSystemService.throwError(err);
    }
  }

  // With some conditions
  @Get('get-payment')
  async getPayment(
    @Query('customerId', ParseIntPipe) customerId?: number,
    @Query('paymentId', ParseIntPipe) paymentId?: number,
  ) {
    try {
      const discount = await this.logSystemService.getPayment({
        customer_id: customerId,
        payment_id: paymentId,
      });

      return {
        success: true,
        discount,
      };
    } catch (err) {
      this.logSystemService.throwError(err);
    }
  }

  @Post('product/:customer_id/:product_id')
  async createProduct(
    @Param('customer_id', ParseIntPipe) customerId: number,
    @Param('product_id', ParseIntPipe) productId: number,
    @Body() productDto: CreateProductLogDto,
  ) {
    try {
      const product = await this.logSystemService.createProduct(productDto, customerId, productId);

      return {
        success: true,
        product,
      };
    } catch (err) {
      this.logSystemService.throwError(err);
    }
  }

  // no condition
  @Get('product-all')
  async getAllProduct() {
    try {
      const allProduct = await this.logSystemService.getProduct();
      return {
        success: true,
        allProduct,
      };
    } catch (err) {
      this.logSystemService.throwError(err);
    }
  }

  //with some conditions
  @Get('product')
  async getProduct(
    @Query('customer_id', ParseIntPipe) customerId?: number,
    @Query('product_id', ParseIntPipe) productId?: number,
  ) {
    try {
      const product = await this.logSystemService.getProduct({
        customer_id: customerId,
        product_id: productId,
      });
      return {
        success: true,
        product,
      };
    } catch (err) {
      this.logSystemService.throwError(err);
    }
  }

  @Post('shop/:customer_id/:shop_id')
  async createShop(
    @Param('customer_id', ParseIntPipe) customerId: number,
    @Param('shop_id', ParseIntPipe) shopId: number,
    @Body() shopDto: CreateShopLogDto,
  ) {
    try {
      const data = this.logSystemService.crateShop(shopDto, customerId, shopId);

      return {
        success: true,
        data,
      };
    } catch (err) {
      this.logSystemService.throwError(err);
    }
  }

  // No condition
  @Get('shop-all')
  async getAllShop() {
    try {
      const allShop = await this.logSystemService.getShop();
      return {
        success: true,
        allShop,
      };
    } catch (err) {
      this.logSystemService.throwError(err);
    }
  }

  // With some conditions
  @Get('shop')
  async getShop(
    @Query('customer_id', ParseIntPipe) customerId?: number,
    @Query('shop_id', ParseIntPipe) shopId?: number,
  ) {
    try {
      const shop = await this.logSystemService.getShop({
        customer_id: customerId,
        shop_id: shopId,
      });
      return {
        success: true,
        shop,
      };
    } catch (err) {
      this.logSystemService.throwError(err);
    }
  }
}