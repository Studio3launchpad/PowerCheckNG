import { Link } from "@tanstack/react-router";
import { Menu, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PageContainer } from "@/components/layout/PageContainer";

export function LandingNav() {
  return (
    <PageContainer>
      <header className="flex h-20 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-2xl bg-primary glow-primary">
            <Zap className="size-5 text-primary-foreground" />
          </div>

          <span className="font-display text-xl font-semibold">
            PowerCheckNG
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-lg font-medium text-muted-foreground lg:flex">
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

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/sign-in/$"
            params={{ _splat: "" }}
            className="text-base font-medium text-muted-foreground transition hover:text-foreground"
          >
            Sign in
          </Link>

          <Link
            to="/sign-up/$"
            params={{ _splat: "" }}
            className="rounded-2xl bg-primary px-4 py-2 text-base font-medium text-primary-foreground transition hover:bg-primary/90 glow-primary"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-6">
                <a
                  href="#features"
                  className="text-base font-medium transition hover:text-primary"
                >
                  Features
                </a>

                <a
                  href="#how"
                  className="text-base font-medium transition hover:text-primary"
                >
                  How It Works
                </a>

                <a
                  href="#dashboard"
                  className="text-base font-medium transition hover:text-primary"
                >
                  Dashboard
                </a>

                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    to="/sign-in/$"
                    params={{ _splat: "" }}
                    className="rounded-lg border px-4 py-2 text-center font-medium"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/sign-up/$"
                    params={{ _splat: "" }}
                    className="rounded-lg bg-primary px-4 py-2 text-center font-medium text-primary-foreground"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </PageContainer>
  );
}