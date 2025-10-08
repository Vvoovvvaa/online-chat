import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from 'src/guards/auth-guard';

@UseGuards(AuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('clients')
  getClients() {
    return this.chatService.getClients()
  }

  @Get(':id')
  getClientId(@Param('id') id: string) {
    return this.chatService.getClientById(id)
  }

  @Post(':id')
  sendMessage(
    @Param('id') clientId: string,
    @Body('event') event: string,
    @Body('data') data: any,
  ) {
    return this.chatService.sendToClient(clientId,event,data)
  }

  @Post('broadcast')
  broadcastMessage(@Body('event') event: string, @Body('data') data: any) {
    return this.chatService.broadcastMessage(event,data)
  }

  @Delete(':id')
  removeClient(@Param('id') id: string) {
    return this.chatService.removeClient(id)
  }
}
