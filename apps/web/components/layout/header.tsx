"use client";

import { Search, Bell, Plus } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@moni/ui/components/ui/button";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const pageTitleKeys: Record<string, string> = {
  "/": "dashboard",
  "/holdings": "holdings",
  "/analysis": "analysis",
  "/transactions": "transactions",
  "/settings": "settings",
};

export function Header() {
  const pathname = usePathname();
  const t = useTranslations("nav");

  // Get the path without locale prefix
  const locale = pathname.split("/")[1];
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
  const titleKey = pageTitleKeys[pathWithoutLocale] || "dashboard";

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-md px-6 transition-colors">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-lg font-semibold text-foreground tracking-tight">
            {t(titleKey)}
          </h1>
          <p className="text-xs text-muted-foreground">
            {new Date().toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search assets..."
            className="h-9 w-56 rounded-xl bg-muted/50 pl-9 pr-4 text-sm outline-none transition-all duration-200 placeholder:text-muted-foreground/70 focus:w-72 focus:bg-card focus:ring-2 focus:ring-primary/20 focus:shadow-soft"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary-peach animate-pulse" />
        </button>

        {/* Language toggle */}
        <LanguageToggle />

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Add Asset Button */}
        <Button
          size="sm"
          className="rounded-xl gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Asset</span>
        </Button>

        {/* Avatar */}
        <button className="h-8 w-8 rounded-xl bg-gradient-to-br from-brand-blue to-brand-mint flex items-center justify-center text-white text-xs font-semibold shadow-sm hover:shadow-md transition-shadow">
          M
        </button>
      </div>
    </header>
  );
}
