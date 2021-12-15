import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { count } from 'console';
import { response } from 'express';
import { is } from '@babel/types';

const prisma = new PrismaClient();

@Controller('promotion')
export class PromotionController {
	constructor(private readonly promotionService: PromotionService, public prisma: PrismaService) {}

	@Get('/test')
		test(@Req() req, @Res() res): void{
			res.send("Hello");
		}
	

	@Post('/upevent')
	AppCouponEvent(@Req() req, @Res() res): void {
		var request = req.body;
		var id = request.couponId;
		var userId = request.userId;
		this.promotionService.decodeevent(id);
		this.promotionService.userGetCode(userId, id);
        res.send(this.promotionService.decodeevent(id));
	}

	@Post('/upapp')
	AppCouponApp(@Req() req, @Res() res): void {
		var request = req.body;
		var id = request.couponId;
		var userId = request.userId;
		this.promotionService.decodeapp(id);
		this.promotionService.userGetCode(userId, id);
        res.send(this.promotionService.decodeapp(id));
	}

	@Post('/upshop')
	AppCouponShop(@Req() req, @Res() res): void {
		var request = req.body;
		var id = request.couponId;
		var userId = request.userId;
		this.promotionService.decodeapp(id);
		this.promotionService.userGetCode(userId, id);
        res.send(this.promotionService.decodeshop(id));
	}

	@Post('/upre')
	AppCouponReward(@Req() req, @Res() res): void {
		var request = req.body;
		var id = request.couponId;
		var userId = request.userId;
		this.promotionService.decodeapp(id);
		this.promotionService.userGetCode(userId, id);
        res.send(this.promotionService.decodereward(id));
	}

	@Post('/upcate')
	AppCouponCategory(@Req() req, @Res() res): void {
		var request = req.body;
		var id = request.couponId;
		var userId = request.userId;
		this.promotionService.decodecategory(id);
		this.promotionService.userGetCode(userId, id);
        res.send(this.promotionService.decodecategory(id));
	}

    @Post('/claimevent')
	async Claim (@Req() req, @Res() res): Promise<void>{
		var request = req.body;
		var userId = request.userId;
        const a = await this.promotionService.checkcodeUser(userId);
        const b = await this.promotionService.checkEvent(a);
        res.send(b);      
	}

    @Post()
    async usecoed(@Req() req, @Res() res): Promise<void>{
        var request = req.body;
        var id = request.couponId;
        var userId = request.userId;
    }


}
 