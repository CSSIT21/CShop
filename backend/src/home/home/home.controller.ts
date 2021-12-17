import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HomeService } from './home.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { get } from 'http';
import { Prisma, product_picture } from '@prisma/client';


@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Post()
  create(@Body() createHomeDto: CreateHomeDto) {
    return this.homeService.create(createHomeDto);
  }

  @Get()
  findAll() {
    return this.homeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomeDto: UpdateHomeDto) {
    return this.homeService.update(+id, updateHomeDto);
  }

  @Get("bestsellers")
  async findAllSeller(){
    try{
      let bestsellers : product_picture[];
      bestsellers = await this.homeService.findBestSeller();
      return{
        suscess : true,
        bestsellers
      }
    }catch(err){
      this.homeService.throwError(err);
    }
  }

  @Get("suggestions")
  async findSuggestion(){
    try{
      const suggestions = await this.homeService.findSuggestion();
      return{
        suscess : true,
        suggestions
      }
    }catch(err){
      this.homeService.throwError(err);
    }
  }

  
  
}

 
