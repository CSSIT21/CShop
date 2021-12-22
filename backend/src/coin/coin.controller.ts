import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { discount_coin_information as cInfo, PrismaClient , Prisma} from '@prisma/client';
import { Public } from 'src/common/decorators/public.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoinService } from './coin.service';

const prisma = new PrismaClient();

@Controller('coin')
export class CoinController {

    constructor(private readonly coinService: CoinService, public prisma: PrismaService) {}
    @Post('/checkin')
    @Public()
    async checkinCoin(@Body()request , @Res() res){
        var userId = request.userId;
        console.log(userId)
        // const a = await this.coinService.coincheckinInfo(userId);
        // const b = await this.coinService.checkcoin(userId);
        const ckeckin_coin = await this.coinService.checkIn(userId)
        const check = await this.coinService.checkcoinUser(userId);
        res.send({ckeckin_coin,check})
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

    @Get('/showallcoin')
    @Public()
    async allHistory(@Req() req, @Res() res){
        var request = req.body;
        var userId = request.userId;
        res.send(await this.coinService.showAll(userId));
    }

    @Post('/recievecoin')
    @Public()
    async recievecheckin(@Body()request , @Res() res): Promise<void> {
        var userId = request.userId;
        console.log(userId)
        const a = await this.coinService.coincheckinInfo(userId);
        const b = await this.coinService.checkcoin(userId);
    }

    @Get('/totalcoin')
    @Public()
    async checkin(@Body()request , @Res() res): Promise<void> {
        var userId = request.userId;
        console.log(userId)
        const ckeckin_coin = await this.coinService.checkIn(userId)
        const check = await this.coinService.checkcoinUser(userId);
        res.send({ckeckin_coin,check})
    }

    @Post('/used')
    @Public()
    async usedcoin(@Body()request , @Res() res): Promise<void> {
        var userId = request.userId;
        console.log(userId)
        const used_coin = await this.coinService.usedCoin(userId)
        res.send({used_coin})
    }
}