import { ShieldAlert, TrendingDown, BarChart3, Activity, Target, Gauge } from "lucide-react";
import type { RiskMetrics } from "@/lib/mockData";

interface Props {
  metrics: RiskMetrics;
}

export function RiskMetricsPanel({ metrics }: Props) {
  const cards = [
    {
      label: "Sharpe Ratio",
      value: metrics.sharpeRatio.toFixed(2),
      description: "Risk-adjusted return",
      icon: BarChart3,
      good: metrics.sharpeRatio > 1,
    },
    {
      label: "Sortino Ratio",
      value: metrics.sortinoRatio.toFixed(2),
      description: "Downside risk-adjusted",
      icon: Target,
      good: metrics.sortinoRatio > 1.5,
    },
    {
      label: "Max Drawdown",
      value: `${metrics.maxDrawdown.toFixed(1)}%`,
      description: "Peak-to-trough decline",
      icon: TrendingDown,
      good: metrics.maxDrawdown > -15,
    },
    {
      label: "VaR (95%)",
      value: `${metrics.var95.toFixed(1)}%`,
      description: "Daily value at risk",
      icon: ShieldAlert,
      good: metrics.var95 > -3,
    },
    {
      label: "VaR (99%)",
      value: `${metrics.var99.toFixed(1)}%`,
      description: "Extreme loss threshold",
      icon: ShieldAlert,
      good: metrics.var99 > -5,
    },
    {
      label: "Annualized Vol.",
      value: `${metrics.annualizedVolatility.toFixed(1)}%`,
      description: "Portfolio volatility",
      icon: Activity,
      good: metrics.annualizedVolatility < 20,
    },
    {
      label: "Beta (CAPM)",
      value: metrics.beta.toFixed(2),
      description: "Market sensitivity",
      icon: Gauge,
      good: metrics.beta < 1,
    },
    {
      label: "Alpha",
      value: `${metrics.alpha > 0 ? "+" : ""}${metrics.alpha.toFixed(1)}%`,
      description: "Excess return vs benchmark",
      icon: TrendingDown,
      good: metrics.alpha > 0,
    },
  ];

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-semibold text-sm">Risk & Performance Metrics</h3>
        <p className="text-xs text-muted-foreground mt-0.5">VaR, CAPM & ICAAP framework analysis</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {cards.map((card, i) => (
          <div key={card.label} className={`p-4 ${i < cards.length - (cards.length % 4 || 4) ? "border-b" : ""} ${(i + 1) % 4 !== 0 ? "border-r" : ""} border-border/50`}>
            <div className="flex items-center gap-1.5 mb-2">
              <card.icon className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{card.label}</span>
            </div>
            <p className={`text-xl font-bold font-mono ${card.good ? "text-signal-buy" : "text-signal-sell"}`}>
              {card.value}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
