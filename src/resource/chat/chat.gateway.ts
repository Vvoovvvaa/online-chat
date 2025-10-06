import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ClientToServerListen, ServerToClientListen } from './types/WebSocketListen';
import type { Message } from './types/message';
import { ChatService } from './chat.service';


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection,OnGatewayDisconnect {
  constructor(private chatService:ChatService){

  }
  @WebSocketServer() server: Server<ClientToServerListen, ServerToClientListen>;
  @SubscribeMessage('message')
  handleMessage( @MessageBody() message: Message):void {
    this.server.emit('message',message)
  }
  handleConnection(@ConnectedSocket() client:Socket) {
    if(!this.chatService.getClientsId(client.id)) this.chatService.addClient(client)
  }
  handleDisconnect(@ConnectedSocket() client:Socket) {
    this.chatService.removeClient(client.id)
    client.disconnect(true)
} 
}
