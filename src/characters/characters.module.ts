import { Module } from '@nestjs/common';
import { CharactersController } from './controllers/characters.controller';
import { CharacterService } from './services/character.service';
import { SharedModule } from 'src/shared/shared.module';
import { ComicsModule } from 'src/comics/comics.module';

@Module({
  imports: [SharedModule, ComicsModule],
  controllers: [CharactersController],
  providers: [CharacterService],
  exports: [CharacterService],
})
export class CharactersModule {}
