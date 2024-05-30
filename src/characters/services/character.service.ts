import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Observable, map } from 'rxjs';
import { SearchOptions } from 'src/shared/models/marvel-api/common/marvel-api-search-options.model';

import { Wrapper } from 'src/shared/models/marvel-api/common/marvel-api-wrapper.model';
import { Character } from 'src/shared/models/marvel-api/core/marvel-api-character.model';
import { mapSearchParams } from 'src/shared/utilities/mapping/map-search-options-to-query-params';

@Injectable()
export class CharacterService {
  private readonly baseApiUrl: string = this.configService.get<string>(
    'MARVEL_API_BASE_URL',
  );

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  getCharacters(searchOptions: SearchOptions): Observable<Wrapper<Character>> {
    const params = mapSearchParams(searchOptions);
    return this.httpService
      .get<Wrapper<Character>>(`${this.baseApiUrl}/characters`, { params })
      .pipe(map(({ data }) => data));
  }
}
