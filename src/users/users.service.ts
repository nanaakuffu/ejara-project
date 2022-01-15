import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import DBService from 'src/db/db.service';

@Injectable()
export class UsersService {
  /**
   *
   */
  constructor(private dbService: DBService) {}

  async findUser(email: string): Promise<User> {
    return this.dbService.user.findUnique({
      where: { email: email },
    });
  }
}
