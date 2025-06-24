import { Injectable } from "@nestjs/common";
import Redis from 'ioredis';
import * as dotenv from "dotenv";

dotenv.config();

@Injectable()
export class RedisService {

    private readonly client: Redis;
    constructor() {
    this.client = new Redis({
        host: process.env.REDIS_HOST, 
        port: 6379,
    });
    }

    async addScore(key: string, score: number, userId: number) {
        return this.client.zadd(key, score, userId.toString());
    }

    async getTop(key: string, count: number) {
        return await this.client.zrevrange(key, 0, count - 1, 'WITHSCORES');
    }

    async getRank(key: string, userId: number) {
        const rank = await this.client.zrevrank(key, userId.toString());
        const score = await this.client.zscore(key, userId.toString());

        return {
        rank: rank !== null ? rank + 1 : null,
        score: score !== null ? Number(score) : null,
        };
    }

    async getAllKeys(key: string) {
        return this.client.keys(key);
    }

    async getAllLeaderboardHighest() {
        const key = 'leaderboard:game:*';

        const keys = await this.getAllKeys(key);

        const leaderboard: { gameId: string; user: string; score: string }[] = [];
        
        for( const i of keys) {
            const [gameId] = i.split(':').slice(-1);
            const [user, score] = await this.getTop(i, 1);
            leaderboard.push({ gameId, user, score });
        }
        return leaderboard;
    }
}