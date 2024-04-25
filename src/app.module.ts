import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { CharactersModule } from './characters/characters.module';

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
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    CharactersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
