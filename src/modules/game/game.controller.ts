import { Controller, Post, Get, Patch, Body, Param, UseGuards, Query, Delete } from "@nestjs/common";
import { GameService } from "./game.service";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.sto";
import { JWTAuthGuard } from "../auth/guards/auth.guard";

@Controller('game')
@UseGuards(JWTAuthGuard)
export class GameController{
    constructor ( 
        private readonly gameService: GameService
    ){}

    @Post()
    async create(@Body() createGameDto: CreateGameDto){
        return await this.gameService.create(createGameDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: String) {
        return await this.gameService.findOne(+id);
    }

    @Get()
    async findGame(
        @Query('name') name?: string,
        @Query('limit') limit = 10,
        @Query('page') page = 1,
    ) {
        return await this.gameService.findGame(limit, page, name);
    }

    @Patch('id')
    async update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto){
        return await this.gameService.updateGame(+id, updateGameDto);
    }

    @Delete('id')
    async remove(@Param('id') id: string){
        return await this.gameService.removeGame(+id);
    }

}