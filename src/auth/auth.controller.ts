import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './../auth/dto/create.user.dto';
import { UserEntity } from '../users/entities/users.entity';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';

@Controller('auth')
@ApiTags('auth')
export default class AuthController {
  /**
   *
   */
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: Auth })
  async login(@Body() loginData: AuthDto): Promise<{
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
    token: string;
  }> {
    return this.authService.login(loginData);
  }

  @Post('register')
  @ApiOkResponse({ type: UserEntity })
  async createUser(@Body() createDto: CreateUserDto): Promise<UserEntity> {
    createDto.password = await bcrypt.hash(createDto.password, 10);
    return this.authService.createUser(createDto);
  }
}
