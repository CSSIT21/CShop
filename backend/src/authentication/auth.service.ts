import { HttpException, Injectable } from '@nestjs/common';
import * as CryptoJs from 'crypto-js';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, customer, Gender, customer_address } from '.prisma/client';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthenticationService {
	constructor(private readonly prisma: PrismaService) { }

	public async register(data: RegisterDto) {
		console.log(data);
		const {
			email,
			password,
			firstname,
			lastname,
			confirmPassword,
			phoneNumber,
			gender,
			birthdate,
			addressLine,
			district,
			postalCode,
			province,
			subDistrict,
		} = data;
		let user;
		if (password !== confirmPassword) throw new HttpException('Password mismatched!', 500);

		if (await this.prisma.customer.findFirst({ where: { email } }))
			throw new HttpException('Email already exists!', 500);

		try {
			user = await this.prisma.customer.create({
				data: {
					email,
					password: CryptoJs.HmacSHA512(password, process.env.PASSWORD_KEY).toString(),
					customer_info: {
						create: {
							firstname,
							lastname,
							gender: Gender[gender.replace('preferNotToSay', 'PreferNotToSay')],
							birthdate: birthdate,
							phone_number: phoneNumber,
						},
					},
					customer_address: {
						create: {
							primary: true,
							address_id_from_customer_address: {
								create: {
									address_line: addressLine,
									district,
									postal_code: postalCode.toString(),
									province,
									sub_district: subDistrict,
									recipient_name: firstname + ' ' + lastname,
									phone_number: phoneNumber,
									order_detail: {
										create: [],
									},
									shop_info: {
										create: [],
									},
								},
							},
						},
					},
					// customer_picture: {},
				},
			});
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002')
					throw new HttpException('A new user cannot be created with this email or username', 500);

				throw new HttpException('Error creating profile please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error create profile request body incorrect', 500);
		}
		return {
			message: 'Register success!',
			user,
			success: true,
			statusCode: 200,
		};
	}

	public async findAll() {
		return this.prisma.customer.findMany({
			where: {},
			include: {
				customer_info: true,
			},
		});
	}

	public async checkemail(data: LoginDto) {
		const user = await this.prisma.customer.findFirst({
			where: {
				email: data.email,
			},
		});
		if (user) {
			return {
				success: true,
			};
		}
		return {
			success: false,
		};
	}

	public static async getUserFromToken(token: string) {
		const regex = /\w/
		if(regex.test(token))
		{
			return token.charCodeAt(0) - 96
		}
	}
}
