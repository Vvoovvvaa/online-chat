import { IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

export class AuthDTO{
    @IsPhoneNumber()
    phone:string

    @IsString()
    @MinLength(2)
    @MaxLength(15)
    name:string

    @IsString()
    @MaxLength(20)
    lastName:string
}