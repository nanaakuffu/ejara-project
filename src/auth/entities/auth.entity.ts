import { ApiProperty } from '@nestjs/swagger';

// Class used to represent the structure of data returned when login is successful
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
