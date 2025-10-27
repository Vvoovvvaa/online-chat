import { IsNotEmpty, IsNumber } from "class-validator";

export class LikeDto{
    @IsNumber()
    @IsNotEmpty()
    PostId:number
}