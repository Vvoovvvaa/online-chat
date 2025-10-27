import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthUser } from 'src/decorator/auth-user.decorator';
import type { IRequestUser } from '../chat/types/request-user';
import { LikeDto } from './dto/like.dto';
import { IdParamDto } from 'src/dto/id-param';
import { AuthGuard } from 'src/guards';

@UseGuards(AuthGuard)
@Controller('like')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @Post('post')
    async likePost(@AuthUser() user: IRequestUser, @Body() body: LikeDto) {
        return this.likeService.LikePost(user.id, body);
    }

    @Post('comment/:Id')
    async likeComment(
        @AuthUser() user: IRequestUser,
        @Param('commentId') param:IdParamDto
    ) {
        return this.likeService.LikeComment(user.id, param.id);
    }
}
