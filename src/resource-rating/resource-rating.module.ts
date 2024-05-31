import { Module } from '@nestjs/common';
import { ResourcesRatingService } from './services/resources-rating.service';
import { ResourceRating } from './entities/resource-rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceRating])],
  providers: [ResourcesRatingService],
  exports: [ResourcesRatingService],
})
export class ResourceRatingModule {}
