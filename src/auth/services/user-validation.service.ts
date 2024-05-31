import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

@Injectable()
export class UserValidationService {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  async validateUser(request: any) {
    const token = this.tryGetRequestToken(request);
    const authenticatedUser = await this.authService.getProfile(token);
    const user = await this.usersService.findOneByUserName(
      authenticatedUser.username,
    );
    if (!user) {
      throw new UnauthorizedException('This user no longer exists.');
    }
    return user;
  }

  tryGetRequestToken(request: any): string {
    const authorizationHeader = request.headers['authorization'] as string;
    if (!authorizationHeader) {
      throw new UnauthorizedException('Missing authorization header.');
    }
    const token = authorizationHeader.split(' ')[1];
    return token;
  }
}
