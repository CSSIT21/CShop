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

  async addtocart(userID: number, productID: number, amount: number, firstchoiceID: number, seconedchoiceID: number) { 
    const prisma = this.prisma
    let additem: any = { customer_id: userID, product_id: productID, quantity: amount, added_time: new Date() }
    if (firstchoiceID) {
      let product_options = [firstchoiceID]
      if (seconedchoiceID) {
        product_options.push(seconedchoiceID)
      }
      additem = {...additem , product_options}
     }
    await prisma.order_cart_item.createMany({ data: additem })
    return true;
  }


  
  async rebuy(userID: number, cartitems: { productID: number, amount: number, firstchoiceID: number, seconedchoiceID: number,price:number }[]) {
    const prisma = this.prisma
    const data = cartitems.map(item => { 
      if (item.firstchoiceID) {
        let product_options = [item.firstchoiceID]
        if (item.seconedchoiceID) {
          product_options.push(item.seconedchoiceID)
        }
        return ({ customer_id: userID, product_id: item.productID, quantity: item.amount, added_time: new Date(),product_options })
       }
      return ({ customer_id: userID, product_id: item.productID, quantity: item.amount, added_time: new Date() }) })

    await prisma.order_cart_item.createMany({ data: data })


    const rebuydata = cartitems.map(item=>{
      if (item.firstchoiceID) {
        let product_options = [item.firstchoiceID]
        if (item.seconedchoiceID) {
          product_options.push(item.seconedchoiceID)
        }
        return ({ customer_id: userID, product_id: item.productID, date: new Date(),price:item.price,product_options })
       }
      return({ customer_id: userID, product_id: item.productID, date: new Date(),price:item.price })
    
    })
    await prisma.order_rebuy.createMany({data: rebuydata})
    return true;
  }

  
  async removefromcart(orderID : number, userID:number, productID : number) {
    const prisma = this.prisma
    await prisma.order_cart_item.delete({ where: { id: orderID } })
    await prisma.order_deleted_item.create({ data: {customer_id: userID, product_id: productID, time : new Date()} })
    return true;
  }
  async removeallfromcart(userID:number){
    const prisma = this.prisma
    const data = await prisma.order_cart_item.findMany({where: { customer_id:userID }})
    console.log(data)
    data.forEach(async item=>{
     await prisma.order_deleted_item.create({data:{customer_id: userID, product_id: item.product_id, time:  new Date()}})
    } )
    await prisma.order_cart_item.deleteMany({where:{customer_id:userID}})
    return true
  }

  async updateamount(userID: number, addressID: number ,newamount : {id:number,amount:number}[]){
    const prisma = this.prisma
    newamount.forEach(async(data)=>{
      await prisma.order_cart_item.update({where:{id:data.id},data:{quantity: data.amount }})
    })

    const orders = await prisma.order_cart_item.findMany({where:{customer_id:userID},select:{product_id_from_order_cart_item:true,} })
    let total = 0
    orders.forEach(item=>(total+=item.product_id_from_order_cart_item.price))
    const address = await prisma.address.findUnique({where:{id:addressID}})
    const ex = await fetch("http://localhost:8080/delivery/generate-tracking")
    await prisma.order.create({data:{total_price:total,order_date: new Date(),customer_id:userID,status:"Received_a_request"}})

    

    // const data = orders.map(item=>{return({
    //   order_id:1,
    //   price:item.product_id_from_order_cart_item.price,
    //   product_id:item,
      
    // })})

    // await prisma.order_item.createMany({data})

    return true
  }


  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
