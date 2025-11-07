import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { IgoogleConfig } from 'src/models';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly configservice:ConfigService) {
        const googlConfig = configservice.get<IgoogleConfig>("GOOGLECONFIG")
        if(!googlConfig){
            throw new NotFoundException("the file google config is missing")
        }
        super({
            clientID:googlConfig.clientID!,
            clientSecret: googlConfig.clientSecret!,
            callbackURL: googlConfig.callbackURL!,
            scope: ['profile', 'email'],
            
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name?.givenName,
            lastName: name?.familyName,
            picture: photos[0]?.value,
            accessToken,
        };
        done(null, user);
    }
}
