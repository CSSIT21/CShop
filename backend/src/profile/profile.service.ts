import { HttpException, Injectable } from '@nestjs/common';
import { Gender } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './dto/user.dto';
import * as CryptoJs from 'crypto-js';

@Injectable()
export class ProfileService {
	constructor(private readonly prisma: PrismaService) {}

	public async fetch(id: number) {
		try {
			const user = await this.prisma.customer.findFirst({
				where: { id },
				include: {
					customer_info: true,
					shop_info: true,
					customer_address: {
						include: {
							address_id_from_customer_address: true,
						},
					},
					customer_picture: {
						include: {
							picture_id_from_customer_picture: true,
						},
					},
				},
			});
			return user;
		} catch (e) {
			console.error('ERROR: ', e.message);
			throw new HttpException('User not found!', 500);
		}
	}

	public async update(data: User) {
		const {
			id,
			firstname,
			lastname,
			confirmPassword,
			phoneNumber,
			gender,
			birthdate,
			addressId,
			addressLine,
			district,
			postalCode,
			province,
			subDistrict,
		} = data;

		if (
			await this.prisma.customer.findFirst({
				where: { id: id, password: CryptoJs.HmacSHA512(confirmPassword, process.env.PASSWORD_KEY).toString() },
			})
		) {
			try {
				await this.prisma.customer.update({
					where: {
						id: id,
					},
					data: {
						customer_info: {
							update: {
								firstname: firstname,
								lastname: lastname,
								gender: Gender[gender.replace('preferNotToSay', 'PreferNotToSay')],
								birthdate: birthdate,
								phone_number: phoneNumber,
							},
						},
					},
				});
				await this.prisma.address.update({
					where: {
						id: addressId,
					},
					data: {
						address_line: addressLine,
						district,
						province,
						sub_district: subDistrict,
						postal_code: postalCode.toString(),
					},
				});
			} catch (e) {
				console.log(e.message);
				return {
					success: false,
				};
			}
			return {
				success: true,
			};
		} else {
			return { success: false };
		}
	}

	public async updateImage(data: User) {
		const { id, url, title } = data;
		try {
			await this.prisma.customer_picture_file.update({
				where: {
					id: id,
				},
				data: {
					title: title,
					path: url,
					thumbnail: url,
				},
			});
			return {
				success: true,
			};
		} catch (e) {
			console.log(e.message);
			return {
				success: false,
			};
		}
	}
}
