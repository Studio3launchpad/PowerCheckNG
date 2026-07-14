// Prisma client — server-only.
// On Cloudflare Workers you'll likely need driver adapters (e.g. Neon/Prisma
// Accelerate). Swap the import below to the adapter-based client once
// DATABASE_URL is wired and the adapter is chosen.
import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.__prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}
