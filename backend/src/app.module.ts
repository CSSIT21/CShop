import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/auth.module';
import { JwtAuthGuard } from './common/guards/jwtAuth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './_product/product/product.module';

@Module({
	imports: [HttpModule, AuthenticationModule, PrismaModule, ProductModule],
	controllers: [AppController],
	providers: [
		// AppService,
		// {
		// 	provide: APP_GUARD,
		// 	useClass: JwtAuthGuard,
		// },
	],
})
export class AppModule {}
