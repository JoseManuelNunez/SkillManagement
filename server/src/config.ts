export class Config {
    public static serverPort: number;
    public static env: string;
    public static databaseHost: string;
    public static databasePort: number;
    public static databaseName: string;
    public static databaseUser: string;
    public static databasePassword: string;
    public static jwtSecret: string;


    private static warning(message: string) {
        console.log(`WARNING: ${message}`);
    }

    public static init() {

        if (!process.env.PORT) {
            Config.warning('No PORT environment variable detected. Using default port 3000.');
        }
        Config.serverPort = Number(process.env.PORT) || 3000;

        if (!process.env.NODE_ENV) {
            Config.warning('No NODE_ENV environment variable detected. Using default environment development.');
        }

        Config.env = process.env.NODE_ENV || 'DEV';

        if (!process.env.JWT_SECRET) {
            throw new Error('No JWT_SECRET environment variable detected. Please set it and try again.');
        }
        Config.jwtSecret = process.env.JWT_SECRET;

        if (!process.env.DATABASE_HOST) {
            throw new Error('No DATABASE_HOST environment variable detected. Please set it and try again.');
        }
        Config.databaseHost = process.env.DATABASE_HOST;

        if (!process.env.DATABASE_PORT) {
            Config.warning('No DATABASE_PORT environment variable detected. Using default port 5432.');
        }
        Config.databasePort = Number(process.env.DATABASE_PORT) || 5432;

        if (!process.env.DATABASE_NAME) {
            throw new Error('No DATABASE_NAME environment variable detected. Using default name postgres.');
        }
        Config.databaseName = process.env.DATABASE_NAME || "postgres";

        if (!process.env.DATABASE_USER) {
            Config.warning('No DATABASE_USER environment variable detected. Using default user postgres.');
        }
        Config.databaseUser = process.env.DATABASE_USER || 'postgres';

        if (!process.env.DATABASE_PASSWORD) {
            Config.warning('No DATABASE_PASSWORD environment variable detected. Using default password postgres.');
        }
        Config.databasePassword = process.env.DATABASE_PASSWORD || "postgres";
    }
}
