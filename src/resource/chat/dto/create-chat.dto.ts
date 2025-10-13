import { IsString, MinLength, MaxLength, IsOptional, IsEnum } from "class-validator";
import { ChatType } from "src/entities";

export class CreateChatDTO {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsEnum(ChatType, { message: 'Тип чата должен быть "private" или "group"' })
  type?: ChatType;
}