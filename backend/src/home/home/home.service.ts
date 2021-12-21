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
      orderBy: {
        review_date: "desc",
      },
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
      orderBy: {
        start_date: 'asc'
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

  async findBestSeller(customer_id: number) {
    return this.prisma.product.findMany({
      orderBy: {
        sold: "desc",
      },
      take: 20,
      include: {
        product_picture: true,
        customer_wishlist: {
          where: { customer_id },
        }
      },
    });
  }

  async getPopUp() {
    return this.prisma.home_popup.findFirst({
      where: {
        start_date: {
          lte: new Date().toISOString(),
        },
        end_date: {
          gte: new Date().toISOString(),
        },
      },
      select: {
        start_date: true,
        end_date: true,
        description: true,
        path: true,
        thumbnail: true,
      }
    });
  }

  async findFavorite(params: {
    customer_id: number;
    where?: Prisma.customer_wishlistWhereInput;
    take?: number;
    skip?: number;
  }) {
    const { customer_id, where, take, skip } = params;
    const products = await this.prisma.customer_wishlist.findMany({
      where,
      take,
      skip,
      include: {
        product_id_from_wishlist: {
          include: {
            product_picture: true,
            customer_wishlist: {
              where: { customer_id }
            }
          }
        }
      },
    })

    const count = products.length;
    return {
      products,
      count,
    };
  }

  async findProductsByIds(params: {
    customer_id: number;
    productIds: number[];
    take?: number;
    skip?: number;
  }) {
    const { customer_id, productIds, take, skip } = params;

    return this.prisma.product.findMany({
      where: {
        id: {
          in: productIds
        }
      },
      include: {
        product_picture: true,
        customer_wishlist: {
          where: { customer_id },
        },
      },
      take,
      skip,
    });
  }

  async findCategory() {
    return this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        icon_id_from_category: {
          select: {
            id: true,
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
