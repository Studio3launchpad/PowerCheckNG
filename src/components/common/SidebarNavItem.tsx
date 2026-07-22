import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/outage/geoUtils";

type SidebarNavItemProps = {
  to: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
  collapsed?: boolean;
};

export function SidebarNavItem({
  to,
  label,
  icon: Icon,
  active = false,
  collapsed = false,
}: SidebarNavItemProps) {
  const link = (
    <Link
      to={to}
      className={cn(
        "flex rounded-2xl transition-all duration-200",

        collapsed
          ? "justify-center px-2 py-3 hover:scale-[1.03]"
          : "items-center gap-3 px-4 py-3 hover:translate-x-1",

        active
          ? "bg-primary/15 text-primary"
          : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
      )}
    >
      <Icon className="size-5 shrink-0" />

      {!collapsed && (
        <span className="truncate font-medium">
          {label}
        </span>
      )}
    </Link>
  );

  if (!collapsed) return link;

  return (
  <Tooltip>
    <TooltipTrigger asChild>
      {link}
    </TooltipTrigger>

    <TooltipContent side="right">
      {label}
    </TooltipContent>
  </Tooltip>

  );
}