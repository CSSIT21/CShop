
import { Controller, Get, Param, ParseIntPipe, Redirect, Res } from '@nestjs/common';
import { ShortLinkService } from './short-link.service';

@Controller('l')
export class ShortLinkController {
    constructor(private readonly shortLinkService: ShortLinkService) { };
    
    // http://localhost:3000/home
    @Get('/:generatedString')
    @Redirect('https://docs.nestjs.com', 302)
    public async findProductDetails(@Param('generatedString') generatedString: string, @Res() res) {
        const link = await this.shortLinkService.getLink(generatedString);
        if (link) {
            res.send({ success: true });
            return { url: `http://localhost:3000/product/${link.product_id}` }
        } else {
            res.send({
                success: false,
            });
        }
    }
}
