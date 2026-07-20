import {
  Link,
  useRouterState,
} from "@tanstack/react-router";

import {
  UserRound,
  Monitor,
  SlidersHorizontal,
} from "lucide-react";

const items = [
  {
    title: "Personal & Security",
    to: "/account/profile",
    icon: UserRound,
  },
  {
    title: "Sessions",
    to: "/account/sessions",
    icon: Monitor,
  },
  {
    title: "Preferences",
    to: "/account/preferences",
    icon: SlidersHorizontal,
  },
];

export function AccountNavigation() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <nav className="mb-8 flex w-fit items-center gap-2 rounded-2xl border bg-card p-2 shadow-sm">
      {items.map((item) => {
        const Icon = item.icon;

        const active = pathname === item.to;

        return (
          <Link
            key={item.to}
            to={item.to}
            className={[
              "flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium whitespace-nowrap transition-all",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            ].join(" ")}
          >
            <Icon className="h-4 w-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}