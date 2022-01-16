import { ApiProperty } from '@nestjs/swagger';

export class Auth {
  @ApiProperty()
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };

  @ApiProperty()
  token: string;
}
