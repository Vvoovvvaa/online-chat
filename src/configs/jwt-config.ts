import { registerAs } from "@nestjs/config";
import { IJWTConfig } from "src/models";

export const jwtConfig = registerAs("JWT_CONFIG",(): IJWTConfig => { 
    return{
        tempSecret: process.env.JWT_TEMP_SECRET as string,
        secret: process.env.JWT_SECRET as string,
        expiresIn: process.env.JWT_EXPIRES_IN as string,
    }
})