import { TrendingUp, TrendingDown, MoreHorizontal, ExternalLink } from "lucide-react";
import { cn } from "@moni/ui/lib/utils";
import { getHoldingsWithAssets } from "@/lib/data";

// Mock prices for MVP - TODO: Integrate Yahoo Finance plugin
const mockPrices: Record<string, { price: number; change: number; sparkline: number[] }> = {
  BTC: { price: 67234.5, change: 3.4, sparkline: [65, 68, 64, 70, 67, 72, 69, 74, 71, 67] },
  NVDA: { price: 876.12, change: 5.2, sparkline: [78, 82, 80, 85, 88, 84, 90, 87, 92, 88] },
  AAPL: { price: 189.23, change: 1.2, sparkline: [182, 185, 183, 188, 186, 190, 187, 191, 189, 189] },
  ETH: { price: 3450.0, change: -0.8, sparkline: [3500, 3480, 3520, 3450, 3470, 3430, 3460, 3440, 3450, 3450] },
  TSLA: { price: 178.5, change: -1.5, sparkline: [185, 182, 188, 180, 183, 178, 181, 176, 179, 178] },
};

const assetColors: Record<string, string> = {
  BTC: "bg-orange-500",
  NVDA: "bg-green-600",
  AAPL: "bg-gray-600",
  ETH: "bg-indigo-500",
  TSLA: "bg-red-500",
  default: "bg-blue-500",
};

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

export async function HoldingsList() {
  const holdings = await getHoldingsWithAssets();

  // Calculate holdings data with prices
  const holdingsData = holdings.map((holding) => {
    const mockData = mockPrices[holding.asset.symbol] || {
      price: 100,
      change: 0,
      sparkline: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    };

    const value = holding.quantity * mockData.price;

    return {
      symbol: holding.asset.symbol,
      name: holding.asset.name,
      price: mockData.price,
      change: mockData.change,
      value,
      allocation: 0, // Will be calculated
      color: assetColors[holding.asset.symbol] || assetColors.default,
      sparkline: mockData.sparkline,
      quantity: holding.quantity,
    };
  });

  // Calculate total value and allocation
  const totalValue = holdingsData.reduce((sum, h) => sum + h.value, 0);
  holdingsData.forEach((h) => {
    h.allocation = totalValue > 0 ? (h.value / totalValue) * 100 : 0;
  });

  // Sort by value
  holdingsData.sort((a, b) => b.value - a.value);

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

      {/* Empty state */}
      {holdingsData.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No holdings yet. Add your first asset to get started.</p>
        </div>
      ) : (
        /* Table */
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
              {holdingsData.slice(0, 10).map((item, index) => (
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
                      ¥{item.value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
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
                        {item.allocation.toFixed(1)}%
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
      )}
    </div>
  );
}
