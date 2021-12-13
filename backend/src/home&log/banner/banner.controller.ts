import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { CreateSubImageDto } from './dto/create-sub-image.dto';

@Controller('home/banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) { }

  @Post()
  async createBanner(@Body() bannerDto: CreateBannerDto) {
    try {
      return this.bannerService.createBanner(bannerDto);
    }
    catch (err) {
      this.bannerService.throwError(err);
    }
  }

  @Post(':id/sub')
  async createSubImage(@Param('id', ParseIntPipe) id: number, @Body() subImageDto: CreateSubImageDto) {
    try {
      return this.bannerService.createSubImage(id, subImageDto);
    }
    catch (err) {
      this.bannerService.throwError(err);
    }
  }

  @Get('homepage')
  async getVisibleBanners() {
    try {
      return this.bannerService.getBanners({
        where: {
          visible: true,
          end_date: {
            lte: Date.now().toString(),
          }
        },
        orderBy: {
          order: 'asc',
        },
      });
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
      this.bannerService.deleteBanner({ id });
    }
    catch (err) {
      this.bannerService.throwError(err);
    }
  }

  @Delete(':id/sub/:subId')
  async deleteSubImage(@Param('id', ParseIntPipe) bannerId: number, @Param('subId', ParseIntPipe) subId: number) {
    try {
      this.bannerService.deleteSubImage(bannerId, subId);
    }
    catch (err) {
      this.bannerService.throwError(err);
    }
  }
}
