import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/auth.module';
import jwtConfig from './common/constant/jwt';
import { JwtAuthGuard } from './common/guards/jwtAuth.guard';
import { PrismaModule } from './prisma/prisma.module';
const path = require('path');

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, '.env')
    }),
    AuthenticationModule,
    PrismaModule,
    JwtModule.register({
      secret: jwtConfig.JWT_SECRET,
      signOptions: { expiresIn: jwtConfig.JWT_EXPIRED },
    }),
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    { 
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule { }
