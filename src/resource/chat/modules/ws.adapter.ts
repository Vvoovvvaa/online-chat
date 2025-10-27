import { INestApplicationContext, Logger } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
import { WebSocket, WebSocketServer } from 'ws';
import * as url from 'url';

export class CustomWsAdapter extends WsAdapter {
  protected readonly logger = new Logger(CustomWsAdapter.name);

  constructor(app: INestApplicationContext) {
    super(app);
  }

  create(port: number, options?: any): WebSocketServer {
    const server = super.create(port, options) as WebSocketServer;

    server.on('connection', (ws: WebSocket, request) => {
      const { query } = url.parse(request.url!, true);
      const token = query.token as string;

      if (token) {
        (ws as any).token = token;
        this.logger.debug(`Token найден при handshake: ${token}`);
      } else {
        this.logger.warn('Подключение без токена');
      }
    });

    return server;
  }
}