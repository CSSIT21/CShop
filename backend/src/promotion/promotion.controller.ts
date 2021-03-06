import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, Res } from '@nestjs/common';
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
	@Public()
	async AppCouponEvent(@Body()request , @Res() res): Promise<void> {
		var id = request.discount_id;
		var userId = request.userId;
		console.log(id)
		console.log(userId)
		const a = await this.promotionService.userGetCode(userId, id);
		const decreasecode = await this.promotionService.decodeevent(id)
		const check = await this.promotionService.checkcodeUser(userId);
		res.send({decreasecode,check})

	}

	@Post('/upapp')
	@Public()
	async AppCouponApp(@Req() req, @Res() res): Promise<void> {
		var request = req.body;
		var id = request.discount_id;
		var userId = request.userId;
		console.log(id)
		console.log(userId)
		const a = await this.promotionService.userGetCode(userId, id);
		const decreasecode = await this.promotionService.decodeapp(id)
		const check = await this.promotionService.checkcodeUser(userId);
		res.send({decreasecode,check})
	}

	@Post('/upshop')
	@Public()
	async AppCouponShop(@Req() req, @Res() res): Promise<void> {
		var request = req.body;
		var id = request.discount_id;
		var userId = request.userId;
		console.log(id)
		console.log(userId)
		const a = await this.promotionService.userGetCode(userId, id);
		const decreasecode = await this.promotionService.decodeshop(id)
		const check = await this.promotionService.checkcodeUser(userId);
		res.send({decreasecode,check})
	}

	@Post('/upre')
	@Public()
	async AppCouponReward(@Req() req, @Res() res): Promise<void> {
		var request = req.body;
		var id = request.discount_id;
		var userId = request.userId;
		console.log(id)
		console.log(userId)
		const a = await this.promotionService.userGetCode(userId, id);
		const decreasecode = await this.promotionService.decodereward(id)
		const check = await this.promotionService.checkcodeUser(userId);
		res.send({decreasecode,check})
	}

	@Post('/upcate')
	@Public()
	async AppCouponCategory(@Req() req, @Res() res): Promise<void> {
		var request = req.body;
		var id = request.discount_id;
		var userId = request.userId;
		console.log(id)
		console.log(userId)
		const a = await this.promotionService.userGetCode(userId, id);
		const decreasecode = await this.promotionService.decodecategory(id)
		const check = await this.promotionService.checkcodeUser(userId);
		res.send({decreasecode,check})
	}

    // @Post('/claim')
	// @Public()
	// async ClaimEvent (@Req() req, @Res() res): Promise<void>{
	// 	var request = req.body;
	// 	var userId = request.userId;
    //     const a = await this.promotionService.checkcodeUser(userId);
    //     res.send(a);      
	// }


	 
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
 