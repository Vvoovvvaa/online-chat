import { MinLength,IsString, IsNumber, Min, Max, IsBoolean, IsOptional, IsEnum } from "class-validator";
import { Confidencial } from "src/database/enums/private-account-enum";

export class UpdateUserDto{
    @IsString()
    @MinLength(3)
    name?:string

    @IsString()
    @MinLength(2)
    LastName?:string

    @IsNumber()
    @Min(18)
    @Max(100)
    age?:number

    @IsOptional()
    @IsEnum(Confidencial)
    isPrivate?:Confidencial




}