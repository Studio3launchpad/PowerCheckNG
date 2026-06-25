import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { prisma } from "./prisma.server";
import { ensureUser, requireUserId } from "./clerk.server";

function serialize(o: {
  id: string;
  area: string;
  discoCode: string;
  latitude: number;
  longitude: number;
  status: string;
  startedAt: Date;
  confirmations: number;
}) {
  return {
    id: o.id,
    area: o.area,
    discoCode: o.discoCode,
    latitude: o.latitude,
    longitude: o.longitude,
    status: o.status as "REPORTED" | "CONFIRMED" | "RESTORED" | "CANCELLED",
    startedAt: o.startedAt.toISOString(),
    confirmations: o.confirmations,
  };
}

export const listOutages = createServerFn({ method: "GET" }).handler(async () => {
  const rows = await prisma.outageReport.findMany({
    where: { status: { in: ["REPORTED", "CONFIRMED", "RESTORED"] } },
    orderBy: { startedAt: "desc" },
    take: 100,
  });
  return { outages: rows.map(serialize) };
});

export const listOutageHistory = createServerFn({ method: "GET" }).handler(async () => {
  const rows = await prisma.outageReport.findMany({
    orderBy: { startedAt: "desc" },
    take: 50,
  });
  return { outages: rows.map(serialize), fetchedAt: new Date().toISOString() };
});

export const reportOutage = createServerFn({ method: "POST" })
  .validator ((data) =>
    z
      .object({
        area: z.string().min(2),
        discoCode: z.string().min(2),
        latitude: z.number(),
        longitude: z.number(),
        description: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const userId = await requireUserId();
    await ensureUser(userId);

    const created = await prisma.outageReport.create({
      data: {
        userId,
        area: data.area,
        discoCode: data.discoCode,
        latitude: data.latitude,
        longitude: data.longitude,
        description: data.description,
      },
    });
    return serialize(created);
  });
