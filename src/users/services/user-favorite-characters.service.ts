import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFavoriteCharacter } from '../entities/user-favorite-character.entity';
import { UserFavoriteCharacterDto } from '../models/user-favorite-character.model';
import { mapUserFavoriteCharacterDto } from '../../shared/utilities/mapping/map-user-favorite-character-dto';
import { UsersService } from 'src/auth/services/users.service';

@Injectable()
export class UserFavoriteCharactersService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(UserFavoriteCharacter)
    private readonly userFavoriteCharactersRepository: Repository<UserFavoriteCharacter>,
  ) {}

  async getUserFavoriteCharacters(username: string): Promise<number[]> {
    return (
      await this.userFavoriteCharactersRepository.findBy({ username })
    ).map(({ characterId }) => characterId);
  }

  async addUserFavoriteCharacter(
    userFavoriteCharactersDto: UserFavoriteCharacterDto[],
  ): Promise<boolean> {
    try {
      const username = userFavoriteCharactersDto[0]?.username;
      const user = await this.usersService.findOneByUserName(username);
      if (user === null)
        throw new BadRequestException(
          username,
          `User with user name ${username} not found.`,
        );
      const currentFavoriteCharacters =
        await this.getUserFavoriteCharacters(username);
      const userFavoriteCharacters = userFavoriteCharactersDto
        .map((userFavoriteCharacter) =>
          mapUserFavoriteCharacterDto(userFavoriteCharacter),
        )
        .filter(
          (favoriteCharacterToAdd) =>
            !currentFavoriteCharacters.includes(
              favoriteCharacterToAdd.characterId,
            ),
        );
      await this.userFavoriteCharactersRepository.insert(
        userFavoriteCharacters,
      );
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        "Error inserting users' favorites characters.",
      );
    }
  }
}
