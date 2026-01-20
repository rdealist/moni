import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema.ts",
  driver: "better-sqlite",
  dbCredentials: {
    url: "moni.db",
  },
  out: "./drizzle",
} satisfies Config;
