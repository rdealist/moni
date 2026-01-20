import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

export * from "./schema";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "file:moni.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
