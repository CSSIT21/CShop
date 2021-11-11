import { Injectable, Req, Res } from '@nestjs/common';
import Axios from 'axios'
import { stringify } from 'querystring';
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

  async getQR(): Promise<string>{
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
          console.log(str);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(str);
      return str;
    }
}
