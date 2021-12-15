
import {IsInt } from "class-validator";

export class CreateShopLogDto {
    @IsInt()
    customer_id: number;

    @IsInt()
    shop_id: number;
 }