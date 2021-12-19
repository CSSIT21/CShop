import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { ManageaccountService } from './manageaccount.service';
import { CreateUserSuspensionDto } from './dto/create_usersuspension.dto';
import { CreateSellerSuspensionDto } from './dto/create_sellersuspension.dto';
import { UpdateUserSuspensionDto } from './dto/update_usersuspension.dto';
import { UpdateSellerSuspensionDto } from './dto/update_sellersuspension.dto';
import { Prisma, PrismaClient } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { DH_NOT_SUITABLE_GENERATOR } from 'constants';
import { Public } from 'src/common/decorators/public.decorator';
import { identity } from 'rxjs';

@Controller('manageaccount')
export class ManageaccountController {
  constructor(private readonly manageaccountService: ManageaccountService, public prisma: PrismaService) {}

  @Get()
  @Public()
  public findAll() {
    return this.prisma.product.findMany();
  }

  @Get('message')
  @Public()
  public getMessage(@Query('id') i: string){
    return this.prisma.product.findFirst({
      where: {
        id: parseInt(i)
      }
    });
  }

  //Research from this
  @Get('search')
  @Public()
  public searchAll(@Query('s') query:string){
    return this.prisma.product.findMany({
      where:{
        title:{contains:query,mode:'insensitive'}
      }
    });
  }

  @Post('suspension/users/create')
  @Public()
  public async createUserSus(@Body() createUserSuspensionDto: CreateUserSuspensionDto, @Res() res){
    const userSus = await this.manageaccountService.createUserSuspension(createUserSuspensionDto);
    if(userSus){
      res.send({Success: true, userSus});
    } else {
      res.send({
        Success : false,
      });
    }
  }

  @Post('suspension/sellers/create')
  @Public()
  public async createSellerSus(@Body() createSellerSuspensionDto: CreateSellerSuspensionDto, @Res() res){
    const sellerSus = await this.manageaccountService.createSellerSuspension(createSellerSuspensionDto);
    if(sellerSus){
      res.send({Success: true, sellerSus});
    } else {
      res.send({
        Success : false,
      });
    }
  }

  @Post('suspension/users/update')
  @Public()
  public async updateUserSus(@Body() updateUserSuspensionDto: UpdateUserSuspensionDto, @Res() res){
    const userSus = await this.manageaccountService.updateUserSuspension(updateUserSuspensionDto);
    if(userSus){
      res.send({Success: true, userSus});
    } else {
      res.send({
        Success : false,
      });
    }
  }

  @Post('suspension/sellers/update')
  @Public()
  public async updateSellerSus(@Body() updateSellerSuspensionDto: UpdateSellerSuspensionDto, @Res() res){
    const sellerSus = await this.manageaccountService.updateSellerSuspension(updateSellerSuspensionDto);
    if(sellerSus){
      res.send({Success: true, sellerSus});
    } else {
      res.send({
        Success : false,
      });
    }
  }

  @Post('suspension/users/delete')
  @Public()
  public deleteUserSus(@Query('id') i: number){{
    return this.prisma.customer.update({
      where: {
        id: +i,
      },
      data:{
        admin_customer_suspensions:{
          delete: true,
        }
      },
    });
  }}

  @Post('suspension/sellers/delete')
  @Public()
  public deleteSellerSus(@Query('id') i: number){{
    return this.prisma.shop_info.update({
      where: {
        id: +i,
      },
      data:{
        admin_shop_suspensions:{
          delete: true,
        }
      },
    });
  }}

  @Get('products')
  @Public()
  public getProducts(){
    return this.prisma.product.findMany({
      include:{
        product_picture: true,
        product_reviews: true,
      }
    });
  }

  @Get('products/shop_id')
  @Public()
  public getProductsByShopID(@Query('id') i: number){
    return this.prisma.product.findMany({
      where:{
        shop_id: +i
      },
      include:{
        product_reviews: true,
      }
    });
  }

  @Get('sellers')
  @Public()
  public getSellers(){
    return this.prisma.shop_info.findMany({
      include:{
        shop_picture: true,
        product: true,
        customer_followed_shop: true,
        admin_shop_suspensions: true,
      }
    });
  }
  
  @Get('sellers/unique')
  @Public()
  public getSellersU(@Query('id') i: number){
    return this.prisma.shop_info.findFirst({
      where:{
        id: +i
      }
    });
  }

  @Get('users')
  @Public()
  public getUsers(){
    return this.prisma.customer.findMany({
      take: 2,
      include:{
        customer_picture: true,
        customer_info: true,
        customer_address: true,
        admin_customer_suspensions: true,
      }
    });
  }

  @Get('/address')
  @Public()
  public getAddress(@Query('id') i: number){
    return this.prisma.address.findFirst({
      where:{
        id: +i
      }
    });
  }

  @Get('/users/picture')
  @Public()
  public getPic(@Query('id') i: number){
    return this.prisma.customer_picture_file.findFirst({
      where:{
        id: +i
      }
    });
  }

  @Get('/suspension/types')
  @Public()
  public getSusTypes(){
    return this.prisma.admin_suspension_type.findMany();
  }

  @Get('/suspension/type')
  @Public()
  public getSusType(@Query('id') i: number){
    return this.prisma.admin_suspension_type.findFirst({
      where:{
        id: +i
      }
    });
  }

  @Get('tickets')
  @Public()
  public getTickets(){
    return this.prisma.admin_support_picture.findMany({
      include:{
        admin_support: true,
      }
    });
  }

  @Get(':id')
  @Public()
  public findOne(@Param('id') id: string) {
    return this.manageaccountService.findOne(+id);
  }

  @Delete(':id')
  @Public()
  public remove(@Param('id') id: string) {
    return this.manageaccountService.remove(+id);
  }
}
