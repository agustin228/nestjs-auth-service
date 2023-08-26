import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entity/user.entity';
import Logger from '../middleware/Logger';
dotenv.config();

const db = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3000,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'Agustin22',
    database: process.env.DB_NAME || 'postgres',
    entities: [User],
    logging: true,
    synchronize: true,
});

db.initialize()
    .then(() => Logger.info('database successfully connected'))
    .catch((err) => Logger.error(err));

export { db };
