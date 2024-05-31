import { Module } from '@nestjs/common';
import { ComicsModule } from 'src/comics/comics.module';
import { SeriesModule } from 'src/series/series.module';
import { SharedModule } from 'src/shared/shared.module';
import { CharactersController } from './controllers/characters.controller';
import { CharacterService } from './services/character.service';

@Module({
  imports: [SharedModule, ComicsModule, SeriesModule],
  controllers: [CharactersController],
  providers: [CharacterService],
  exports: [CharacterService],
})
export class CharactersModule {}
