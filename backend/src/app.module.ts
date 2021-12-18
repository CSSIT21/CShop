import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/auth.module';
import { JwtAuthGuard } from './common/guards/jwtAuth.guard';
import { PrismaModule } from './prisma/prisma.module';
<<<<<<< HEAD
import { BannerModule } from './home&log/banner/banner.module';
import { HomeModule } from './home&log/home/home.module';
import { LogSystemModule } from './home&log/log-system/log-system.module';
import { ManageaccountModule } from './_manageaccount/manageaccount.module';
=======
import { ProfileModule } from './profile/profile.module';
import { SellershopModule } from './_sellershop/sellershop/sellershop.module';
import { ShopcustomizationModule } from './_sellershop/shopcustomization/shopcustomization.module';
import { BannerModule } from './home/banner/banner.module';
import { HomeModule } from './home/home/home.module';
import { LogSystemModule } from './home/log-system/log-system.module';
>>>>>>> 77b47da91da205f0359e5cb5bda6f19bb4d03480

@Module({
	imports: [
		HttpModule,
		AuthenticationModule,
		PrismaModule,
		BannerModule,
		HomeModule,
		LogSystemModule,
<<<<<<< HEAD
		ManageaccountModule
=======
		SellershopModule,
		ShopcustomizationModule,
		ProfileModule,
>>>>>>> 77b47da91da205f0359e5cb5bda6f19bb4d03480
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AppModule {}
