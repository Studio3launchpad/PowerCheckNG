import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background/40">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-3">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Zap className="h-5 w-5" />
              </div>

              <span className="font-display text-xl font-semibold">
                PowerCheckNG
              </span>

            </div>

            <p className="mt-6 leading-7 text-muted-foreground">
              Helping Nigerian homes and businesses understand
              electricity usage, plan smarter and make better
              energy decisions.
            </p>

          </div>

          {/* Product */}

          <div>

            <h3 className="font-semibold">
              Product
            </h3>

            <ul className="mt-5 space-y-3 text-muted-foreground">

              <li>
                <a href="#features" className="hover:text-foreground">
                  Features
                </a>
              </li>

              <li>
                <a href="#how" className="hover:text-foreground">
                  How It Works
                </a>
              </li>

              <li>
                <a href="#dashboard" className="hover:text-foreground">
                  Dashboard
                </a>
              </li>

            </ul>

          </div>

          {/* Get Started */}

          <div>

            <h3 className="font-semibold">
              Get Started
            </h3>

            <p className="mt-5 text-muted-foreground">
              Create your free account and begin building
              your personalised energy profile.
            </p>

            <Link
              to="/sign-up/$"
              params={{ _splat: "" }}
              className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Create Account
            </Link>

          </div>

        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">

          <p>
            © {year} PowerCheckNG. All rights reserved.
          </p>

          <p>
            Designed to help Nigerians make smarter energy decisions.
          </p>

        </div>

      </div>
    </footer>
  );
}