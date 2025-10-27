import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CommentDto{
    @IsNotEmpty()
    @IsString()
    text:string

    @IsNotEmpty()
    @IsNumber()
    postId:number


}