import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  providers: [ChatGateway, ChatService],
  exports: [ChatService]
})
export class ChatModule {}
