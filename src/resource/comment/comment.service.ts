import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments, Message, Posts, User } from 'src/database/entities';
import { Repository } from 'typeorm';
import { CommentDto } from './dto/write-comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Comments)
        private readonly commentsRepository: Repository<Comments>,
        @InjectRepository(Posts)
        private readonly postRepository: Repository<Posts>
    ) { }

    async WriteComment(dto: CommentDto, userId: number) {
        const user = await this.userRepository.findOne({ where: { id: userId } })
        if (!user) {
            throw new BadRequestException("user not found")
        }

        const post = await this.postRepository.findOne({ where: { id: dto.postId } })
        if (!post) {
            throw new BadRequestException("Post not found")
        }

        const comment = this.commentsRepository.create({
            text: dto.text,
            post: post,
            author: user
        })

        this.commentsRepository.save(comment)
        return {message:"Comment writed"}
    }

    async removeComment(userId: number, postId: number) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new BadRequestException('User not found');
        }

        const post = await this.postRepository.findOne({ where: { id: postId } });
        if (!post) {
            throw new BadRequestException('Post not found');
        }

        const comment = await this.commentsRepository.findOne({
            where: { author: { id: userId }, post: { id: postId } },
        });

        if (!comment) {
            throw new BadRequestException('Comment not found or not your');
        }

        this.commentsRepository.remove(comment);
        return {message:"comment removed"}

        
    }

}
