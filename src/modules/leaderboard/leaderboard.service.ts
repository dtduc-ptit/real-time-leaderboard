import { Injectable, NotFoundException } from "@nestjs/common";
import { RedisService } from "../redis/redis.service";

@Injectable()
export class LeaderboardService{
  constructor(
    private readonly redisService: RedisService,
  ) {}
    
    async getAllKeys() {
      const key = 'leaderboard:game:*';
    
      const data = await this.redisService.getAllKeys(key);
      if(!data || data.length === 0) {
        throw new NotFoundException(`No leaderboard found`);
      }

      return data;
    }

    async getHighestScores() {
	  const data = await this.redisService.getAllLeaderboardHighest();

      if(!data || data.length === 0) {
        throw new NotFoundException(`No leaderboard found`);
      }

      return data;
	}
}