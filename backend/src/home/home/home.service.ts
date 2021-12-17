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
    return this.prisma.home_app_review.findMany({
      take: 20,
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
        id: true,
        name: true,
        title: true,
        type: true,
        path: true,
        thumbnail: true,
      }
    });
  }

  async findBestSeller() {
    return this.prisma.product.findMany({
      orderBy:{
        sold: "desc",
      },
      take: 20,
      include: {
        product_picture: true,
      },
    });
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
        start_date: true,
        end_date: true,
        description: true,
        path: true,
        thumbnail: true,
      }
    });
  }

  async findFavorite(params: {
    where?: Prisma.customer_wishlistWhereInput;
    take?: number;
    skip?: number;
  }){
    const {where, take, skip} = params;
    const productIds = await this.prisma.customer_wishlist.findMany({
      where,
      take,
      skip,
      select: {
        product_id: true,
      },
    })

    const products = [];
    for (let id of productIds) {
      let product = await this.prisma.product.findUnique({
        where: {
          id: id.product_id
        },
        include: {
          product_picture: true,
        },
      });

      products.push(product);
    }
    
    return products;
  }

  async findSuggestion(params: {
    where?: Prisma.rem_suggestion_homepageWhereUniqueInput;
    take?: number;
    skip?: number;
  }){
    const {where, take, skip} = params;

    const {product_id} = await this.prisma.rem_suggestion_homepage.findUnique({
      where,
      select: {
        product_id: true,
      },
    });

    const products = [];
    for (let id of product_id) {
      let product = await this.prisma.product.findUnique({
        where: {
          id,
        },
        include: {
          product_picture: true,
        },
      });

      products.push(product);
    }

    return products;
  }

  async findCategory(){
    return this.prisma.category.findMany({
      select:{
        id: true,
        name: true,
        icon_id_from_category: {
          select: {
            id:true,
            title: true,
            path: true,
          },
        },
      }
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
