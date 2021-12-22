import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import Axios from 'axios';
import { stringify } from 'querystring';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as CryptoJs from 'crypto-js';
const cardGen = require('card-number-generator')



@Injectable()  
export class PaymentService {
    constructor(private readonly prisma: PrismaService) { }

    async getHash() {
        const saltOrRounds = 10;
        const password = 'random_password';
        return  await bcrypt.hash(password, saltOrRounds);
    }
    
    
    //-----------------QR code---------------//
    async getQr(orderId?: number) {
        //console.log(orderId);
        
        const order = await this.prisma.order.findFirst({
            where: {
                id: orderId,
            },
            select: {
                customer_id: true,
                total_price: true,
            }
        })
        const ref1 = Math.floor(100000 + Math.random() * 900000).toString();
        const data = {
            qrType: 'PP',
            ppType: 'BILLERID',
            ppId: process.env.ppId,
            amount: order.total_price.toString(),
            ref1: ref1,
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
        let createPayment = await this.createPaymentQr(orderId);
        //let createTrans = await this.createPaymentQrTrans(order.total_price, ref1, createPayment.id, str);
        if (order.total_price > 100) {
            
            let coinId = await this.prisma.discount_coin_information.findFirst({
                where: {
                    customer_id: order.customer_id,
                },
                select: {
                    id: true,
                    amount: true,
                }
            })
            let coin = await this.prisma.discount_coin_information.upsert({
                where: {
                        id: coinId.id,
                },
                update: {
                    amount: coinId.amount +  Math.floor(order.total_price / 100)
                },
                    create: {
                        customer_id: order.customer_id,
                        amount:  Math.floor(order.total_price / 100),
                        got_date: new Date().toISOString(),
                        expire_date: new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10),
                        get_from: "Payment"
                    }
                })
            }
        return { str,ref1 };
    }






    async createPaymentQr(orderId?: number) {
        let order = await this.prisma.order.findFirst({
            where: {
                id: orderId,
            },
            select: {
                total_price: true,
                customer_id: true,
            },
        })
        const payment = await this.prisma.payment.create({
            data: {
                order_id: orderId,
                type: "QR",
                amount: order.total_price,
                status: "Pending",
                created_date: new Date(),
                updated_date: new Date(),
            }
        })
    }

    async createPaymentQrTrans(amount?: number, ref?: string, paymentId?: number, qr?: string) {
        return await this.prisma.payment_transaction.create({
            data: {
                amount: amount,
                time: new Date().toISOString(),
                desc: "Wow",
                payment_qr: {
                    create: {
                        payment_id: paymentId,
                        ref: ref,
                        qr: qr
                    },
                },
            },
        });
    }

    async paidByQr(req?: any, orderId?: number, qr?: string, ref?: string) {
        let refRe = req.billPaymentRef1;
        let amount = parseInt(req.amount);
        let transId = parseInt(req.transactionId);
        let time = req.transactionDateandTime
        let customerId = await this.prisma.order.findFirst({
            where: {
                id: orderId,
            },
            select: {
                customer_id: true
            }
        })
        let payment = await this.prisma.payment.findFirst({
            where: {
                order_id: orderId
            }
        })
        let productId = await this.prisma.order_item.findFirst({
            where: {
                order_id: orderId
            },
            select: {
                product_id: true
            }
        })
        let shopId = await this.prisma.product.findFirst({
            where: {
                id: productId.product_id
            },
            select: {
                shop_id: true,
            }
        })
        if (refRe.normalize() === ref.normalize()) {
            let updatePayment = await this.prisma.payment.update({
                where: {
                    id: orderId,
                },
                data: {
                    status: "Success",
                }
            })
            let log = await this.prisma.home_payment_log.create({
                data: {
                    payment_id: payment.id,
                    customer_id: customerId.customer_id,
                    issue_at: new Date().toISOString()
                }
            })
            let sellIncome = await this.sellerIncome(shopId.shop_id, orderId);

            let trans = await this.prisma.payment_transaction.create({
                data: {
                    amount: amount,
                    time: time,
                    desc: "",
                },
            });
            let payQr = await this.prisma.payment_qr.create({
                data: {
                    payment_id: payment.id,
                    transaction_id: trans.id,
                    ref: ref,
                    qr: qr
                }
            })
            return payQr;
        } else {
            return null;
        }
        
    }




    //-----------------Wallet---------------//
    async getWallet(orderId?: number) {
        try {
            let order = await this.prisma.order.findFirst({
            where: {
                id: orderId,
            },
        })
        let wallet = await this.prisma.wallet.findFirst({
            where: {
                customer_id: order.customer_id
            }
        });
        
            return { wallet, order}
        } catch (err) {
            console.log(err)
        }
        
    }

    async createWallet(customerId?: number) {
        return await this.prisma.wallet.create({
				data: {
					customer_id: customerId,
					balance: 10000,
					updated_time: new Date().toISOString(),
				}
			});
    }

    async createPaymentWallet(orderId?: number) {
        try {
        let order = await this.prisma.order.findFirst({
            where: {
                id: orderId,
            },
            select: {
                total_price: true,
                customer_id: true,
            },
        })
        
        let payment = await this.prisma.payment.create({
            data: {
                order_id: orderId,
                type: "Wallet",
                amount: order.total_price,
                status: "Pending",
                created_date: new Date(),
                updated_date: null,
            }
        })
        let log = await this.prisma.home_payment_log.create({
                data: {
                    customer_id: order.customer_id,
                    payment_id: payment.id,
                    issue_at: new Date().toISOString()
                }
        })
            
            return payment;
        } catch (error) {
            throw(error)
        }
        
    }

    async paidByWallet(orderId?: number) {
        let order = await this.prisma.order.findFirst({
            where: {
                id: orderId,
            }
        })
        let payment = await this.prisma.payment.findFirst({
            where: {
                order_id: orderId,
            },
        })
        let wallet = await this.prisma.wallet.findFirst({
            where: {
                customer_id: order.customer_id,
            },
        })
        if (wallet.balance > order.total_price) {
            await this.prisma.wallet.update({
                where: {
                    id: wallet.id,
                },
                data: {
                    balance: wallet.balance - order.total_price,
                    updated_time: new Date().toISOString(),
                },
            })
            let trans = await this.prisma.payment_transaction.create({
            data: {
                amount: order.total_price,
                time: new Date().toISOString(),
                desc: ""
            }
        })
            let walletTrans = await this.prisma.payment_wallet_transaction.create({
                data: {
                    status: "Success",
                    wallet_id: wallet.id,
                    transaction_id: trans.id,
                    refund_id: null,
            },
            })

            let updatePayment = await this.prisma.payment.update({
                where: {
                    id: payment.id
                },
                data: {
                    status: "Success"
                }
            })

            let paymentWallet = await this.prisma.payment_wallet.create({
                data: {
                    payment_id: payment.id,
                    wallet_id: wallet.id,
                    wallet_transaction_id: walletTrans.id
                }
            })
            let productId = await this.prisma.order_item.findFirst({
            where: {
                order_id: orderId
            },
            select: {
                product_id: true
            }
        })
        let shopId = await this.prisma.product.findFirst({
            where: {
                id: productId.product_id
            },
            select: {
                shop_id: true,
            }
        })

            let log = await this.prisma.home_payment_log.create({
                data: {
                    customer_id: order.customer_id,
                    payment_id: payment.id,
                    issue_at: new Date().toISOString()
                }
            })
            let sellIncome = await this.sellerIncome(shopId.shop_id, orderId);


            if (order.total_price > 1000) {
            
            let coinId = await this.prisma.discount_coin_information.findFirst({
                where: {
                    customer_id: order.customer_id,
                },
                select: {
                    id: true,
                    amount: true,
                }
            })
            let coin = await this.prisma.discount_coin_information.upsert({
                where: {
                        id: coinId.id,
                },
                update: {
                    amount: coinId.amount +  Math.floor(order.total_price / 100)
                },
                    create: {
                        customer_id: order.customer_id,
                        amount:  Math.floor(order.total_price / 100),
                        got_date: new Date().toISOString(),
                        expire_date: new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10),
                        get_from: "Payment"
                    }
                })
            }
            return "Success!!"
        } else {
            return "your balance not enough!!"
        }
        
        
    }




    

    //-----------------Credit Card---------------//
    
    async createCard(cardNo?: string, exp?: Date, cvc?: string, customerId?: number) {   
        if (cardNo.charAt(0).match(/^5/)) {
            let creditCard = await this.prisma.payment_credit_card.create({
                data: {
                    card_number: CryptoJs.HmacSHA512(cardNo, process.env.PASSWORD_CREDITCARD).toString(),
                    expire_date: exp,
                    cvc: CryptoJs.HmacSHA512(cvc, process.env.PASSWORD_CVC).toString(),
                    type: "MasterCard",
                }
            });
            let walletOwner = await this.prisma.payment_credit_card_owner.create({
                data: {
                    credit_card_id: creditCard.id,
                    customer_id: customerId
                },
            })
            return creditCard;
        }
        else {
            let creditCard = await this.prisma.payment_credit_card.create({
                data: {
                    card_number: CryptoJs.HmacSHA512(cardNo,process.env.PASSWORD_CREDITCARD).toString(),
                    expire_date: exp,
                    cvc: CryptoJs.HmacSHA512(cvc,process.env.PASSWORD_CVC).toString(),
                    type: "Visa",
                }
            })
            let walletOwner = await this.prisma.payment_credit_card_owner.create({
                data: {
                    credit_card_id: creditCard.id,
                    customer_id: customerId
                },
            })
            return { creditCard, walletOwner };
        }
    }

    async paidByCreditCard(cardNo?: string, exp?: Date, cvc?: string, orderId?: number) {
        let order = await this.prisma.order.findFirst({
            where: {
                id: orderId
            }
        })
        let orderItem = await this.prisma.order_item.findFirst({
            where: {
                order_id: orderId
            }
        })

        let find = await this.prisma.payment_credit_card_owner.findFirst({
            where: {
                customer_id: order.customer_id,
            }
        })
        let card = await this.prisma.payment_credit_card.findFirst({
            where: {
                card_number: cardNo,
            }
        })
        if (find && card && card.id && find.credit_card_id != card.id ) {
            let card = await this.createCard(cardNo, exp, cvc, order.customer_id)
        }
        let payment = await this.prisma.payment.create({
                data: {
                    order_id: orderId,
                    type: "Card",
                    amount: order.total_price,
                    status: "Success",
                    created_date: new Date(),
                    updated_date: new Date(),
                }
        })
        let trans = await this.prisma.payment_transaction.create({
            data: {
                amount: order.total_price,
                time: new Date().toISOString(),
                desc:"",
            }
        })
        let refund = await this.prisma.order_refund_item.create({
            data: {
                order_id: orderId,
                product_id: orderItem.product_id,
                product_options: orderItem.product_options,
                request: false,
                time_remaining: new Date().toISOString(),
            }
        })
        
        let transCard = await this.prisma.payment_credit_card_transaction.create({
            data: {
                card_id: find.credit_card_id,
                status: "Success",
                transaction_id: trans.id,
                refund_id: refund.id,
            }
        })
        let paymentCard = await this.prisma.payment_card.create({
            data: {
                payment_id: transCard.id,
                card_id: card.id,
                credit_card_transaction_id: transCard.id,
            }
        })  
        let productId = await this.prisma.order_item.findFirst({
            where: {
                order_id: orderId
            },
            select: {
                product_id: true
            }
        })
        let shopId = await this.prisma.product.findFirst({
            where: {
                id: productId.product_id
            },
            select: {
                shop_id: true,
            }
        })
        let log = await this.prisma.home_payment_log.create({
                data: {
                    customer_id: order.customer_id,
                    payment_id: payment.id,
                    issue_at: new Date().toISOString()
                }
        })
        let sellIncome = await this.sellerIncome(shopId.shop_id, orderId);


        if (order.total_price > 100) {
            
            let coinId = await this.prisma.discount_coin_information.findFirst({
                where: {
                    customer_id: order.customer_id,
                },
                select: {
                    id: true,
                    amount: true,
                }
            })
            let coin = await this.prisma.discount_coin_information.upsert({
                where: {
                        id: coinId.id,
                },
                update: {
                    amount: coinId.amount +  Math.floor(order.total_price / 100)
                },
                    create: {
                        customer_id: order.customer_id,
                        amount: Math.floor(order.total_price / 100),
                        got_date: new Date().toISOString(),
                        expire_date: new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10),
                        get_from: "Payment"
                    }
                })
            }
        
        return "Success"
    }
    



    //-----------------Seller income---------------//
    async paymentShopBankAcc(shopId: number, firstname: string, lastname: string, accountNo: string) {
        return await this.prisma.payment_shop_bank_account.create({
            data: {
                shop_id: shopId,
                firstname: firstname,
                lastname: lastname,
                bank: "SCB",
                account_number: accountNo,
            }
        })
    }

    async sellerIncome(shopId: number, orderId: number) {
        let amount = await this.prisma.order.findFirst({
            where: {
                id: orderId,
            },
            select: {
                total_price: true,
            }
        })
        return await this.prisma.payment_seller_income.create({
            data: {
                shop_id: shopId,
                order_id: orderId,
                total_price:  amount.total_price
                ,
                time: new Date().toISOString()
            }
        })
    }

    async sellerIncomeRecipt(shopId: number){
        let arrIncome = await this.prisma.payment_seller_income.findMany({
            where: {
                shop_id: shopId,
            },
            select: {
              total_price: true,  
            },
        })
        let totalIncome = 0;
        arrIncome.map((e) => { totalIncome += e.total_price })
        return await this.prisma.payment_seller_income_receipt.create({
            data: {
                shop_id: shopId,
                total_income: totalIncome,
                time: new Date().toISOString(),
                receipt: await this.getHash(),
            }
        })
    }

    async createCoin() {
        let customerId = await this.prisma.customer.findMany({
            take: 20,
            select: {
                id: true
            }
        })
        for (let i = 0; i < customerId.length; i++) {
            await this.prisma.discount_coin_information.create({
                data: {
                    customer_id: customerId[i].id,
                    amount: 10,
                    got_date: new Date().toISOString(),
                    expire_date: new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10),
                    get_from: "Payment"
                }
            })

        }
    }



//-----------------Banking---------------//
    async createBankPayment(orderId?: number) {
        let order = await this.prisma.order.findFirst({
            where: {
             id: orderId
         }
        })
        let payment = await this.prisma.payment.create({
            data: {
                order_id: orderId,
                type: "Deeplink",
                amount: order.total_price,
                status: "Pending",
                created_date: new Date().toISOString(),
                updated_date: new Date().toISOString()
            }
        })
        let log = await this.prisma.home_payment_log.create({
                data: {
                    customer_id: order.customer_id,
                    payment_id: payment.id,
                    issue_at: new Date().toISOString()
                }
        })
        return payment;
    }

    async paidByBank(orderId?: number, status?: string, amount?: number, updateDate?: Date, auth_link?: string) {
        let order = await this.prisma.order.findFirst({
            where: {
                id: orderId,
            },
        })
        let payment = await this.prisma.payment.findFirst({
            where: {
                order_id: orderId
            }
        })
        
        if (status === "successful" && amount === order.total_price) {
            let payment1 = await this.prisma.payment.update({
                where: {
                    id: payment.id
                        },
                        data: {
                            status: "Success",
                            updated_date: updateDate
                        }
            })
            let trans = await this.prisma.payment_transaction.create({
                data: {
                    amount: order.total_price,
                    time: new Date().toISOString(),
                    desc: ""
                }
            })
            let deeplinkTrans = await this.prisma.payment_deeplink.create({
                data: {
                    payment_id: payment.id,
                    transaction_id: trans.id,
                    ref: "",
                    link: auth_link,
                }
            })
            let productId = await this.prisma.order_item.findFirst({
            where: {
                order_id: orderId
            },
            select: {
                product_id: true
            }
        })
        let shopId = await this.prisma.product.findFirst({
            where: {
                id: productId.product_id
            },
            select: {
                shop_id: true,
            }
        })
            let sellIncome = await this.sellerIncome(shopId.shop_id, orderId);

            if (order.total_price > 1000) {
            
            let coinId = await this.prisma.discount_coin_information.findFirst({
                where: {
                    customer_id: order.customer_id,
                },
                select: {
                    id: true,
                    amount: true,
                }
            })
            let coin = await this.prisma.discount_coin_information.upsert({
                where: {
                        id: coinId.id,
                },
                update: {
                    amount: coinId.amount +  Math.floor(order.total_price / 100)
                },
                    create: {
                        customer_id: order.customer_id,
                        amount:  Math.floor(order.total_price / 100),
                        got_date: new Date().toISOString(),
                        expire_date: new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10),
                        get_from: "Payment"
                    }
                })
            }
        }
    }








//-----------------etc---------------//
    throwError(err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(err.message);
      throw new HttpException(err.message, 500);
    }
    console.log(err.message);
    throw new HttpException(err.message, 500);
  }
		
}
