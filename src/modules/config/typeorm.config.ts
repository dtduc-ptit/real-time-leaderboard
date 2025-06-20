import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Game } from '../game/entitis/game.entity';
import { Score } from '../scores/entitis/scores.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Game, Score],
  synchronize: true,
};