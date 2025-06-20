import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Score } from "./entitis/scores.entity"; 
import { RedisService } from "../redis/redis.service";

@Injectable()
export class ScoresService{
  constructor(
    private readonly redisService: RedisService,
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>
  ) {}
    
    async submitScore(userId: number, gameId: number, score: number) {
      const key = `leaderboard:game:${gameId}`;

      await this.redisService.addScore(key, score, userId);

      await this.scoreRepository.save({
        user: { id: userId },
        game: { id: gameId },
        score,
      });

      return { message: "submit sucessfully" };
    }

    async getTopGame(gameId: number, top: number){
      const key = `leaderboard:game:${gameId}`;
      return await this.redisService.getTop(key, top);
    }

    async getUserRank( userId: number, gameId: number) {
      const key = `leaderboard:game:${gameId}`;
      return await this.redisService.getRank(key, userId);
    }

    async getAllKeys() {
      const key = 'leaderboard:game:*';
      return await this.redisService.getAllKeys(key);
    }

    async getTopPlayersReport(
      gameId: number,
      from: Date,
      to: Date,
      top: number
    ) {
      return this.scoreRepository
        .createQueryBuilder('scores')
        .select([
          'scores.userId AS userId',
          'user.name AS userName',
          'game.name AS gameName',
          'SUM(scores.score) AS totalScore',
          'ROUND(AVG(scores.score), 2) AS averageScore',
          'COUNT(scores.id) AS totalGames'
        ])
        .innerJoin('scores.user', 'user')
        .innerJoin('scores.game', 'game')
        .where('scores.gameId = :gameId', {gameId})
        .andWhere('score.createdAt BETWEEN :from AND :to', { from, to })
        .groupBy('score.userId, user.username, game.name')
        .orderBy('totalScore', 'DESC')
        .limit(top)
        .getRawMany();
    }
}