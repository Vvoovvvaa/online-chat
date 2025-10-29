import { UseGuards, Controller, UseInterceptors, Post, Get, Param, Delete, Body, UploadedFiles } from "@nestjs/common";
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthUser } from "src/decorator/auth-user.decorator";
import { AuthGuard } from "src/guards";
import type { IRequestUser } from "../chat/types/request-user";
import { UsersService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { IdParamDto } from "src/dto/id-param";
import { UserIdDto } from "./dto/user-id.dto";

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) { }


  @UseInterceptors(FilesInterceptor('photo'))
  @Post()
  async updateUser(@AuthUser() user: IRequestUser, @Body() dto: UpdateUserDto, @UploadedFiles() files?: Express.Multer.File[]) {
    return this.usersService.updateUser(user.id, dto, files)
  }


  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @Get(':id')
  async findOneUser(@Param() param : IdParamDto) {
    return this.usersService.findOne(+param)
  }


  @Post('friends/:id')
  async addFriends(@Body() dto:UserIdDto, @Param() param: IdParamDto) {
    return this.usersService.addFriend(dto, +param)
  }


  @Get('friends')
  async getFriends(@AuthUser() requester : IRequestUser,userId: number ) {
    return this.usersService.getFriends(requester.id, userId)
  }


  @Delete('friends/:id')
  async removeFriends(@AuthUser() user : IRequestUser, @Param() param: IdParamDto) {
    return this.usersService.removeFriend(user.id, +param)
  }


}

