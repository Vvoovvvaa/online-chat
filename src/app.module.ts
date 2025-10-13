import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConfig, dbconfig } from './configs';
import { validationSchema } from './validation/validation-schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './resource/chat/chat.module';
import { Chat, Message, SecretCode, User } from './entities';
import { IDBConfig } from './models';
import { AuthModule } from './resource/auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads/'),
      serveRoot: '/public/',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: validationSchema,
      load: [jwtConfig, dbconfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig: IDBConfig = configService.get('DB_CONFIG') as IDBConfig;
        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          entities: [User, SecretCode, Chat, Message ],
          synchronize: true,
        };
      },
    }),
    ChatModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}