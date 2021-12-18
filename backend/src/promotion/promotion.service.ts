import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { HttpService } from "@nestjs/axios";
import { Observable } from "rxjs/internal/Observable";
import { AxiosResponse } from "axios";

const prisma = new PrismaClient()

@Injectable()
export class PromotionService{
    showuser(arg0: Promise<any[]>[]) {
        throw new Error('Method not implemented.');
    }

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
            
            },
            
        })
        return await prisma.discount_event.findFirst({
            where:{
                discount_id:1
            },
            select:{
                quantity:true
            }
        })   
    }

    public async decodeshop(id : number){
        await prisma.discount_shop.update({ 
            where:{
                discount_id: id
            },
            data:{
                quantity:{
                    decrement: 1 ,
                
                }
            }
        })
        return prisma.discount_shop.findFirst({
            where:{
                discount_id: id
            },
            select:{
                quantity:true
            }
        })   
    }

    public async decodereward(id : number){
        await prisma.discount_reward.update({ 
            where:{
                id: id
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
        return await prisma.discount_app.findFirst({
            where:{
                discount_id:id
            },
            select:{
                quantity:true
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
        return prisma.discount_category.findFirst({
            where:{
                discount_id: id
            },
            select:{
                quantity: true
            }
        })
    }

    public async userGetCode(userId: number ,id: number){
        console.log(userId,id);
        await prisma.discount_user_code.create({
            data:{
                customer_id: userId,
                discount_id: id
            }
        })
        
    }
    

    public async checkcodeUser(userId: number){
        const userDiscount = await prisma.discount_user_code.findMany({
			where: {
				customer_id: userId,
			},
			select: {
				discount_id: true,
			},
		});
        let discountId = [];
		userDiscount.forEach((e) => {
			discountId = [...discountId, e.discount_id];
		});
        console.log(discountId);
        return discountId;
    }

    public async showCode(userId: number){
        const findid = await prisma.discount.findMany({});
        console.log(findid);
        return findid;
    }
    
    // public async checkEvent(a: number[]){
    //     const appDiscount = await prisma.discount_event.findMany({
	// 		where: {
	// 			discount_id: {
	// 				notIn: a,
	// 			},
	// 		},
	// 	})
        
    // }

    // public async checkApp(a:number[]){
    //     const appDiscount = await prisma.discount_app.findMany({
	// 		where: {
	// 			discount_id: {
	// 				notIn: a,
	// 			},
	// 		},
	// 	});
    // }

    // public async checkShop(a:number[]){
    //     const appDiscount = await prisma.discount_shop.findMany({
	// 		where: {
	// 			discount_id: {
	// 				notIn: a, 
	// 			},
	// 		},
	// 	});
    // }

    // public async checkReward(a:number[]){
    //     const appDiscount = await prisma.discount_reward.findMany({
	// 		where: {
	// 			id: {
	// 				notIn: a,
	// 			},
	// 		},
	// 	});
    // }

    // public async checkCategory(a:number[]){
    //     const appDiscount = await prisma.discount_category.findMany({
	// 		where: {
	// 			discount_id: {
	// 				notIn: a,
	// 			},
	// 		},
	// 	});
    // }
    


}
