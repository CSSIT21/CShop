import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import Axios from 'axios';
import { stringify } from 'querystring';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
    constructor(private readonly prisma: PrismaService) { }
    
    async getQr() {
        const data = {
            qrType: 'PP',
            ppType: 'BILLERID',
            ppId: process.env.ppId,
            amount: '250.00',
            ref1: '000',
            ref3: process.env.ref3,
        };
        let accessToken: any;
        let d1: any;
        const dataTest = {
            applicationKey: process.env.API_Key,
            applicationSecret: process.env.API_Secret,
        };
        await Axios({
            method: 'post',
            url: 'https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'EN',
                RequestUId: process.env.uuid,
                ResourceOwnerId: process.env.API_Key,
            },
            data: JSON.stringify(dataTest),
        })
            .then((response) => {
                d1 = (<any>response.data);
                accessToken = d1.data.accessToken;
            })
            .catch((error) => {
                console.error(error);
            });
        let str: any;
        await Axios({
            method: 'post',
            url: 'https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'EN',
                Authorization: 'Bearer ' + accessToken,
                RequestUId: process.env.uuid,
                ResourceOwnerId: process.env.API_Key,
            },
            data: JSON.stringify(data),
        })
            .then((response) => {
                d1 = (<any>response.data)
                str = d1.data.qrRawData;
            })
            .catch((error) => {
                console.error(error);
            });
        return str;
    }

    async getWallet() {
        return await this.prisma.wallet.findMany();
        // console.log(wallet);
        
		// return wallet
        
        // where: {
			// 	customer_id: userId,
			// },
    }

    async createWallet(customerId?: number) {
        return await this.prisma.wallet.create({
				data: {
					// id: walletId,
					customer_id: customerId,
					balance: 0,
					updated_time: new Date().toISOString(),
				}
			});
    }

    async createAllWallets() {
        let customerId = await this.prisma.customer.findMany({
            take: 100,
            select: {id: true}
        })
        return customerId.map(async (e) => await this.prisma.wallet.create({
            data: 
            {
                customer_id: e.id,
                balance: 0,
                updated_time: new Date().toISOString(),
            },
            }))
    }

    async searchCustomers() {
        return await this.prisma.customer.findMany({
            take: 100,
            select: {id: true}
        })
    }

    // async createPayment(customerId?: number) {
    //     return
    // }

    async searhOrder() {
        return await this.prisma.order.findMany({
            take: 10,
        })
    }
    

    
    async createPaymentWallet(orderId?: number) {
        // let orderDetail = await this.prisma.order_detail.findUnique({
        //     where: {
        //         order_id: orderId,
        //     }
        // })
        let order = await this.prisma.order.findFirst({
            where: {
                id: orderId,
            },
            select: {
                total_price: true,
                customer_id: true,
            },
        })
        return await this.prisma.payment.create({
            data: {
                order_id: orderId,
                type: "Wallet",
                amount: order.total_price,
                status: "Pending",
                created_date: new Date(),
                updated_date: new Date(),
                home_payment_log: {
                    create: {
                        customer_id: order.customer_id,
                        issue_at: new Date().toISOString(),
                    },
                }, 
            }
        })
    }

    async createPaymentWalletTrans(amount?: number, walletId?: number, paymentId?: number) {
        return await this.prisma.payment_transaction.create({
            data: {
                amount: amount,
                time: new Date().toISOString(),
                desc: "Wow",
                payment_wallet_transaction: {
                    create: {
                        status: "Success",
                        wallet_id: walletId,
                        refund_id: 0,
                        payment_wallet: {
                            create: {
                                payment_id: paymentId,
                                wallet_id: walletId,
                            }
                        }
                    }
                }
            }
        })
    }

    async searchPayment(paymentId?: number) {
        return await this.prisma.payment.findFirst({
            where: {
                id: paymentId
            }
        })
    }

    async searchTrans(transId: number) {
        return this.prisma.payment_transaction.findFirst({
            where: {
                id: transId
            }
        })
    }
    async searLog(customerId: number) {
        return await this.prisma.home_payment_log.findFirst({
            where: {
                customer_id: customerId
            }
        })
    }







    //------------------------------creditcard--------------------------------
    async createPaymentCreditCard(orderId: number){
            let order = await this.prisma.order.findFirst({
                where: {
                    id: orderId,
                },
                select: {
                    total_price: true,
                    customer_id: true,
                },
            })
            return await this.prisma.payment.create({
                data: {
                    order_id: orderId,
                    type: "Card",
                    amount: order.total_price,
                    status: "Pending",
                    created_date: new Date(),
                    updated_date: new Date(),
                    home_payment_log: {
                        create: {
                            customer_id: order.customer_id,
                            issue_at: new Date().toISOString(),
                        },
                    }, 
                }
            })
        }
    
    


    //-------------------------------etc----------------------------
    throwError(err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(err.message);
      throw new HttpException(err.message, 500);
    }
    console.log(err.message);
    throw new HttpException(err.message, 500);
  }
		
}
