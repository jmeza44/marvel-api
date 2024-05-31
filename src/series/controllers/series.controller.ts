import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serie } from 'src/shared/models/marvel-api/core/marvel-api-serie.model';
import { SeriesService } from '../services/series.service';
import { Observable } from 'rxjs';

@ApiTags('Series')
@Controller('series')
export class SeriesController {
  constructor(private seriesService: SeriesService) {}

  @Get(':serieId')
  getSerieById(@Param('serieId') serieId: number): Observable<Serie> {
    return this.seriesService.getSerieById(serieId);
  }
}
