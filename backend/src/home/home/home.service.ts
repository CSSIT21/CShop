import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, product_picture } from '@prisma/client';
import { async } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';

@Injectable()
export class HomeService {
  constructor(private readonly prisma: PrismaService) { }

  async findAllReviews() {
    return this.prisma.home_app_review.findMany();
  }

  async findAllPartners() {
    return this.prisma.home_partner.findMany({
      where: {
        start_date: {
          lte: new Date().toISOString(),
        },
        end_date: {
          gte: new Date().toISOString(),
        },
      },
      select: {
        name: true,
        path: true,
        title_pic: true,
        type: true,
        thumbnail: true,
      }
    });
  }

  async findBestSeller() : Promise<product_picture[]> {
    const productId = await this.prisma.product.findMany({
      orderBy:{sold: "desc"},
      take: 20,
      select:{id:true}
    });
    let pic : product_picture[];
    for (let index = 0; index < productId.length; index++) {
      if (!Array.isArray(pic)) {
        pic = [];
    }
      pic.push(await this.prisma.product_picture.findFirst({
        where:{
          product_id: productId[index].id
        }
      }))

    }
    return pic;
  }

  async getPopUp(){
    return this.prisma.home_popup.findMany({
      where : {
        start_date: {
          lte: new Date().toISOString(),
        },
        end_date: {
          gte: new Date().toISOString(),
        },
      },
      select:{
        description: true,
        path: true,
        thumbnail: true,
      }
    });
  }

  async findFavorite(){
    
  }

  async findSuggestion(){
    this.prisma.rem_suggestion_homepage.findMany(
      
    );
  }

  throwError(err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(err.message);
      throw new HttpException(err.message, 500);
    }
    console.log(err.message);
    throw new HttpException(err.message, 500);
  }
}
