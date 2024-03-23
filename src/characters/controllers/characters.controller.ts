import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SearchOptions } from 'src/shared/models/marvel-api/common/marvel-api-search-options.model';
import { Wrapper } from 'src/shared/models/marvel-api/common/marvel-api-wrapper.model';
import { Character } from 'src/shared/models/marvel-api/core/marvel-api-character.model';
import { CharacterService } from '../services/character.service';

@Controller('characters')
export class CharactersController {
  constructor(private characterService: CharacterService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getCharacters(
    @Query() searchOptions: SearchOptions,
  ): Observable<Wrapper<Character>> {
    return this.characterService.getCharacters(searchOptions);
  }
}
