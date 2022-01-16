import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import DBService from 'src/db/db.service';
import { CreateUserDto } from './dto/users.dto';
import { UserEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  /**
   *
   */
  constructor(private dbService: DBService) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return this.dbService.user.findMany({
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

  async findUser(email: string): Promise<User> {
    return this.dbService.user.findUnique({
      where: { email: email },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.dbService.user.create({ data: createUserDto });
  }
}
