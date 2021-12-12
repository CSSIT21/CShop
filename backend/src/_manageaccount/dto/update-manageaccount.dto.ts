import { PartialType } from '@nestjs/mapped-types';
import { CreateManageaccountDto } from './create-manageaccount.dto';

export class UpdateManageaccountDto extends PartialType(CreateManageaccountDto) {}
