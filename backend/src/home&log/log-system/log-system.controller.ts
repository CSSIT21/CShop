import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { LogSystemService } from './log-system.service';
import { CreateAddToCardLogDto } from './dto/create-add-to-card-log.dto';

@Controller('log-system')
export class LogSystemController {
  constructor(private readonly logSystemService: LogSystemService) { }
  
  @Post("addToCard/:customer_id/:product_id") 
  async createAddToCard(@Param('customer_id', ParseIntPipe) customer_id: number, @Param('product_id', ParseIntPipe) product_id: number, @Body() addTocardDto: CreateAddToCardLogDto)  { 
    try {
      return this.logSystemService.createAddToCard(addTocardDto,customer_id,product_id)
    }
    catch (err){ 
      this.logSystemService.throwError(err);
    }
    
  }  

  
}
