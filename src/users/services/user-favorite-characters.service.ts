import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { map } from 'rxjs';
import { UsersService } from 'src/auth/services/users.service';
import { CharacterService } from 'src/characters/services/character.service';
import { mapUserFavoriteCharacterDto } from 'src/shared/utilities/mapping/map-user-favorite-character-dto';
import { UserFavoriteCharacter } from '../entities/user-favorite-character.entity';
import { UserFavoriteCharacterDto } from '../models/user-favorite-character.model';

@Injectable()
export class UserFavoriteCharactersService {
  constructor(
    private usersService: UsersService,
    private charactersService: CharacterService,
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
      this.validateCharacterExists(
        userFavoriteCharactersDto.map((c) => c.characterId),
      );

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

  private validateCharacterExists(charactersIds: number[]) {
    return charactersIds.map((characterId) => {
      this.charactersService
        .getCharacterById(characterId)
        .pipe(map(({ id }) => id === characterId))
        .subscribe((characterExists) => {
          if (!characterExists) {
            throw new BadRequestException(
              characterId,
              `Character with id ${characterId} not found.`,
            );
          }
        });
    });
  }
}
