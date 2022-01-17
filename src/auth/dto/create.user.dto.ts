import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

// Class to handle the type of data needed to create a User with the microservice
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
