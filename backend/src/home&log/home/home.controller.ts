import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';
import { PrismaService } from 'src/prisma/prisma.service';


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
      const bestsellers = await this.homeService.findBestSeller();
      return{
        suscess : true,
        bestsellers
      }
    }catch(err){
      this.homeService.throwError(err);
    }
  }
  
}
