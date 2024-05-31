import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, map } from 'rxjs';
import { Wrapper } from 'src/shared/models/marvel-api/common/marvel-api-wrapper.model';
import { Serie } from 'src/shared/models/marvel-api/core/marvel-api-serie.model';

@Injectable()
export class SeriesService {
  private readonly baseApiUrl: string = this.configService.get<string>(
    'MARVEL_API_BASE_URL',
  );

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  getCharacterSeries(characterId: number): Observable<Wrapper<Serie>> {
    return this.httpService
      .get<
        Wrapper<Serie>
      >(`${this.baseApiUrl}/characters/${characterId}/series`)
      .pipe(map(({ data }) => data));
  }

  getSerieById(serieId: number): Observable<Serie | undefined> {
    return this.httpService
      .get<Wrapper<Serie>>(`${this.baseApiUrl}/series/${serieId}`)
      .pipe(map(({ data }) => data.data.results[0]));
  }
}
