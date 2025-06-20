import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from './entitis/game.entity';
import { Repository } from "typeorm";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.sto";

@Injectable()
export class GameService{
    constructor(
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>
    ){}

    async create(createGameDto: CreateGameDto) {
        try {
            const game = this.gameRepository.create(createGameDto);
            return await this.gameRepository.save(game);
        } catch (error) {
            throw new BadRequestException('Create game failed: ' + error.message);
        }
    }

    async findOne(id: number) {
        const game = await this.gameRepository.findOneBy({ id });
        if (!game) {
            throw new NotFoundException(`Game with id ${id} not found`);
        }
        return game;
    }

    async findGame(limit: number, page: number, name?: string) {
        const skip = limit * (page - 1);

        const query = this.gameRepository.createQueryBuilder('games')
            .take(limit)
            .skip(skip);

        if (name) {
            query.andWhere('games.name LIKE :name', { name: `%${name}%` });
        }

        const games = await query.getMany();
        if (!games || games.length === 0) {
            throw new NotFoundException(`No games found`);
        }

        return games;
    }

    async updateGame(id: number, updateGameDto: UpdateGameDto) {
        const game = await this.gameRepository.findOneBy({ id });
        if (!game) {
            throw new NotFoundException(`Game with id ${id} not found`);
        }

        this.gameRepository.merge(game, updateGameDto);
        return await this.gameRepository.save(game);
    }

    async removeGame(id: number) {
        const game = await this.gameRepository.findOneBy({ id });
        if (!game) {
            throw new NotFoundException(`Game with id ${id} not found`);
        }
        await this.gameRepository.remove(game);
        
        return { message: `Game with ID ${id} remove successfully` };
    }
}