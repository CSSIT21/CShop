import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HmacSHA512 } from 'crypto-js';
import { DeliveryLoginDTO } from './dto/create-delivery.dto';
import { nanoid } from 'nanoid';
import * as province from './file/province.json'
import { Address } from './dto/address.dto';
import { ChangeStatus } from './dto/change-status.dto';
import { UpdateDetailDTO } from './dto/update-detail.dto';

@Injectable()
export class DeliveryService {
	constructor(private readonly prisma: PrismaService) { }

	public async login(loginInfo: DeliveryLoginDTO) {
		console.log(loginInfo);

		let password = HmacSHA512(loginInfo.password, process.env.PASSWORD_KEY).toString()
		try {
			const adminInfo = await this.prisma.delivery_admin.findFirst({
				where: {
					username: loginInfo.username,
					password: password,
				}
			})
			let token = nanoid()
			const login = await this.prisma.delivery_admin.update({
				where: {
					id: adminInfo.id
				},
				data: {
					token: token
				}
			})

			if (login) {
				return {
					success: true,
					token: login.token
				}
			} else {
				return {
					success: false
				}
			}

		} catch (e) {
			return e
		}
	}

	public async getDetail(tracking_number: string) {
		try {
			const fetchedDetail = await this.prisma.delivery_product_status.findFirst({
				where: {
					tracking_number: tracking_number
				}
			})
			if (fetchedDetail) {
				return {
					detail: fetchedDetail
				}
			} else {
				success: false
			}
		} catch (e) {
			return e
		}

	}

	public async generateTrackingNumber(address: Address) {
		let provinceNumber = province[address.province]
		const createTrackingNumber = await this.prisma.delivery_product_status.create({
			data: {
				recipient_name: address.recipient_name,
				delivery_detail: {
					Time: Date.now(),
					detail: "Received a request"
				},
				province: provinceNumber.toString()
			}
		})

		const changeTrackingNumber = () => {
			const id = createTrackingNumber.id.toString()
			let length = id.length
			let zero = ""

			for (let index = 1; index < 6 - length; index++) {
				zero += "0"
			}
			return "CSC".concat(provinceNumber, zero, id)
		}

		const trackingNumber = changeTrackingNumber()

		const updateTrackingnumber = await this.prisma.delivery_product_status.update({
			where: {
				id: createTrackingNumber.id
			},
			data: {
				tracking_number: trackingNumber
			}
		})

		return {
			id: updateTrackingnumber.id,
			tracking_number: updateTrackingnumber.tracking_number
		}
	}

	public async getAdminCheckStatus(status: string) {
		try {
			const checkStatus = (v): string => {
				switch (v) {
					case 'requests':
						return "Received a request";
					case 'packages':
						return 'Received a package';
					case 'delivering':
						return 'Delivering';
					default:
						return 'Success'
				}
			}
			const fetchedRequest = await this.prisma.delivery_product_status.findMany({
				where: {
					status: checkStatus(status)
				}
			})
			return fetchedRequest

		} catch (e) {
			return e
		}
	}

	public async updateDetail(newDetail: UpdateDetailDTO) {
		try {
			let decryptPassword = HmacSHA512(newDetail.password, process.env.PASSWORD_KEY).toString()

			const checkAdmin = await this.prisma.delivery_admin.findFirst({
				where: {
					username: newDetail.username,
					password: decryptPassword,
					token: newDetail.token
				}
			})
			if (checkAdmin) {
				const fetchedId = await this.prisma.delivery_product_status.findFirst({
					where: {
						tracking_number: newDetail.trackingNumber
					}
				})
				const updateDetail = await this.prisma.delivery_product_status.update({
					where: {
						id: fetchedId.id
					},
					data: {
						latest_update: new Date(Date.now()),
						delivery_detail: {
							push: {
								detail: newDetail.newDetail,
								time: Date.now()
							}
						}
					}
				})

				if (updateDetail) {
					return {
						success: true
					}
				} else {
					return {
						success: false
					}
				}
			} else {
				return {
					success: false
				}
			}

		} catch (e) {
			return e
		}
	}

	public async changeStatus(newStatus: ChangeStatus) {
		try {
			let decryptPassword = HmacSHA512(newStatus.password, process.env.PASSWORD_KEY).toString()
			const checkAdmin = await this.prisma.delivery_admin.findFirst({
				where: {
					username: newStatus.username,
					password: decryptPassword,
					token: newStatus.token
				}
			})

			if (checkAdmin) {
				const fetchedStatusId = await this.prisma.delivery_product_status.findFirst({
					where: {
						tracking_number: newStatus.trackingNumber
					},
				})

				const updateStatusFunc = async () => {
					if (newStatus.newStatus === "Success") {
						const updateStatus = await this.prisma.delivery_product_status.update({
							where: {
								id: fetchedStatusId.id
							},
							data: {
								status: newStatus.newStatus,
								latest_update: new Date(Date.now()),
								complete_date: new Date(Date.now()),
								delivery_detail: {
									push: {
										detail: newStatus.newStatus,
										time: Date.now()
									}
								}
							}
						})
						const updateAdmin = await this.prisma.delivery_admin_log.create({
							data: {
								admin_id: checkAdmin.id,
								delivery_id: updateStatus.id
							}
						})
						return updateAdmin

					} else {
						const updateStatus = await this.prisma.delivery_product_status.update({
							where: {
								id: fetchedStatusId.id
							},
							data: {
								status: newStatus.newStatus,
								latest_update: new Date(Date.now()),
								delivery_detail: {
									push: {
										detail: newStatus.newStatus,
										time: Date.now()
									}
								}
							}
						})
						const updateAdmin = await this.prisma.delivery_admin_log.create({
							data: {
								admin_id: checkAdmin.id,
								delivery_id: updateStatus.id
							}
						})
						return updateAdmin
					}
				}
				if ((await updateStatusFunc()).admin_id) {
					return {
						success: true
					}
				}
			} else {
				return {
					success: false,
				}
			}
		} catch (e) {
			return e
		}
	}
}
