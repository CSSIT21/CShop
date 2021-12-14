import { IsDate, IsInt } from "class-validator";

export class CreatePaymentLogDto { 
     @IsDate()
    issue_at: Date;
}