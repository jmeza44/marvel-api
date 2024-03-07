import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
