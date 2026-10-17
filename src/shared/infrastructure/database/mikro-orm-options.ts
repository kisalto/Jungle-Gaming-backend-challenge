import { Migrator } from "@mikro-orm/migrations";
import { defineConfig } from "@mikro-orm/postgresql";


import { loadPostgreSqlOptions } from "./postgresql-options";

export const mikroOrmOptions = defineConfig({
    ...loadPostgreSqlOptions(),
    debug: false,
    forceUndefined: true,

    entities: [],
    extensions: [Migrator],
    migrations: {
        allOrNothing: true,
        path: './dist/shared/infrastructure/database/migrations',
        pathTs: './src/shared/infrastructure/database/migrations',
        transactional: true
    },
});