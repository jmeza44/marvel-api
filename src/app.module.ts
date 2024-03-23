import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { CharactersModule } from './characters/characters.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SharedModule,
    UsersModule,
    CharactersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
