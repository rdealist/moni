import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema.ts",
  driver: "better-sqlite",
  dbCredentials: {
    url: "../../local.db",
  },
  out: "./drizzle",
} satisfies Config;
