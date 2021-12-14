import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpService } from "@nestjs/axios";
import { Observable } from "rxjs/internal/Observable";
import { AxiosResponse } from "axios";

const prisma = new PrismaClient()

@Injectable()
export class PromotionService{

    constructor(private httpService: HttpService){}


    public async decodeevent(id : number){
        await prisma.discount_event.update({ 
            where:{
                discount_id: id
            },
            data:{
                quantity:{
                    decrement: 1 ,
                
                }
            }
        })   
    }

    public async decodeapp(id:number){
        await prisma.discount_app.update({
            where:{
                discount_id: id
            },
            data:{
                quantity:{
                    decrement: 1
                }
            }
        })
    }

    public async decodecategory(id: number){
        await prisma.discount_category.update({
            where:{
                discount_id: id
            },
            data:{
                quantity:{
                    decrement: 1
                }
            }
        })
    }

    public async userGetCodeevent(userId: number ,id: number){
        await prisma.discount_user_code.create({
            data:{
                customer_id: userId,
                discount_id: id
            }
        })
    }

    public async Countcode(userId : number){
       const count =await prisma.discount_user_code.count({
            where:{
                customer_id: userId,
            }
        })
        return count;
    }

    public async Checkcode(userId :number){
        await prisma.discount_user_code.findMany({
            where:{
                customer_id: userId,
            }
        })
    }

    
        

    // findAll(): Observable<AxiosResponse<PromotionService[]>> {
    //     return this.httpService.get('http://localhost:8080');
    //   }

    }



    

    








