import { UserFavoriteCharacter } from '../../../users/entities/user-favorite-character.entity';
import { UserFavoriteCharacterDto } from '../../../users/models/user-favorite-character.model';

export const mapUserFavoriteCharacterDto = (
  userFavoriteCharacterDto: UserFavoriteCharacterDto,
): UserFavoriteCharacter => {
  const userFavoriteCharacter = new UserFavoriteCharacter();
  userFavoriteCharacter.username = userFavoriteCharacterDto.username;
  userFavoriteCharacter.characterId = userFavoriteCharacterDto.characterId;
  userFavoriteCharacter.createdBy = userFavoriteCharacterDto.username;
  userFavoriteCharacter.createdAt = new Date(Date.now());
  return userFavoriteCharacter;
};
