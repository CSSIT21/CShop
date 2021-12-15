import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateBannerInfoDto {
	@IsNotEmpty()
	@IsOptional()
	description?: string;

	@IsDate()
	@IsOptional()
	start_date?: Date;

	@IsDate()
	@IsOptional()
	end_date?: Date;

	@IsInt()
	@IsOptional()
	order?: number;

	@IsArray()
	@ArrayMinSize(1)
	@ArrayMaxSize(6)
	@IsOptional()
	keywords?: string[];

	@IsBoolean()
	@IsOptional()
	visible?: boolean;
}
