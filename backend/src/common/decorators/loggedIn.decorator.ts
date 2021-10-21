import { createParamDecorator, ExecutionContext, SetMetadata, UnauthorizedException } from '@nestjs/common';

export const IS_LOGGEDIN_KEY = 'isLoggedIn';

export const LoggedIn = () => SetMetadata(IS_LOGGEDIN_KEY, true);