import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ComicsService } from 'src/comics/services/comics.service';
import { SeriesService } from 'src/series/services/series.service';
import { SearchOptions } from 'src/shared/models/marvel-api/common/marvel-api-search-options.model';
import { Wrapper } from 'src/shared/models/marvel-api/common/marvel-api-wrapper.model';
import { Character } from 'src/shared/models/marvel-api/core/marvel-api-character.model';
import { Comic } from 'src/shared/models/marvel-api/core/marvel-api-comic.model';
import { CharacterService } from '../services/character.service';

@ApiTags('Characters')
@Controller('characters')
export class CharactersController {
  constructor(
    private comicsService: ComicsService,
    private seriesService: SeriesService,
    private characterService: CharacterService,
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

  @Get(':characterId/series')
  getCharacterSeries(
    @Param('characterId') characterId: number,
  ): Observable<Wrapper<Comic>> {
    return this.seriesService.getCharacterSeries(characterId);
  }
}
