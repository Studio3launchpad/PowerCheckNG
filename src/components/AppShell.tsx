import { Link, useRouterState } from "@tanstack/react-router";
import { UserButton } from "@clerk/tanstack-react-start";
import {
  Battery,
  Brain,
  LayoutDashboard,
  Menu,
  Zap,
  UserRound,
  PanelLeftClose,
  PanelLeftOpen,
  RadioTower,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/outage/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { SidebarNavItem } from "@/components/common/SidebarNavItem";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const NAV = [
  {
    to: "/dashboard",
    label: "Dashboard",
    mobileLabel: "Home",
    icon: LayoutDashboard,
  },
  {
    to: "/energy",
    label: "Smart Energy Planner",
    mobileLabel: "Planner",
    icon: Brain,
  },
  {
    to: "/outages",
    label: "Outage Tracker",
    mobileLabel: "Outages",
    icon: Zap,
  },
  {
    to: "/backup",
    label: "Power Backup Advisor",
    mobileLabel: "Backup",
    icon: Battery,
  },
] as const;

const SIDEBAR_NAV = NAV;

const MOBILE_MENU_NAV = [
  ...SIDEBAR_NAV,
  {
    to: "/account/profile",
    label: "Account",
    mobileLabel: "Account",
    icon: UserRound,
  },
] as const;

function isNavItemActive(pathname: string, route: string) {
  if (pathname === route || pathname.startsWith(`${route}/`)) {
    return true;
  }

  if (route === "/energy" && pathname.startsWith("/insights")) {
    return true;
  }

  if (route === "/outages" && pathname.startsWith("/history")) {
    return true;
  }

  return false;
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen grid-bg">
      <div className="mx-auto flex max-w-[1600px] gap-4 p-4 lg:gap-6 lg:p-6">
        {/* ================= DESKTOP SIDEBAR ================= */}

        <aside
          className={cn(
            "sticky top-6 hidden h-[calc(100vh-3rem)] shrink-0 rounded-2xl glass transition-all duration-300 lg:flex lg:flex-col",
            collapsed ? "w-20 p-3" : "w-60 p-4",
          )}
        >
          <TooltipProvider delayDuration={150}>
            {/* Logo */}

            <Link
              to="/dashboard"
              className={cn(
                "flex items-center rounded-xl transition-all",
                collapsed ? "justify-center py-3" : "gap-3 px-2 py-3",
              )}
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary glow-primary">
                <Zap className="size-4 text-primary-foreground" />
              </div>

              {!collapsed && (
                <span className="font-display text-lg font-semibold">PowerCheckNG</span>
              )}
            </Link>

            {/* Navigation */}

            <nav className="mt-6 flex-1 space-y-2">
              {SIDEBAR_NAV.map((item) => (
                <SidebarNavItem
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  icon={item.icon}
                  active={isNavItemActive(pathname, item.to)}
                  collapsed={collapsed}
                />
              ))}
            </nav>

            {/* Footer */}

            <div className="space-y-4 border-t border-border pt-4">
              {/* Primary Action */}

              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      className={cn(
                        "h-11 w-full rounded-2xl shadow-sm transition-all",
                        collapsed ? "px-0" : "justify-start gap-3 px-4",
                      )}
                    >
                      <Link to="/outages">
                        <RadioTower className="size-5 shrink-0" />

                        {!collapsed && <span>Report Power Status</span>}
                      </Link>
                    </Button>
                  </TooltipTrigger>

                  {collapsed && <TooltipContent side="right">Report Power Status</TooltipContent>}
                </Tooltip>
              </TooltipProvider>

              {/* Account */}

              <Link
                to="/account"
                className={cn(
                  "flex items-center rounded-2xl bg-white/5 transition hover:bg-white/10",

                  collapsed ? "justify-center p-3" : "justify-between p-3",
                )}
              >
                <UserButton />

                {!collapsed && <span className="text-xs text-muted-foreground">Account</span>}
              </Link>

              {/* Collapse */}

              <Button
                variant="ghost"
                onClick={() => setCollapsed(!collapsed)}
                className="h-11 w-full rounded-2xl"
              >
                {collapsed ? (
                  <PanelLeftOpen className="size-5" />
                ) : (
                  <PanelLeftClose className="size-5" />
                )}
              </Button>
            </div>
          </TooltipProvider>
        </aside>

        {/* ================= MAIN ================= */}

        <main className="min-w-0 flex-1 pb-24 lg:pb-0">
          {/* Mobile Header */}

          <header className="mb-5 flex items-center justify-between rounded-2xl glass px-4 py-2 lg:hidden">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary glow-primary">
                <Zap className="size-4 text-primary-foreground" />
              </div>

              <span className="font-display font-semibold">PowerCheckNG</span>
            </Link>

            <div className="flex items-center gap-2">
              {/* <UserButton /> */}

              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="h-fit rounded-l-2xl pb-20">
                  <div className="mt-2 space-y-6">
                    {MOBILE_MENU_NAV.map((item) => {
                      const Icon = item.icon;

                      const active = isNavItemActive(pathname, item.to);

                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-4 py-2",
                            active ? "bg-primary/10 text-primary" : "hover:bg-muted",
                          )}
                        >
                          <Icon className="size-5" />

                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </header>

          {children}

          {/* Mobile Bottom Navigation */}

          <nav className="fixed inset-x-3 bottom-3 z-50 flex items-center justify-around rounded-2xl glass-strong py-2 shadow-xl lg:hidden">
            {NAV.map((item) => {
              const Icon = item.icon;

              const active = isNavItemActive(pathname, item.to);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex min-w-0 flex-col items-center gap-1 px-2 py-1 text-[10px] transition-colors",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-5" />

                  <span>{item.mobileLabel}</span>
                </Link>
              );
            })}
          </nav>
        </main>
      </div>
    </div>
  );
}
