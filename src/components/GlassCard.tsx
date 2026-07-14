import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/outage/utils";

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
        "rounded-2xl p-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
