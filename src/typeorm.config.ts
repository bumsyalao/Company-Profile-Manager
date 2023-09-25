import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';


dotenv.config();
const DB_URL = process.env.DB_URL

export default new DataSource({
    type: 'postgres',
    url: DB_URL,
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/**/migrations/*{.ts,.js}'],
    migrationsRun: true,

});

// "migration:create": "typeorm-ts-node-esm src/typeorm.config.ts migration:create  -d src/migrations",
