import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { MediaFiles } from 'src/database/entities/media-files';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIdDto } from './dto/user-id.dto';
import {v4 as uuid} from 'uuid'
import { S3Service } from '../../modules/s3/s3.service';

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
    user.firstName = dto.name ?? user.firstName;
    user.lastName = dto.LastName ?? user.lastName;
    user.age = dto.age ?? user.age;
    user.email = dto.email ?? user.email

    if (files) {
      for (let file of files) {
        const type = file.originalname.split('.').reverse()[0]
        const filePath = `Vova/Post/${type}/${uuid()}_${file.originalname}`
        const photoEntity = this.mediaRepository.create({
          path: filePath,
          size: file.size
        })
        await this.s3service.putObject(file.buffer,filePath,file.mimetype)
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


  async getFriends(targetUserId: number, requesterId: number): Promise<User[]> {
    const targetUser = await this.userRepository.findOne({
      where: { id: targetUserId },
      relations: ['friends'],
    });

    if (!targetUser) {
      throw new NotFoundException('User not found');
    }

    if (targetUser.id !== requesterId && targetUser.isPrivate === 'private') {
      throw new ForbiddenException('User data is private');
    }

    return targetUser.friends;
  }




  findAll() {
    return this.userRepository.find();
  }


  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id },relations:['friends','posts']})

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