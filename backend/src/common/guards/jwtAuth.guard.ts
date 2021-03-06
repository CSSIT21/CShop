import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

import { IS_LOGGEDIN_KEY } from '../decorators/loggedIn.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super();
	}

	canActivate(context: ExecutionContext) {
		return super.canActivate(context);
	}

	handleRequest(err, user, info, context) {
		const roles = this.reflector.get<string[]>('roles', context.getHandler());
		const isPublic = this.reflector.get<string[]>(IS_PUBLIC_KEY, context.getHandler());
		const isLoggedIn = this.reflector.get<string[]>(IS_LOGGEDIN_KEY, context.getHandler());

		if (isPublic) {
			return user;
		}

		if (typeof isLoggedIn !== 'undefined' && isLoggedIn) {
			console.log('CHECKING FOR LOGIN');
			if (!user) throw new UnauthorizedException();
			// console.log('อ้าว ผ่านมาได้ไง')
			// console.log("SUSPECTED -> user ", user)
		}

		// if (!roles) {
		//   console.log('อ้าว ไม่มี Roles')
		//   throw new UnauthorizedException();
		// }
		// console.log('มี Role นะะ')

		if (err || !user) {
			throw err || new UnauthorizedException();
		}

		// if(typeof roles !== 'undefined' && !roles.includes( ["USER","SELLER","ADMIN"][(user as User).type - 1]) ) throw new UnauthorizedException();

		return user;
	}
}
