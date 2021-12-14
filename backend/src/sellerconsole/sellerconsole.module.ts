import { Module } from '@nestjs/common';
import { SellerconsoleService } from './sellerconsole.service';
import { SellerconsoleController } from './sellerconsole.controller';

@Module({
  controllers: [SellerconsoleController],
  providers: [SellerconsoleService]
})
export class SellerconsoleModule {}
