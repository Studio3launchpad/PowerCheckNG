import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { History, MapPin, Clock, ThumbsUp, RefreshCw, Zap } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import { listOutageHistory } from "@/lib/outage/outages.functions";
import { timeAgo } from "@/lib/outage/outages.utils";
import { STATUS_STYLES } from "@/lib/outage/outages.constants";
import { SectionHeader } from "@/components/common/SectionHeader";

export function OutagesHistory({ limit }: { limit?: number }) {
  const { data, isLoading, isFetching, refetch, error } = useQuery({
    queryKey: ["outages", "history"],
    queryFn: () => listOutageHistory(),
    refetchInterval: 10_000,
    refetchOnWindowFocus: true,
  });

  const rows = data?.outages ?? [];
  const visible = limit ? rows.slice(0, limit) : rows;

  return (
    <GlassCard>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <SectionHeader
          icon={History}
          title="Outage History"
          description="Live outage reports stored in the database. Refreshes automatically every 10 seconds."
        />

        <button
          onClick={() => refetch()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border px-3 py-2 text-xs text-muted-foreground transition hover:bg-white/5 sm:w-auto"
        >
          <RefreshCw className={`size-3.5 ${isFetching ? "animate-spin" : ""}`} />

          {isFetching ? "Updating..." : "Refresh"}
        </button>
      </div>

      {error ? (
        <p className="text-sm text-destructive">Failed to load outage history.</p>
      ) : isLoading ? (
        <div className="space-y-3">
          {Array.from({
            length: 3,
          }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-2xl bg-white/5" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-10 text-center text-sm text-muted-foreground">
          <Zap className="size-6 text-primary/60" />
          No outages reported yet.
        </div>
      ) : (
        <ul className="divide-y divide-border/60">
          {visible.map((o: any, i: number) => (
            <motion.li
              key={o.id}
              initial={{
                opacity: 0,
                y: 6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: i * 0.03,
              }}
              className="flex flex-col gap-3 py-5 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 truncate text-sm font-medium">
                  <MapPin className="size-4 shrink-0 text-primary" />

                  {o.area}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span>{o.discoCode}</span>

                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {timeAgo(o.startedAt)}
                  </span>

                  <span className="flex items-center gap-1">
                    <ThumbsUp className="size-3" />
                    {o.confirmations}
                  </span>
                </div>
              </div>

              <span
                className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide ${STATUS_STYLES[o.status]}`}
              >
                {o.status.replace("_", " ")}
              </span>
            </motion.li>
          ))}
        </ul>
      )}
    </GlassCard>
  );
}
