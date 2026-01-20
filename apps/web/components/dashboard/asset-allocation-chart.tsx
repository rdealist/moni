"use client";

import * as React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cn } from "@moni/ui/lib/utils";

const data = [
  { name: "Stocks", value: 45, color: "hsl(var(--brand-blue))" },
  { name: "Crypto", value: 25, color: "hsl(var(--brand-mint))" },
  { name: "Funds", value: 20, color: "hsl(var(--brand-peach))" },
  { name: "Cash", value: 10, color: "hsl(var(--brand-slate))" },
];

export function AssetAllocationChart() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  return (
    <div className="rounded-2xl bg-card border border-border/50 p-5 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Asset Allocation</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Portfolio distribution</p>
        </div>
        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          View all
        </button>
      </div>

      {/* Chart */}
      <div className="relative h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="transparent"
                  style={{
                    filter: activeIndex === index ? "brightness(1.1)" : "none",
                    transform: activeIndex === index ? "scale(1.02)" : "scale(1)",
                    transformOrigin: "center",
                    transition: "all 0.2s ease",
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-medium">
                      <p className="text-sm font-medium text-foreground">{data.name}</p>
                      <p className="text-xs text-muted-foreground">{data.value}%</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-2xl font-bold font-mono text-foreground">100%</p>
            <p className="text-xs text-muted-foreground">Allocated</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item, index) => (
          <div
            key={item.name}
            className={cn(
              "flex items-center gap-2 p-2 rounded-lg transition-colors cursor-pointer",
              activeIndex === index ? "bg-muted/60" : "hover:bg-muted/40"
            )}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
            </div>
            <span className="text-xs font-mono text-muted-foreground">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
