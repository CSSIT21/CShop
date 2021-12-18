import { Injectable, Req, Res } from '@nestjs/common';
import Axios from 'axios';
import { stringify } from 'querystring';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {}
