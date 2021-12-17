
import { Controller, Get, Param, ParseIntPipe, Redirect, Res } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { ShortLinkService } from './short-link.service';

@Controller('l')
export class ShortLinkController {
    constructor(private readonly shortLinkService: ShortLinkService) { };
   
    @Get('/:generatedString')
@Public()
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
