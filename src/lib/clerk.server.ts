// Clerk server helpers. Read auth state inside server-fn handlers only.
import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { prisma } from "./outage/prisma.server";

export async function requireUserId(): Promise<string> {
  const { userId } = await auth();
  if (!userId) throw new Response("Unauthorized", { status: 401 });
  return userId;
}

export async function getUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId ?? null;
}

/**
 * Ensure a `User` row exists for the current Clerk user. Foreign keys on
 * OutageReport / ConsumptionReading / Invoice etc. require this row to exist
 * before inserts.
 */
export async function ensureUser(userId: string) {
  const existing = await prisma.user.findUnique({ where: { id: userId } });
  if (existing) return existing;

  const cc = await clerkClient();
  const u = await cc.users.getUser(userId);
  const email =
    u.primaryEmailAddress?.emailAddress ??
    u.emailAddresses[0]?.emailAddress ??
    `${userId}@clerk.local`;
  const fullName =
    [u.firstName, u.lastName].filter(Boolean).join(" ").trim() || null;

  return prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email,
      fullName,
      avatarUrl: u.imageUrl ?? null,
    },
  });
}
