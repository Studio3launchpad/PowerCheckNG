import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/outage/geoUtils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "strong";
}

export function GlassCard({
  children,
  className,
  variant = "default",
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        variant === "strong" ? "glass-strong" : "glass",
        "rounded-2xl",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
