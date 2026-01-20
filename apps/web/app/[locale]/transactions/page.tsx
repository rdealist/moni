"use client";

import { Shell } from "@/components/layout/shell";
import {
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Filter,
  Search,
  Download,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { cn } from "@moni/ui/lib/utils";
import { useState } from "react";

const transactions = [
  {
    id: 1,
    type: "buy",
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    quantity: 10,
    price: 865.5,
    total: 8655,
    fee: 4.99,
    date: "2024-01-20",
    time: "14:32:15",
    account: "Main Brokerage",
    notes: "Adding to AI position",
  },
  {
    id: 2,
    type: "sell",
    symbol: "BTC",
    name: "Bitcoin",
    quantity: 0.25,
    price: 67500,
    total: 16875,
    fee: 12.5,
    date: "2024-01-19",
    time: "09:15:42",
    account: "Crypto Wallet",
    notes: "Taking profits",
  },
  {
    id: 3,
    type: "dividend",
    symbol: "AAPL",
    name: "Apple Inc.",
    quantity: null,
    price: null,
    total: 245.5,
    fee: 0,
    date: "2024-01-18",
    time: "00:00:00",
    account: "Main Brokerage",
    notes: "Q4 dividend",
  },
  {
    id: 4,
    type: "buy",
    symbol: "ETH",
    name: "Ethereum",
    quantity: 5,
    price: 3380,
    total: 16900,
    fee: 8.45,
    date: "2024-01-17",
    time: "22:45:30",
    account: "Crypto Wallet",
    notes: "",
  },
  {
    id: 5,
    type: "buy",
    symbol: "MSFT",
    name: "Microsoft Corp.",
    quantity: 15,
    price: 402.5,
    total: 6037.5,
    fee: 4.99,
    date: "2024-01-15",
    time: "10:20:00",
    account: "Main Brokerage",
    notes: "Monthly DCA",
  },
  {
    id: 6,
    type: "sell",
    symbol: "TSLA",
    name: "Tesla Inc.",
    quantity: 20,
    price: 195.8,
    total: 3916,
    fee: 4.99,
    date: "2024-01-12",
    time: "15:55:10",
    account: "Main Brokerage",
    notes: "Cutting losses",
  },
  {
    id: 7,
    type: "transfer",
    symbol: "USD",
    name: "Cash Deposit",
    quantity: null,
    price: null,
    total: 10000,
    fee: 0,
    date: "2024-01-10",
    time: "12:00:00",
    account: "Main Brokerage",
    notes: "Monthly contribution",
  },
  {
    id: 8,
    type: "dividend",
    symbol: "MSFT",
    name: "Microsoft Corp.",
    quantity: null,
    price: null,
    total: 156.8,
    fee: 0,
    date: "2024-01-08",
    time: "00:00:00",
    account: "Main Brokerage",
    notes: "Q4 dividend",
  },
];

const filterOptions = ["All", "Buy", "Sell", "Dividend", "Transfer"];

const typeColors = {
  buy: { bg: "bg-success/10", text: "text-success", icon: ArrowDownRight },
  sell: { bg: "bg-brand-peach/10", text: "text-brand-peach", icon: ArrowUpRight },
  dividend: { bg: "bg-brand-blue/10", text: "text-brand-blue", icon: ArrowDownRight },
  transfer: { bg: "bg-brand-mint/10", text: "text-brand-mint", icon: ArrowDownRight },
};

export default function TransactionsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter((tx) => {
    const matchesFilter = activeFilter === "All" || tx.type.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch =
      tx.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalBuys = transactions.filter((t) => t.type === "buy").reduce((sum, t) => sum + t.total, 0);
  const totalSells = transactions.filter((t) => t.type === "sell").reduce((sum, t) => sum + t.total, 0);
  const totalDividends = transactions.filter((t) => t.type === "dividend").reduce((sum, t) => sum + t.total, 0);

  return (
    <Shell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Transactions</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {transactions.length} transactions this month
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
              <Plus className="h-4 w-4" />
              Add Transaction
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl bg-card border border-border/50 p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Bought</p>
            <p className="text-xl font-bold font-mono mt-1 text-success">¥{totalBuys.toLocaleString()}</p>
          </div>
          <div className="rounded-xl bg-card border border-border/50 p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Sold</p>
            <p className="text-xl font-bold font-mono mt-1 text-brand-peach">¥{totalSells.toLocaleString()}</p>
          </div>
          <div className="rounded-xl bg-card border border-border/50 p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Dividends</p>
            <p className="text-xl font-bold font-mono mt-1 text-brand-blue">¥{totalDividends.toLocaleString()}</p>
          </div>
          <div className="rounded-xl bg-card border border-border/50 p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Net Flow</p>
            <p className={cn("text-xl font-bold font-mono mt-1", totalBuys > totalSells ? "text-success" : "text-brand-peach")}>
              {totalBuys > totalSells ? "-" : "+"}¥{Math.abs(totalBuys - totalSells).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg w-fit">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                  activeFilter === filter
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Calendar className="h-4 w-4" />
              Jan 2024
              <ChevronDown className="h-3 w-3" />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-48 rounded-lg bg-muted/50 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="rounded-2xl bg-card border border-border/50 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Type</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Asset</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground hidden sm:table-cell">Qty</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground hidden md:table-cell">Price</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">Total</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground hidden lg:table-cell">Date</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground hidden xl:table-cell">Account</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx, index) => {
                const typeStyle = typeColors[tx.type as keyof typeof typeColors];
                const Icon = typeStyle.icon;
                return (
                  <tr
                    key={tx.id}
                    className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors cursor-pointer stagger-item"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className={cn("p-1.5 rounded-lg", typeStyle.bg)}>
                          <Icon className={cn("h-4 w-4", typeStyle.text)} />
                        </div>
                        <span className={cn("text-xs font-medium uppercase", typeStyle.text)}>{tx.type}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-foreground">{tx.symbol}</p>
                      <p className="text-xs text-muted-foreground">{tx.name}</p>
                    </td>
                    <td className="px-5 py-4 text-right hidden sm:table-cell">
                      <span className="text-sm font-mono text-muted-foreground">
                        {tx.quantity ? tx.quantity.toLocaleString() : "-"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right hidden md:table-cell">
                      <span className="text-sm font-mono text-muted-foreground">
                        {tx.price ? `$${tx.price.toLocaleString()}` : "-"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className={cn("text-sm font-mono font-semibold", tx.type === "sell" ? "text-brand-peach" : "text-foreground")}>
                        {tx.type === "sell" ? "-" : "+"}¥{tx.total.toLocaleString()}
                      </span>
                      {tx.fee > 0 && <p className="text-[10px] text-muted-foreground">Fee: ¥{tx.fee}</p>}
                    </td>
                    <td className="px-5 py-4 text-right hidden lg:table-cell">
                      <p className="text-sm text-foreground">{tx.date}</p>
                      <p className="text-xs text-muted-foreground">{tx.time.slice(0, 5)}</p>
                    </td>
                    <td className="px-5 py-4 hidden xl:table-cell">
                      <span className="text-xs text-muted-foreground">{tx.account}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1.5 rounded-lg text-sm bg-primary text-primary-foreground">1</button>
            <button className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              2
            </button>
            <button className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
