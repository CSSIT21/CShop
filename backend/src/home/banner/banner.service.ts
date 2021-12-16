import { Injectable, HttpException } from '@nestjs/common';
import { Prisma, home_banner_picture, home_banner } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BannerService {
  constructor(private readonly prisma: PrismaService) { }

  // Insert new information to home_banner table
  async createInfo(data: Prisma.home_bannerCreateInput): Promise<home_banner> {
    return this.prisma.home_banner.create({ data });
  }

  // Insert new image to home_banner_picture table
  async createImage(data: Prisma.home_banner_pictureCreateInput): Promise<home_banner_picture> {
    return this.prisma.home_banner_picture.create({ data });
  }

  async getBanners(checkVisible: boolean) {
    let where = {
      start_date: {
        lte: new Date().toISOString(),
      },
      end_date: {
        gte: new Date().toISOString(),
      },
    };

    if (checkVisible) {
      where['visible'] = true;
    }

    const infos = await this.getInfos({
      where,
      orderBy: {
        order: 'asc',
      },
    });

    const banners = [];
    for (let info of infos) {
      let pictures = {
        main: {},
        children: []
      };

      for (let id of info.picture_id) {
        let picture = await this.getImageById({ id });

        if (picture.position === "Main") pictures.main = picture
        else if (picture.position === "Sub") pictures.children.push(picture)
      };

      banners.push({
        ...info,
        pictures,
      })
    };

    return banners;
  }

  // Select a single information from home_banner table
  async getInfo(where: Prisma.home_bannerWhereUniqueInput): Promise<home_banner> {
    return this.prisma.home_banner.findUnique({
      where,
      rejectOnNotFound: true,
    });
  }

  // Select a list of information from home_banner table
  async getInfos(params: {
    skip?: number;
    take?: number;
    where?: Prisma.home_bannerWhereInput;
    orderBy?: Prisma.home_bannerOrderByWithRelationInput;
  }): Promise<home_banner[]> {
    const { skip, take, where, orderBy } = params;

    return this.prisma.home_banner.findMany({
      where,
      orderBy,
      skip,
      take,
    });
  }

  // Select a single image from home_banner_picture table
  async getImageById(where: Prisma.home_banner_pictureWhereUniqueInput): Promise<home_banner_picture> {
    return this.prisma.home_banner_picture.findUnique({
      where,
      rejectOnNotFound: true,
    });
  }

  // Select a single image from home_banner_picture table
  async getImageByCondition(where: Prisma.home_banner_pictureWhereInput): Promise<home_banner_picture> {
    return this.prisma.home_banner_picture.findFirst({
      where,
      rejectOnNotFound: true,
    });
  }

  // Select a list of image from home_banner_picture table
  async getImages(params: {
    skip?: number;
    take?: number;
    where?: Prisma.home_banner_pictureWhereInput;
    orderBy?: Prisma.home_banner_pictureOrderByWithRelationInput;
  }): Promise<home_banner_picture[]> {
    const { skip, take, where, orderBy } = params;

    return this.prisma.home_banner_picture.findMany({
      where,
      orderBy,
      skip,
      take,
    });
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

    // Also delete pictures of this banner
    bannerInfo.picture_id.forEach(id => this.deleteImage({ id }));

    return {
      success: true,
      bannerInfo,
    };
  }

  // Delete sub image of banner with specific id
  async deleteSubImage(bannerId: number, subId: number): Promise<home_banner_picture> {

    // Also remove picture_id from banner
    const bannerInfo = await this.getInfo({ id: bannerId });

    const pictureIds = bannerInfo.picture_id.filter(id => id !== subId);

    this.updateInfo({
      where: { id: bannerId },
      data: { picture_id: pictureIds },
    });

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
      throw new HttpException(err.message, 500);
    }
    console.log(err.message);
    throw new HttpException(err.message, 500);
  }
}