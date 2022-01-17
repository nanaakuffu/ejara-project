import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
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
}
