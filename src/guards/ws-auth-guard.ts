import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IJWTConfig } from 'src/models';

@Injectable()
export class WsAuthGuard implements CanActivate {
  private readonly logger = new Logger(WsAuthGuard.name);
  private readonly jwtConfig: IJWTConfig;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    const config = this.configService.get<IJWTConfig>('JWT_CONFIG');
    if (!config) throw new Error('JWT_CONFIG not found in ConfigService');
    this.jwtConfig = config;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<any>();
    const token = client?.token;

    if (!token) {
      this.logger.warn('Токен не передан при подключении');
      throw new WsException('Token not provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtConfig.secret,
      });

      if (!payload?.sub) {
        this.logger.warn('Payload токена неполный');
        throw new WsException('Invalid token payload');
      }

      client.user = {
        id: payload.sub,
        name: payload.name,
        phone: payload.phone,
      };

      this.logger.log(
        `WebSocket авторизован: ${client.user.name} (${client.user.id})`,
      );

      return true;
    } catch (err) {
      this.logger.warn('Неверный токен — ' + err.message);
      throw new WsException('Invalid or expired token');
    }
  }
}