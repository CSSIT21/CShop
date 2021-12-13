import { PartialType } from '@nestjs/mapped-types';
import { CreateLogSystemDto } from './create-log-system.dto';

export class UpdateLogSystemDto extends PartialType(CreateLogSystemDto) {}
