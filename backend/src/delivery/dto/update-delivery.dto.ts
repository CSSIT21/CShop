import { PartialType } from '@nestjs/mapped-types';
import { DeliveryLoginDTO } from './create-delivery.dto';

export class UpdateDeliveryDto extends PartialType(DeliveryLoginDTO) { }
