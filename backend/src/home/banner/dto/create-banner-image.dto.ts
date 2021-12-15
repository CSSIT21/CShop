import { homeBannerPicturePosition } from ".prisma/client";
import { IsEnum, IsNotEmpty } from "class-validator";

export class CreateBannerImageDto {
	@IsNotEmpty()
	title: string;

	@IsNotEmpty()
	@IsEnum(homeBannerPicturePosition)
	position: homeBannerPicturePosition;

	@IsNotEmpty()
	path: string;

	@IsNotEmpty()
	thumbnail: string;
}