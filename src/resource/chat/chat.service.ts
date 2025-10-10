import { WebSocket } from 'ws';

export class ChatService {
  private clients: Map<string, WebSocket> = new Map();

  addClient(client: WebSocket): void {
    if (!this.clients.has(client.id)) {
      this.clients.set(client.id, client);
      console.log(`Client connected: ${client.id}`);
      console.log(`Total connected: ${this.clients.size}`);
    }
  }

  removeClient(id: string): void {
    this.clients.delete(id);
    console.log(`Client disconnected: ${id}`);
    console.log(`Total connected: ${this.clients.size}`);
  }

  getClients(): WebSocket[] {
    return Array.from(this.clients.values());
  }

  getClientById(id: string): WebSocket | null {
    return this.clients.get(id) ?? null;
  }

  broadcastMessage(event: string, data: any): void {
    const payload = JSON.stringify({ event, data });
    for (const client of this.clients.values()) {
      client.send(payload);
    }
  }

  sendToClient(clientId: string, event: string, data: any): void {
    const client = this.getClientById(clientId);
    if (client) {
      client.send(JSON.stringify({ event, data }));
    }
  }
}