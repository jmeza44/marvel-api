import { Module } from '@nestjs/common';
import { CharactersController } from './controllers/characters.controller';
import { CharacterService } from './services/character.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [CharactersController],
  providers: [CharacterService],
})
export class CharactersModule {}
