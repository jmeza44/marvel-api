import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Username or email cannot be empty' })
  @IsString({ message: 'Username or email must be a string' })
  usernameOrEmail: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
