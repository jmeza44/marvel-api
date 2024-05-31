import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, map } from 'rxjs';
import { Wrapper } from 'src/shared/models/marvel-api/common/marvel-api-wrapper.model';
import { Comic } from 'src/shared/models/marvel-api/core/marvel-api-comic.model';

@Injectable()
export class ComicsService {
  private readonly baseApiUrl: string = this.configService.get<string>(
    'MARVEL_API_BASE_URL',
  );

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  getCharacterComics(characterId: number): Observable<Wrapper<Comic>> {
    return this.httpService
      .get<
        Wrapper<Comic>
      >(`${this.baseApiUrl}/characters/${characterId}/comics`)
      .pipe(map(({ data }) => data));
  }

  getComicById(comicId: number): Observable<Comic | undefined> {
    return this.httpService
      .get<Wrapper<Comic>>(`${this.baseApiUrl}/comics/${comicId}`)
      .pipe(map(({ data }) => data.data.results[0]));
  }
}
