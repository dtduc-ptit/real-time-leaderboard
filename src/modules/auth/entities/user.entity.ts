import { IsNotEmpty, MinLength} from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Score } from '../../scores/entitis/scores.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => Score, (score) => score.user)
	scores: Score[];
}
