import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { CharactersModule } from './characters/characters.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SharedModule,
    UserModule,
    CharactersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
