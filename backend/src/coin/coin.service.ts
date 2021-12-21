import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { HttpService } from "@nestjs/axios";



const prisma = new PrismaClient()

@Injectable()
export class CoinService {
    public async checkIn(userId : number){
        await prisma.discount_customer_coin.update({ 
            where:{
                customer_id: userId
            },
            data:{
                total_coin: {
                    increment: 1
                }   
            
            },
            
        })
        return await prisma.discount_customer_coin.findMany({
            where:{
                customer_id: userId
            },
            select:{
                total_coin:true
            }
        })   
    }

    public async usedCoin(userId : number){
        await prisma.discount_customer_coin.update({ 
            where:{
                customer_id: userId
            },
            data:{
                total_coin: 0
            },
            
        })

        return await prisma.discount_customer_coin.findMany({
            where:{
                customer_id: userId
            },
            select:{
                total_coin:true
            }
        })   
    }

    // public async userGetCoin(userId: number ,amount: number){
    //     console.log(userId,amount);
    //     await prisma.discount_customer_coin.create({
    //         data:{
    //             customer_id: userId,
    //             total_coin: amount
    //         }
    //     })
    // }

    public async coincheckinInfo(userId: number){
        console.log(userId);
        await prisma.discount_coin_information.create({
            data:{
                customer_id : userId,
                amount : 1,
                got_date : new Date().toISOString(),
                expire_date : new Date().toISOString(),
                get_from: "Check-in"
            }
        })
    }

    public async checkcoin(userId: number){
        console.log(userId);
        await prisma.discount_daily_coin.create({
            data:{
                customer_id : userId,
                got_date : new Date().toISOString(),
            }
        })
    }



    public async checkcoinUser(userId: number){
        const userCoin= await prisma.discount_daily_coin.findMany({
			where: {
				customer_id: userId,
			},
			select: {
				id: true,
			},
		});
        let coinId = [];
		userCoin.forEach((e) => {
			coinId = [...coinId, e.id];
		});
        console.log(coinId);
        return coinId;
    }

    
    public async showUsedcoin(userId: number){
        return await prisma.discount_used_coin.findMany({
			where: {
				customer_id: userId,
                OR: [
                    {
                        user_for: "Shopping"
                    },
                    {
                        user_for: "Payment"
                    }
                ]
			},
			select: {
				used_amount: true,
                used_time: true,
                user_for: true
			},
            orderBy: {
                used_time: "desc"
            }
		});
    }

    public async showRecievecoin(userId: number){
        return await prisma.discount_coin_information.findMany({
			where: {
				customer_id: userId,
                OR: [
                    {
                        get_from: "Check-in"
                    },
                    {
                        get_from: "Payment"
                    }
                ]
			},
			select: {
				amount: true,
                got_date: true,
                get_from: true
			},
            orderBy: {
                got_date: "desc"
            }
		});
    }


    public async showAll(userId: number){
        const recieve = await prisma.discount_coin_information.findMany({
			where: {
				customer_id: userId,
                OR: [
                    {
                        get_from: "Check-in"
                    },
                    {
                        get_from: "Payment"
                    }
                ]
			},
			select: {
				amount: true,
                got_date: true,
                get_from: true
			},
            orderBy: {
                got_date: "desc"
            }
		});


        const used = await prisma.discount_used_coin.findMany({
			where: {
				customer_id: userId,
                OR: [
                    {
                        user_for: "Shopping"
                    },
                    {
                        user_for: "Payment"
                    }
                ]
			},
			select: {
				used_amount: true,
                used_time: true,
                user_for: true
			},
            orderBy: {
                used_time: "desc"
            }
		});

        return ({recieve,used});
    }

}
