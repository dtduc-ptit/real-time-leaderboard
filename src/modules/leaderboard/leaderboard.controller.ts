import { Controller, Get, UseGuards, BadRequestException } from "@nestjs/common";
import { JWTAuthGuard } from "../auth/guards/auth.guard";
import { LeaderboardService } from "../leaderboard/leaderboard.service";

@UseGuards(JWTAuthGuard)
@Controller('leaderboard')
export class LeaderboardController{
    constructor(private readonly leaderboardService: LeaderboardService) {}

    @Get('game')
    async getKeys() {
        return await this.leaderboardService.getAllKeys();
    }

    @Get()
    async getHighestScores() {
		return await this.leaderboardService.getHighestScores();
	}
}