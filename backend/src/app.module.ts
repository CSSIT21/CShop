import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    }),
    AuthenticationModule,
    PrismaModule,
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
