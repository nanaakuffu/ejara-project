import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import DBService from '../db/db.service';
import { UserEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  /**
   * Inject db service
   */
  constructor(private dbService: DBService) {}

  async getAllUsers(): Promise<UserEntity[]> {
    // Select according to the UserEntity shape
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

  // Find user by email
  async findUser(email: string): Promise<User> {
    return this.dbService.user.findUnique({
      where: { email: email },
    });
  }
}
