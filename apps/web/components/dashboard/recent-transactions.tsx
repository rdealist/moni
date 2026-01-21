import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";
import { cn } from "@moni/ui/lib/utils";
import { getRecentTransactions } from "@/lib/data";

const typeColors: Record<string, string> = {
  buy: "bg-purple-500",
  sell: "bg-orange-500",
  dividend: "bg-blue-500",
  default: "bg-gray-500",
};

export async function RecentTransactions() {
  const transactions = await getRecentTransactions(5);

  // Format transactions for display
  const formattedTransactions = transactions.map((tx) => {
    const amount = tx.quantity * tx.price;
    const color = typeColors[tx.type] || typeColors.default;

    return {
      id: tx.id,
      type: tx.type,
      symbol: tx.asset.symbol,
      name: tx.asset.name,
      amount,
      shares: tx.quantity,
      date: tx.executedAt
        ? new Date(tx.executedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : "Unknown",
      color,
    };
  });

  return (
    <div className="rounded-2xl bg-card border border-border/50 p-5 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Latest transactions</p>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Empty state */}
      {formattedTransactions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No transactions yet. Start trading to see your activity here.</p>
        </div>
      ) : (
        <>
          {/* Transaction list */}
          <div className="space-y-3">
            {formattedTransactions.map((tx, index) => (
              <div
                key={tx.id}
                className={cn(
                  "group flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 cursor-pointer",
                  "hover:bg-muted/40",
                  "stagger-item"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl text-white text-xs font-bold",
                    tx.color
                  )}
                >
                  {tx.symbol.slice(0, 2)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{tx.symbol}</span>
                    <span
                      className={cn(
                        "text-[10px] font-medium uppercase px-1.5 py-0.5 rounded",
                        tx.type === "buy" && "bg-success/10 text-success",
                        tx.type === "sell" && "bg-brand-peach/20 text-brand-peach",
                        tx.type === "dividend" && "bg-brand-blue/10 text-brand-blue"
                      )}
                    >
                      {tx.type}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{tx.date}</p>
                </div>

                {/* Amount */}
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    {tx.type === "sell" ? (
                      <ArrowDownRight className="h-3 w-3 text-brand-peach" />
                    ) : (
                      <ArrowUpRight className="h-3 w-3 text-success" />
                    )}
                    <span
                      className={cn(
                        "text-sm font-semibold font-mono",
                        tx.type === "sell" ? "text-brand-peach" : "text-success"
                      )}
                    >
                      {tx.type === "sell" ? "-" : "+"}¥{tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  {tx.shares && (
                    <p className="text-[10px] text-muted-foreground">
                      {tx.shares} {Math.abs(tx.shares) === 1 ? "share" : "shares"}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* View all link */}
          <button className="w-full mt-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
            View all transactions →
          </button>
        </>
      )}
    </div>
  );
}
