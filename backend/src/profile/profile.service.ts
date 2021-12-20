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
						where: {
							primary: true,
						},
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
			if (user.shop_info.length > 0) {
				return { ...user, role: 'SELLER' };
			}
			return { ...user, role: 'CUSTOMER' };
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
	public async getFollowingShop(data: User) {
		const { id } = data;
		try {
			const followingShop = await this.prisma.customer_followed_shop.findMany({
				where: {
					customer_id: id,
				},
				select: {
					shop_id_from_customer_followed_shop: {
						select: {
							id: true,
							shop_name: true,
							shop_picture: {
								select: {
									path: true,
								},
							},
						},
					},
				},
			});
			return {
				success: true,
				followingShop,
			};
		} catch (e) {
			console.log(e.message);
			return {
				success: false,
			};
		}
	}

	public async getAddress(data: User) {
		const { id } = data;
		try {
			const addressPrimary = await this.prisma.address.findMany({
				where: {
					customer_address: {
						some: {
							customer_id: id,
							primary: true,
						},
					},
				},
				select: {
					id: true,
					address_line: true,
					sub_district: true,
					district: true,
					province: true,
					postal_code: true,
					recipient_name: true,
					phone_number: true,
					customer_address: {
						where: {
							customer_id: id,
						},
					},
				},
			});
			const address = await this.prisma.address.findMany({
				where: {
					customer_address: {
						some: {
							customer_id: id,
							primary: false,
						},
					},
				},
				select: {
					id: true,
					address_line: true,
					sub_district: true,
					district: true,
					province: true,
					postal_code: true,
					recipient_name: true,
					phone_number: true,
					customer_address: {
						where: {
							customer_id: id,
						},
					},
				},
				orderBy: {
					id: 'asc',
				},
			});
			return {
				success: true,
				address: [...addressPrimary, ...address],
			};
		} catch (e) {
			console.log(e.message);
			return {
				success: false,
			};
		}
	}
	public async deleteAddress(data: User) {
		const { id, addressId } = data;
		try {
			const deleteId = await this.prisma.customer_address.findFirst({
				where: {
					customer_id: id,
					address_id: addressId,
				},
			});
			if (deleteId) {
				await this.prisma.customer_address.delete({
					where: {
						id: deleteId.id,
					},
				});
				return {
					success: true,
				};
			}
		} catch (e) {
			console.log(e.message);
			return {
				success: false,
			};
		}
	}
	public async addAddress(data: User) {
		const { id, recipient, addressLine, province, district, subDistrict, postalCode, phoneNumber } = data;
		try {
			await this.prisma.address.create({
				data: {
					address_line: addressLine,
					district,
					postal_code: postalCode.toString(),
					province,
					sub_district: subDistrict,
					recipient_name: recipient,
					phone_number: phoneNumber,
					customer_address: {
						create: {
							customer_id: id,
							primary: false,
						},
					},
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
