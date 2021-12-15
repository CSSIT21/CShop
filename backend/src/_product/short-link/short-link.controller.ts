
import { Controller, Get, Param, ParseIntPipe, Redirect, Res } from '@nestjs/common';
import { ShortLinkService } from './short-link.service';

@Controller('l')
export class ShortLinkController {
    constructor(private readonly shortLinkService: ShortLinkService) { };
    
    @Get('/:generatedString')
    public async redirest(@Param('generatedString') generatedString: string, @Res() res) {
        const link = await this.shortLinkService.getLink(generatedString);
        if (link) {
            return res.redirect(`http://localhost:3000/product/${link.product_id}`) 
        } else {
            res.send({
                success: false,
            });
        }
    }
}
