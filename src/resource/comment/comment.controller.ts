import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';

import { CommentService } from './comment.service';
import { AuthUser } from 'src/decorator/auth-user.decorator';
import { AuthGuard } from 'src/guards';
import type { IRequestUser } from '../chat/types/request-user';
import { CommentDto } from './dto/write-comment.dto';

@UseGuards(AuthGuard)
@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService:CommentService
    ){}

    @Post()
    async addComment(@AuthUser() user:IRequestUser,@Body()dto:CommentDto){
        return this.commentService.WriteComment(dto,user.id)
    }

    @Delete()
    async removeComment(@AuthUser() user:IRequestUser,postId:number){
        return this.commentService.removeComment(user.id,postId)
    }


}
