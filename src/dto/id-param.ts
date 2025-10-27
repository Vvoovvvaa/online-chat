import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class IdParamDto{
    @IsNotEmpty()
    id:number
}