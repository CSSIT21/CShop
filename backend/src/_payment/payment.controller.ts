import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Query, ParseIntPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import Axios from 'axios';
import { Public } from 'src/common/decorators/public.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';


let request: object;

let qr: any;
let order_id: number;
let orderIdBank: number;
const omise = require('omise')({
	publicKey: process.env.OMISE_PUBLIC_KEY,
	secretKey: process.env.OMISE_SECRET_KEY,
});

async function Hash(){
	const saltOrRounds = 10;
	const password = 'random_password';
	const hash = await bcrypt.hash(password, saltOrRounds);
	const salt = await bcrypt.genSalt();
	return hash;
}


@Controller('payment')
export class PaymentController {
	constructor(private readonly paymentService: PaymentService, public prisma: PrismaService) {}

	@Get()
	@Public()
	getHello(): string {
		console.log("done");
		
		return 'Hello';
	}

	//-----------------QRCODE Payment-----------------------//
	@Post('/qrcode')
	@Public()
	async getQRcode(
		//@Param('orderId', ParseIntPipe) orderId?: number
		@Req() req

	) {
		try {
			const request = req.body;
			let orderId = request.orderId;
			
			
			order_id = request.orderId;
			qr = await this.paymentService.getQr(orderId)
			let rawQr = qr.str;
			return {
				success: true,
				rawQr
			}
		}
		catch(err) {
			return this.paymentService.throwError(err)
		}
	}

	@Post('/confirm')
	@Public()
	callback(@Req() req, @Res() res) {
		try{
			const request = req.body;
			console.log(request);
			
		let trans = this.paymentService.paidByQr(request, order_id, qr.str, qr.ref);
			return {
				success: true,
				trans
			}
		}catch(err) {
			return this.paymentService.throwError(err)
	}

		
	}

	@Get('/status')
	async getStatus(@Req() req, @Res() res) {
		let payment = await this.prisma.payment.findFirst({
			where: {
				order_id: order_id,
			},
			select: {
				status: true
			}
		})
		return payment.status
	}

	@Get('/clear')
	getClear(@Req() req, @Res() res): void {
		request = {
			clear: true,
		};
		res.send({ request });
	}

	//------------------------Internet Banking Pin------------------------//

	@Post('/internetbanking')
	@Public()
	async getBanking(@Req() req, @Res() res): Promise<void> {

		const checkoutInternetBanking = async (req, res, next) => {
			const { id, total_price, token } = req.body;
			orderIdBank = id;
			
			try {
			let payment = this.paymentService.createBankPayment(id)
			  const charge = await omise.charges.create({
				total_price,
				source: token,
				currency: "THB",
				return_uri: "http://localhost:3000/payment/success"
			  });
		  
			  res.send({
				authorizeUri: charge.authorize_uri
			  });
			} catch (error) {
			  console.log(error);
			}
		  
			next();
		  };
	}

	@Post('/bankconfirm')
	@Public()
	bankCallback(@Req() req, @Res() res): void {
		try {
			const request = req.body
			const status = request.status
			const amount = request.source.amount
			const updateDate = request.paid_at
			const auth_link = request.authorize_uri
			let trans = this.paymentService.paidByBank(orderIdBank,status,amount,updateDate,auth_link)

		} catch (err) {
			return this.paymentService.throwError(err)
		}
	}

	@Post('/Banking')
	@Public()
	bankPayment(@Req() req) {
		try {
			const request = req.body
			const orderId = request.orderId
			orderIdBank = orderId;
			let payment = this.paymentService.createBankPayment(orderId)
			return {
				success: true,
				payment
			}
		} catch (err) {
			return this.paymentService.throwError(err)
		}
	}

	//-----------------Credit Card Spy---------------//
	// var omise = require('omise')({
	//   'publicKey': process.env.OMISE_PUBLIC_KEY,
	//   'secretKey': process.env.OMISE_SECRET_KEY,
	// });

	@Post('/card')
	@Public()
	createCard(
		// @Query() cardNo: string,
		// @Query() exp: Date,
		// @Query() cvc: string,
		// @Query() userId: number
		@Req() req
	) {
		try {
			const request = req.body;
			const cardNo = request.cardNo;
			
			
			const exp = request.exp;
			const cvc = request.cvc;
			const orderId = request.orderId;
			let card = this.paymentService.paidByCreditCard(cardNo, exp, cvc, orderId);
			return {
				success: true,
				card
			}
		} catch (err) {
			return this.paymentService.throwError(err);
		}
	}



	//-----------------Wallet Willy---------------//

	@Post('/mywallet')
	@Public()
	async getWallet(@Req() req) {
		 try {
			const orderId = req.body.orderId;
			
			const walletOrder = await this.paymentService.getWallet(orderId);
			
			return {
				success: true,
				walletOrder
				}
	} catch (err) {
		return this.paymentService.throwError(err);
		}
	}


	@Post('/wallet')
	@Public()
	createPaymentWallet(
		//@Query('orderId', ParseIntPipe) orderId?: number,
		@Req() req,
		) {
		try {
			const request = req.body;
			const orderId = request.orerId;
			console.log(request);
			
				let paymentWallet = this.paymentService.paidByWallet(orderId);
				return {
					success: true,
					paymentWallet
				}
			} catch (err) {
				return this.paymentService.throwError(err);
			}
	}


	//-----------------CustomerDetail---------------//

	@Post('/summary')
	@Public()
	async getCusInfo(@Req() req) {
		const request = req.body
		const orderId = request.orderId
		console.log(orderId);
		
		
		
		try {
			let order = await this.prisma.order.findFirst({
				where: {
					id: orderId
				},
				select: {
					customer_id: true,
					total_price: true,
					order_date: true,
				}
			})
			let customer = await this.prisma.customer_info.findFirst({
				where: {
					customer_id: order.customer_id
				},
				select: {
					firstname: true, lastname: true,
				}
			})
			let cuswithadd = await this.prisma.customer_address.findFirst({
				where: {
					customer_id: order.customer_id
				},
				select: {
					address_id: true
				}
				
			})
			let address = await this.prisma.address.findFirst({
				where: {
					id: cuswithadd.address_id
				}
			})
			return { success: true,
				order, customer, address
			}

		} catch (err) {
			return this.paymentService.throwError(err);
		}
	}

	
	//-----------------Coin---------------//


	@Get('/test')
	@Public()
	createCoin() {
		try {
			this.paymentService.createPaymentWallet(2);
		} catch (err) {
			return this.paymentService.throwError(err);
		}
	}

	

	














}
