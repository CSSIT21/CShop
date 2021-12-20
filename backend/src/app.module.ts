import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/auth.module';
import { JwtAuthGuard } from './common/guards/jwtAuth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { PromotionModule } from './promotion/promotion.module';
import { ProfileModule } from './profile/profile.module';
import { SellershopModule } from './_sellershop/sellershop/sellershop.module';
import { ShopcustomizationModule } from './_sellershop/shopcustomization/shopcustomization.module';
import { BannerModule } from './home/banner/banner.module';
import { HomeModule } from './home/home/home.module';
import { LogSystemModule } from './home/log-system/log-system.module';
import { ProductModule } from './_product/product/product.module';
import { ReviewProductModule } from './_product/review-product/review-product.module';
import { ShortLinkModule } from './_product/short-link/short-link.module';
import { CommentModule } from './_product/comment/comment.module';

@Module({
	imports: [
		HttpModule,
		AuthenticationModule,
		PrismaModule,
		BannerModule,
		HomeModule,
		LogSystemModule,
		SellershopModule,
		ShopcustomizationModule,
		ProfileModule,
		ProductModule,
		ReviewProductModule,
		ShortLinkModule,
		CommentModule,
		ChatModule,
		PromotionModule
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
