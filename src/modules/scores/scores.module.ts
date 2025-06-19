import { Module } from "@nestjs/common";
import { ScoresController } from "./scores.controller";
import { ScoresService } from "./scores.service";

@Module({
    imports: [],
    controllers: [ScoresController],
    providers: [ScoresService]
})

export class ScoreModule{};