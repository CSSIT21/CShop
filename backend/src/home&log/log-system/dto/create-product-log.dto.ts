import { IsDate } from 'class-validator';

export class CreateProductLogDto {
	@IsDate()
	view_date: Date;
}
