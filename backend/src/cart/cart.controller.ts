import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post() @Public()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get() @Public()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id') @Public()
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id') @Public()
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Post('/addtocart') @Public()
  addtocart(@Body() request) { 
    return this.cartService.addtocart(request.userID, request.productID, request.amount, request.colorID, request.sizeID);
  }

  @Post('/removefromcart') @Public()
  removefromcart(@Body() request) { 
    console.log(request);
    return this.cartService.removefromcart(request.userID, request.productID);
  }

  @Delete(':id') @Public()
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
