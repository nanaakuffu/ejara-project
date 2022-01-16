import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import JwtAuthGuard from 'src/auth/auth.guard';
import { UserEntity } from './entities/users.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  /**
   *
   */
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserEntity })
  async getAllUsers(): Promise<UserEntity[]> {
    return this.usersService.getAllUsers();
  }

  @Post()
  async createUser(@Body() createDto: CreateUserDto): Promise<UserEntity> {
    createDto.password = await bcrypt.hash(createDto.password, 10);
    return this.usersService.createUser(createDto);
  }
}
