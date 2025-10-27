import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePostDto{
    @IsString()
    @IsOptional()
    description:string

}