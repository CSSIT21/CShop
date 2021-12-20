import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
	const req = ctx.switchToHttp().getRequest();
	// console.log('CURRENT USER: ', req.user);
	if (!req.user) {
		return null;
	}

	return data ? req.user[data] : req.user;
});
