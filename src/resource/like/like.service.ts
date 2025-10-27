import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments, Likes, Posts, User } from 'src/database/entities';
import { Repository } from 'typeorm';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(User)
        private readonly UserRepository: Repository<User>,
        @InjectRepository(Likes)
        private readonly LikesRepository: Repository<Likes>,
        @InjectRepository(Posts)
        private readonly PostRepository: Repository<Posts>,
        @InjectRepository(Comments)
        private readonly CommentsRepository: Repository<Comments>
    ) {}

    async LikePost(userId: number, dto: LikeDto) {
        const user = await this.UserRepository.findOne({ where: { id: userId } });
        if (!user) throw new BadRequestException('User not found');

        const post = await this.PostRepository.findOne({ where: { id: dto.PostId } });
        if (!post) throw new BadRequestException('Post not found');

        const existing = await this.LikesRepository.findOne({
            where: { user: { id: userId }, post: { id: dto.PostId } },
        });

        if (existing) {
            await this.LikesRepository.remove(existing);
            return { message: 'Post unliked' };
        }

        const like = this.LikesRepository.create({ user, post });
        await this.LikesRepository.save(like);
        return { message: 'Post liked' };
    }

    async LikeComment(userId: number, commentId: number) {
        const user = await this.UserRepository.findOne({ where: { id: userId } });
        if (!user) throw new BadRequestException('User not found');

        const comment = await this.CommentsRepository.findOne({ where: { id: commentId } });
        if (!comment) throw new BadRequestException('Comment not found');

        const existing = await this.LikesRepository.findOne({
            where: { user: { id: userId }, comment: { id: commentId } },
        });

        if (existing) {
            await this.LikesRepository.remove(existing);
            return { message: 'Comment unliked' };
        }

        const like = this.LikesRepository.create({ user, comment });
        await this.LikesRepository.save(like);
        return { message: 'Comment liked' };
    }
}
