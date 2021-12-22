import { PartialType } from '@nestjs/mapped-types';
import { CreateSellerconsoleDto } from './create-sellerconsole.dto';

export class UpdateSellerconsoleDto extends PartialType(CreateSellerconsoleDto) {}
