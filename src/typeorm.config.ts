import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';


dotenv.config();
export default new DataSource({
    type: 'postgres',
    url: process.env.DB_URL,
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + 'migrations/*{.ts,.js}']
});