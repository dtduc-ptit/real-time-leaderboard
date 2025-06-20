import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './modules/config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { CacheModule } from '@nestjs/cache-manager';
import { ScoreModule } from './modules/scores/scores.module';
import * as dotenv from 'dotenv';
import { GameModule } from './modules/game/game.module';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        return {
          stores: [
            createKeyv(process.env.REDIS_URL),
          ],
        };
      },
    }),
    AuthModule,
    ScoreModule,
    GameModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
