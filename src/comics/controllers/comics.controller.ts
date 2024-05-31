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
import { Comic } from 'src/shared/models/marvel-api/core/marvel-api-comic.model';
import { ComicsService } from '../services/comics.service';

@ApiTags('Comics')
@Controller('comics')
export class ComicsController {
  constructor(
    private comicsServices: ComicsService,
    private userValidationService: UserValidationService,
    private resourcesRatingService: ResourcesRatingService,
  ) {}

  @Get(':comicId')
  getComicById(@Param('comicId') comicId: number): Observable<Comic> {
    return this.comicsServices.getComicById(comicId);
  }

  @Get(':comicId/rating')
  getComicRating(
    @Param('comicId') comicId: string,
  ): Promise<GetResourceRatingDto> {
    return this.resourcesRatingService.get(comicId, 'comic');
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('rate')
  async reateComic(
    @Request() request: any,
    @Body() comicRating: CreateResourceRatingDto,
  ) {
    const user = await this.userValidationService.validateUser(request);
    return this.resourcesRatingService.create(comicRating, 'comic', user);
  }
}
