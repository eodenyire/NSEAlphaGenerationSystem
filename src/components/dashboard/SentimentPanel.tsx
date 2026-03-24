import type { SentimentData } from "@/lib/mockData";
import { TrendingUp, TrendingDown, Minus, MessageSquare } from "lucide-react";

interface Props {
  data: SentimentData[];
}

const trendIcon = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

export function SentimentPanel({ data }: Props) {
  const overallSentiment = data.reduce((sum, d) => sum + d.sentiment * d.mentions, 0) /
    data.reduce((sum, d) => sum + d.mentions, 0);

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold text-sm">Market Sentiment</h3>
        </div>
        <span className={`text-xs font-mono font-semibold ${overallSentiment >= 0 ? "text-signal-buy" : "text-signal-sell"}`}>
          {overallSentiment >= 0 ? "Bullish" : "Bearish"} ({(overallSentiment * 100).toFixed(0)}%)
        </span>
      </div>
      <div className="divide-y divide-border/50">
        {data.map((d) => {
          const Icon = trendIcon[d.trend];
          const sentimentPct = ((d.sentiment + 1) / 2) * 100;
          return (
            <div key={d.source} className="px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">{d.source}</span>
                <div className="flex items-center gap-2">
                  <Icon className={`h-3 w-3 ${d.trend === "up" ? "text-signal-buy" : d.trend === "down" ? "text-signal-sell" : "text-muted-foreground"}`} />
                  <span className="text-xs text-muted-foreground font-mono">{d.mentions} mentions</span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${sentimentPct}%`,
                    background: `linear-gradient(90deg, hsl(0, 72%, 56%) 0%, hsl(38, 92%, 55%) 50%, hsl(142, 72%, 50%) 100%)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
