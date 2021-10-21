import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService, private jwt: JwtService) {
    super();
  }


  async validate(username: string, password: string): Promise<any> {
    console.log('VALIDATING: ', username, password);
    const user = await this.prisma.user.findFirst({ where: { username } /*, include: { profile: true }*/});
    if(!user){
      throw new HttpException("Account is not found.", 500);
    }

    if ( !compareSync(password,user.password)) {
      throw new HttpException("Password is incorrect.", 500);
    }

    delete user.password;
    return {user, access_token: this.jwt.sign(user)};
  }
}