import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

var request: object

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }
  
  @Get()
  getHello(): string{
    return 'Hello';
  }
  
  @Get('/qrcode')
  getQRcode(): any{
    return this.paymentService.getQR();
  }

    @Post('/callback')
  callback(@Req() req, @Res() res): void {
    request = req.body
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
