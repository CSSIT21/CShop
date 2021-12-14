import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ManageaccountService } from './manageaccount.service';
import { CreateManageaccountDto } from './dto/create-manageaccount.dto';
import { UpdateManageaccountDto } from './dto/update-manageaccount.dto';
import { Prisma, PrismaClient } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { DH_NOT_SUITABLE_GENERATOR } from 'constants';

@Controller('manageaccount')
export class ManageaccountController {
  constructor(private readonly manageaccountService: ManageaccountService, public prisma: PrismaService) {}

  @Post()
  create(@Body() createManageaccountDto: CreateManageaccountDto) {
    return this.manageaccountService.create(createManageaccountDto);
  }

  @Get()
  findAll() {
    return this.prisma.product.findMany();
  }

  @Get('message')
  getMessage(@Query('id') i: string){
    return this.prisma.product.findFirst({
      where: {
        id: parseInt(i)
      }
    });
  }

  //Research from this
  @Get('search')
  searchAll(@Query('s') query:string){
    return this.prisma.product.findMany({
      where:{
        title:{contains:query,mode:'insensitive'}
      }
    });
  }

  @Get('products')
  getProducts(){
    return this.prisma.product.findMany();
  }

  @Get('sellers')
  getSellers(){
    return this.prisma.shop_info.findMany({
      include:{
        shop_picture: true,
        product: true,
        customer_followed_shop: true,
        admin_shop_suspensions: true,
      }
    });
  }

  @Get('users')
  getUsers(){
    return this.prisma.customer.findMany({
      include:{
        customer_picture: true,
        customer_info: true,
        customer_address: true,
        admin_reported_customer: true,
      }
    });
  }

  @Get('tickets')
  getTickets(){
    return this.prisma.admin_support_picture.findMany({
      include:{
        admin_support: true,
      }
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manageaccountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManageaccountDto: UpdateManageaccountDto) {
    return this.manageaccountService.update(+id, updateManageaccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manageaccountService.remove(+id);
  }
}
