import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import constants from 'src/common/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: (req) => {
				if (req.headers['authorization']) {
					return req.headers['authorization'];
				}
				if (req.cookies['authorization']) return req.cookies['authorization'];
				return null;
			},
			ignoreExpiration: false,
			secretOrKey: constants.jwtSecret,
		});
	}

	async validate(payload: any) {
		console.log('CHECKING: ', payload);
		return payload;
	}
}
