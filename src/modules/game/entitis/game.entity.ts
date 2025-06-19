import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Score } from '../../scores/entitis/scores.entity';

@Entity()
export class Game{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Score, (score) => score.game)
    scores : Score[];
}