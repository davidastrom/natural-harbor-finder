import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

export default {
    schema: './src/db/schema/*.ts',
    out: './src/db/migrations',
    dbCredentials: {
        host: process.env.PG_HOST || 'localhost',
        port: parseInt(process.env.PG_PORT || '5432'),
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE || 'harbor-finder',
    },
    driver: 'pg',
} satisfies Config;
