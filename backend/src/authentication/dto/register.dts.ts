import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto{
    
    username: string

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    // @IsEmail({}, { message: 'This is not an email!' })
    // email: string;

    // @IsNotEmpty()
    // first_name: string;

    // @IsNotEmpty()
    // last_name: string;
}