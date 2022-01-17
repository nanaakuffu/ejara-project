import { ApiProperty } from '@nestjs/swagger';

/**
 * Class for the user entity holding the structure of the use date
 */
export class UserEntity {
  @ApiProperty()
  id: number;
  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
