import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ErrorHelper } from 'src/common/helpers/responses/responses-error.helper';
import { user } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<null | user> {
    try {
      const result = await this.prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      return result;
    } catch (error) {
      ErrorHelper.throwCustomError(
        400,
        'Something went wrong while searching for user',
      );
    }
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    const result = await this.findByEmail(createUserDto.email);

    if (result !== null) {
      throw new Error('An account with that email already exists');
    }

    try {
      await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          password: await bcrypt.hash(createUserDto.password, 10),
          preferences: createUserDto.preferences ?? {},
        },
      });
    } catch (error) {
      throw new Error('Something went wrong while create a user');
    }
  }
}
