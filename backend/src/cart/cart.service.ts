import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';


@Injectable()
export class CartService {
  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    const prisma = this.prisma
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
    const prisma = this.prisma
    const productDetail = await prisma.order_cart_item.findMany({where: { customer_id: id }});
    const newProductDetail = await productDetail.map(async item => {
      const productName = await prisma.product.findUnique({ where: { id: item.product_id }, include: {product_picture:true} });
      const productoption = await prisma.product_options.findMany({ where: { product_id: item.product_id }, include: { product_choices: true } });
      return ({
        ...item, productName, product_options: productoption
      });
    });
    
    const customerDetail = await prisma.customer_address.findMany({
      where: { customer_id: id },
      include: {
        address_id_from_customer_address: true
      }
    });

    const newD = await Promise.all(newProductDetail);
    
    const customerDiscount = await prisma.discount_user_code.findMany({
      where: { customer_id: id },
      include: {
        discount_id_from_iscount_user_code: true
      }
    });

    return { customerDetail,newD, customerDiscount };
  }

  async addtocart(userID: number, productID: number, amount: number, colorID: number, sizeID: number) { 
    const prisma = this.prisma
    await prisma.order_cart_item.createMany({ data: { customer_id: userID, product_id: productID, quantity: amount, product_options: [colorID, sizeID], added_time: new Date() } })
    return true;
  }
  
  async removefromcart(userID: number, productID: number) { 
    const prisma = this.prisma
    await prisma.order_cart_item.deleteMany({ where: {customer_id: userID, product_id: productID}})
    return true;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
