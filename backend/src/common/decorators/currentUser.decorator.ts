import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const CurrentUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
	const req = ctx.switchToHttp().getRequest();
	if (!req.user) {
		throw new UnauthorizedException('Access denied', "maybe 'req.user' is not defined?");
	}

	return data ? req.user[data] : req.user;
});
