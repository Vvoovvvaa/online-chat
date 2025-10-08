import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth-dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authservice:AuthService
    ) {}

    @Post()
    async Login(@Body() dto:AuthDTO){
        return this.authservice.Register(dto)
    }
}
