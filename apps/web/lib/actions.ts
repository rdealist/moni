"use server";

import { getDb, assets } from "@moni/db";
import { revalidatePath } from "next/cache";

export async function addAsset(formData: FormData) {
  const symbol = formData.get("symbol") as string;
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;

  if (!symbol || !name || !type) {
    throw new Error("Missing required fields");
  }

  // Generate ID (simple implementation)
  const id = crypto.randomUUID();

  const db = getDb();
  await db.insert(assets).values({
    id,
    symbol: symbol.toUpperCase(),
    name,
    type,
    currency: "USD", // Default
  });

  revalidatePath("/");
  return { success: true };
}
