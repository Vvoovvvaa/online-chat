import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat, Message, SecretCode, User } from 'src/entities';
import { ChatController } from './chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message, User, SecretCode])
,AuthModule],
  providers: [ChatGateway, ChatService],
  controllers:[ChatController]
})
export class ChatModule {}