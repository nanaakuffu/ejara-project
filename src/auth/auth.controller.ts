import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export default class AuthController {
  /**
   *
   */
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() { email, password }: AuthDto) {
    return this.authService.login(email, password);
  }
}
