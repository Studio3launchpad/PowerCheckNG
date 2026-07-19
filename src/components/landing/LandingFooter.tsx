import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background/40">
      <PageContainer>
        <div className="py-16">
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

              <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
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

              <ul className="mt-5 space-y-3 text-sm text-muted-foreground sm:text-base">
                <li>
                  <a
                    href="#features"
                    className="transition hover:text-foreground"
                  >
                    Features
                  </a>
                </li>

                <li>
                  <a
                    href="#how"
                    className="transition hover:text-foreground"
                  >
                    How It Works
                  </a>
                </li>

                <li>
                  <a
                    href="#dashboard"
                    className="transition hover:text-foreground"
                  >
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

              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                Create your free account and begin building
                your personalised energy profile.
              </p>

              <Link
                to="/sign-up/$"
                params={{ _splat: "" }}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-center text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:text-left">
            <p>
              © {year} PowerCheckNG. All rights reserved.
            </p>

            <p>
              Designed to help Nigerians make smarter energy decisions.
            </p>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}