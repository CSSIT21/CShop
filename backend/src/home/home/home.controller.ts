import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { get } from 'http';
import { Prisma, product_picture } from '@prisma/client';


@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService, private prisma: PrismaService) {}


  @Get("reviews")
  async findAllReviews() {
    try{
      const reviews = await this.homeService.findAllReviews();
      return{
      success : true,
      reviews
      }
    }catch(err){
      this.homeService.throwError(err);
    }
  }

  @Get("partners")
  async findAllPartners(){
    try{
      const partners = await this.homeService.findAllPartners();
      return{
        suscess : true,
        partners
      }
    }catch(err){
      this.homeService.throwError(err);
    }
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

 
