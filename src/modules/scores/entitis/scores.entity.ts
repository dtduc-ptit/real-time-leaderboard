import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from '../../auth/entities/user.entity';
import { Game } from '../../game/entitis/game.entity'

@Entity()
export class Score {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	score: number;

	@ManyToOne(() => User, (user) => user.scores)
	user: User;

	@ManyToOne(() => Game, (game) => game.scores)
	game: Game;
}