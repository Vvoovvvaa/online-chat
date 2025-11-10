import { CreateAuthDTO } from './dto/auth-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { IAuthEnticationResponse } from './models/autencitation-response';
import { SecretCode, User, UserSecurity } from '../../database/entities';
import { createRandomCode } from 'src/helpers';
import { ConfigService } from '@nestjs/config';
import { CodeDTO } from './dto/check-code.dto';
import { IJWTConfig } from 'src/models';
import { accauntStatus } from 'src/database/enums/user-accaunt-status';


@Injectable()
export class AuthService {
  private jwtConfig: IJWTConfig;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SecretCode)
    private readonly secretRepository: Repository<SecretCode>,
    @InjectRepository(UserSecurity)
    private readonly userSecurityRepository: Repository<UserSecurity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtConfig = this.configService.get("JWT_CONFIG") as IJWTConfig
  }

  async loginOrRegister(dto: CreateAuthDTO): Promise<IAuthEnticationResponse> {
    const { phone, name,email } = dto;
    let user = await this.userRepository.findOne({ where: { phone,email },order: { id: 'DESC'} });
    if (!user) {

      user = this.userRepository.create({ phone,email, firstName: name });
      await this.userRepository.save(user);

      const security = this.userSecurityRepository.create({ user })
      await this.userSecurityRepository.save(security)

      user.security = security
    }

    if (user.accountStatus === accauntStatus.PERMANETLY_BLOCK) {
      throw new BadRequestException("Your account is permanently blocked");
    }

    if (user.accountStatus === accauntStatus.TEMPORARY_BLOCK) {
      throw new BadRequestException("Your accaount is Temproray blocked")
    }

    if (!user.security) {
      user.security = this.userSecurityRepository.create({
        totalLoginAttemps: 0,
        temporaryBlock: 0,
        user: user,
      });
      await this.userSecurityRepository.save(user.security);
    }



    const existing = await this.secretRepository.findOne({ where: { user: { id: user.id } } });
    if (existing) {
      await this.secretRepository.delete({ id: existing.id });
    }

    const tempToken = this.jwtService.sign(
      { sub: user.id, phone: user.phone, name: user.firstName, temp: true }, {
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
  async authentication(userId: number, dto: CodeDTO): Promise<IAuthEnticationResponse> {
    const existing = await this.secretRepository.findOne({
      where: {
        code: dto.code,
        user: { id: userId },
      },
      order: { id: 'DESC'},
      relations: ['user'],
    });

    const user1 = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["security"],
    });

    if (!user1) {
      throw new BadRequestException("user not found");
    }


    if (user1.accountStatus === accauntStatus.TEMPORARY_BLOCK && user1.security.temporaryBlockUntil) {
      const now = new Date();
      if (now < user1.security.temporaryBlockUntil) {
        const remaining = Math.ceil((user1.security.temporaryBlockUntil.getTime() - now.getTime()) / 60000);
        throw new BadRequestException(`You can try again in ${remaining} minute(s)`);
      } else {
        user1.accountStatus = accauntStatus.ACTIVE;
        user1.security.temporaryBlockUntil = null;
        user1.security.user = user1

        await this.userRepository.save(user1);
        await this.userSecurityRepository.save(user1.security);
      }
    }

    if (!existing) {
      user1.security.totalLoginAttemps += 1;

      if (user1.security.totalLoginAttemps >= 3) {
        user1.security.totalLoginAttemps = 0;
        user1.security.temporaryBlock += 1;
        user1.security.user = user1

        const blockUntil = new Date(Date.now() + 15 * 60 * 1000);
        user1.security.temporaryBlockUntil = blockUntil;
        user1.accountStatus = accauntStatus.TEMPORARY_BLOCK;
        user1.security.user = user1

        await this.userRepository.save(user1);
        await this.userSecurityRepository.save(user1.security);

        if (user1.security.temporaryBlock >= 5) {
          user1.accountStatus = accauntStatus.PERMANETLY_BLOCK;
          await this.userRepository.save(user1);
          return { message: "your account are blocked all time, good bye" };
        }

        return { message: "Your account is temporarily blocked for 15 minutes" };
      }

      await this.userSecurityRepository.save(user1.security);
      throw new BadRequestException("Invalid authentication code");
    }

    await this.secretRepository.delete({ id: existing.id });
    user1.security.totalLoginAttemps = 0;
    user1.security.temporaryBlockUntil = null;
    user1.security.user = user1
    await this.userSecurityRepository.save(user1.security);
    user1.accountStatus = accauntStatus.ACTIVE;
    await this.userRepository.save(user1);

    const accessToken = this.jwtService.sign(
      { sub: user1.id, phone: user1.phone, name: user1.firstName },
      { secret: this.jwtConfig.secret, expiresIn: '1d' }
    );

    return {
      accessToken,
      message: 'Authentication successful',
    };
  }


}

