import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

let database: ReturnType<typeof drizzle<typeof schema>> | undefined;

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured');
  }

  database ??= drizzle(databaseUrl, { schema });
  return database;
}

export * from './schema';
