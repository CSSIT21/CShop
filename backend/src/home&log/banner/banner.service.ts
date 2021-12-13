import { Injectable, HttpException } from '@nestjs/common';
import { Prisma, home_banner_picture, home_banner, homeBannerPicturePosition } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { CreateSubImageDto } from './dto/create-sub-image.dto';

@Injectable()
export class BannerService {
  constructor(private readonly prisma: PrismaService) { }

  // Create new banner with information and main image
  async createBanner(bannerDto: CreateBannerDto) {
    const { fileBase64, title, description, start_date, end_date, order, keywords, visible } = bannerDto;

    const bannerPic = await this.createImage(fileBase64, title, "Main");

    const bannerInfo = await this.createInfo({
      description,
      start_date: new Date(start_date).toISOString(),
      end_date: new Date(end_date).toISOString(),
      order,
      keywords,
      visible,
      picture_id: [bannerPic.id],
    });

    return {
      success: true,
      banner: {
        ...bannerInfo,
        pictures: {
          main: { ...bannerPic },
          children: [],
        },
      },
    };
  }

  // Create a sub image for banner with specific id
  async createSubImage(id: number, subImageDto: CreateSubImageDto) {
    const { fileBase64, title } = subImageDto;

    const bannerPic = await this.createImage(fileBase64, title, "Sub");

    await this.updateInfo({
      where: { id },
      data: {
        picture_id: {
          push: bannerPic.id,
        }
      },
    });

    return {
      success: true,
      bannerPic,
    };
  }

  // Insert new information to home_banner table
  async createInfo(data: Prisma.home_bannerCreateInput): Promise<home_banner> {
    return this.prisma.home_banner.create({ data });
  }

  // Insert new image to home_banner_picture table
  async createImage(fileBase64: string, title: string, position: string): Promise<home_banner_picture> {
    // const {path, thumbnail} = service;
    const path = 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/newscms/2020_30/3398773/dog-treats-kr-2x1-tease-200721.jpg';
    const thumbnail = 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/newscms/2020_30/3398773/dog-treats-kr-2x1-tease-200721.jpg';

    return this.prisma.home_banner_picture.create({
      data: {
        title,
        position: homeBannerPicturePosition[position],
        path,
        thumbnail
      },
    });
  }

  async getBanners(params: {
    where?: Prisma.home_bannerWhereInput;
    orderBy?: Prisma.home_bannerOrderByWithRelationInput;
  }) {
    const { where, orderBy } = params;
    const banners = await this.prisma.home_banner.findMany({
      where,
      orderBy,
    });

    return {
      success: true,
      banners,
    };
  }

  // Update information to home_banner table
  async updateInfo(params: {
    data: Prisma.home_bannerUpdateInput;
    where: Prisma.home_bannerWhereUniqueInput;
  }) {
    const { data, where } = params;
    const bannerInfo = await this.prisma.home_banner.update({
      data,
      where,
    });

    return {
      success: true,
      bannerInfo,
    };
  }

  // Delete information and pictures of banner with specific id
  async deleteBanner(where: Prisma.home_bannerWhereUniqueInput) {
    const bannerInfo = await this.prisma.home_banner.delete({ where });

    // Also delete pictures for this banner
    bannerInfo.picture_id.forEach(id => this.deleteImage({ id }));

    return {
      success: true,
      bannerInfo,
    };
  }

  // Delete sub image of banner with specific id
  async deleteSubImage(bannerId: number, subId: number) {

    // Also remove picture_id from banner
    this.prisma.home_banner_picture

    return this.deleteImage({ id: subId });
  }

  // Delete an image from home_banner_picture table
  async deleteImage(where: Prisma.home_banner_pictureWhereUniqueInput): Promise<home_banner_picture> {
    return this.prisma.home_banner_picture.delete({ where });
  }

  // Throw an error for response
  throwError(err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(err.message);
      throw new HttpException('Error querying comments please check your information!', 500);
    }
    console.log(err.message);
    throw new HttpException('Error querying comments request body incorrect', 500);
  }
}
