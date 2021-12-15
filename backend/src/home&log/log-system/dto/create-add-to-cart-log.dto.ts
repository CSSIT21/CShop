import { IsDate } from 'class-validator';

export class CreateAddToCartLogDto {
	@IsDate()
	added_date: Date;
}
