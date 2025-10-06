import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  private clients: Socket[] = [];

  addClient(client: Socket): void {
    this.clients.push(client);
    console.log(`client connected: ${client.id}`);
    console.log(this.clients.length)
  }

  removeClient(id: string): void {
    this.clients = this.clients.filter(client => client.id !== id);
    console.log(`client disconnected: ${id}`);
    console.log(this.clients.length)
  }

  getClients(): Socket[] {
    return this.clients;
  }

  getClientsId(id:string): Socket|null{
    return this.clients.find(client => client.id === id) ?? null
  }
}
