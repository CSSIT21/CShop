import { Injectable, Req, Res } from '@nestjs/common';
import Axios from 'axios'
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {

    getAccess(): any {
    const dataTest = {
      applicationKey: process.env.API_Key,
      applicationSecret: process.env.API_Secret,
    };
    Axios({
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
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

    getQR(@Req() req, @Res() res): any{
        let str: CreatePaymentDto;
        const data = {
            'qrType': 'PP',
            'ppType': 'BILLERID',
            'ppId': process.env.ppId,
            'amount': '250.00',
            'ref1': '000',
            'ref3': process.env.ref3
        };
        Axios({
            method: 'post',
            url: 'https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'EN',
                'Authorization': process.env.authToken,
                'RequestUId': process.env.uuid,
                'ResourceOwnerId': process.env.uuid,
            },
            data: JSON.stringify(data),
        })
        .then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
            str = response.data.data.qrRawData;
            res.send(str.qrRawData);
            console.log(str.qrRawData);
      })
      .catch((error) => {
        console.error(error);
      });
    }

}
