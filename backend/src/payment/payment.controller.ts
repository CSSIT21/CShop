import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import Axios from 'axios'
import { Public } from 'src/common/decorators/public.decorator';

var request: object
var strQr: string ;

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }
  
  @Get()
  getHello(): string{
    return 'Hello';
  }
  
  @Get('/qrcode')
  @Public()
  async getQRcode(@Req() req, @Res() res): Promise<void>{
    const data = {
            'qrType': 'PP',
            'ppType': 'BILLERID',
            'ppId': process.env.ppId,
            'amount': '250.00',
            'ref1': '000',
            'ref3': process.env.ref3
        };
    let str: string;
       await Axios({
            method: 'post',
            url: 'https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'EN',
                'Authorization': process.env.authToken,
                'RequestUId': process.env.uuid,
                'ResourceOwnerId': process.env.API_Key,
            },
            data: JSON.stringify(data),
        })
        .then((response) => {
          str = response.data.data.qrRawData;
      })
      .catch((error) => {
        console.error(error);
      });
    res.send(str)
  }


  @Post('/confirm')
  @Public()
  callback(@Req() req, @Res() res): void {
      request = req.body
      console.log(req.body);
      res.status(200).send("");
  }

  @Get('/status')
  getStatus(@Req() req, @Res() res): void {
    res.send({ request })
  }

  @Get('/clear')
  getClear(@Req() req, @Res() res): void {
    request = {
      clear: true
    }
    res.send({ request })
  }
}