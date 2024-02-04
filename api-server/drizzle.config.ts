import type { Config } from "drizzle-kit";
import dotenv from 'dotenv';

dotenv.config();

export default {
  schema: "./src/db/schema/*.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || "harbor-finder",
  },
  driver: "pg",
} satisfies Config;
