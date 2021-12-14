import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/auth.module';
import { JwtAuthGuard } from './common/guards/jwtAuth.guard';
import { PrismaModule } from './prisma/prisma.module';
<<<<<<< HEAD
import { ManageaccountModule } from './_manageaccount/manageaccount.module';

@Module({
	imports: [HttpModule, AuthenticationModule, PrismaModule, ManageaccountModule],
=======
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
	],
>>>>>>> 45a1af9f764e0af5d1a0643a87b6b84763f4d1c4
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
