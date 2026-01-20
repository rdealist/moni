"use client";

import { Shell } from "@/components/layout/shell";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";
import { cn } from "@moni/ui/lib/utils";
import { useState } from "react";
import { TrendingUp, TrendingDown, Target, Shield, Zap, AlertTriangle } from "lucide-react";

const performanceData = [
  { month: "Jan", portfolio: 4.2, benchmark: 3.1 },
  { month: "Feb", portfolio: -1.5, benchmark: -2.1 },
  { month: "Mar", portfolio: 5.8, benchmark: 4.2 },
  { month: "Apr", portfolio: 2.1, benchmark: 1.8 },
  { month: "May", portfolio: 7.3, benchmark: 5.5 },
  { month: "Jun", portfolio: -0.8, benchmark: -1.2 },
  { month: "Jul", portfolio: 4.5, benchmark: 3.8 },
  { month: "Aug", portfolio: 3.2, benchmark: 2.9 },
  { month: "Sep", portfolio: -2.1, benchmark: -3.5 },
  { month: "Oct", portfolio: 6.1, benchmark: 4.8 },
  { month: "Nov", portfolio: 3.8, benchmark: 3.2 },
  { month: "Dec", portfolio: 5.2, benchmark: 4.1 },
];

const allocationData = [
  { name: "US Stocks", value: 35, color: "hsl(var(--brand-blue))" },
  { name: "Crypto", value: 25, color: "hsl(var(--brand-mint))" },
  { name: "International", value: 15, color: "hsl(var(--brand-peach))" },
  { name: "Bonds", value: 10, color: "hsl(215 35% 50%)" },
  { name: "REITs", value: 8, color: "hsl(165 38% 50%)" },
  { name: "Cash", value: 7, color: "hsl(var(--brand-slate))" },
];

const sectorData = [
  { sector: "Tech", allocation: 42 },
  { sector: "Finance", allocation: 18 },
  { sector: "Healthcare", allocation: 12 },
  { sector: "Consumer", allocation: 10 },
  { sector: "Energy", allocation: 8 },
  { sector: "Other", allocation: 10 },
];

const riskData = [
  { metric: "Volatility", value: 75, fullMark: 100 },
  { metric: "Sharpe", value: 85, fullMark: 100 },
  { metric: "Max DD", value: 60, fullMark: 100 },
  { metric: "Beta", value: 70, fullMark: 100 },
  { metric: "Correlation", value: 55, fullMark: 100 },
  { metric: "VaR", value: 65, fullMark: 100 },
];

const metrics = [
  { label: "Sharpe Ratio", value: "1.82", trend: "up", benchmark: "1.45" },
  { label: "Max Drawdown", value: "-12.4%", trend: "neutral", benchmark: "-15.2%" },
  { label: "Volatility", value: "18.5%", trend: "down", benchmark: "21.3%" },
  { label: "Beta", value: "0.92", trend: "neutral", benchmark: "1.00" },
];

export default function AnalysisPage() {
  const [timeRange, setTimeRange] = useState("1Y");

  return (
    <Shell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Portfolio Analysis</h2>
            <p className="text-sm text-muted-foreground mt-1">Performance metrics and risk assessment</p>
          </div>
          <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg w-fit">
            {["1M", "3M", "6M", "1Y", "ALL"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                  timeRange === range ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="rounded-xl bg-card border border-border/50 p-4 stagger-item"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{metric.label}</p>
                {metric.trend === "up" && <TrendingUp className="h-4 w-4 text-success" />}
                {metric.trend === "down" && <TrendingDown className="h-4 w-4 text-success" />}
              </div>
              <p className="text-2xl font-bold font-mono">{metric.value}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Benchmark: <span className="font-mono">{metric.benchmark}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Monthly Returns */}
          <div className="lg:col-span-2 rounded-2xl bg-card border border-border/50 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Monthly Returns</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Portfolio vs Benchmark</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-brand-blue" />
                  <span className="text-muted-foreground">Portfolio</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-brand-slate" />
                  <span className="text-muted-foreground">Benchmark</span>
                </div>
              </div>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-medium">
                            <p className="text-xs text-muted-foreground mb-1">{label}</p>
                            <p className="text-sm font-mono">Portfolio: {payload[0].value}%</p>
                            <p className="text-sm font-mono text-muted-foreground">Benchmark: {payload[1]?.value}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="portfolio" fill="hsl(var(--brand-blue))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="benchmark" fill="hsl(var(--brand-slate))" radius={[4, 4, 0, 0]} opacity={0.5} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Profile Radar */}
          <div className="rounded-2xl bg-card border border-border/50 p-5">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground">Risk Profile</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Multi-factor analysis</p>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={riskData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <Radar name="Risk" dataKey="value" stroke="hsl(var(--brand-mint))" fill="hsl(var(--brand-mint))" fillOpacity={0.3} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Asset Allocation */}
          <div className="rounded-2xl bg-card border border-border/50 p-5">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground">Asset Allocation</h3>
              <p className="text-xs text-muted-foreground mt-0.5">By asset class</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="h-[180px] w-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={allocationData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={2} dataKey="value">
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {allocationData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="text-xs font-mono font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sector Breakdown */}
          <div className="rounded-2xl bg-card border border-border/50 p-5">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground">Sector Breakdown</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Industry exposure</p>
            </div>
            <div className="space-y-3">
              {sectorData.map((sector, index) => (
                <div key={sector.sector} className="stagger-item" style={{ animationDelay: `${index * 30}ms` }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">{sector.sector}</span>
                    <span className="text-xs font-mono text-muted-foreground">{sector.allocation}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-blue rounded-full transition-all duration-700"
                      style={{ width: `${sector.allocation}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="rounded-2xl bg-card border border-border/50 p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">AI Insights</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-success/5 border border-success/20">
              <Target className="h-5 w-5 text-success shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Diversification Score</p>
                <p className="text-xs text-muted-foreground mt-1">Your portfolio is well-diversified across 6 asset classes with healthy sector exposure.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-brand-peach/5 border border-brand-peach/20">
              <AlertTriangle className="h-5 w-5 text-brand-peach shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Concentration Risk</p>
                <p className="text-xs text-muted-foreground mt-1">Tech sector at 42% is above recommended 30%. Consider rebalancing.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-brand-blue/5 border border-brand-blue/20">
              <Zap className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Performance</p>
                <p className="text-xs text-muted-foreground mt-1">Outperforming benchmark by 5.4% YTD with lower volatility.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
