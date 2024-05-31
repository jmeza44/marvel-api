import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ResourceRatingModule } from 'src/resource-rating/resource-rating.module';
import { SharedModule } from 'src/shared/shared.module';
import { ComicsController } from './controllers/comics.controller';
import { ComicsService } from './services/comics.service';

@Module({
  imports: [SharedModule, AuthModule, ResourceRatingModule],
  controllers: [ComicsController],
  providers: [ComicsService],
  exports: [ComicsService],
})
export class ComicsModule {}
