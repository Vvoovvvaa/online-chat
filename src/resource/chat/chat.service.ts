import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  private clients: Socket[] = [];

  addClient(client: Socket): void {
    if (!this.clients.find(c => c.id === client.id)) {
      this.clients.push(client);
      console.log(`Client connected: ${client.id}`);
      console.log(`Total connected: ${this.clients.length}`);
    }
  }
  removeClient(id: string): void {
    this.clients = this.clients.filter(client => client.id !== id);
    console.log(`Client disconnected: ${id}`);
    console.log(`Total connected: ${this.clients.length}`);
  }

  getClients(): Socket[] {
    return this.clients;
  }
  getClientById(id: string): Socket | null {
    return this.clients.find(client => client.id === id) ?? null;
  }
  broadcastMessage(event: string, data: any): void {
    this.clients.forEach(client => {
      client.emit(event, data);
    });
  }
  sendToClient(clientId: string, event: string, data: any): void {
    const client = this.getClientById(clientId);
    if (client) {
      client.emit(event, data);
    }
  }
}
