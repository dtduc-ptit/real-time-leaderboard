import { Module } from "@nestjs/common";
import { LeaderboardController } from "./leaderboard.controller";
import { LeaderboardService } from "./leaderboard.service";
import { RedisModule } from "../redis/redis.module";

@Module({
    imports: [
        RedisModule,
    ],
    controllers: [LeaderboardController],
    providers: [LeaderboardService],
})

export class LeaderboardModule{};