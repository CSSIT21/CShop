import { Module } from '@nestjs/common';
import { ManageaccountService } from './manageaccount.service';
import { ManageaccountController } from './manageaccount.controller';

@Module({
  controllers: [ManageaccountController],
  providers: [ManageaccountService]
})
export class ManageaccountModule {}
