import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { ManageaccountService } from './manageaccount.service';
import { CreateManageaccountDto } from './dto/create-manageaccount.dto';
import { UpdateManageaccountDto } from './dto/update-manageaccount.dto';
import { CreateUserSuspensionDto } from './dto/create_usersuspension.dto';
import { Prisma, PrismaClient } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { DH_NOT_SUITABLE_GENERATOR } from 'constants';

@Controller('manageaccount')
export class ManageaccountController {
  constructor(private readonly manageaccountService: ManageaccountService, public prisma: PrismaService) {}

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

  @Post('suspension/users')
  suspendUser(@Query('s') i:number){
    const a = +i;
    return this.prisma.customer.update({
      where: {
        id: 1
      },
      data: {
        admin_customer_suspensions:{
          update:{
            description: 'Testing: 1',
          }
        }
      },
    });
  }

  @Post('suspension/users/create')
  async createUserSus(@Body() createUserSuspensionDto: CreateUserSuspensionDto, @Res() res){
    const userSus = await this.manageaccountService.create(createUserSuspensionDto);
    if(userSus){
      res.send({Success: true, userSus});
    } else {
      res.send({
        Success : false,
      });
    }
  }

  @Get('suspension/users/test')
  testUserSus(@Body() createUserSuspensionDto: CreateUserSuspensionDto){
    return createUserSuspensionDto;
  }

  @Post('test')
  async createTest(@Res() res){
    const test = await this.prisma.admin_suspension_type.create({
      data:{
        id: 1,
        title: 'Terms of Service Violation',
        description: 'Violating the agreed terms of service.'
      }
    });
    if(test){
      res.send({Success: true, test});
    } else {
      res.send({
        Success : false,
      });
    }
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
        admin_customer_suspensions: true,
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
