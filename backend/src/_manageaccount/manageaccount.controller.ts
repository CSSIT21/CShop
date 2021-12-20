import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { ManageaccountService } from './manageaccount.service';
import { CreateUserSuspensionDto } from './dto/create_usersuspension.dto';
import { CreateSellerSuspensionDto } from './dto/create_sellersuspension.dto';
import { UpdateUserSuspensionDto } from './dto/update_usersuspension.dto';
import { UpdateSellerSuspensionDto } from './dto/update_sellersuspension.dto';
import { CreateTicketDto } from './dto/create_ticket.dto';
import { UpdateTicketDto } from './dto/update_ticket.dto';
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

  @Post('tickets/create')
  @Public()
  public async createTicket(@Body() createTicketDto: CreateTicketDto, @Res() res){
    const ticket = await this.manageaccountService.createTicket(createTicketDto);
    if(ticket){
      res.send({Success: true, ticket});
    } else {
      res.send({
        Success : false,
      });
    }
  }

  @Post('tickets/update/status')
  @Public()
  public async updateTicketsStatus(@Body() updateTicketDto: UpdateTicketDto, @Res() res){
    const ticket = await this.manageaccountService.updateTicketStatus(updateTicketDto);
    if(ticket){
      res.send({Success: true, ticket});
    } else {
      res.send({
        Success : false,
      });
    }
  }

  @Post('tickets/update/admin')
  @Public()
  public async updateTicketsAdmin(@Body() updateTicketDto: UpdateTicketDto, @Res() res){
    const ticket = await this.manageaccountService.updateTicketAdmin(updateTicketDto);
    if(ticket){
      res.send({Success: true, ticket});
    } else {
      res.send({
        Success : false,
      });
    }
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
      where:{
        customer_info: { isNot: null}
      },
      include:{
        customer_picture: true,
        customer_info: true,
        customer_address: true,
        admin_customer_suspensions: true,
      }
    });
  }

  @Get('users/id')
  @Public()
  public getUsersById(@Query('id') i: number){
    return this.prisma.customer.findFirst({
      where:{
        id: +i
      },
      include:{
        customer_info: true,
      }
    });
  }

  @Get('users/search')
  @Public()
  public getUsersByName(@Query('id') i: string){
    return this.prisma.customer.findFirst({
      where:{
        customer_info:{
          firstname: i
        }
      },
    });
  }

  @Get('sellers/search')
  @Public()
  public getSellersByName(@Query('id') i: string){
    return this.prisma.shop_info.findFirst({
      where:{
        shop_name: i,
      },
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

  @Get('/users/reported')
  @Public()
  public getReportedUser(@Query('id') i: number){
    return this.prisma.admin_reported_customer.findMany({
      where:{
        reported_customer_id: +i,
      }
    });
  }

  @Get('/sellers/reported')
  @Public()
  public getReportedSeller(@Query('id') i: number){
    return this.prisma.admin_reported_shop.findMany({
      where:{
        reported_shop_id: +i,
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
    return this.prisma.admin_support.findMany({
      include:{
        admin_support_status: true
      }
    });
  }


  @Get('tickets/type')
  @Public()
  public getTicketType(@Query('id') i: number){
    return this.prisma.admin_support_type.findFirst({
      where:{
        id: +i
      }
    });
  }

  @Get('tickets/picture')
  @Public()
  public getTicketsPicture(@Query('id') i: number){
    return this.prisma.admin_support_picture.findMany({
      where:{
        id: +i
      }
    });
  }

  @Post('audit/create')
  @Public()
  public logAudit(@Query('id') i: number, @Query('log') l: string){{
    return this.prisma.admin_audit.create({
      data:{
          admin_id: +i,
          login_date: new Date(),
          action: l,
        }
      });
    }
  }
}
