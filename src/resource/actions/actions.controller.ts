import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { AuthUser } from 'src/decorator/auth-user.decorator';
import { AuthGuard } from 'src/guards';
import type { IRequestUser } from '../chat/types/request-user';
import { ActionsService } from './actions.service';
import { CreatePostDto } from './dto/create-post.dto';
import { IdParamDto } from 'src/dto/id-param';

@UseGuards(AuthGuard)
@Controller('posts')
export class ActionsController {
  constructor(private readonly actionservice:ActionsService) {}

  @UseInterceptors(FilesInterceptor('photo'))
  @Post()
  async createPost(@AuthUser() user: IRequestUser, @Body() dto: CreatePostDto, @UploadedFiles() files?: Express.Multer.File[]) {
    return this.actionservice.addPost(user.id, dto, files)
  }

  @Get()
  async getUserPosts(@AuthUser() user: IRequestUser) {
    return this.actionservice.getUserPosts(user.id)
  }


  @Delete(':id')
  async deletePost(@AuthUser() user: IRequestUser, @Param() param: IdParamDto){
    return this.actionservice.deletePost(user.id, param.id)
  }
}

