import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	// @MinLength(8)
	password: string;
}
