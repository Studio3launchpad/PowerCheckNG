import * as React from "react";

import { cn } from "@/lib/outage/utils";

interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
}

const gridColumns = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
};

export function ResponsiveGrid({
  columns = 2,
  className,
  children,
  ...props
}: ResponsiveGridProps) {
  return (
    <div
      className={cn(
        "grid gap-6",
        gridColumns[columns],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}