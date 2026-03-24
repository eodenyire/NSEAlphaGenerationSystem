import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { PortfolioMetric } from "@/lib/mockData";

interface Props {
  data: PortfolioMetric[];
}

export function PortfolioChart({ data }: Props) {
  const latest = data[data.length - 1];
  const portfolioReturn = ((latest.portfolio - 100) / 100 * 100).toFixed(1);
  const benchmarkReturn = ((latest.benchmark - 100) / 100 * 100).toFixed(1);

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-sm">Portfolio vs NSE 20-Share Index</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Cumulative performance (base = 100)</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-signal-buy">Portfolio: +{portfolioReturn}%</span>
          <span className="text-muted-foreground">Benchmark: +{benchmarkReturn}%</span>
        </div>
      </div>
      <div className="p-4">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <defs>
              <linearGradient id="gradPort" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(142, 72%, 50%)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="hsl(142, 72%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 16%)" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "hsl(215, 14%, 50%)" }}
              tickFormatter={(v) => v.slice(5)}
              axisLine={{ stroke: "hsl(220, 14%, 16%)" }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(215, 14%, 50%)" }}
              axisLine={{ stroke: "hsl(220, 14%, 16%)" }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220, 18%, 7%)",
                border: "1px solid hsl(220, 14%, 16%)",
                borderRadius: "6px",
                fontSize: 12,
                color: "hsl(210, 20%, 95%)",
              }}
            />
            <Area
              type="monotone"
              dataKey="portfolio"
              stroke="hsl(142, 72%, 50%)"
              strokeWidth={2}
              fill="url(#gradPort)"
              name="Portfolio"
            />
            <Area
              type="monotone"
              dataKey="benchmark"
              stroke="hsl(215, 14%, 50%)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="none"
              name="Benchmark"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
