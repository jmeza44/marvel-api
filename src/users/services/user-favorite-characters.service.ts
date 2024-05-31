import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';

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
    const user = await this.usersService.findOneByUserName(username);
    if (!user) {
      throw new BadRequestException(
        `User with user name ${username} not found.`,
      );
    }
    const favoriteCharacters = await this.userFavoriteCharactersRepository.find(
      { where: { username } },
    );
    return favoriteCharacters.map(({ characterId }) => characterId);
  }

  async addUserFavoriteCharacter(
    userFavoriteCharacterDto: UserFavoriteCharacterDto,
  ): Promise<void> {
    const { characterId, username } = userFavoriteCharacterDto;
    const characterExists = await this.validateCharacterExists(characterId);
    if (!characterExists) {
      throw new BadRequestException(
        `Character with Id ${characterId} not found.`,
      );
    }

    const user = await this.usersService.findOneByUserName(username);
    if (!user) {
      throw new BadRequestException(
        `User with user name ${username} not found.`,
      );
    }

    const favoriteCharacters = await this.getUserFavoriteCharacters(username);
    const isAlreadyCreated = favoriteCharacters.includes(characterId);
    if (!isAlreadyCreated) {
      await this.userFavoriteCharactersRepository.insert(
        mapUserFavoriteCharacterDto(userFavoriteCharacterDto),
      );
    }
  }

  async removeUserFavoriteCharacter(
    userFavoriteCharacterDto: UserFavoriteCharacterDto,
  ): Promise<void> {
    const { characterId, username } = userFavoriteCharacterDto;
    const user = await this.usersService.findOneByUserName(username);
    if (!user) {
      throw new BadRequestException(
        `User with user name ${username} not found.`,
      );
    }

    const characterToRemove =
      await this.userFavoriteCharactersRepository.findOne({
        where: { characterId, username },
      });
    if (characterToRemove) {
      await this.userFavoriteCharactersRepository.remove(characterToRemove);
    }
  }

  private async validateCharacterExists(characterId: number): Promise<boolean> {
    try {
      const character = await lastValueFrom(
        this.charactersService.getCharacterById(characterId),
      );
      return character !== undefined;
    } catch (error) {
      return false;
    }
  }
}
