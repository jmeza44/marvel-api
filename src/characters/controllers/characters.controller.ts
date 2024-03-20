import { Controller, Get, Query } from '@nestjs/common';
import { CharacterService } from '../services/character.service';

import { Observable } from 'rxjs';

import { Wrapper } from 'src/shared/models/marvel-api/common/marvel-api-wrapper.model';
import { Character } from 'src/shared/models/marvel-api/core/marvel-api-character.model';
import { SearchOptions } from 'src/shared/models/marvel-api/common/marvel-api-search-options.model';

@Controller('characters')
export class CharactersController {
  constructor(private characterService: CharacterService) {}

  @Get()
  getCharacters(
    @Query() searchOptions: SearchOptions,
  ): Observable<Wrapper<Character>> {
    return this.characterService.getCharacters(searchOptions);
  }
}
