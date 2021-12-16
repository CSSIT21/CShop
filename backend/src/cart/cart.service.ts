import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  async findAll() {
    const prisma = new PrismaClient()
    const productDetail = await prisma.order_cart_item.findMany();
    const newProductDetail = await productDetail.map(async item => { 
      const productName = await prisma.product.findUnique({ where: { id: item.product_id } });
      const productoption = await prisma.product_options.findMany({ where: { product_id: item.product_id }, include: { product_choices: true } });
      return ({
        ...item, productName, product_options: productoption});
    });
    return Promise.all(newProductDetail);
  }

  async findOne(id: number) {
    const prisma = new PrismaClient()
    const productDetail = await prisma.order_cart_item.findMany({ where: { customer_id: id } });
    const newProductDetail = await productDetail.map(async item => { 
      const productName = await prisma.product.findUnique({ where: { id: item.product_id } });
      const productoption = await prisma.product_options.findMany({ where: { product_id: item.product_id }, include: { product_choices: true } });
      return ({
        ...item, productName, product_options: productoption});
    });
    return Promise.all(newProductDetail);
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
