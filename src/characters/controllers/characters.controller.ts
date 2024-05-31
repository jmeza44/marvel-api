import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { SearchOptions } from 'src/shared/models/marvel-api/common/marvel-api-search-options.model';
import { Wrapper } from 'src/shared/models/marvel-api/common/marvel-api-wrapper.model';
import { Character } from 'src/shared/models/marvel-api/core/marvel-api-character.model';
import { CharacterService } from '../services/character.service';
import { ComicsService } from 'src/comics/services/comics.service';
import { Comic } from 'src/shared/models/marvel-api/core/marvel-api-comic.model';

@ApiTags('Characters')
@Controller('characters')
export class CharactersController {
  constructor(
    private characterService: CharacterService,
    private comicsService: ComicsService,
  ) {}

  @Get()
  getCharacters(
    @Query() searchOptions: SearchOptions,
  ): Observable<Wrapper<Character>> {
    return this.characterService.getCharacters(searchOptions);
  }

  @Get(':characterId')
  getCharacterById(
    @Param('characterId') characterId: number,
  ): Observable<Character | undefined> {
    return this.characterService.getCharacterById(characterId);
  }

  @Get(':characterId/comics')
  getCharacterComics(
    @Param('characterId') characterId: number,
  ): Observable<Wrapper<Comic>> {
    return this.comicsService.getCharacterComics(characterId);
  }
}
