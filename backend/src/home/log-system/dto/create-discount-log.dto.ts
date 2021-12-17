import {  IsDate, IsInt } from "class-validator";

export class CreateDiscountLogDto {
    @IsDate()
    view_date: Date;


 }