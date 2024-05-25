import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './controllers/users.controller';
import { UserFavoriteCharacter } from './entities/user-favorite-character.entity';
import { UserFavoriteCharactersService } from './services/user-favorite-characters.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserFavoriteCharacter])],
  controllers: [UsersController],
  providers: [UserFavoriteCharactersService],
  exports: [UserFavoriteCharactersService],
})
export class UsersModule {}
