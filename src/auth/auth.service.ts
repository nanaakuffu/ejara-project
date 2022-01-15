import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import DBService from 'src/db/db.service';

@Injectable()
export class AuthService {
  /**
   *
   */
  constructor(private dbService: DBService, private jwtService: JwtService) {}

  async login(email: string, pass: string): Promise<any> {
    const user = await this.dbService.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException('Email does not seem to be in our records');
    }

    const validPassword = user.password === pass;

    if (!validPassword) {
      throw new UnauthorizedException();
    }

    const { password, ...restOfData } = user;

    return {
      user: restOfData,
      token: this.jwtService.sign({ userId: user.id }),
    };
  }

  async validateUser(user_id: number): Promise<any> {
    return this.dbService.user.findUnique({ where: { id: user_id } });
  }
}
