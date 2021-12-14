import { IsDate } from "class-validator";



export class CreateAddToCardLogDto { 


    @IsDate()
    added_date: Date;
    
}