import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// Enums (simulated with text + checks, or just application level validation)
// AssetType: 'stock' | 'fund' | 'crypto' | 'bond' | 'cash' | 'other'

export const assets = sqliteTable("assets", {
  id: text("id").primaryKey(),
  type: text("type").notNull(), // stock, fund, etc.
  symbol: text("symbol").notNull(),
  name: text("name").notNull(),
  currency: text("currency").notNull().default("USD"),
  exchange: text("exchange"),
  pluginId: text("plugin_id"), // For data fetching
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  pluginId: text("plugin_id"),
  isManual: integer("is_manual", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const holdings = sqliteTable("holdings", {
  id: text("id").primaryKey(),
  assetId: text("asset_id")
    .notNull()
    .references(() => assets.id),
  accountId: text("account_id")
    .notNull()
    .references(() => accounts.id),
  quantity: real("quantity").notNull(),
  costBasis: real("cost_basis").notNull(), // Total cost or average cost? Design implies unit cost or total? Usually total cost basis or unit. Let's assume total value for now or unit. Design says "costBasis: number".
  acquiredAt: integer("acquired_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const transactions = sqliteTable("transactions", {
  id: text("id").primaryKey(),
  assetId: text("asset_id")
    .notNull()
    .references(() => assets.id),
  accountId: text("account_id").references(() => accounts.id), // Optional if not tied to specific holding account immediately? But usually yes.
  type: text("type").notNull(), // buy, sell, dividend, split, transfer
  quantity: real("quantity").notNull(),
  price: real("price").notNull(), // Unit price
  fee: real("fee").default(0),
  executedAt: integer("executed_at", { mode: "timestamp" }).notNull(),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
