import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthenticationController } from './auth.controller';
import { AuthenticationService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

/** Constants */
import constraints from 'src/common/constants';

@Global()
@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: constraints.jwtSecret,
			signOptions: { expiresIn: '3d' },
		}),
	],
	controllers: [AuthenticationController],
	providers: [AuthenticationService, LocalStrategy, JwtStrategy],
})
export class AuthenticationModule {}
