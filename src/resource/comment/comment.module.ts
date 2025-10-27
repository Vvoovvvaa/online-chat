import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comments,MediaFiles,Posts, User } from '../../database/entities';
import { UserController } from '../user/user.controller';
import { UsersService } from '../user/user.service';
import { AuthModule } from '../auth/auth.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
      imports: [
        TypeOrmModule.forFeature([User,Posts,Comments,MediaFiles]),
        AuthModule
      ],
      controllers: [CommentController],
      providers: [CommentService],
    })
export class CommentModule {}
