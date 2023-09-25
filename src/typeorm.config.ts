import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();
const DB_URL = process.env.DB_URL

export default new DataSource({
    type: 'postgres',
    url: DB_URL,
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // migrations: [path.join(__dirname, '/*.migrations{.ts,.js}')],
    // migrations: [__dirname + '/**/migrations/*{.ts,.js}'],
    // migrations: [path.join(__dirname, 'src', 'migrations', '*{.ts,.js}')],
    migrations: ['src/migration/*{.ts,.js}'],

    migrationsRun: true,




});

// "migration:create": "typeorm-ts-node-esm src/typeorm.config.ts migration:create  -d src/migrations",
