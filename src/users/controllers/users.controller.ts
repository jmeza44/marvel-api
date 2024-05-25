import {
  Controller,
  Get,
  UseGuards,
  Request,
  UnauthorizedException,
  BadRequestException,
  Post,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthService } from 'src/auth/services/auth.service';
import { UserFavoriteCharacterDto } from '../models/user-favorite-character.model';
import { UserFavoriteCharactersService } from '../services/user-favorite-characters.service';
import { UsersService } from 'src/auth/services/users.service';

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
    const token = this.TryGetRequestToken(request);
    const user = await this.ValidateUserExists(token);
    return await this.userFavoriteCharactersService.getUserFavoriteCharacters(
      user.username,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('favoriteCharacters')
  async addToFavoriteCharacters(
    @Request() request: any,
    @Body() characterIds: number[],
  ): Promise<boolean> {
    const token = this.TryGetRequestToken(request);
    const { username } = await this.ValidateUserExists(token);
    const userFavoriteCharacter: UserFavoriteCharacterDto[] =
      this.tryMapUserFavoriteCharacters(characterIds, username);
    return this.userFavoriteCharactersService.addUserFavoriteCharacter(
      userFavoriteCharacter,
    );
  }

  private TryGetRequestToken(request: any): string {
    const authorizationHeader = request.headers['authorization'] as string;
    if (!authorizationHeader) {
      throw new UnauthorizedException('Missing authorization header.');
    }
    const token = authorizationHeader.split(' ')[1];
    return token;
  }

  private async ValidateUserExists(token: string) {
    const authenticatedUser = await this.authService.getProfile(token);
    const user = await this.usersService.findOne(authenticatedUser.username);

    if (user === null)
      throw new UnauthorizedException('This user no longer exists.');
    return user;
  }

  private tryMapUserFavoriteCharacters(
    characterIds: number[],
    username: string,
  ): UserFavoriteCharacterDto[] {
    if (characterIds.length === 0)
      throw new BadRequestException(
        characterIds,
        'Add at least one Character ID.',
      );
    return characterIds.map((characterId) => ({ username, characterId }));
  }
}
