import { Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import {PromotionService} from './promotion.service';
import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { count } from "console";

const prisma = new PrismaClient()

@Controller('promotion')
export class PromotionController{

    constructor(private readonly promotionService: PromotionService, public prisma: PrismaService){}

     

    @Post('/')
        AppCouponEvent(@Req() req, @Res() res): void{
            var request = req.body;
            var id = request.couponId;
            var userId = request.userId
            this.promotionService.decodeevent(id);
            this.promotionService.userGetCodeevent(userId,id);
        }
    
    @Post('/')
        AppCouponApp(@Req() req, @Res() res): void{
            var request = req.body;
            var id = request.couponId;
            var userId = request.userId
            this.promotionService.decodeapp(id);  
            this.promotionService.userGetCodeevent(userId,id);

        }

    @Post('/')
        AppCouponCategory(@Req() req, @Res() res):void {
            var request = req.body;
            var id = request.couponId;
            var userId = request.userId
            this.promotionService.decodecategory(id);
            this.promotionService.userGetCodeevent(userId,id);
        }
    
    
    // @Post('/')
    //     UserCouponEvent(@Req() req, @Res() res):void{
    //         var request = req.body;
    //         var id = request.couponId
    //         var userId = request.userId
    //         this.promotionService.userGetCodeevent(userId, id);
    //     }

    @Post()
        async Cliambutton(@Req() req, @Res() res):Promise<void>{
            var request = req.body
            var id = request.couponId
            var userId = request.userId
            for(var i = 0 ; i < await this.promotionService.Countcode(userId) ; i++){
                if(id === this.promotionService.Checkcode(userId)){

                }else{

                }
                
            }
        }
    
    
    
    

    

}