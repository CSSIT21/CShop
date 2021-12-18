import { IsDate } from 'class-validator';

export class CreateDiscountLogDto {
	@IsDate()
	view_date: Date;
}
