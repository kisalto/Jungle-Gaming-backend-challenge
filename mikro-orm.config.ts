import { defineConfig } from "@mikro-orm/core";
import { Migrator } from "@mikro-orm/migrations";
import { EntityGenerator } from "@mikro-orm/entity-generator";
import { SeedManager } from "@mikro-orm/seeder";
import dotenv from 'dotenv';
import { mikroOrmOptions } from "./src/shared/infrastructure/database/mikro-orm-options";

dotenv.config();

export default defineConfig({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,

    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],

    driverOptions: {
        connection: {
            max: 20,
            idleTimeoutMillis: 30000,
        }
    },

    extensions: [Migrator, EntityGenerator, SeedManager]

})
