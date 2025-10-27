import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { jwtConfig, dbconfig } from './configs';
import { validationSchema } from './validation/validation-schema';
import { ChatModule } from './resource/chat/chat.module';
import { Chat, Message, Posts, SecretCode, User,MediaFiles,Comments, Likes } from './database/entities';
import { IDBConfig } from './models';
import { AuthModule } from './resource/auth/auth.module';
import { UserController } from './resource/user/user.controller';
import { UserModule } from './resource/user/user.module';
import { ActionsService } from './resource/actions/actions.service';
import { ActionsController } from './resource/actions/actions.controller';
import { ActionsModule } from './resource/actions/actions.module';
import { CommentController } from './resource/comment/comment.controller';
import { CommentService } from './resource/comment/comment.service';
import { CommentModule } from './resource/comment/comment.module';
import { LikeService } from './resource/like/like.service';
import { LikeController } from './resource/like/like.controller';
import { LikeModule } from './resource/like/like.module';



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
          entities: [User, SecretCode, Chat, Message,MediaFiles, Posts,Comments,Likes],
          synchronize: true,
        };
      },
    }),
    ChatModule,
    AuthModule,
    UserModule,
    ActionsModule,
    CommentModule,
    LikeModule
  ],
  controllers: [AppController, UserController,ActionsController, CommentController, LikeController ],
  providers: [AppService, ActionsService, CommentService, LikeService],
  
})
export class AppModule {}