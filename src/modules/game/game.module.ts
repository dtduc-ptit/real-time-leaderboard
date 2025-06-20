import { Module } from "@nestjs/common";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from "./entitis/game.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Game]),
    ],
    controllers: [GameController],
    providers: [GameService],
    exports: [GameService],
})
export class GameModule {}