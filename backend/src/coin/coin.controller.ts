import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { discount_coin_information as cInfo, PrismaClient , Prisma} from '@prisma/client';
import { Public } from 'src/common/decorators/public.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoinService } from './coin.service';

const prisma = new PrismaClient();

@Controller('coin')
export class CoinController {

    constructor(private readonly coinService: CoinService, public prisma: PrismaService) {}

    @Get('/test')
    @Public()
    test(@Req() req, @Res() res): void {
        res.send("Hello Coin");
    }

    @Get('/showusedcoin')
	@Public()
	async showUsedCoin(@Req() req, @Res() res){
		var request = req.body;
		var userId = request.userId;
		res.send(await this.coinService.showUsedcoin(userId));
	}

    @Get('/showrecievecoin')
	@Public()
	async showRecieveCoin(@Req() req, @Res() res){
		var request = req.body;
		var userId = request.userId;
		res.send(await this.coinService.showRecievecoin(userId));
	}

    @Post('/checkin')
	@Public()
	async checkin(@Body()request , @Res() res): Promise<void> {
		var userId = request.userId;
        var amount = request.amount;
		console.log(userId)
        console.log(amount)
		// const a = await this.coinService.userGetCoin(userId, amount);
		const ckeckin_coin = await this.coinService.checkIn(userId)
		const check = await this.coinService.checkcoinUser(userId);
		res.send({ckeckin_coin,check})
	}


    // @Post('/recieve')
	// @Public()
	// async recieve(@Body()request , @Res() res): Promise<void> {
	// 	var userId = request.userId;
    //     var amount = request.amount;
    //     var got_date = request.got_date;
    //     var get_from = request.get_from;
    //     var expire_date = request.expire_date;
	// 	console.log(userId,amount, got_date, expire_date, get_from)
	// 	const a = await this.coinService.coinInfo(userId,amount, got_date, expire_date, get_from);
	// 	res.send(this.showRecieveCoin)
	// }






    // @Post('/show')
    // @Public()
    // async showCoinInfo() {
    //     return await this.prisma.discount_coin_information.findMany()
    // }

    



    // @Get('/allhistory')
	// @Public()
	// async showAllHistory(@Req() req, @Res() res){
	// 	var request = req.body;
	// 	var userId = request.userId;
	// 	res.send(await this.coinService.showAll(this.showUsedCoin, this.showRecieveCoin));
	// }


}
