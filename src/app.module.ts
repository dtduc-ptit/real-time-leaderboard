import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './modules/config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { ScoreModule } from './modules/scores/scores.module';
import * as dotenv from 'dotenv';
import { GameModule } from './modules/game/game.module';
import { LeaderboardModule } from './modules/leaderboard/leaderboard.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ScoreModule,
    GameModule,
    LeaderboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
