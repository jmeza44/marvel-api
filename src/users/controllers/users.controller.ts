import {
  Controller,
  UseGuards,
  Get,
  Post,
  Delete,
  Request,
  UnauthorizedException,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthService } from 'src/auth/services/auth.service';
import { UsersService } from 'src/auth/services/users.service';
import { UserFavoriteCharacterDto } from '../models/user-favorite-character.model';
import { UserFavoriteCharactersService } from '../services/user-favorite-characters.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private userFavoriteCharactersService: UserFavoriteCharactersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('favoriteCharacters')
  async getUserFavoriteCharacters(@Request() request: any): Promise<number[]> {
    const user = await this.validateUser(request);
    return this.userFavoriteCharactersService.getUserFavoriteCharacters(
      user.username,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('favoriteCharacters/:characterId')
  async addToFavoriteCharacters(
    @Request() request: any,
    @Param('characterId') characterId: number,
  ): Promise<void> {
    const user = await this.validateUser(request);
    const userFavoriteCharacter: UserFavoriteCharacterDto = {
      characterId,
      username: user.username,
    };
    return this.userFavoriteCharactersService.addUserFavoriteCharacter(
      userFavoriteCharacter,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('favoriteCharacters/:characterId')
  async removeFromFavoriteCharacters(
    @Request() request: any,
    @Param('characterId') characterId: number,
  ): Promise<void> {
    const user = await this.validateUser(request);
    const userFavoriteCharacter: UserFavoriteCharacterDto = {
      characterId,
      username: user.username,
    };
    return this.userFavoriteCharactersService.removeUserFavoriteCharacter(
      userFavoriteCharacter,
    );
  }

  private async validateUser(request: any) {
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

  private tryGetRequestToken(request: any): string {
    const authorizationHeader = request.headers['authorization'] as string;
    if (!authorizationHeader) {
      throw new UnauthorizedException('Missing authorization header.');
    }
    const token = authorizationHeader.split(' ')[1];
    return token;
  }
}
