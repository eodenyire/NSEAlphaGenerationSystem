import { TrendingUp, TrendingDown, Minus, ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { StockSignal } from "@/lib/mockData";

const signalConfig = {
  BUY: { color: "text-signal-buy", bg: "bg-signal-buy/10", border: "border-signal-buy/30", icon: TrendingUp },
  HOLD: { color: "text-signal-hold", bg: "bg-signal-hold/10", border: "border-signal-hold/30", icon: Minus },
  SELL: { color: "text-signal-sell", bg: "bg-signal-sell/10", border: "border-signal-sell/30", icon: TrendingDown },
};

interface Props {
  signals: StockSignal[];
  selectedSymbol: string;
  onSelect: (symbol: string) => void;
}

export function SignalsTable({ signals, selectedSymbol, onSelect }: Props) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-sm">Trading Signals</h3>
        <span className="text-xs text-muted-foreground font-mono">
          {signals.filter(s => s.signal === "BUY").length} BUY · {signals.filter(s => s.signal === "HOLD").length} HOLD · {signals.filter(s => s.signal === "SELL").length} SELL
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="text-left px-4 py-2 font-medium">Stock</th>
              <th className="text-right px-4 py-2 font-medium">Price</th>
              <th className="text-right px-4 py-2 font-medium">Change</th>
              <th className="text-center px-4 py-2 font-medium">Signal</th>
              <th className="text-right px-4 py-2 font-medium hidden md:table-cell">Confidence</th>
              <th className="text-right px-4 py-2 font-medium hidden lg:table-cell">RSI</th>
              <th className="text-right px-4 py-2 font-medium hidden lg:table-cell">MACD</th>
            </tr>
          </thead>
          <tbody>
            {signals.map((s) => {
              const cfg = signalConfig[s.signal];
              const isSelected = s.symbol === selectedSymbol;
              return (
                <tr
                  key={s.symbol}
                  onClick={() => onSelect(s.symbol)}
                  className={`border-b border-border/50 cursor-pointer transition-colors hover:bg-muted/30 ${isSelected ? "bg-muted/40" : ""}`}
                >
                  <td className="px-4 py-2.5">
                    <div>
                      <span className="font-semibold font-mono">{s.symbol}</span>
                      <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">{s.sector}</span>
                    </div>
                  </td>
                  <td className="text-right px-4 py-2.5 font-mono">{s.price.toFixed(2)}</td>
                  <td className="text-right px-4 py-2.5">
                    <span className={`inline-flex items-center gap-0.5 font-mono ${s.change >= 0 ? "text-signal-buy" : "text-signal-sell"}`}>
                      {s.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {s.change >= 0 ? "+" : ""}{s.change.toFixed(1)}%
                    </span>
                  </td>
                  <td className="text-center px-4 py-2.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold font-mono ${cfg.color} ${cfg.bg} border ${cfg.border}`}>
                      <cfg.icon className="h-3 w-3" />
                      {s.signal}
                    </span>
                  </td>
                  <td className="text-right px-4 py-2.5 hidden md:table-cell">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${s.confidence >= 75 ? "bg-signal-buy" : s.confidence >= 50 ? "bg-signal-hold" : "bg-signal-sell"}`}
                          style={{ width: `${s.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground w-8">{s.confidence}%</span>
                    </div>
                  </td>
                  <td className="text-right px-4 py-2.5 font-mono text-xs hidden lg:table-cell">
                    <span className={s.rsi > 70 ? "text-signal-sell" : s.rsi < 30 ? "text-signal-buy" : "text-muted-foreground"}>
                      {s.rsi}
                    </span>
                  </td>
                  <td className="text-right px-4 py-2.5 font-mono text-xs hidden lg:table-cell">
                    <span className={s.macd >= 0 ? "text-signal-buy" : "text-signal-sell"}>
                      {s.macd >= 0 ? "+" : ""}{s.macd.toFixed(2)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
