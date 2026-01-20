import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

export * from "./schema";

const sqlite = new Database("moni.db");
export const db = drizzle(sqlite, { schema });
