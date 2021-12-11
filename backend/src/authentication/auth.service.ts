import { HttpException, Injectable } from '@nestjs/common';
import * as CryptoJs from 'crypto-js';
import { v4 as uuid_gen } from 'uuid';
import { nanoid } from 'nanoid';

import { PrismaService } from 'src/prisma/prisma.service';
// import { mkdirSync } from 'fs';
// import { resizedDir } from 'src/common/constant/storage';
import { Prisma, customer, Gender, customer_address } from '.prisma/client';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

// import { RegisterDto } from './dto/register.dts';
@Injectable()
export class AuthenticationService {
	constructor(private readonly prisma: PrismaService) {}

	public async register(data: RegisterDto) {
		const {
			email,
			password,
			firstname,
			lastname,
			confirmPassword,
			phoneNumber,
			gender,
			day,
			month,
			year,
			addressLine,
			district,
			postalCode,
			province,
			subDistrict,
		} = data;

		if (password !== confirmPassword) throw new HttpException('Password mismatched!', 500);
		try {
			const user = await this.prisma.customer.create({
				data: {
					email,
					password: CryptoJs.HmacSHA256(password, process.env.PASSWORD_KEY).toString(),
					customer_info: {
						create: [
							{
								firstname,
								lastname,
								gender: Gender[gender.replace('preferNotToSay', 'PreferNotToSay')],
								birthdate: new Date(year, month, day),
								phone_number: phoneNumber,
							},
						],
					},
					customer_address: {
						create: [
							{
								primary: true,
								address_id_from_customer_address: {
									create: {
										address_line: addressLine,
										district,
										postal_code: postalCode.toString(),
										province,
										sub_district: subDistrict,
									},
								},
							},
						],
					},
					old_password: {
						create: [],
					},
					wishlist: {
						create: [],
					},
					customer_picture: {
						create: [],
					},
					followed_shop: {
						create: [],
					},
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
		return 'Complete!';
	}

	public async findAll() {
		return this.prisma.customer.findMany({
			where: {},
			include: {
				customer_info: true,
			},
		});
	}

	public async update(id: number, updateAuthenticationDto) {
		return `This action updates a #${id} authentication`;
	}

	public async remove(id: number) {
		return `This action removes a #${id} authentication`;
	}

	public async login(data: LoginDto) {
		const user = await this.prisma.customer.findFirst({
			where: {
				email: data.email,
				password: data.password,
			},
		});
		//test@gmail.com
		//12345678
		if (user) {
			//JWT
			return true;
		}
		return false;
	}
}
