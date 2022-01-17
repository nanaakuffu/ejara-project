import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UserEntity } from '../users/entities/users.entity';
import { Auth } from './entities/auth.entity';
import DBService from '../db/db.service';

@Injectable()
export class AuthService {
  /**
   * Injecting dbservice and jwt service into auth service through constructore
   */
  constructor(private dbService: DBService, private jwtService: JwtService) {}

  async login(loginData: AuthDto): Promise<Auth> {
    // Find the user by email
    const user = await this.dbService.user.findUnique({
      where: { email: loginData.email },
    });

    // Check the availability of the user by the email
    if (!user) {
      throw new NotFoundException('Email does not seem to be in our records');
    }

    // Check correctness of the password
    const validPassword = await bcrypt.compare(
      loginData.password,
      user.password,
    );

    // Throw and error if password in incorrect
    if (!validPassword) {
      throw new UnauthorizedException();
    }

    // Choose the the type of data to return without the password, created_at and updated_at
    const { password, created_at, updated_at, ...restOfData } = user;

    // Create token for the logged in user
    const token = this.jwtService.sign({ user_id: user.id, email: user.email });

    // Return user details and token
    return {
      user: restOfData,
      token,
    };
  }

  async validateUser(payload: {
    user_id: number;
    user_email: string;
  }): Promise<any> {
    // Find the unique user to validate
    // This is used in the jwt strategy file
    return this.dbService.user.findUnique({
      where: { id: payload.user_id, email: payload.user_email },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    // Create a user within the microservice and return a type of UserEntity
    return this.dbService.user.create({
      data: createUserDto,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
}
