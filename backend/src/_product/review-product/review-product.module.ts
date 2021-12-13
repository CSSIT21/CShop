import { Module } from '@nestjs/common';
import { ReviewProductController } from './review-product.controller';
import { ReviewProductService } from './review-product.service';

@Module({
  controllers: [ReviewProductController],
  providers: [ReviewProductService]
})
export class ReviewProductModule {}
