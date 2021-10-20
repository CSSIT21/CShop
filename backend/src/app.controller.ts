import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) { }

  @Get('')
  public GetUser() {
    return this.prisma.user.count();
  }

  @Post('')
  public async AddUser(@Body('username') username, @Body('password') password) {
    
    await this.prisma.user.create({ data: { username, password } });

    return "Successfully!";
  }
}
