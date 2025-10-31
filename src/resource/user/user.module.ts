import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './user.service';
import { MediaFiles,User } from '../../database/entities'
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { S3Module } from '../../modules/s3/s3.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([MediaFiles, User,]),
    AuthModule,S3Module
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UserModule {}

