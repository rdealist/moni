"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  PieChart,
  ArrowRightLeft,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Logo } from "../logo";
import { cn } from "@moni/ui/lib/utils";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

const navItems = [
  { href: "/", icon: LayoutDashboard, key: "dashboard" },
  { href: "/holdings", icon: Wallet, key: "holdings" },
  { href: "/analysis", icon: PieChart, key: "analysis" },
  { href: "/transactions", icon: ArrowRightLeft, key: "transactions" },
  { href: "/docs", icon: FileText, key: "docs" },
];

export function Sidebar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const [collapsed, setCollapsed] = useState(false);

  // Get path without locale for comparison
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/30">
        <Logo size={collapsed ? "sm" : "md"} showText={!collapsed} />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item, index) => {
          const isActive = pathWithoutLocale === item.href;
          return (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                "stagger-item",
                isActive
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <item.icon
                className={cn(
                  "h-[18px] w-[18px] transition-transform duration-200",
                  !isActive && "group-hover:scale-110"
                )}
              />
              {!collapsed && <span>{t(item.key)}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-border/30 p-3">
        <Link
          href={`/${locale}/settings`}
          className={cn(
            "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
            pathWithoutLocale === "/settings"
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            collapsed && "justify-center px-2"
          )}
        >
          <Settings className="h-[18px] w-[18px] transition-transform duration-200 group-hover:rotate-45" />
          {!collapsed && <span>{t("settings")}</span>}
        </Link>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
    </aside>
  );
}
