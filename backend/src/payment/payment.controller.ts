import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Query, ParseIntPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import Axios from 'axios';
import { Public } from 'src/common/decorators/public.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';


let request: object;
let strQr: string;
let walletId = 0
let paymentId = 0
let transacWallet = 546;

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

	@Get('/qrcode')
	@Public()
	async getQRcode(){
		try {
			let rawQr: string;
			rawQr = await this.paymentService.getQr();
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

	@Get('/createwallet')
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
	createPaymentWallet(@Query('order_id', ParseIntPipe) orderId?: number,) {
			try {
				let paymentWallet = this.paymentService.createPaymentWallet(orderId);
				return {
					success: true,
					paymentWallet
				}
			} catch (err) {
				return this.paymentService.throwError(err);
			}
	}
	
	@Post('/wallettrans')
	@Public()
	createTransactionWallet(
		@Query('amount', ParseIntPipe) amount?: number,
		@Query() desc?: string,
		@Query('walletId', ParseIntPipe) walletId?: number,
		@Query('paymentId', ParseIntPipe) paymentId?: number,
	) {
		try {
			let transWallet = this.paymentService.createPaymentWalletTrans(amount,walletId,paymentId)
		} catch (err) {
			return this.paymentService.throwError(err);
		}
		}



	














	@Get('/test')
	@Public()
	showPayWallet(@Query('paymentId', ParseIntPipe) paymentId: number) {
		return this.paymentService.getWallet();
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
