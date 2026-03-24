import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts";
import type { PricePoint } from "@/lib/mockData";

interface Props {
  data: PricePoint[];
  symbol: string;
}

export function StockChart({ data, symbol }: Props) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-sm">{symbol} Price & Prediction</h3>
          <p className="text-xs text-muted-foreground mt-0.5">60-day actual vs ML predicted price</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Actual
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Predicted
          </span>
        </div>
      </div>
      <div className="p-4">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <defs>
              <linearGradient id="gradActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(185, 65%, 48%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(185, 65%, 48%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(142, 72%, 50%)" stopOpacity={0.2} />
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
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(215, 14%, 50%)" }}
              axisLine={{ stroke: "hsl(220, 14%, 16%)" }}
              tickLine={false}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220, 18%, 7%)",
                border: "1px solid hsl(220, 14%, 16%)",
                borderRadius: "6px",
                fontSize: 12,
                color: "hsl(210, 20%, 95%)",
              }}
              labelFormatter={(v) => `Date: ${v}`}
            />
            <Area
              type="monotone"
              dataKey="close"
              stroke="hsl(185, 65%, 48%)"
              strokeWidth={2}
              fill="url(#gradActual)"
              name="Actual"
            />
            <Area
              type="monotone"
              dataKey="predicted"
              stroke="hsl(142, 72%, 50%)"
              strokeWidth={2}
              strokeDasharray="4 4"
              fill="url(#gradPredicted)"
              name="Predicted"
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Volume chart */}
        <ResponsiveContainer width="100%" height={60}>
          <BarChart data={data} margin={{ top: 0, right: 5, bottom: 0, left: 5 }}>
            <Bar dataKey="volume" fill="hsl(220, 14%, 20%)" radius={[2, 2, 0, 0]} />
            <XAxis dataKey="date" hide />
            <YAxis hide />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
