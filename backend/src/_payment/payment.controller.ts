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
			const orderId = request.orderId;
			// let card = this.paymentService.createCreditCard(cardNo, exp, cvc, userId);
			// return {
			// 	success: true,
			// 	card
			// }
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
	
	//-----------------Coin---------------//




	

	














}
