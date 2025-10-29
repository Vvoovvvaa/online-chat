import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { MediaFiles } from 'src/database/entities/media-files';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { PhotoValidator } from 'src/helpers/photos-validation.helper';
import { FileHelper } from 'src/helpers/file-helper';
import { UserIdDto } from './dto/user-id.dto';
import {v4 as uuid} from 'uuid'
import { S3Service } from '../chat/modules/s3/s3.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(MediaFiles)
    private readonly mediaRepository: Repository<MediaFiles>,
    private readonly s3service:S3Service
  ) { }


  async updateUser(id: number, dto: UpdateUserDto, files?: Express.Multer.File[]) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['mediaFiles'], });

    if (!user) {
      throw new NotFoundException('user not found')
    }

    user.isPrivate = dto.isPrivate ?? user.isPrivate
    user.name = dto.name ?? user.name;
    user.LastName = dto.LastName ?? user.LastName;
    user.age = dto.age ?? user.age;

    if (files) {
      for (let file of files) {
        const validated = PhotoValidator.validator(file);
        const type = validated.originalname.split('.').reverse()[0]
        const filePath = `Vova/Post/${type}/${uuid()}_${file.originalname}`
        const photoEntity = this.mediaRepository.create({
          path: filePath,
          size: validated.size
        })
        await this.s3service.putObject(file.buffer,filePath,validated.mimetype)
        user.mediaFiles.push(photoEntity)
      }
    }

    return this.userRepository.save(user)
  }

 async addFriend(userId: UserIdDto, friendId: number): Promise<User> {

  const user = await this.userRepository.findOne({
    where: { id: userId.userId },
    relations: ['friends'],
  });
  if (!user) throw new NotFoundException('User not found');

  const friend = await this.userRepository.findOne({ where: { id: friendId } });
  if (!friend) throw new NotFoundException('Friend not found');

  if (user.friends.some((e) => e.id === friendId)) {
    return user;
  }

  user.friends.push(friend);
  return this.userRepository.save(user);
}


  async removeFriend(userId: number, frientId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['friends'] })
    if (!user) throw new NotFoundException('user not found')

    user.friends.filter((e) => e.id !== frientId)

    return await this.userRepository.save(user)

  }


  async getFriends(requesterId: number, userId: number): Promise<User[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['friends'] });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.id !== requesterId && user.isPrivate === 'private') {
      throw new ForbiddenException('User data is private');
    }

    return user.friends;
  }



  findAll() {
    return this.userRepository.find();
  }


  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException('user not found')
    }

    return user
  }

  
async deletePost(userId: number, postId: number) {
  const user = await this.userRepository.findOne({
    where: { id: postId },
    relations: ['user', 'mediaFiles'],
  });

  if (!user) {
    throw new NotFoundException('Post not found');
  }

  if (user.id !== userId) {
    throw new ForbiddenException('You are not allowed to delete this post');
  }

  if (user.mediaFiles?.length) {
    for (const file of user.mediaFiles) {
      try {
        await this.s3service.deleteObject(file.path);
      } catch (e) {
        console.error(`Failed to delete ${file.path} from S3:`, e);
      }
    }
  }

  await this.userRepository.delete(user.id);

  return { message: 'Post and files successfully deleted' };
}


}