import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';
import { SeriesController } from './controllers/series.controller';
import { SeriesService } from './services/series.service';
import { ResourceRatingModule } from 'src/resource-rating/resource-rating.module';

@Module({
  imports: [SharedModule, AuthModule, ResourceRatingModule],
  providers: [SeriesService],
  controllers: [SeriesController],
  exports: [SeriesService],
})
export class SeriesModule {}
