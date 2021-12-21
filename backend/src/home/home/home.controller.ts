import { Controller, Get, Param, ParseArrayPipe, ParseIntPipe, Query } from '@nestjs/common';
import { HomeService } from './home.service';
import { Public } from 'src/common/decorators/public.decorator';
import axios from 'axios';


@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) { }

  @Get("reviews")
  @Public()
  async findAllReviews() {
    try {
      const reviews = await this.homeService.findAllReviews();
      return {
        success: true,
        reviews
      }
    } catch (err) {
      this.homeService.throwError(err);
    }
  }

  @Get("bestsellers/:id")
  @Public()
  async findAllSeller(@Param('id', ParseIntPipe) customer_id: number) {
    try {
      const bestsellers = await this.homeService.findBestSeller(customer_id);
      return {
        success: true,
        bestsellers,
      }
    } catch (err) {
      this.homeService.throwError(err);
    }
  }

  @Get("partners")
  @Public()
  async findAllPartners() {
    try {
      const partners = await this.homeService.findAllPartners();
      return {
        success: true,
        partners
      }
    } catch (err) {
      this.homeService.throwError(err);
    }
  }

  @Get("popup")
  @Public()
  async getPopUp() {
    try {
      const popup = await this.homeService.getPopUp();
      return {
        success: true,
        popup
      }
    } catch (err) {
      this.homeService.throwError(err);
    }
  }

  @Get("suggestions/:id")
  @Public()
  async findSuggestion(
    @Param('id', ParseIntPipe) customer_id: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('skip', ParseIntPipe) skip: number,
  ) {
    try {
      let apiPath = "";
      if (customer_id === 0) apiPath = 'https://ml-1.cshop.cscms.ml/suggestHomepageGeneral';
      else apiPath = `https://ml-1.cshop.cscms.ml/suggestHomepageMember?uid=${customer_id}`;

      let res = (await axios.get(apiPath)) as {
        data: {
          products: number[],
          uid: string
        }
      };

      const suggestions = await this.homeService.findProductsByIds({
        customer_id,
        productIds: res.data.products,
        take,
        skip,
      });

      const count = res.data.products.length;

      return {
        success: true,
        suggestions,
        count,
      };
    } catch (err) {
      this.homeService.throwError(err);
    }
  }

  @Get("favorites/:id")
  @Public()
  async findFavorite(@Param('id', ParseIntPipe) customer_id: number,
    @Query('take', ParseIntPipe) take?: number,
    @Query('skip', ParseIntPipe) skip?: number,
  ) {
    try {
      const favorites = await this.homeService.findFavorite({
        customer_id,
        where: { customer_id },
        take,
        skip,
      });

      return {
        success: true,
        favorites
      };
    } catch (err) {
      this.homeService.throwError(err);
    }
  }

  @Get("categories")
  @Public()
  async findcategory() {
    try {
      const categories = await this.homeService.findCategory();

      return {
        success: true,
        categories
      };
    } catch (err) {
      this.homeService.throwError(err);
    }
  }



}
