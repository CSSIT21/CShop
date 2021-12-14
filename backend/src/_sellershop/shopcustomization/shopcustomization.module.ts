import { Module } from '@nestjs/common';
import { ShopcustomizationService } from './shopcustomization.service';
import { ShopcustomizationController } from './shopcustomization.controller';

@Module({
	controllers: [ShopcustomizationController],
	providers: [ShopcustomizationService],
})
export class ShopcustomizationModule {}
