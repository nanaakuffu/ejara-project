import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Auth } from './entities/auth.entity';

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
}
