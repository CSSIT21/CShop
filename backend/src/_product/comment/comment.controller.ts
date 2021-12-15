import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('product')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }
    
    @Get('/:id/comments')
	public async findComments(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const comments = await this.commentService.getComments(id);
		if (comments) {
			res.send({ success: true, comments });
		} else {
			res.send({
				success: false,
			});
		}
	}
}
