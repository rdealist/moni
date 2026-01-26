import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import { eq, desc, sql, and, or, gte, lte, ne, like, inArray } from "drizzle-orm";

export * from "./schema";

// Export drizzle-orm query helpers
export { eq, desc, sql, and, or, gte, lte, ne, like, inArray };

// NOTE:
// Do NOT create/open a database connection at module import time.
// Next.js may import server modules during build to collect page data.
// We keep the DB lazy so `next build` can succeed on Vercel.

// Create client with support for both local file and remote Turso database.
// Find monorepo root by looking for local.db upward from current directory.
// (Best-effort; callers can set TURSO_DATABASE_URL for production.)
const path = require("path");
const fs = require("fs");

function findMonorepoRoot(startDir: string): string {
  let currentDir = startDir;
  while (currentDir && currentDir !== path.parse(currentDir).root) {
    const dbPath = path.join(currentDir, "local.db");
    if (fs.existsSync(dbPath)) return currentDir;
    currentDir = path.dirname(currentDir);
  }
  // Fallback to relative path from packages/db
  return path.resolve(__dirname, "../..");
}

let _db: ReturnType<typeof drizzle> | null = null;

function isBuildTime() {
  return process.env.NEXT_PHASE === "phase-production-build";
}

export function getDb() {
  if (_db) return _db;

  const monorepoRoot = findMonorepoRoot(process.cwd());
  const defaultDbPath = path.join(monorepoRoot, "local.db");

  // During `next build`, avoid touching local filesystem DB.
  // Use an in-memory DB unless a real Turso URL is provided.
  const url =
    process.env.TURSO_DATABASE_URL ??
    (isBuildTime() ? "file::memory:" : `file:${defaultDbPath}`);

  const authToken = process.env.TURSO_AUTH_TOKEN;
  const client = createClient(authToken ? { url, authToken } : { url });
  _db = drizzle(client, { schema });
  return _db;
}
