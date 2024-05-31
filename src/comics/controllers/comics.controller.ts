import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ComicsService } from '../services/comics.service';
import { Observable } from 'rxjs';
import { Comic } from 'src/shared/models/marvel-api/core/marvel-api-comic.model';

@ApiTags('Comics')
@Controller('comics')
export class ComicsController {
  constructor(private comicsServices: ComicsService) {}

  @Get(':comicId')
  getComicById(@Param('comicId') comicId: number): Observable<Comic> {
    return this.comicsServices.getComicById(comicId);
  }
}
