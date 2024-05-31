import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { ComicsController } from './controllers/comics.controller';
import { ComicsService } from './services/comics.service';

@Module({
  imports: [SharedModule],
  controllers: [ComicsController],
  providers: [ComicsService],
  exports: [ComicsService],
})
export class ComicsModule {}
