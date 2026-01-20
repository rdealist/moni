"use client";

import { TrendingUp, TrendingDown, MoreHorizontal, ExternalLink } from "lucide-react";
import { cn } from "@moni/ui/lib/utils";

const holdingsData = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 67234.5,
    change: 3.4,
    value: 234567,
    allocation: 19.0,
    color: "bg-orange-500",
    sparkline: [65, 68, 64, 70, 67, 72, 69, 74, 71, 67],
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 876.12,
    change: 5.2,
    value: 210400,
    allocation: 17.1,
    color: "bg-green-600",
    sparkline: [78, 82, 80, 85, 88, 84, 90, 87, 92, 88],
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 189.23,
    change: 1.2,
    value: 156789,
    allocation: 12.7,
    color: "bg-gray-600",
    sparkline: [182, 185, 183, 188, 186, 190, 187, 191, 189, 189],
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 3450.0,
    change: -0.8,
    value: 120000,
    allocation: 9.8,
    color: "bg-indigo-500",
    sparkline: [3500, 3480, 3520, 3450, 3470, 3430, 3460, 3440, 3450, 3450],
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 178.5,
    change: -1.5,
    value: 89000,
    allocation: 7.2,
    color: "bg-red-500",
    sparkline: [185, 182, 188, 180, 183, 178, 181, 176, 179, 178],
  },
];

function MiniSparkline({ data, isPositive }: { data: number[]; isPositive: boolean }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const height = 24;
  const width = 60;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HoldingsList() {
  return (
    <div className="rounded-2xl bg-card border border-border/50 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Top Holdings</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Your largest positions</p>
        </div>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
          View all
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Asset</th>
              <th className="pb-3 text-right text-xs font-medium text-muted-foreground">Price</th>
              <th className="pb-3 text-right text-xs font-medium text-muted-foreground hidden sm:table-cell">
                24h
              </th>
              <th className="pb-3 text-center text-xs font-medium text-muted-foreground hidden md:table-cell">
                Trend
              </th>
              <th className="pb-3 text-right text-xs font-medium text-muted-foreground">Value</th>
              <th className="pb-3 text-right text-xs font-medium text-muted-foreground hidden lg:table-cell">
                Allocation
              </th>
              <th className="pb-3 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {holdingsData.map((item, index) => (
              <tr
                key={item.symbol}
                className={cn(
                  "group border-b border-border/30 last:border-0 transition-colors hover:bg-muted/30 cursor-pointer",
                  "stagger-item"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Asset */}
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg text-white text-xs font-bold",
                        item.color
                      )}
                    >
                      {item.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.symbol}</p>
                      <p className="text-xs text-muted-foreground">{item.name}</p>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="py-3 text-right">
                  <span className="text-sm font-mono font-medium text-foreground">
                    ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </td>

                {/* Change */}
                <td className="py-3 text-right hidden sm:table-cell">
                  <span
                    className={cn(
                      "inline-flex items-center gap-0.5 text-sm font-medium font-mono",
                      item.change > 0 ? "text-success" : item.change < 0 ? "text-destructive" : "text-muted-foreground"
                    )}
                  >
                    {item.change > 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : item.change < 0 ? (
                      <TrendingDown className="h-3 w-3" />
                    ) : null}
                    {item.change > 0 ? "+" : ""}
                    {item.change}%
                  </span>
                </td>

                {/* Sparkline */}
                <td className="py-3 hidden md:table-cell">
                  <div className="flex justify-center">
                    <MiniSparkline data={item.sparkline} isPositive={item.change >= 0} />
                  </div>
                </td>

                {/* Value */}
                <td className="py-3 text-right">
                  <span className="text-sm font-mono font-medium text-foreground">
                    ¥{item.value.toLocaleString()}
                  </span>
                </td>

                {/* Allocation */}
                <td className="py-3 text-right hidden lg:table-cell">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-blue rounded-full transition-all duration-500"
                        style={{ width: `${item.allocation}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground w-10 text-right">
                      {item.allocation}%
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-3">
                  <button className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted transition-all">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
