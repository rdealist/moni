import { Card, CardContent, CardHeader, CardTitle } from "@moni/ui/components/ui/card";

export default async function OkxBotPage() {
  // MVP: UI first. Backend executor comes next.
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">OKX Bot</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Continuous markets • Spot • BTC-USDT • 15m • Trend (MVP)
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">Paper</div>
            <p className="text-xs text-muted-foreground mt-1">
              Next: Demo (OKX simulated trading)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">Not running</div>
            <p className="text-xs text-muted-foreground mt-1">
              Executor UI wiring coming next
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Risk Defaults</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1">
              <li>Risk / trade: 0.25%</li>
              <li>Max daily loss: 1.0%</li>
              <li>Max exposure (BTC): 20%</li>
              <li>Cooldown: 15m</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Latest Signal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              (placeholder) Waiting for analyzer
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              (placeholder) No orders
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm list-disc pl-5 space-y-1">
            <li>
              We will implement the executor as a separate service/module first
              (paper → demo), then wire start/stop + status here.
            </li>
            <li>
              LLM will output a structured signal; deterministic rules will
              translate it into order intents.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
