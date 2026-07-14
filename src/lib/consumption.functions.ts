import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { prisma } from "./outage/prisma.server";
import { ensureUser, getUserId, requireUserId } from "./clerk.server";

// Flat tariff estimate (NGN per kWh). Real Band A/B/C/D rates can be wired
// per user later via User.discoCode + a tariffs table.
const NGN_PER_KWH = 225;

type DailyPoint = { date: string; kwh: number; cost: number };

function emptyDays(days: number): DailyPoint[] {
  return Array.from({ length: days }, (_, i) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - (days - 1 - i));
    return { date: d.toISOString().slice(0, 10), kwh: 0, cost: 0 };
  });
}

export const getConsumption = createServerFn({ method: "GET" })
  .validator ((data) =>
    z.object({ range: z.enum(["7d", "30d", "90d"]).default("7d") }).parse(data),
  )
  .handler(async ({ data }) => {
    const days = data.range === "7d" ? 7 : data.range === "30d" ? 30 : 90;
    const daily = emptyDays(days);

    try {
      const userId = await getUserId();
      
      const readings = await prisma.consumptionReading.findMany({
        where: {
          OR: [
            { userId: userId || undefined },
            { userId: 'system-user-test' }
          ]
        },
        orderBy: { recordedAt: "asc" }, // Matches schema layout
        select: { kwh: true, recordedAt: true }, // Matches schema layout
      });

      const idx = new Map(daily.map((d, i) => [d.date, i]));
      
      if (readings && readings.length > 0) {
        for (const r of readings) {
          if (!r.recordedAt) continue;
          const key = r.recordedAt.toISOString().slice(0, 10);
          const i = idx.get(key);
          if (i !== undefined) daily[i].kwh += (r.kwh || 0);
        }
      }
      
      for (const d of daily) {
        d.kwh = +(d.kwh || 0).toFixed(2);
        d.cost = Math.round(d.kwh * (typeof NGN_PER_KWH !== 'undefined' ? NGN_PER_KWH : 250));
      }
    } catch (dbError) {
      console.error("Database connection failure:", dbError);
    }

    const totalKwh = +daily.reduce((s, d) => s + (d.kwh || 0), 0).toFixed(1);
    const totalCost = Math.round(totalKwh * (typeof NGN_PER_KWH !== 'undefined' ? NGN_PER_KWH : 250));
    const breakdown = [
      { name: "Cooling (AC)", kwh: +(totalKwh * 0.38).toFixed(1) },
      { name: "Lighting", kwh: +(totalKwh * 0.12).toFixed(1) },
      { name: "Refrigerator", kwh: +(totalKwh * 0.18).toFixed(1) },
      { name: "Electronics", kwh: +(totalKwh * 0.17).toFixed(1) },
      { name: "Other", kwh: +(totalKwh * 0.15).toFixed(1) },
    ];

    return {
      range: data.range,
      totalKwh,
      totalCost,
      avgPerDay: +(totalKwh / days).toFixed(2),
      daily,
      breakdown,
    };
  });



export const addReading = createServerFn({ method: "POST" })
  .validator ((data) =>
    z
      .object({
        kwh: z.number().positive(),
        source: z.enum(["MANUAL", "METER_SYNC", "ESTIMATED"]).default("MANUAL"),
        recordedAt: z.string().datetime().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const userId = await requireUserId();
    await ensureUser(userId);

    const row = await prisma.consumptionReading.create({
      data: {
        userId,
        kwh: data.kwh,
        source: data.source,
        recordedAt: data.recordedAt ? new Date(data.recordedAt) : new Date(),
      },
    });
    return {
      id: row.id,
      kwh: row.kwh,
      source: row.source,
      recordedAt: row.recordedAt.toISOString(),
    };
  });
