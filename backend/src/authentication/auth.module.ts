import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthenticationController } from './auth.controller';
import { AuthenticationService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

/** Constants */
import JwtConstants from 'src/common/constant/jwt';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JwtConstants.JWT_SECRET,
      signOptions: { expiresIn: JwtConstants.JWT_EXPIRED },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService,LocalStrategy,JwtStrategy]
})
export class AuthenticationModule {}