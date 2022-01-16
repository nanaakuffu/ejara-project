import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
@ApiTags('users')
export class UsersController {
  /**
   *
   */
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() createDto: CreateUserDto): Promise<User> {
    createDto.password = await bcrypt.hash(createDto.password, 10);
    return this.usersService.createUser(createDto);
  }
}
