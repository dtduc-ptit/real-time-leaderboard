import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ScoresService } from "./scores.service";
import { JWTAuthGuard } from "../auth/guards/auth.guard";

@UseGuards(JWTAuthGuard)
@Controller('scores')
export class ScoresController{
    constructor(private readonly scoresService: ScoresService) {}

    @Post()
    async submit(@Req() req, @Body() dto: {gameId: number, score: number}) {
        await this.scoresService.submitScore(req.user.sub, dto.gameId, dto.score);
        return { ok: true };
    }

    @Get('rank/top')
    async getTop(@Query('gameId') gameId: number, @Query('top') top = 5) {
        return this.scoresService.getTopGame(gameId, top);
    }

    @Get('rank/me')
    async myRank(@Req() req, @Query('gameId') gameId: number){
        return this.scoresService.getUserRank(req.user.sub, gameId);
    }

    @Get('keys')
    async getKeys() {
        return this.scoresService.getAllKeys();
    }

    @Get('report')
    async getTopReport(
        @Query('gameId') gameId: number,
        @Query('from') from: string,
        @Query('to') to: string,
        @Query('top') top: number
    ) {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        return this.scoresService.getTopPlayersReport(gameId, fromDate, toDate, top);
    }

}