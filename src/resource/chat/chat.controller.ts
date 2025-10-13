import {
  Body,
  Controller,
  Delete,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from 'src/guards/auth-guard';
import type { AuthenticatedWebSocket } from './types/authenticated-websocket';
import { AuthUser } from 'src/decorator/auth-user.decorator';
import { CreateChatDTO } from './dto/create-chat.dto';
import type { IRequestUser } from './types/request-user';

@UseGuards(AuthGuard)
@Controller('chat')
export class ChatController {
  private readonly logger = new Logger(ChatController.name)
  constructor(private readonly chatService: ChatService) {}

  @Post('add/:id')
  addClient(
    @AuthUser('id') userId: number,
    @Body() socket: AuthenticatedWebSocket,
  ) {
    return this.chatService.addClient(userId, socket);
  }

  @Delete('remove')
  removeClient(@Param('userId') userId: number) {
    return this.chatService.removeClient(userId);
  }

  @Post('create')
  async createChat(
    @Body() body: CreateChatDTO,
    @AuthUser() client: IRequestUser,
  ) {
    this.logger.log(`Создание чата пользователем ${client.name}`);

    const chat = await this.chatService.createChat(client.id,body.name);

    return chat;
  }

  @Post('invite')
  async inviteUser(
    @AuthUser('id') inviterId: number,
    @Param('chatId') chatId: number,
    @Param('userId') userId: number,
  ) {
    return this.chatService.inviteUser(inviterId, chatId, userId);
  }

  @Post('message')
  async addMessage(
    @AuthUser('id') userId: number,
    @Param('chatId') chatId: number,
    @Body('text') text: string,
  ) {
    return this.chatService.addMessage(userId, chatId, text);
  }
}
