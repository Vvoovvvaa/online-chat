import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { MediaFiles, Posts, User } from '../../database/entities';
import { CreatePostDto } from './dto/create-post.dto';
import { PhotoValidator } from 'src/helpers';
import { S3Service } from 'src/modules/s3/s3.service';
import { v4 as uuid } from 'uuid'
@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(MediaFiles)
    private readonly mediaRepository: Repository<MediaFiles>,
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
    private readonly s3service: S3Service
  ) { }

  async addPost(userId: number, dto: CreatePostDto, files?: Express.Multer.File[]) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const post = this.postRepository.create({ description: dto.description, user });

    if (files) {
      post.mediaFiles = []
      for (let file of files) {
        const type = file.originalname.split('.').reverse()[0]
        const filePath = `Vova/Post/${type}/${uuid()}_${file.originalname}`
        const photoEntity = this.mediaRepository.create({

          path: filePath,
          size: file.size
        })
        await this.s3service.putObject(file.buffer, filePath, file.mimetype)
        post.mediaFiles.push(photoEntity)
      }
    }
    return this.postRepository.save(post)

  }

  async getUserPosts(userId: number): Promise<Posts[]> {
    return this.postRepository.find({
      where: { user: { id: userId } },
      relations: ['mediaFiles', 'comments', 'likes'],
    });
  }


async deletePost(userId: number, postId: number) {
  const post = await this.postRepository.findOne({
    where: { id: postId },
    relations: ['user', 'mediaFiles'],
  });

  if (!post) {
    throw new NotFoundException('Post not found');
  }

  if (post.user.id !== userId) {
    throw new ForbiddenException('You are not allowed to delete thi s post');
  }

  if (post.mediaFiles?.length) {
    for (const file of post.mediaFiles) {
      try {
        await this.s3service.deleteObject(file.path);
      } catch (e) {
        console.error(`Failed to delete ${file.path} from S3:`, e);
      }
    }
  }

  await this.postRepository.delete(post.id);

  return { message: 'Post and files successfully deleted' };
}

}

