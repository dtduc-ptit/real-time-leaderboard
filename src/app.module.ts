import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './modules/config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { ScoreModule } from './modules/scores/scores.module';
import * as dotenv from 'dotenv';
import { GameModule } from './modules/game/game.module';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ScoreModule,
    GameModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
