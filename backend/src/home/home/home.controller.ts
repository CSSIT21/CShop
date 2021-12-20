import { Controller, Get, Param, ParseArrayPipe, ParseIntPipe, Query } from '@nestjs/common';
import { HomeService } from './home.service';
import { Public } from 'src/common/decorators/public.decorator';


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
    @Query('product_ids', ParseArrayPipe) product_ids: number[],
    @Query('take', ParseIntPipe) take: number,
    @Query('skip', ParseIntPipe) skip: number,
  ) {
    try {
      product_ids = product_ids.map(id => +id);

      const suggestions = await this.homeService.findProductsById({
        customer_id,
        product_ids,
        take,
        skip,
      });

      const count = suggestions.length;

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
