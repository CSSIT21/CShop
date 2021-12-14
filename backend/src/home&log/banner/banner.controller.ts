import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerInfoDto } from './dto/create-banner-info.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { CreateBannerImageDto } from './dto/create-banner-image.dto';

@Controller('home/banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) { }

  // Create new banner with information and main image
  @Post()
  async createBanner(@Body() bannerData: { bannerInfo: CreateBannerInfoDto; bannerImage: CreateBannerImageDto }) {
    const { bannerInfo, bannerImage } = bannerData;
    const { description, start_date, end_date, order, keywords, visible, } = bannerInfo;
    let picture, info;

    try {
      picture = await this.bannerService.createImage(bannerImage);

      try {
        info = await this.bannerService.createInfo({
          description,
          start_date,
          end_date,
          order,
          keywords,
          visible,
          picture_id: [picture.id],
        });
      }
      catch (err) {
        this.bannerService.deleteImage({ id: picture.id });
        this.bannerService.throwError(err);
      }

      return {
        success: true,
        banner: {
          ...info,
          pictures: {
            main: { ...picture },
            children: [],
          },
        },
      };
    }
    catch (err) {
      this.bannerService.throwError(err);
    }
  }

  // Create a sub image for banner with specific id
  @Post(':id/sub')
  async createSubImage(@Param('id', ParseIntPipe) id: number, @Body() imageDto: CreateBannerImageDto) {
    try {
      const bannerPic = await this.bannerService.createImage(imageDto);

      await this.bannerService.updateInfo({
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
    catch (err) {
      this.bannerService.throwError(err);
    }
  }

  @Get('homepage')
  async getHomepageBanners() {
    try {
      const banners = await this.bannerService.getBanners(true);

      return {
        success: true,
        banners,
      };
    }
    catch (err) {
      this.bannerService.throwError(err);
    }
  }

  @Get('manage')
  async getAllBanners() {
    try {
      const banners = await this.bannerService.getBanners(false);

      return {
        success: true,
        banners,
      };
    }
    catch (err) {
      this.bannerService.throwError(err);
    }
  }

  @Patch(':id')
  async updateInfo(@Param('id', ParseIntPipe) id: number, @Body() bannerDto: UpdateBannerDto) {
    try {
      return this.bannerService.updateInfo({
        data: bannerDto,
        where: { id },
      });
    }
    catch (err) {
      this.bannerService.throwError(err);
    }
  }

  @Delete(':id')
  async deleteBanner(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.bannerService.deleteBanner({ id });
    }
    catch (err) {
      this.bannerService.throwError(err);
    }
  }

  @Delete(':id/sub/:subId')
  async deleteSubImage(@Param('id', ParseIntPipe) bannerId: number, @Param('subId', ParseIntPipe) subId: number) {
    try {
      return this.bannerService.deleteSubImage(bannerId, subId);
    }
    catch (err) {
      this.bannerService.throwError(err);
    }
  }
}
