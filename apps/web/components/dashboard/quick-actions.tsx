"use client";

import { Plus, ArrowRightLeft, Download, Upload, Sparkles } from "lucide-react";
import { cn } from "@moni/ui/lib/utils";

const actions = [
  {
    icon: Plus,
    label: "Add Asset",
    description: "Track new investment",
    color: "blue",
  },
  {
    icon: ArrowRightLeft,
    label: "Record Trade",
    description: "Log a transaction",
    color: "mint",
  },
  {
    icon: Download,
    label: "Import Data",
    description: "From CSV or broker",
    color: "peach",
  },
  {
    icon: Sparkles,
    label: "AI Insights",
    description: "Get recommendations",
    color: "slate",
    badge: "New",
  },
];

const colorClasses = {
  blue: {
    bg: "bg-brand-blue/10 group-hover:bg-brand-blue/20",
    text: "text-brand-blue",
    border: "border-brand-blue/20",
  },
  mint: {
    bg: "bg-brand-mint/10 group-hover:bg-brand-mint/20",
    text: "text-brand-mint",
    border: "border-brand-mint/20",
  },
  peach: {
    bg: "bg-brand-peach/10 group-hover:bg-brand-peach/20",
    text: "text-brand-peach",
    border: "border-brand-peach/20",
  },
  slate: {
    bg: "bg-brand-slate/10 group-hover:bg-brand-slate/20",
    text: "text-brand-slate",
    border: "border-brand-slate/20",
  },
};

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {actions.map((action, index) => {
        const colors = colorClasses[action.color as keyof typeof colorClasses];
        return (
          <button
            key={action.label}
            className={cn(
              "group relative flex items-center gap-3 p-4 rounded-2xl bg-card border border-border/50 transition-all duration-200",
              "hover:border-border hover:shadow-soft hover:-translate-y-0.5",
              "stagger-item"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Icon */}
            <div className={cn("p-2.5 rounded-xl transition-colors", colors.bg)}>
              <action.icon className={cn("h-4 w-4", colors.text)} />
            </div>

            {/* Text */}
            <div className="text-left flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">{action.label}</p>
                {action.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-brand-mint/20 text-brand-mint rounded">
                    {action.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">{action.description}</p>
            </div>

            {/* Hover arrow indicator */}
            <div className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                className="h-4 w-4 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        );
      })}
    </div>
  );
}
