import type { ReactNode } from "react";

import { AccountNavigation } from "./AccountNavigation";

interface AccountPageProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function AccountPage({
  title,
  description,
  children,
}: AccountPageProps) {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-4 sm:space-y-8 sm:px-0 ">
      <header>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h1>

        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      </header>

      <AccountNavigation />

      {children}
    </div>
  );
}