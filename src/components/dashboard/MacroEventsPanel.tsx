import { Calendar, AlertTriangle, Info, Globe } from "lucide-react";
import type { MacroEvent } from "@/lib/mockData";

const impactConfig = {
  high: { color: "text-signal-sell", bg: "bg-signal-sell/10", label: "High" },
  medium: { color: "text-signal-hold", bg: "bg-signal-hold/10", label: "Medium" },
  low: { color: "text-muted-foreground", bg: "bg-muted", label: "Low" },
};

interface Props {
  events: MacroEvent[];
}

export function MacroEventsPanel({ events }: Props) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-semibold text-sm">Macro Events Calendar</h3>
      </div>
      <div className="divide-y divide-border/50">
        {events.map((event, i) => {
          const cfg = impactConfig[event.impact];
          return (
            <div key={i} className="px-4 py-3 flex items-start gap-3">
              <div className="text-center min-w-[40px]">
                <p className="text-xs text-muted-foreground">{event.date.slice(5, 7)}/{event.date.slice(8)}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{event.title}</p>
                <p className="text-xs text-muted-foreground">{event.category}</p>
              </div>
              <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${cfg.color} ${cfg.bg}`}>
                {cfg.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
