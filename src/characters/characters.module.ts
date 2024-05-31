import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ComicsModule } from 'src/comics/comics.module';
import { ResourceRatingModule } from 'src/resource-rating/resource-rating.module';
import { SeriesModule } from 'src/series/series.module';
import { SharedModule } from 'src/shared/shared.module';
import { CharactersController } from './controllers/characters.controller';
import { CharacterService } from './services/character.service';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    ComicsModule,
    SeriesModule,
    ResourceRatingModule,
  ],
  controllers: [CharactersController],
  providers: [CharacterService],
  exports: [CharacterService],
})
export class CharactersModule {}
