"use client";

import { Shell } from "@/components/layout/shell";
import {
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Plus,
  Search,
  Grid3X3,
  List,
} from "lucide-react";
import { cn } from "@moni/ui/lib/utils";
import { useState } from "react";

const allHoldings = [
  {
    id: 1,
    symbol: "BTC",
    name: "Bitcoin",
    type: "crypto",
    price: 67234.5,
    change: 3.4,
    quantity: 3.5,
    avgCost: 45000,
    value: 234567,
    pnl: 78234,
    pnlPercent: 49.6,
    allocation: 19.0,
    color: "bg-orange-500",
  },
  {
    id: 2,
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    type: "stock",
    price: 876.12,
    change: 5.2,
    quantity: 240,
    avgCost: 650,
    value: 210400,
    pnl: 54400,
    pnlPercent: 34.9,
    allocation: 17.1,
    color: "bg-green-600",
  },
  {
    id: 3,
    symbol: "AAPL",
    name: "Apple Inc.",
    type: "stock",
    price: 189.23,
    change: 1.2,
    quantity: 829,
    avgCost: 165,
    value: 156789,
    pnl: 20072,
    pnlPercent: 14.7,
    allocation: 12.7,
    color: "bg-gray-600",
  },
  {
    id: 4,
    symbol: "ETH",
    name: "Ethereum",
    type: "crypto",
    price: 3450.0,
    change: -0.8,
    quantity: 34.78,
    avgCost: 2800,
    value: 120000,
    pnl: 22600,
    pnlPercent: 23.2,
    allocation: 9.8,
    color: "bg-indigo-500",
  },
  {
    id: 5,
    symbol: "TSLA",
    name: "Tesla Inc.",
    type: "stock",
    price: 178.5,
    change: -1.5,
    quantity: 499,
    avgCost: 220,
    value: 89000,
    pnl: -20780,
    pnlPercent: -18.9,
    allocation: 7.2,
    color: "bg-red-500",
  },
  {
    id: 6,
    symbol: "MSFT",
    name: "Microsoft Corp.",
    type: "stock",
    price: 415.8,
    change: 0.8,
    quantity: 180,
    avgCost: 380,
    value: 74844,
    pnl: 6444,
    pnlPercent: 9.4,
    allocation: 6.1,
    color: "bg-blue-600",
  },
  {
    id: 7,
    symbol: "USD",
    name: "US Dollar",
    type: "cash",
    price: 1.0,
    change: 0,
    quantity: 50000,
    avgCost: 1,
    value: 50000,
    pnl: 0,
    pnlPercent: 0,
    allocation: 4.1,
    color: "bg-emerald-600",
  },
];

const filterOptions = ["All", "Stocks", "Crypto", "Funds", "Cash"];

export default function HoldingsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHoldings = allHoldings.filter((holding) => {
    const matchesFilter =
      activeFilter === "All" ||
      holding.type.toLowerCase() === activeFilter.toLowerCase() ||
      (activeFilter === "Stocks" && holding.type === "stock");
    const matchesSearch =
      holding.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      holding.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalValue = allHoldings.reduce((sum, h) => sum + h.value, 0);
  const totalPnL = allHoldings.reduce((sum, h) => sum + h.pnl, 0);

  return (
    <Shell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">All Holdings</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {allHoldings.length} assets · ¥{totalValue.toLocaleString()} total value
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
            <Plus className="h-4 w-4" />
            Add Asset
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl bg-card border border-border/50 p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Value</p>
            <p className="text-xl font-bold font-mono mt-1">¥{totalValue.toLocaleString()}</p>
          </div>
          <div className="rounded-xl bg-card border border-border/50 p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total P&L</p>
            <p className={cn("text-xl font-bold font-mono mt-1", totalPnL >= 0 ? "text-success" : "text-destructive")}>
              {totalPnL >= 0 ? "+" : ""}¥{totalPnL.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl bg-card border border-border/50 p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Best Performer</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-bold">BTC</span>
              <span className="text-sm font-mono text-success">+49.6%</span>
            </div>
          </div>
          <div className="rounded-xl bg-card border border-border/50 p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Worst Performer</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-bold">TSLA</span>
              <span className="text-sm font-mono text-destructive">-18.9%</span>
            </div>
          </div>
        </div>

        {/* Filters & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Filter tabs */}
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

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Search */}
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

            {/* View toggle */}
            <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg">
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  viewMode === "list" ? "bg-card shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  viewMode === "grid" ? "bg-card shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Holdings Table/Grid */}
        {viewMode === "list" ? (
          <div className="rounded-2xl bg-card border border-border/50 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Asset</th>
                  <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">Price</th>
                  <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground hidden sm:table-cell">24h</th>
                  <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground hidden md:table-cell">Quantity</th>
                  <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground hidden lg:table-cell">Avg Cost</th>
                  <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">Value</th>
                  <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground hidden md:table-cell">P&L</th>
                  <th className="px-5 py-3 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filteredHoldings.map((holding, index) => (
                  <tr
                    key={holding.id}
                    className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors cursor-pointer group stagger-item"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center text-white text-xs font-bold", holding.color)}>
                          {holding.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{holding.symbol}</p>
                          <p className="text-xs text-muted-foreground">{holding.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="text-sm font-mono font-medium">${holding.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </td>
                    <td className="px-5 py-4 text-right hidden sm:table-cell">
                      <span className={cn("inline-flex items-center gap-1 text-sm font-mono font-medium", holding.change > 0 ? "text-success" : holding.change < 0 ? "text-destructive" : "text-muted-foreground")}>
                        {holding.change > 0 ? <TrendingUp className="h-3 w-3" /> : holding.change < 0 ? <TrendingDown className="h-3 w-3" /> : null}
                        {holding.change > 0 ? "+" : ""}{holding.change}%
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right hidden md:table-cell">
                      <span className="text-sm font-mono text-muted-foreground">{holding.quantity.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-4 text-right hidden lg:table-cell">
                      <span className="text-sm font-mono text-muted-foreground">${holding.avgCost.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="text-sm font-mono font-semibold">¥{holding.value.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-4 text-right hidden md:table-cell">
                      <div>
                        <span className={cn("text-sm font-mono font-medium", holding.pnl >= 0 ? "text-success" : "text-destructive")}>
                          {holding.pnl >= 0 ? "+" : ""}¥{holding.pnl.toLocaleString()}
                        </span>
                        <p className={cn("text-xs font-mono", holding.pnlPercent >= 0 ? "text-success/70" : "text-destructive/70")}>
                          {holding.pnlPercent >= 0 ? "+" : ""}{holding.pnlPercent}%
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <button className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted transition-all">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHoldings.map((holding, index) => (
              <div
                key={holding.id}
                className="group rounded-2xl bg-card border border-border/50 p-5 hover:border-border hover:shadow-soft transition-all cursor-pointer stagger-item"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center text-white text-sm font-bold", holding.color)}>
                      {holding.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{holding.symbol}</p>
                      <p className="text-xs text-muted-foreground">{holding.name}</p>
                    </div>
                  </div>
                  <button className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted transition-all">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Value</span>
                    <span className="text-sm font-mono font-semibold">¥{holding.value.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">P&L</span>
                    <span className={cn("text-sm font-mono font-medium", holding.pnl >= 0 ? "text-success" : "text-destructive")}>
                      {holding.pnl >= 0 ? "+" : ""}¥{holding.pnl.toLocaleString()} ({holding.pnlPercent >= 0 ? "+" : ""}{holding.pnlPercent}%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">24h Change</span>
                    <span className={cn("text-sm font-mono font-medium", holding.change > 0 ? "text-success" : holding.change < 0 ? "text-destructive" : "text-muted-foreground")}>
                      {holding.change > 0 ? "+" : ""}{holding.change}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Shell>
  );
}
