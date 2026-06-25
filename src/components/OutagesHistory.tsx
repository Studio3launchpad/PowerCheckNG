import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { History, MapPin, Clock, ThumbsUp, RefreshCw, Zap } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { listOutageHistory } from "@/lib/outages.functions";

const STATUS_STYLES: Record<string, string> = {
  REPORTED: "bg-warning/15 text-warning border-warning/30",
  CONFIRMED: "bg-destructive/15 text-destructive border-destructive/30",
  RESTORED: "bg-primary/15 text-primary border-primary/30",
  CANCELLED: "bg-muted text-muted-foreground border-border",
};

function timeAgo(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

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
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-semibold flex items-center gap-2">
            <History className="size-4 text-primary" /> Outages history
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Live from the database · refreshes every 10s
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-[11px] text-muted-foreground hover:bg-white/5"
        >
          <RefreshCw className={`size-3 ${isFetching ? "animate-spin" : ""}`} />
          {isFetching ? "Updating" : "Refresh"}
        </button>
      </div>

      {error ? (
        <p className="text-sm text-destructive">Failed to load outage history.</p>
      ) : isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-14 rounded-lg bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="py-8 text-center text-sm text-muted-foreground flex flex-col items-center gap-2">
          <Zap className="size-6 text-primary/60" />
          No outages reported yet.
        </div>
      ) : (
        <ul className="divide-y divide-border/60">
          {visible.map((o, i) => (
            <motion.li
              key={o.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="py-3 flex items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium flex items-center gap-1.5 truncate">
                  <MapPin className="size-3.5 text-primary shrink-0" /> {o.area}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-2">
                  <span>{o.discoCode}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" /> {timeAgo(o.startedAt)}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="size-3" /> {o.confirmations}
                  </span>
                </p>
              </div>
              <span
                className={`text-[10px] uppercase tracking-wide px-2 py-1 rounded-full border shrink-0 ${STATUS_STYLES[o.status]}`}
              >
                {o.status}
              </span>
            </motion.li>
          ))}
        </ul>
      )}
    </GlassCard>
  );
}
