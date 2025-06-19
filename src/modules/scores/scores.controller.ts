import { Controller } from "@nestjs/common";
import { ScoresService } from "./scores.service";

@Controller()
export class ScoresController{
    constructor(private readonly scoresService: ScoresService) {}

    
}