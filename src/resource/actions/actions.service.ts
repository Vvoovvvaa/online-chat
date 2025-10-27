import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { MediaFiles, Posts, User } from '../../database/entities';
import { CreatePostDto } from './dto/create-post.dto';
import { PhotoValidator, FileHelper } from 'src/helpers';

@Injectable()
export class ActionsService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>,
        @InjectRepository(MediaFiles)
        private readonly mediaRepository:Repository<MediaFiles>,
        @InjectRepository(Posts)
        private readonly postRepository:Repository<Posts>
    ){}

    async addPost(userId:number,dto:CreatePostDto,files?: Express.Multer.File[]){
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const post = this.postRepository.create({ description: dto.description, user });

    if (files) {
      for (let file of files) {
        const validated = PhotoValidator.validator(file);
        const photoEntity = this.mediaRepository.create({
          path: FileHelper.saveFile(validated, 'user'),
          size: validated.size
        })
        post.mediaFiles.push(photoEntity)
      }
    }

    return this.postRepository.save(post)
  }

    async getUserPosts(userId: number): Promise<Posts[]> {
    return this.postRepository.find({
      where: { user: { id: userId } },
      relations: ['mediaFiles', 'comments'],
    });
  }


  async deletePost(userId: number, postId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postId }, relations: ['user']
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.user.id !== userId) {
      throw new NotFoundException('You are not allowed to delete this post');
    }

    await this.postRepository.delete(post.id);

    return { "message": "post is removed" }
  }
}

