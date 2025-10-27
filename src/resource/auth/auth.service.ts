import { CreateAuthDTO } from './dto/auth-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { IAuthEnticationResponse } from './models/autencitation-response';
import { SecretCode,User } from '../../database/entities';
import { createRandomCode } from 'src/helpers';
import { ConfigService } from '@nestjs/config';
import { CodeDTO } from './dto/check-code.dto';
import { IJWTConfig } from 'src/models';


@Injectable()
export class AuthService {
  private jwtConfig: IJWTConfig;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SecretCode)
    private readonly secretRepository: Repository<SecretCode>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtConfig = this.configService.get("JWT_CONFIG") as IJWTConfig
  }

  async loginOrRegister(dto: CreateAuthDTO): Promise<IAuthEnticationResponse> {
    const { phone,name } = dto;
    let user = await this.userRepository.findOne({ where: { phone } });
    if (!user) {
      user = this.userRepository.create({ phone,name });
      await this.userRepository.save(user);
    }

    const existing = await this.secretRepository.findOne({ where: { user: { id: user.id } } });
    if (existing) {
      await this.secretRepository.delete({ id: existing.id });
    }

    const tempToken = this.jwtService.sign(
      { sub: user.id, phone: user.phone,name: user.name, temp: true }, {
      secret: this.jwtConfig.tempSecret,
      expiresIn: '10m',
    },
    );
    const code = createRandomCode().toString()

    const secretCode = this.secretRepository.create({ code, user });
    await this.secretRepository.save(secretCode);

    return {
      accessToken: tempToken,
      code,
    };
  }

  async authentication(dto: CodeDTO): Promise<IAuthEnticationResponse> {
    const existing = await this.secretRepository.findOne({
      where: { code: dto.code },
      relations: ['user'],
    });

    if (!existing) {
      return { message: 'Invalid code' };
    }

    await this.secretRepository.delete({ id: existing.id });

    const user = existing.user;

    const accessToken = this.jwtService.sign(
      { sub: user.id, phone: user.phone, name: user.name }, {
      secret: this.jwtConfig.secret,
      expiresIn: '1d',
    },
    );

    return {
      accessToken: accessToken,
      message: 'Authentication successful',
    };
  }
}