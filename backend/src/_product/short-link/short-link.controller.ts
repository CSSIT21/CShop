
import { Controller, Get, Param, ParseIntPipe, Redirect, Res } from '@nestjs/common';
import { ShortLinkService } from './short-link.service';

@Controller('CShop')
export class ShortLinkController {
    constructor(private readonly shortLinkService: ShortLinkService) { };
   
    @Get('/:generatedString')
    public async redirest(@Param('generatedString') generatedString: string, @Res() res) {
        const product_id = await this.shortLinkService.getLink(generatedString);
        if (product_id) {
            return res.redirect(`http://localhost:3000/product/${product_id}`) 
        } else {
            res.send({
                success: false,
            });
        }
    }
}
