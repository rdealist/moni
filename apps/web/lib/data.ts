import { db, assets, holdings, transactions, desc, eq, sql } from "@moni/db";

// Get all assets
export async function getAssets() {
  return await db.select().from(assets).orderBy(desc(assets.createdAt));
}

// Get asset by symbol
export async function getAssetBySymbol(symbol: string) {
  const [asset] = await db
    .select()
    .from(assets)
    .where(eq(assets.symbol, symbol.toUpperCase()))
    .limit(1);
  return asset;
}

// Get all holdings with asset information
export async function getHoldingsWithAssets() {
  return await db
    .select({
      id: holdings.id,
      quantity: holdings.quantity,
      costBasis: holdings.costBasis,
      acquiredAt: holdings.acquiredAt,
      asset: {
        id: assets.id,
        symbol: assets.symbol,
        name: assets.name,
        type: assets.type,
        currency: assets.currency,
      },
    })
    .from(holdings)
    .innerJoin(assets, eq(holdings.assetId, assets.id))
    .orderBy(desc(holdings.quantity));
}

// Get portfolio summary
export async function getPortfolioSummary() {
  const allHoldings = await getHoldingsWithAssets();

  let totalValue = 0;
  let totalCost = 0;
  const assetValues: Record<string, { value: number; cost: number }> = {};

  // For now, use a simple calculation with mock prices
  // TODO: Integrate with Yahoo Finance plugin for real prices
  const mockPrices: Record<string, number> = {
    BTC: 67234.5,
    NVDA: 876.12,
    AAPL: 189.23,
    ETH: 3450.0,
    TSLA: 178.5,
  };

  for (const holding of allHoldings) {
    const price = mockPrices[holding.asset.symbol] || 100; // Fallback price
    const value = holding.quantity * price;
    const cost = holding.costBasis;

    totalValue += value;
    totalCost += cost;

    if (!assetValues[holding.asset.symbol]) {
      assetValues[holding.asset.symbol] = { value: 0, cost: 0 };
    }
    assetValues[holding.asset.symbol].value += value;
    assetValues[holding.asset.symbol].cost += cost;
  }

  const totalReturn = totalValue - totalCost;
  const totalReturnPercent = totalCost > 0 ? (totalReturn / totalCost) * 100 : 0;

  return {
    totalValue,
    totalCost,
    totalReturn,
    totalReturnPercent,
    assetCount: Object.keys(assetValues).length,
    assets: assetValues,
  };
}

// Get recent transactions
export async function getRecentTransactions(limit = 10) {
  return await db
    .select({
      id: transactions.id,
      type: transactions.type,
      quantity: transactions.quantity,
      price: transactions.price,
      fee: transactions.fee,
      executedAt: transactions.executedAt,
      asset: {
        symbol: assets.symbol,
        name: assets.name,
        type: assets.type,
      },
    })
    .from(transactions)
    .innerJoin(assets, eq(transactions.assetId, assets.id))
    .orderBy(desc(transactions.executedAt))
    .limit(limit);
}

// Get asset allocation data
export async function getAssetAllocation() {
  const summary = await getPortfolioSummary();
  const allocation = Object.entries(summary.assets).map(
    ([symbol, data]) => ({
      symbol,
      value: data.value,
      allocation:
        summary.totalValue > 0
          ? (data.value / summary.totalValue) * 100
          : 0,
    })
  );

  return allocation.sort((a, b) => b.value - a.value);
}
