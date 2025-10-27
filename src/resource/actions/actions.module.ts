import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediaFiles, Posts, User } from '../../database/entities';
import { AuthModule } from '../auth/auth.module';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';

@Module({
      imports: [
        TypeOrmModule.forFeature([MediaFiles, User,Posts]),
        AuthModule,
      ],
      controllers: [ActionsController],
      providers: [ActionsService],
    })
export class ActionsModule {}
