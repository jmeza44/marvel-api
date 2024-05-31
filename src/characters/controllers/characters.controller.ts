import {
  Controller,
  Get,
  Query,
  Param,
  UseGuards,
  Post,
  Request,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserValidationService } from 'src/auth/services/user-validation.service';
import { ComicsService } from 'src/comics/services/comics.service';
import { CreateResourceRatingDto } from 'src/resource-rating/models/create-resource-rating.model';
import { ResourcesRatingService } from 'src/resource-rating/services/resources-rating.service';
import { SeriesService } from 'src/series/services/series.service';
import { SearchOptions } from 'src/shared/models/marvel-api/common/marvel-api-search-options.model';
import { Wrapper } from 'src/shared/models/marvel-api/common/marvel-api-wrapper.model';
import { Character } from 'src/shared/models/marvel-api/core/marvel-api-character.model';
import { Comic } from 'src/shared/models/marvel-api/core/marvel-api-comic.model';
import { CharacterService } from '../services/character.service';
import { GetResourceRatingDto } from 'src/resource-rating/models/get-resource-rating.model';

@ApiTags('Characters')
@Controller('characters')
export class CharactersController {
  constructor(
    private comicsService: ComicsService,
    private seriesService: SeriesService,
    private characterService: CharacterService,
    private userValidationService: UserValidationService,
    private resourcesRatingService: ResourcesRatingService,
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

  @Get(':characterId/rating')
  getCharacterRating(
    @Param('characterId') characterId: string,
  ): Promise<GetResourceRatingDto> {
    return this.resourcesRatingService.get(characterId, 'character');
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('rate')
  async rateCharacter(
    @Request() request: any,
    @Body() characterRating: CreateResourceRatingDto,
  ) {
    const user = await this.userValidationService.validateUser(request);
    return this.resourcesRatingService.create(
      characterRating,
      'character',
      user,
    );
  }
}
