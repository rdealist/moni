import { Shell } from "@/components/layout/shell";
import { PortfolioOverview } from "@/components/dashboard/portfolio-overview";
import { AssetAllocationChart } from "@/components/dashboard/asset-allocation-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { HoldingsList } from "@/components/dashboard/holdings-list";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { QuickActions } from "@/components/dashboard/quick-actions";

export default function Home() {
  return (
    <Shell>
      <div className="space-y-6">
        {/* Portfolio Overview Cards */}
        <PortfolioOverview />

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-7">
          {/* Performance Chart - Takes more space */}
          <div className="lg:col-span-4">
            <PerformanceChart />
          </div>

          {/* Asset Allocation */}
          <div className="lg:col-span-3">
            <AssetAllocationChart />
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Bottom Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Holdings List - Takes 2 columns */}
          <div className="lg:col-span-2">
            <HoldingsList />
          </div>

          {/* Recent Transactions */}
          <div className="lg:col-span-1">
            <RecentTransactions />
          </div>
        </div>
      </div>
    </Shell>
  );
}
