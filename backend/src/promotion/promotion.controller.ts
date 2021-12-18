import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { count } from 'console';
import { response } from 'express';
import { is } from '@babel/types';
import { Public } from 'src/common/decorators/public.decorator';

const prisma = new PrismaClient();

@Controller('promotion')
export class PromotionController {
	constructor(private readonly promotionService: PromotionService, public prisma: PrismaService) {}
		

	@Post('/upevent')
	async AppCouponEvent(@Body()request , @Res() res): Promise<void> {
		var discount_id = request.discount_id;
		var userId = request.userId;
		console.log(discount_id)
		console.log(userId)
		const a = await this.promotionService.decodeevent(discount_id);
		const b = await this.promotionService.userGetCode(userId, discount_id);
		console.log(a,b);
        await res.send(a);

	}

	@Post('/upapp')
	async AppCouponApp(@Req() req, @Res() res): Promise<void> {
		var request = req.body;
		var id = request.discount_id;
		var userId = request.userId;
		console.log(id)
		console.log(userId)
		await this.promotionService.userGetCode(userId, id);
        res.send(this.promotionService.decodeapp(id));
	}

	@Post('/upshop')
	async AppCouponShop(@Req() req, @Res() res): Promise<void> {
		var request = req.body;
		var id = request.couponId;
		var userId = request.userId;
		await this.promotionService.userGetCode(userId, id);
        res.send(this.promotionService.decodeshop(id));
	}

	@Post('/upre')
	AppCouponReward(@Req() req, @Res() res): void {
		var request = req.body;
		var id = request.couponId;
		var userId = request.userId;
		this.promotionService.userGetCode(userId, id);
        res.send(this.promotionService.decodereward(id));
	}

	@Post('/upcate')
	AppCouponCategory(@Req() req, @Res() res): void {
		var request = req.body;
		var id = request.couponId;
		var userId = request.userId;
		this.promotionService.userGetCode(userId, id);
        res.send(this.promotionService.decodecategory(id));
	}

    @Post('/claim')
	async ClaimEvent (@Req() req, @Res() res): Promise<void>{
		var request = req.body;
		var userId = request.userId;
        const a = await this.promotionService.checkcodeUser(userId);
        res.send(a);      
	}


	 
	@Get('/showcode')
	@Public()
	async showCode(@Req() req, @Res() res){
		var request = req.body;
		var userId = request.userId;
		res.send(await this.promotionService.showCode(userId));
	}
	// @Post('/claimapp')
	// async ClaimApp (@Req() req, @Res() res): Promise<void>{
	// 	var request = req.body;
	// 	var userId = request.userId;
    //     const a = await this.promotionService.checkcodeUser(userId);
    //     // const b = await this.promotionService.checkApp(a);
    //     res.send(a);      
	// }

	// @Post('/claimshop')
	// async ClaimShop (@Req() req, @Res() res): Promise<void>{
	// 	var request = req.body;
	// 	var userId = request.userId;
    //     const a = await this.promotionService.checkcodeUser(userId);
    //     // const b = await this.promotionService.checkShop(a);
    //     res.send(a);      
	// }

	// @Post('/claimapp')
	// async Claimre (@Req() req, @Res() res): Promise<void>{
	// 	var request = req.body;
	// 	var userId = request.userId;
    //     const a = await this.promotionService.checkcodeUser(userId);
    //     // const b = await this.promotionService.checkReward(a);
    //     res.send(a);      
	// }


	// @Post('/claimcategory')
	// async ClaimCate (@Req() req, @Res() res): Promise<void>{
	// 	var request = req.body;
	// 	var userId = request.userId;
    //     const a = await this.promotionService.checkcodeUser(userId);
    //     // const b = await this.promotionService.checkCategory(a);
    //     res.send(a);      
	// }

    


}
 