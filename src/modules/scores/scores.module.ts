import { Module } from "@nestjs/common";
import { ScoresController } from "./scores.controller";
import { ScoresService } from "./scores.service";
import { Score } from "./entitis/scores.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RedisModule } from "../redis/redis.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Score]),
        RedisModule
    ],
    controllers: [ScoresController],
    providers: [ScoresService]
})

export class ScoreModule{};