import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import { eq, desc, sql, and, or, gte, lte, ne, like, inArray } from "drizzle-orm";

export * from "./schema";

// Export drizzle-orm query helpers
export { eq, desc, sql, and, or, gte, lte, ne, like, inArray };

// Create client with support for both local file and remote Turso database
// Find monorepo root by looking for local.db upward from current directory
const path = require("path");
const fs = require("fs");

function findMonorepoRoot(startDir: string): string {
  let currentDir = startDir;

  while (currentDir !== path.parse(currentDir).root) {
    const dbPath = path.join(currentDir, "local.db");
    if (fs.existsSync(dbPath)) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }

  // Fallback to relative path from packages/db
  return path.resolve(__dirname, "../..");
}

const monorepoRoot = findMonorepoRoot(process.cwd());
const defaultDbPath = path.join(monorepoRoot, "local.db");
const url = process.env.TURSO_DATABASE_URL ?? `file:${defaultDbPath}`;
const authToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient(
  authToken ? { url, authToken } : { url }
);

export const db = drizzle(client, { schema });
