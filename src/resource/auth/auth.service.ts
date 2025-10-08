import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';
import { AuthDTO } from './dto/auth-dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtservice: JwtService
    ) { }

    async Register(dto: AuthDTO) {
        const { phone } = dto
        let user = await this.userRepository.findOne({ where: { phone } })

        if (!user) {
            user = this.userRepository.create({ phone })
            await this.userRepository.save(user)

        }
        const payload = { sub: user.id, phone: user.phone, name: user.name }

        return {
            accessToken: this.jwtservice.sign(payload, { secret: process.env.JWT_SECRET }),
        }
    }
}
