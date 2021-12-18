import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
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
	async getQRcode(@Req() req, @Res() res): Promise<void> {
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
				d1 = (<any> response.data)
				str = d1.data.qrRawData;
			})
			.catch((error) => {
				console.error(error);
			});
		res.send(str);
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
	@Get('/wallet')
	getWallet(@Req() req, @Res() res) {
		const request = req.body;
		const userId = request.customerId;
		const wallet = this.prisma.wallet.findFirst({
			where: {
				customer_id: userId,
			},
		});
		return wallet

		console.log("Done");
		
	}

	@Post('/wallet')
	@Public()
	async payByWallet(@Req() req, @Res() res) {
		// const request = req.body;
		// const userId = request.customerId;
		// const amount = request.amount;
		// var date = new Date();
		// const dateString = date.toISOString();
		walletId++;
		paymentId++;
		transacWallet++;

		const payment = await this.prisma.payment.create
	}
	@Get('/test')
	@Public()
	async showPaymentWallet() {
		
	}


}
