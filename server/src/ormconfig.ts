import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const PROD_ENV = 'production';

const config = {
  host: 'localhost',
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
};

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: config.host,
  port: 5432,
  username: config.user || '',
  password: config.password || '',
  database: config.database || 'vorta_test',
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: true,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: ['warn', 'error'],
  logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'debug',
  entities: [join(__dirname, './**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'migration/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = connectionOptions;
