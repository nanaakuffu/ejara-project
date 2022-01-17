import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import DBService from '../db/db.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UserEntity } from '../users/entities/users.entity';

@Injectable()
export class AuthService {
  /**
   *
   */
  constructor(private dbService: DBService, private jwtService: JwtService) {}

  async login(loginData: AuthDto): Promise<{
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
    token: string;
  }> {
    const user = await this.dbService.user.findUnique({
      where: { email: loginData.email },
    });

    if (!user) {
      throw new NotFoundException('Email does not seem to be in our records');
    }

    const validPassword = await bcrypt.compare(
      loginData.password,
      user.password,
    );

    if (!validPassword) {
      throw new UnauthorizedException();
    }

    const { password, created_at, updated_at, ...restOfData } = user;

    return {
      user: restOfData,
      token: this.jwtService.sign({ user_id: user.id, email: user.email }),
    };
  }

  async validateUser(payload: {
    user_id: number;
    user_email: string;
  }): Promise<any> {
    return this.dbService.user.findUnique({
      where: { id: payload.user_id, email: payload.user_email },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.dbService.user.create({ data: createUserDto });
  }
}
