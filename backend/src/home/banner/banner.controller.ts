import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerInfoDto } from './dto/create-banner-info.dto';
import { UpdateBannerInfoDto } from './dto/update-banner-info.dto';
import { CreateBannerImageDto } from './dto/create-banner-image.dto';
import { home_banner, home_banner_picture } from '@prisma/client';

@Controller('home/banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) { }

  // Create new banner with information and main image
  @Post()
  async createBanner(@Body() bannerData: { bannerInfo: CreateBannerInfoDto; bannerImage: CreateBannerImageDto }) {
    const { bannerInfo, bannerImage } = bannerData;
    const { description, start_date, end_date, order, keywords, visible, } = bannerInfo;
    let picture: home_banner_picture, info: home_banner;

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
        this.bannerService.deleteImageById({ id: picture.id });
        this.bannerService.throwError(err); // outside catch will catch this and send response with error
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

      await this.bannerService.updateInfoById({
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

  // Get all visible banners for homepage
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

  // Get all banners for management page
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

  // Update a banner information by Id
  @Patch(':id')
  async updateInfo(@Param('id', ParseIntPipe) id: number, @Body() bannerDto: UpdateBannerInfoDto) {
    try {
      const bannerInfo = await this.bannerService.updateInfoById({
        data: bannerDto,
        where: { id },
      });

      return {
        success: true,
        bannerInfo,
      };
    }
    catch (err) {
      this.bannerService.throwError(err);
    }
  }

  // Delete a banner
  @Delete(':id')
  async deleteBanner(@Param('id', ParseIntPipe) id: number) {
    try {
      const bannerInfo = await this.bannerService.deleteBannerById({ id });

      return {
        success: true,
        bannerInfo,
      };
    }
    catch (err) {
      this.bannerService.throwError(err);
    }
  }

  // Delete sub image from specific banner
  @Delete(':id/sub/:subId')
  async deleteSubImage(@Param('id', ParseIntPipe) bannerId: number, @Param('subId', ParseIntPipe) subId: number) {
    try {
      const deletedImage = await this.bannerService.deleteSubImage(bannerId, subId);

      return {
        success: true,
        deletedImage,
      };
    }
    catch (err) {
      this.bannerService.throwError(err);
    }
  }
}
