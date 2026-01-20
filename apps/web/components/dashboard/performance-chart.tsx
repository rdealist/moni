"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@moni/ui/lib/utils";

const data = [
  { date: "Jan", value: 980000, benchmark: 970000 },
  { date: "Feb", value: 1020000, benchmark: 990000 },
  { date: "Mar", value: 1050000, benchmark: 1010000 },
  { date: "Apr", value: 1030000, benchmark: 1025000 },
  { date: "May", value: 1120000, benchmark: 1040000 },
  { date: "Jun", value: 1180000, benchmark: 1060000 },
  { date: "Jul", value: 1150000, benchmark: 1080000 },
  { date: "Aug", value: 1200000, benchmark: 1100000 },
  { date: "Sep", value: 1220000, benchmark: 1110000 },
  { date: "Oct", value: 1190000, benchmark: 1130000 },
  { date: "Nov", value: 1250000, benchmark: 1150000 },
  { date: "Dec", value: 1234567, benchmark: 1170000 },
];

const timeRanges = ["1W", "1M", "3M", "6M", "1Y", "ALL"];

export function PerformanceChart() {
  const [activeRange, setActiveRange] = React.useState("1Y");

  return (
    <div className="rounded-2xl bg-card border border-border/50 p-5 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Portfolio Performance</h3>
          <p className="text-xs text-muted-foreground mt-0.5">vs Market Benchmark</p>
        </div>

        {/* Time range selector */}
        <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={cn(
                "px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200",
                activeRange === range
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-brand-blue" />
          <span className="text-xs text-muted-foreground">Portfolio</span>
          <span className="text-sm font-semibold font-mono text-success">+26.0%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-brand-slate" />
          <span className="text-xs text-muted-foreground">Benchmark</span>
          <span className="text-sm font-semibold font-mono text-muted-foreground">+20.6%</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--brand-blue))" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(var(--brand-blue))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorBenchmark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--brand-slate))" stopOpacity={0.1} />
                <stop offset="95%" stopColor="hsl(var(--brand-slate))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => `¥${(value / 1000000).toFixed(1)}M`}
              dx={-10}
              width={50}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-medium">
                      <p className="text-xs text-muted-foreground mb-1">{label}</p>
                      <p className="text-sm font-semibold font-mono text-foreground">
                        ¥{payload[0].value?.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        Benchmark: ¥{payload[1]?.value?.toLocaleString()}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="benchmark"
              stroke="hsl(var(--brand-slate))"
              strokeWidth={1.5}
              fillOpacity={1}
              fill="url(#colorBenchmark)"
              strokeDasharray="4 4"
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--brand-blue))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
