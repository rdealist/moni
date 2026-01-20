"use client";

import { TrendingUp, TrendingDown, Wallet, PiggyBank, Target, Activity } from "lucide-react";
import { cn } from "@moni/ui/lib/utils";
import { useTranslations } from "next-intl";

export function PortfolioOverview() {
  const t = useTranslations("portfolio");

  const stats = [
    {
      label: t("totalPortfolio"),
      value: "1,234,567.89",
      currency: "¥",
      change: "+2.34%",
      changeValue: "+28,234.56",
      trend: "up",
      icon: Wallet,
      color: "blue",
    },
    {
      label: t("todayPnL"),
      value: "28,234.56",
      currency: "¥",
      change: "+2.34%",
      trend: "up",
      icon: TrendingUp,
      color: "mint",
    },
    {
      label: t("unrealizedGains"),
      value: "156,789.00",
      currency: "¥",
      change: "+14.5%",
      trend: "up",
      icon: Target,
      color: "peach",
    },
    {
      label: t("cashBalance"),
      value: "50,000.00",
      currency: "¥",
      change: "0%",
      trend: "neutral",
      icon: PiggyBank,
      color: "slate",
    },
  ];

  const colorClasses = {
    blue: {
      bg: "bg-brand-blue/10",
      text: "text-brand-blue",
      glow: "shadow-glow",
    },
    mint: {
      bg: "bg-brand-mint/10",
      text: "text-brand-mint",
      glow: "shadow-glow-mint",
    },
    peach: {
      bg: "bg-brand-peach/10",
      text: "text-brand-peach",
      glow: "shadow-glow-peach",
    },
    slate: {
      bg: "bg-brand-slate/10",
      text: "text-brand-slate",
      glow: "",
    },
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const colors = colorClasses[stat.color as keyof typeof colorClasses];
        return (
          <div
            key={stat.label}
            className={cn(
              "group relative rounded-2xl bg-card p-5 transition-all duration-300 hover-lift cursor-pointer",
              "border border-border/50 hover:border-border",
              "stagger-item"
            )}
            style={{ animationDelay: `${index * 75}ms` }}
          >
            {/* Background gradient on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-muted/30 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Content */}
            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </span>
                <div className={cn("p-2 rounded-xl", colors.bg)}>
                  <stat.icon className={cn("h-4 w-4", colors.text)} />
                </div>
              </div>

              {/* Value */}
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-sm text-muted-foreground">{stat.currency}</span>
                <span className="text-2xl font-bold tracking-tight font-mono">
                  {stat.value}
                </span>
              </div>

              {/* Change indicator */}
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
                    stat.trend === "up" && "bg-success/10 text-success",
                    stat.trend === "down" && "bg-destructive/10 text-destructive",
                    stat.trend === "neutral" && "bg-muted text-muted-foreground"
                  )}
                >
                  {stat.trend === "up" && <TrendingUp className="h-3 w-3" />}
                  {stat.trend === "down" && <TrendingDown className="h-3 w-3" />}
                  {stat.trend === "neutral" && <Activity className="h-3 w-3" />}
                  {stat.change}
                </span>
                {stat.changeValue && (
                  <span className="text-xs text-muted-foreground">
                    ({stat.changeValue})
                  </span>
                )}
              </div>
            </div>

            {/* Decorative corner */}
            <div
              className={cn(
                "absolute top-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity",
                colors.bg
              )}
              style={{
                borderRadius: "0 1rem 0 100%",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
