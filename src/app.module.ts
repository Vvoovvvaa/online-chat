import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './resource/chat/chat.module';
import { AuthModule } from './resource/auth/auth.module';
import { User } from './entities/user';
import { Base } from './entities/base';
import { Message } from './entities/message';
import { ChatMember } from './entities/chat-members';
import { Chat } from './entities/chat';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dev-db.sqlite', // создаст файл dev-db.sqlite в корне проекта
      entities: [User, Base,Message,Chat,ChatMember],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Base,Message,ChatMember,Chat]),
    ChatModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
