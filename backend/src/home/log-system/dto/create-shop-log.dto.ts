import { IsDate } from 'class-validator';

export class CreateShopLogDto {
	@IsDate()
	view_date: Date;
}
