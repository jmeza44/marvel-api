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
    const user = await this.usersService.findOne(createUserDto.username);
    if (user !== null)
      throw new BadRequestException(
        `User with username '${createUserDto.username}' already exists.`,
      );
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
    const user = await this.usersService.findOne(signInCredentials.username);
    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatch = await compare(
      signInCredentials.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    const result: UserDto = { id: user.id, username: user.username };
    return result;
  }
}
