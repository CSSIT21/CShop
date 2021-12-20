import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Query, ParseIntPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import Axios from 'axios';
import { Public } from 'src/common/decorators/public.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';


let request: object;

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
			let rawQr: string;
			rawQr = await this.paymentService.getQr(orderId);
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
	callback(@Req() req, @Res() res): void {
		request = req.body;
		console.log(req.body);
		res.status(200).send('');
	}

	@Get('/status')
	getStatus(@Req() req, @Res() res): void {
		res.send({ request });
	}

	@Get('/clear')
	getClear(@Req() req, @Res() res): void {
		request = {
			clear: true,
		};
		res.send({ request });
	}

	//------------------------Internet Banking Pin------------------------//

	// @Post('/Krungsri')
	// @Public()
	// async getKrungsri(@Req() req, @Res() res): Promise<void> {
	//   let source: String;
	//   const data = {
	//     'amount': '250.00',
	//     'currency': 'THB',
	//     'type': 'internet_banking_bay',
	//     }
	//     await Axios({
	//       method: 'post',
	//       url: 'https://api.omise.co/sources',
	//       data: JSON.stringify(data),
	//     })
	//       .then((response) => {
	//         source = response.data.id;
	//       })
	//       .catch((error) => {
	//         console.error(error);
	//       });

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
			const userId = request.userId;
			// let card = this.paymentService.createCreditCard(cardNo, exp, cvc, userId);
			// return {
			// 	success: true,
			// 	card
			// }
		} catch (err) {
			return this.paymentService.throwError(err);
		}
	}

	@Post('/paymentcard')
	@Public()
	createPaymentCard(@Query('orderId', ParseIntPipe) orderId: number,) {
		try {
			let paymentCard = this.paymentService.createPaymentCard(orderId);
			return {
				success: true,
				paymentCard
			}
		} catch (err) {
			return this.paymentService.throwError(err);
		}
	}

	@Post('/transcard')
	@Public()
	createTransCard(
		@Query('amount', ParseIntPipe) amount?: number,
		@Query('cardId', ParseIntPipe) cardId?: number,
		@Query('paymentId', ParseIntPipe) paymentId?: number,
	) {
		try {
			let trans = this.paymentService.createPaymentCardTrans(amount, cardId, paymentId);
			return {
				success: true,
				trans
			}
		} catch (err) {
			return this.paymentService.throwError(err);
		}
	}

	//-----------------Wallet Willy---------------//
	@Get('/createwallet')
	@Public()
	getWallet() {
		try {
			// const request = req.body;
			// const userId = request.customerId;
			let wallet = this.paymentService.getWallet();
			return {
				success: true,
				wallet
			}
		} catch (err) {
			return this.paymentService.throwError(err);
		}
	}

	@Post('/createwallet')
	@Public()
	createWallet(@Query('customerId', ParseIntPipe) customerId?: number,) {
		try {
			let wallet = this.paymentService.createWallet(customerId);
			return {
				success: true,
				wallet
			}
			
		} catch (err) {
			return this.paymentService.throwError(err);
		}
	}

	@Post('/wallet')
	@Public()
	createPaymentWallet(
		@Query('orderId', ParseIntPipe) orderId?: number,
		) {
		try {
			
				let paymentWallet = this.paymentService.paidByWallet(orderId);
				return {
					success: true,
					paymentWallet
				}
			} catch (err) {
				return this.paymentService.throwError(err);
			}
	}
	




	

	














	@Get('/test')
	@Public()
	showPayWallet() {
		try {
			let a = this.paymentService.createCard()
			return a;
		} catch (err) {
			return this.paymentService.throwError(err);
		}
		// return this.prisma.shop_info.findMany();
		//return this.paymentService.createPaymentWalletTrans(300,5);
		
	}

	@Get('/testall')
	@Public()
	createWallets() {
		try {
			return this.paymentService.createAllWallets();
		} catch (err) {
			return this.paymentService.throwError(err);
		}
	}


}
