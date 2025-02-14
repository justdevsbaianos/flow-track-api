import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { ResponseDto } from 'src/common/dto/responses/response.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
    return new ResponseDto(201, 'User successfully created');
  }
}
