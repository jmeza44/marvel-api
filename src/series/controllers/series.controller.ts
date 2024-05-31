import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserValidationService } from 'src/auth/services/user-validation.service';
import { CreateResourceRatingDto } from 'src/resource-rating/models/create-resource-rating.model';
import { GetResourceRatingDto } from 'src/resource-rating/models/get-resource-rating.model';
import { ResourcesRatingService } from 'src/resource-rating/services/resources-rating.service';
import { Serie } from 'src/shared/models/marvel-api/core/marvel-api-serie.model';
import { SeriesService } from '../services/series.service';

@ApiTags('Series')
@Controller('series')
export class SeriesController {
  constructor(
    private seriesService: SeriesService,
    private userValidationService: UserValidationService,
    private resourcesRatingService: ResourcesRatingService,
  ) {}

  @Get(':serieId')
  getSerieById(@Param('serieId') serieId: number): Observable<Serie> {
    return this.seriesService.getSerieById(serieId);
  }

  @Get(':serieId/rating')
  getComicRating(
    @Param('serieId') serieId: string,
  ): Promise<GetResourceRatingDto> {
    return this.resourcesRatingService.get(serieId, 'series');
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('rate')
  async rateSeries(
    @Request() request: any,
    @Body() seriesRating: CreateResourceRatingDto,
  ) {
    const user = await this.userValidationService.validateUser(request);
    return this.resourcesRatingService.create(seriesRating, 'series', user);
  }
}
