import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { CommentService } from './comment.service';

@Controller('product')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }
    
	@Get('/:id/comments')
	@Public()
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

	@Get('/:id/comments/pictures')
		@Public()
	public async findCommentsPictures(@Param('id', ParseIntPipe) id: number, @Res() res) {
		const pictures = await this.commentService.getCommentPictures(id);
		if (pictures) {
			res.send({ success: true, pictures });
		} else {
			res.send({
				success: false,
			});
		}
	}
}
