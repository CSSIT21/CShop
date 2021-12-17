import { Module } from '@nestjs/common';
import { ShortLinkController } from './short-link.controller';
import { ShortLinkService } from './short-link.service';

@Module({
  controllers: [ShortLinkController],
  providers: [ShortLinkService]
})
export class ShortLinkModule {}
