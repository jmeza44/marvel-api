import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { UsersModule } from './users/users.module';
import { CharactersModule } from './characters/characters.module';
import { UserFavoriteCharacter } from './users/entities/user-favorite-character.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.APP_DATABASE_HOST,
      port: parseInt(process.env.APP_DATABASE_PORT),
      username: process.env.APP_DATABASE_USER_NAME,
      password: process.env.APP_DATABASE_PASSWORD,
      database: process.env.APP_DATABASE_NAME,
      ssl: Boolean(process.env.APP_DATABASE_SSL),
      entities: [User, UserFavoriteCharacter],
      synchronize: true,
      logging: 'all',
      logger: 'debug',
      verboseRetryLog: true,
    }),
    AuthModule,
    UsersModule,
    CharactersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
