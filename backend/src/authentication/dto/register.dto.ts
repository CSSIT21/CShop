import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
	@IsEmail({}, { message: 'This is not an email!' })
	email: string;

	@IsNotEmpty()
	@MinLength(8)
	password: string;

	@IsNotEmpty()
	@MinLength(8)
	confirmPassword: string;

	/** NAME */
	firstname: string;
	lastname: string;
	gender: string;
	phoneNumber: string;

	birthdate: string;

	/** ADDRESS */
	province: string;
	subDistrict: string;
	addressLine: string;
	district: string;
	postalCode: number;

	//** IMAGE */
	url: string;
	title: string;
}
