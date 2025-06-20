import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from '../../auth/entities/user.entity';
import { Game } from '../../game/entitis/game.entity'

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @ManyToOne(() => User, (user) => user.scores, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Game, (game) => game.scores, { onDelete: 'CASCADE' })
  game: Game;

  @CreateDateColumn()
  createdAt: Date;
}