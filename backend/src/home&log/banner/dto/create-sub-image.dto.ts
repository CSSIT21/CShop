import { IsInt, IsNotEmpty } from "class-validator";

export class CreateSubImageDto {
	@IsNotEmpty()
	title: string;

	@IsNotEmpty()
	fileBase64: string;
}