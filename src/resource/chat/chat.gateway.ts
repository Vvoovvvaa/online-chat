import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Server,WebSocket } from "ws"

import { ChatService } from './chat.service';
import { WsAuthGuard } from 'src/guards/ws-auth-guard';
import type { Message } from './types/message';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) { }

  @WebSocketServer()
  server: Server;

  // @UseGuards(WsAuthGuard)
  handleConnection(@ConnectedSocket() client: WebSocket) {
    if (!this.chatService.getClientById(client.id)) {
      this.chatService.addClient(client);
    }
    client.emit('connected', { message: 'You are connected to chat' });
  }
  // @UseGuards(WsAuthGuard)
  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: WebSocket, @MessageBody() message: Message): void {
    console.log(`Message from ${client.id}:`, message);
    this.chatService.broadcastMessage('message', {
      ...message,
    })
  }
  handleDisconnect(@ConnectedSocket() client: WebSocket) {
    console.log('Client disconnected:', client.id);
  }
}
