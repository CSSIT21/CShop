import { Module } from '@nestjs/common';
import { SellershopService } from './sellershop.service';
import { SellershopController } from './sellershop.controller';

@Module({
  controllers: [SellershopController],
  providers: [SellershopService]
})
export class SellershopModule {}
