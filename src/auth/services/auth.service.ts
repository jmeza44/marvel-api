import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserDto } from 'src/auth/models/user.model';
import { AuthResponse } from '../models/auth-response.model';
import { CreateUserDto } from '../models/create-user.model';
import { SignInUserDto } from '../models/sign-in-user.model';
import { UsersService } from 'src/auth/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInCredentials: SignInUserDto): Promise<AuthResponse> {
    const user = await this.validateUser(signInCredentials);
    const access_token = await this.jwtService.signAsync({ user });
    return {
      access_token,
    } as AuthResponse;
  }

  async signUp(createUserDto: CreateUserDto): Promise<boolean> {
    await this.TriggerExceptionIfUserExists(createUserDto);
    const createdUser = await this.usersService.create(createUserDto);
    return createdUser !== null;
  }

  async getProfile(token: string): Promise<UserDto> {
    try {
      const decodedToken = this.jwtService.verify(token);
      return decodedToken.user as UserDto; // Return the decoded user profile
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async validateUser(signInCredentials: SignInUserDto): Promise<UserDto> {
    let user = await this.usersService.findOneByUserName(
      signInCredentials.usernameOrEmail,
    );
    if (!user) {
      user = await this.usersService.findOneByEmail(
        signInCredentials.usernameOrEmail,
      );
      if (!user)
        throw new UnauthorizedException(
          'There is not any account with this credentials, please create a new account.',
        );
    }

    const passwordMatch = await compare(
      signInCredentials.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Incorrect password.');
    }

    const result: UserDto = {
      email: user.email,
      username: user.username,
      fistName: user.firstName,
      lastName: user.lastName,
    };
    return result;
  }

  private async TriggerExceptionIfUserExists(createUserDto: CreateUserDto) {
    const userByUserName = await this.usersService.findOneByUserName(
      createUserDto.username,
    );
    const userByEmail = await this.usersService.findOneByEmail(
      createUserDto.email,
    );
    if (userByUserName !== null)
      throw new BadRequestException(`that username has been taken.`);
    if (userByEmail !== null)
      throw new BadRequestException(
        `We already have registered an account with that email.`,
      );
  }
}
