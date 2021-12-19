import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import Axios from 'axios';
import { Public } from 'src/common/decorators/public.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';

let request: object;
let strQr: string;

const omise = require('omise')({
	publicKey: process.env.OMISE_PUBLIC_KEY,
	secretKey: process.env.OMISE_SECRET_KEY,
});

@Controller('payment')
export class PaymentController {
	constructor(private readonly paymentService: PaymentService, public prisma: PrismaService) {}

	@Get()
	getHello(): string {
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
		let accessToken: string;
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
				accessToken = response.data.data.accessToken;
			})
			.catch((error) => {
				console.error(error);
			});
		let str: string;
		await Axios({
			method: 'post',
			url: 'https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create',
			headers: {
				'Content-Type': 'application/json',
				'Accept-Language': 'EN',
				Authorization: 'Bearer' + accessToken,
				RequestUId: process.env.uuid,
				ResourceOwnerId: process.env.API_Key,
			},
			data: JSON.stringify(data),
		})
			.then((response) => {
				str = response.data.data.qrRawData;
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
	@Public()
	getStatus(@Req() req, @Res() res): void {
		res.send({ request });
	}

	@Get('/clear')
	@Public()
	getClear(@Req() req, @Res() res): void {
		request = {
			clear: true,
		};
		res.send({ request });
	}

	//------------------------Internet Banking Pin------------------------//

	@Post('/krungsri')
	@Public()
	async getKrungsri(@Req() req, @Res() res): Promise<void> {
		const checkoutInternetBanking = async (req, res, next) => {
			const { id, total_price, token } = req.body;
		  
			try {
			  const charge = await omise.charges.create({
				total_price,
				source: token,
				currency: "THB",
				return_uri: "http://localhost:3000/success"
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




}
