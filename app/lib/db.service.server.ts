import type { DrizzleD1Database } from "drizzle-orm/d1";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

const contextWithDb = (
  context: Record<string, unknown>
): context is { DB: D1Database } => {
  return "DB" in context;
};

export const getDbFromContext = (
  context: Record<string, unknown>
): DrizzleD1Database => {
  if (!contextWithDb(context)) {
    throw new Error("No database in context");
  }

  return drizzle(context.DB, {
    schema,
  });
};
