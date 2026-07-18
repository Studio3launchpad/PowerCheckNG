import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";

export function LandingNav() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
      <div className="flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary glow-primary">
          <Zap className="size-5 text-primary-foreground" />
        </div>

        <span className="font-display text-xl font-semibold">
          PowerCheckNG
        </span>
      </div>

      <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
        <a href="#features" className="transition hover:text-foreground">
          Features
        </a>

        <a href="#how" className="transition hover:text-foreground">
          How It Works
        </a>

        <a href="#dashboard" className="transition hover:text-foreground">
          Dashboard
        </a>
      </nav>

      <div className="flex items-center gap-3">
        <Link
          to="/sign-in/$"
          params={{ _splat: "" }}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Sign in
        </Link>

        <Link
          to="/sign-up/$"
          params={{ _splat: "" }}
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 glow-primary"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}