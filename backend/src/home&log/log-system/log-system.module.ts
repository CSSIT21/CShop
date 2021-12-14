import { Module } from '@nestjs/common';
import { LogSystemService } from './log-system.service';
import { LogSystemController } from './log-system.controller';

@Module({
  controllers: [LogSystemController],
  providers: [LogSystemService]
})
export class LogSystemModule {}
