import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateBannerInfoDto {
	@IsNotEmpty()
	description: string;

	@IsDate()
	start_date: Date;

	@IsDate()
	end_date: Date;

	@IsInt()
	order: number;

	@IsArray()
	@ArrayMinSize(1)
	@ArrayMaxSize(6)
	keywords: string[];

	@IsBoolean()
	@IsOptional()
	visible?: boolean;
}