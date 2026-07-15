import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { prisma } from "./prisma.server";
import { ensureUser, requireUserId } from "../clerk.server";
import type { PowerStatus } from "./outages.types";

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
    status: o.status as PowerStatus,
    startedAt: o.startedAt.toISOString(),
    confirmations: o.confirmations,
  };
}

export const listOutages = createServerFn({ method: "GET" }).handler(async () => {
  const rows = await prisma.outageReport.findMany({
    orderBy: { startedAt: "desc" },
    take: 100,
  });

  return {
    outages: rows.map(serialize),
  };
});

export const listOutageHistory = createServerFn({ method: "GET" }).handler(async () => {
  const rows = await prisma.outageReport.findMany({
    orderBy: { startedAt: "desc" },
    take: 50,
  });
  return { outages: rows.map(serialize), fetchedAt: new Date().toISOString() };
});

export const reportOutage = createServerFn({ method: "POST" })
  .validator((data) =>
    z
      .object({
        area: z.string().min(2),
        discoCode: z.string().min(2),
        latitude: z.number(),
        longitude: z.number(),

        status: z.enum([
          "POWER_OFF",
          "POWER_ON",
          "NOT_SURE",
        ]),

        description: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const userId = await requireUserId();

    await ensureUser(userId);

    // Prevent duplicate reports from the same user
    // in the same area within 5 minutes.
    const fiveMinutesAgo = new Date(
      Date.now() - 5 * 60 * 1000,
    );

    const recentReport =
      await prisma.outageReport.findFirst({
        where: {
          userId,
          area: data.area,
          startedAt: {
            gte: fiveMinutesAgo,
          },
        },
        orderBy: {
          startedAt: "desc",
        },
      });

    if (recentReport) {
      return {
        success: false as const,
        message:
          "You already submitted a report for this area within the last 5 minutes.",
      };
    }

    const created = await prisma.outageReport.create({
      data: {
        userId,
        area: data.area,
        discoCode: data.discoCode,
        latitude: data.latitude,
        longitude: data.longitude,
        status: data.status,
        description: data.description,
      },
    });

    return {
      success: true as const,
      outage: serialize(created),
    };
  });