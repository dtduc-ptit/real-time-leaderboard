import { Injectable, Inject, InternalServerErrorException, NotFoundException } from "@nestjs/common";
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

      try {
        await this.redisService.addScore(key, score, userId);

        await this.scoreRepository.save({
          user: { id: userId },
          game: { id: gameId },
          score,
        });

        return { message: "submit sucessfully" };
      } catch (error) {
        throw new InternalServerErrorException('Failed to submit score');
      }
    }

    async getTopGame(gameId: number, top: number){
      const key = `leaderboard:game:${gameId}`;
      try {
        const result = await this.redisService.getTop(key, top);
        if (!result || result.length === 0) {
          throw new NotFoundException('No scores found for this game');
        }
        return result;
      } catch (err) {
        throw new InternalServerErrorException('Failed to get leaderboard');
      }
    }

    async getUserRank( userId: number, gameId: number) {
      const key = `leaderboard:game:${gameId}`;
      try {
        const rank = await this.redisService.getRank(key, userId);
        if (rank == null) {
          throw new NotFoundException('User not found in leaderboard');
        }
        return { userId, rank };
      } catch (err) {
        throw new InternalServerErrorException('Failed to get user rank');
      }
    }

    async getTopPlayersReport(
      gameId: number,
      date: string,
      top: number
    ) {
      try {
        const result = this.scoreRepository
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
          .andWhere('DATE(scores.createdAt) = :date', { date })
          .groupBy('scores.userId, user.name, game.name')
          .orderBy('totalScore', 'DESC')
          .limit(top)
          .getRawMany();

        if (!result || (await result).length === 0) {
          throw new NotFoundException('No report data found for given date');
        }

        return result;
      } catch (err) {
        throw new InternalServerErrorException('Failed to generate report');
      }
    }
}