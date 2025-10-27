import { Module } from '@nestjs/common';
import { Comments, Likes, Posts, User } from 'src/database/entities';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
      imports: [
        TypeOrmModule.forFeature([User,Posts,Comments,Likes]),
        AuthModule,
      ],
      controllers: [LikeController],
      providers: [LikeService],
      exports: [LikeService, TypeOrmModule],
    })
export class LikeModule {}

