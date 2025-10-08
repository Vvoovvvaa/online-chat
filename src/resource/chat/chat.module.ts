import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { WsAuthGuard } from 'src/guards/ws-auth-guard';
import { JwtModule } from '@nestjs/jwt';
import { ChatController } from './chat.controller';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET })],
  providers: [ChatGateway, ChatService, WsAuthGuard],
  controllers: [ChatController],
})
export class ChatModule {}