import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User,UserSecurity } from './database/entities';
import { accauntStatus } from './database/enums';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserSecurity)
    private readonly securityRepository: Repository<UserSecurity>,

    private readonly jwtService: JwtService,
  ) {}

 async googleLogin(req) {
  if (!req.user) {
    return { message: 'No user from Google' };
  }

  const { email, given_name: firstName, family_name: lastName } = req.user;

  let user = await this.userRepository.findOne({
    where: { email }, 
    relations: ['security'],
  });

  if (!user) {
    user = this.userRepository.create({
      firstName,
      lastName,
      email,
      accountStatus: accauntStatus.ACTIVE,
    });
    await this.userRepository.save(user);

    const security = this.securityRepository.create({ user });
    await this.securityRepository.save(security);

    user.security = security;
  }

  const payload = {
    sub: user.id,
    email,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const jwt = this.jwtService.sign(payload, { expiresIn: '1d' });

  return {
    message: 'User logged in via Google',
    user,
    jwt,
  };
}
}