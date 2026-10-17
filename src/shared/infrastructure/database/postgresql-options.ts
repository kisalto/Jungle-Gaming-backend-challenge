
export interface PostgreSqlSettings {
    dbName: string;
    host: string;
    password: string;
    port: number;
    user: string;
}

export function loadPostgreSqlOptions(
    environment: NodeJS.ProcessEnv = process.env): PostgreSqlSettings {
        return {
            dbName: environment.DB_NAME ?? 'wager_db',
            host: environment.DB_HOST ?? 'localhost',
            password: environment.DB_PASSWORD ?? 'postgres',
            port: Number(environment.DB_PORT ?? '5432'),
            user: environment.DB_USER ?? 'postgres'
        };
    }
