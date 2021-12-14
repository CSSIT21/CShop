import {  IsDate, IsInt } from "class-validator";

export class CreateProductLogDto { 

    @IsDate()
    view_date: Date;
}