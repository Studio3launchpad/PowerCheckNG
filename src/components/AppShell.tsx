import { Link, useRouterState } from "@tanstack/react-router";
import { UserButton } from "@clerk/tanstack-react-start";
import {
  LayoutDashboard,
  Zap,
  Activity,
  Lightbulb,
  Battery,
  Sliders,
  CreditCard,
  Bell,
  User,
  Settings,
  Shield,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/outages", label: "Outage Tracker", icon: Zap },
  { to: "/consumption", label: "Consumption", icon: Activity },
  { to: "/energy", label: "Energy Insights", icon: Lightbulb },
  { to: "/backup", label: "Backup Systems", icon: Battery },
 // { to: "/load", label: "Load Manager", icon: Sliders },
 // { to: "/buy-units", label: "Buy Units", icon: CreditCard },
 // { to: "/notifications", label: "Notifications", icon: Bell },
 // { to: "/profile", label: "Profile", icon: User },
 // { to: "/settings", label: "Settings", icon: Settings },
 // { to: "/security", label: "Security Center", icon: Shield },
 // { to: "/admin", label: "Admin", icon: ShieldCheck },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen grid-bg">
      <div className="mx-auto flex max-w-[1600px] gap-6 p-4 md:p-6">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:flex w-64 shrink-0 flex-col gap-2 glass rounded-2xl p-4 sticky top-6 h-[calc(100vh-3rem)]">
          <Link to="/dashboard" className="flex items-center gap-2 px-2 py-3">
            <div className="size-8 rounded-lg bg-primary glow-primary flex items-center justify-center">
              <Zap className="size-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-semibold">PowerCheckNG</span>
          </Link>
          <nav className="mt-2 flex-1 space-y-1 overflow-y-auto pr-1">
            {NAV.map((item) => {
              const active = pathname === item.to || pathname.startsWith(item.to + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                  )}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto flex items-center justify-between rounded-xl bg-white/5 p-2">
            <UserButton />
            <span className="text-xs text-muted-foreground pr-2">Account</span>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 relative z-0">
          {/* Mobile top bar */}
          <div className="lg:hidden sticky top-0 z-50 glass rounded-2xl px-4 py-3 mb-4 flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="size-7 rounded-md bg-primary glow-primary flex items-center justify-center">
                <Zap className="size-3.5 text-primary-foreground" />
              </div>
              <span className="font-display font-semibold">PowerCheckNG</span>
            </Link>
            <UserButton />
          </div>

          {children}

          {/* Mobile bottom nav */}
          <nav className="lg:hidden fixed bottom-3 left-3 right-3 glass-strong rounded-2xl flex items-center justify-around py-2 z-50">
            {NAV.slice(0, 5).map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex flex-col items-center gap-0.5 px-3 py-1 text-[10px]",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-5" />
                  {item.label.split(" ")[0]}
                </Link>
              );
            })}
          </nav>
        </main>
      </div>
    </div>
  );
}
