import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHomeDto } from './dto/create-home.dto';

@Injectable()
export class HomeService {
  constructor(private prisma: PrismaService) {}
  create(createHomeDto: CreateHomeDto) {
    return 'This action adds a new home';
  }

  async findAllReviews() {
    return this.prisma.home_app_review.findMany({
      take: 50, 
    });
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

  async findBestSeller() {
    return this.prisma.product.findMany({
      orderBy:{sold: "desc"},
      take: 20,
    });
   
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
