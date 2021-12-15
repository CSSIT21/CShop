import { HttpException, Injectable } from '@nestjs/common';
import { Gender } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './dto/user.dto';

@Injectable()
export class ProfileService {
	constructor(private readonly prisma: PrismaService) {}

	public async update(data: User) {
		const {
			id,
			email,
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
		let user;
		if (await this.prisma.customer.findFirst({ where: { email } }))
			throw new HttpException('Email already exists!', 500);

		if (await this.prisma.customer.findFirst({ where: { id, password: confirmPassword } })) {
			throw new HttpException('Password mismatch!', 500);
		}
		try {
			await this.prisma.customer.update({
				where: {
					id: id,
				},
				data: {
					email: email,
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
	}
}
