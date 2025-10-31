import { UseGuards, Controller, UseInterceptors, Post, Get, Param, Delete, Body, UploadedFiles } from "@nestjs/common";
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthUser } from "src/decorator/auth-user.decorator";
import { AuthGuard } from "src/guards";
import type { IRequestUser } from "../chat/types/request-user";
import { UsersService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { IdParamDto } from "src/dto/id-param";
import { UserIdDto } from "./dto/user-id.dto";
import { PhotoValidationPipe } from "src/modules/pipe/photo-validator";

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) { }


  @UseInterceptors(FilesInterceptor('photo'))
  @Post()
  async updateUser(@AuthUser() user: IRequestUser, @Body() dto: UpdateUserDto, @UploadedFiles(PhotoValidationPipe) files?: Express.Multer.File[]) {
    return this.usersService.updateUser(user.id, dto, files)
  }


  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @Get(':id')
  async findOneUser(@Param() param: IdParamDto) {
    return this.usersService.findOne(Number(param.id))
  }


  @Post('friends/:id')
  async addFriends(@Body() dto: UserIdDto, @Param() param: IdParamDto) {
    return this.usersService.addFriend(dto, Number(param.id))
  }



  @Get('friends/:id')
  async getFriends(
    @AuthUser() user: IRequestUser,
    @Param() param: IdParamDto
  ) {
    return this.usersService.getFriends(+param.id, user.id);
  }

  @Delete('friends/:id')
  async removeFriends(@AuthUser() user: IRequestUser, @Param() param: IdParamDto) {
    return this.usersService.removeFriend(user.id, +param)
  }


}

