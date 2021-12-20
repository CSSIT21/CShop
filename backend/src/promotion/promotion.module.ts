import { Module } from '@nestjs/common';
import {PromotionController} from './promotion.controller';
import {PromotionService} from './promotion.service';
import {HttpModule } from '@nestjs/axios';
import { HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PromotionController],
  providers: [PromotionService],
})

export class PromotionModule {}
