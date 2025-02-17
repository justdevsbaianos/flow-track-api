import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { ResponseDto } from 'src/common/dto/responses/response.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
    return new ResponseDto(201, 'User successfully created');
  }

  @Get(':uuid')
  @HttpCode(200)
  async findById(uuid: string) {
    return await this.userService.findByUuid(uuid);
  }
}
