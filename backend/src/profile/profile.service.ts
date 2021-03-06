import { HttpException, Injectable } from '@nestjs/common';
import { Gender, OrderStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './dto/user.dto';
import * as CryptoJs from 'crypto-js';
import { FavouriteProduct } from './dto/favourite.dto';
import { Order } from './dto/order.dto';
import { Product } from './dto/product.dto';
import { Address } from './dto/address.dto';

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
					order_cart_item: true,
					admin: true,
				},
			});
			if (user.shop_info.length > 0) {
				return { ...user, role: 'SELLER' };
			}
			if (user.admin) {
				return { ...user, role: 'ADMIN' };
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
	public async getFollowingShop(data: User, page: number) {
		const { id } = data;
		try {
			const count = await this.prisma.customer_followed_shop.count({
				where: {
					customer_id: id,
				},
			});
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
			const filteredShop = followingShop.slice((page - 1) * 20, page * 20);
			return {
				success: true,
				filteredShop,
				count,
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
	public async favourite(data: FavouriteProduct) {
		const { customer_id, product_id } = data;
		try {
			const check = await this.prisma.customer_wishlist.findFirst({
				where: {
					customer_id: customer_id,
					product_id: product_id,
				},
			});
			if (check) {
				await this.prisma.customer_wishlist.delete({
					where: {
						id: check.id,
					},
				});
				return 'You delete this product from your wishlist';
			}
			await this.prisma.customer_wishlist.create({
				data: {
					customer_id: customer_id,
					product_id: product_id,
				},
			});
			return 'You add this product to your wishlist';
		} catch (e) {
			console.log(e.message);
			return {
				success: false,
				message: 'Error!',
			};
		}
	}
	public async getOrders(data: Order) {
		const { customer_id } = data;
		try {
			const order = await this.prisma.order.findMany({
				where: {
					customer_id: customer_id,
				},
				include: {
					order_detail: {
						include: {
							address_id_from_order_detail: true,
						},
					},
					order_item: {
						select: {
							product_id: true,
							product_id_from_order_item: {
								select: {
									title: true,
									sub_title: true,
									price: true,
									product_picture: {
										take: 1,
									},
								},
							},
						},
					},
				},
			});
			if (order) {
				return order;
			} else {
				return 'This user has no order';
			}
		} catch (e) {
			console.log(e.message);
			return {
				success: false,
				message: 'Error!',
			};
		}
	}

	public async getOrderDetail(data: Order) {
		const { customer_id, order_id } = data;
		try {
			const orderDetail = await this.prisma.order.findFirst({
				where: {
					customer_id: customer_id,
					id: order_id,
				},
				include: {
					order_detail: {
						include: {
							address_id_from_order_detail: true,
						},
					},
					order_item: {
						select: {
							product_id: true,
							quantity: true,
							product_options: true,
							product_id_from_order_item: {
								select: {
									title: true,
									sub_title: true,
									price: true,
									product_picture: {
										take: 1,
									},
									shop_id: true,
								},
							},
						},
					},
				},
			});
			return orderDetail;
		} catch (e) {
			console.log(e.message);
			return {
				success: false,
				message: 'Error!',
			};
		}
	}

	public async getProductDetail(data: Product) {
		const { option_one, option_two } = data;

		try {
			const productChoiceOne = await this.prisma.product_choices.findFirst({
				where: {
					id: option_one,
				},
				select: {
					name: true,
				},
			});
			if (option_two) {
				const productChoiceTwo = await this.prisma.product_choices.findFirst({
					where: {
						id: option_two,
					},
					select: {
						name: true,
					},
				});
				const options = [productChoiceOne, productChoiceTwo];
				return options;
			}

			const options = [productChoiceOne];
			return options;
		} catch (e) {
			console.log(e.message);
			return {
				success: false,
				message: 'Error!',
			};
		}
	}
	public async checkIfReview(data: Product) {
		const { customer_id, product_id } = data;
		try {
			const review = await this.prisma.product_reviews.findFirst({
				where: {
					customer_id: customer_id,
					product_id: product_id,
				},
			});
			if (review) {
				return true;
			}
			return false;
		} catch (e) {
			console.log(e.message);
			return {
				success: false,
				message: 'Error!',
			};
		}
	}
	public async changePrimary(data: Address) {
		const { customer_id, address_id } = data;
		try {
			const oldPrimary = await this.prisma.customer_address.findFirst({
				where: {
					customer_id: customer_id,
					primary: true,
				},
			});
			await this.prisma.customer_address.update({
				where: {
					id: oldPrimary.id,
				},
				data: {
					primary: false,
				},
			});
			const newPrimary = await this.prisma.customer_address.findFirst({
				where: {
					customer_id: customer_id,
					address_id: address_id,
				},
			});
			await this.prisma.customer_address.update({
				where: {
					id: newPrimary.id,
				},
				data: {
					primary: true,
				},
			});
			return true;
		} catch (e) {
			console.log(e.message);
			return {
				success: false,
				message: 'Error!',
			};
		}
	}
	public async resetPassword(data: User) {
		const { email, password } = data;
		try {
			await this.prisma.customer.update({
				where: {
					email: email,
				},
				data: {
					password: CryptoJs.HmacSHA512(password, process.env.PASSWORD_KEY).toString(),
				},
			});
			return {
				success: true,
			};
		} catch (e) {
			console.log(e.message);
			return {
				success: false,
				message: 'Error!',
			};
		}
	}
}
