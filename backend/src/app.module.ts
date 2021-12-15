import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/auth.module';
import { JwtAuthGuard } from './common/guards/jwtAuth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { SellershopModule } from './_sellershop/sellershop/sellershop.module';
import { ShopcustomizationModule } from './_sellershop/shopcustomization/shopcustomization.module';
import { BannerModule } from './home&log/banner/banner.module';
import { HomeModule } from './home&log/home/home.module';
import { LogSystemModule } from './home&log/log-system/log-system.module';


@Module({
	imports: [
		HttpModule,
		AuthenticationModule,
		PrismaModule,
		BannerModule,
		HomeModule,
		LogSystemModule,
    SellershopModule,
    ShopcustomizationModule
	],
	controllers: [AppController],
	providers: [
		// AppService,
		// {
		// 	provide: APP_GUARD,
		// 	useClass: JwtAuthGuard,
		// },
	],
})
export class AppModule { }
