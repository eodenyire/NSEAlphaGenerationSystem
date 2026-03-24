// Mock data for the NSE Alpha trading dashboard

export interface StockSignal {
  symbol: string;
  name: string;
  price: number;
  change: number;
  signal: "BUY" | "HOLD" | "SELL";
  confidence: number;
  volume: number;
  rsi: number;
  macd: number;
  sector: string;
}

export interface PricePoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  predicted: number;
  volume: number;
}

export interface PortfolioMetric {
  date: string;
  portfolio: number;
  benchmark: number;
}

export interface RiskMetrics {
  sharpeRatio: number;
  sortinoRatio: number;
  maxDrawdown: number;
  var95: number;
  var99: number;
  annualizedVolatility: number;
  beta: number;
  alpha: number;
  informationRatio: number;
  treynorRatio: number;
}

export const mockSignals: StockSignal[] = [
  { symbol: "SCOM", name: "Safaricom PLC", price: 38.25, change: 2.4, signal: "BUY", confidence: 87, volume: 12400000, rsi: 42, macd: 0.34, sector: "Telecom" },
  { symbol: "EQTY", name: "Equity Group", price: 52.10, change: -1.2, signal: "HOLD", confidence: 64, volume: 8200000, rsi: 55, macd: -0.12, sector: "Banking" },
  { symbol: "KCB", name: "KCB Group", price: 44.80, change: 1.8, signal: "BUY", confidence: 79, volume: 6800000, rsi: 38, macd: 0.56, sector: "Banking" },
  { symbol: "COOP", name: "Co-op Bank", price: 15.45, change: 0.6, signal: "HOLD", confidence: 58, volume: 3200000, rsi: 50, macd: 0.08, sector: "Banking" },
  { symbol: "ABSA", name: "ABSA Bank Kenya", price: 14.20, change: -0.3, signal: "HOLD", confidence: 52, volume: 2100000, rsi: 48, macd: -0.05, sector: "Banking" },
  { symbol: "BAT", name: "BAT Kenya", price: 310.00, change: 3.1, signal: "BUY", confidence: 82, volume: 450000, rsi: 35, macd: 1.22, sector: "Manufacturing" },
  { symbol: "EABL", name: "EABL", price: 165.50, change: -2.1, signal: "SELL", confidence: 74, volume: 920000, rsi: 68, macd: -0.88, sector: "Manufacturing" },
  { symbol: "BAMB", name: "Bamburi Cement", price: 32.75, change: 0.9, signal: "BUY", confidence: 71, volume: 1500000, rsi: 40, macd: 0.28, sector: "Construction" },
  { symbol: "KPLC", name: "Kenya Power", price: 2.18, change: -4.5, signal: "SELL", confidence: 91, volume: 5600000, rsi: 72, macd: -0.15, sector: "Energy" },
  { symbol: "KNRE", name: "Kenya Re", price: 2.65, change: 1.5, signal: "BUY", confidence: 68, volume: 1800000, rsi: 44, macd: 0.06, sector: "Insurance" },
  { symbol: "SCBK", name: "Standard Chartered", price: 198.00, change: 0.8, signal: "HOLD", confidence: 55, volume: 720000, rsi: 52, macd: 0.14, sector: "Banking" },
  { symbol: "NCBA", name: "NCBA Group", price: 45.60, change: -1.0, signal: "SELL", confidence: 66, volume: 1200000, rsi: 63, macd: -0.32, sector: "Banking" },
  { symbol: "SASN", name: "Sasini PLC", price: 22.40, change: 2.8, signal: "BUY", confidence: 76, volume: 980000, rsi: 36, macd: 0.42, sector: "Agriculture" },
  { symbol: "TOTL", name: "Total Energies", price: 25.50, change: -0.5, signal: "HOLD", confidence: 60, volume: 540000, rsi: 50, macd: -0.02, sector: "Energy" },
  { symbol: "JUB", name: "Jubilee Holdings", price: 195.00, change: 1.2, signal: "BUY", confidence: 73, volume: 380000, rsi: 41, macd: 0.65, sector: "Insurance" },
];

// Generate 60 days of price data for SCOM
function generatePriceHistory(): PricePoint[] {
  const data: PricePoint[] = [];
  let price = 34.0;
  const startDate = new Date("2025-12-01");

  for (let i = 0; i < 60; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    const volatility = 0.02 + Math.random() * 0.015;
    const trend = 0.001;
    const change = (Math.random() - 0.48) * volatility + trend;
    price = price * (1 + change);

    const high = price * (1 + Math.random() * 0.015);
    const low = price * (1 - Math.random() * 0.015);
    const open = price * (1 + (Math.random() - 0.5) * 0.01);
    const predicted = price * (1 + (Math.random() - 0.45) * 0.008);

    data.push({
      date: date.toISOString().split("T")[0],
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +price.toFixed(2),
      predicted: +predicted.toFixed(2),
      volume: Math.floor(8000000 + Math.random() * 8000000),
    });
  }
  return data;
}

// Generate portfolio vs benchmark performance
function generatePortfolioPerformance(): PortfolioMetric[] {
  const data: PortfolioMetric[] = [];
  let portfolio = 100;
  let benchmark = 100;
  const startDate = new Date("2025-06-01");

  for (let i = 0; i < 180; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    portfolio *= 1 + (Math.random() - 0.46) * 0.018;
    benchmark *= 1 + (Math.random() - 0.48) * 0.014;

    data.push({
      date: date.toISOString().split("T")[0],
      portfolio: +portfolio.toFixed(2),
      benchmark: +benchmark.toFixed(2),
    });
  }
  return data;
}

export const mockPriceHistory = generatePriceHistory();
export const mockPortfolioPerformance = generatePortfolioPerformance();

export const mockRiskMetrics: RiskMetrics = {
  sharpeRatio: 1.84,
  sortinoRatio: 2.31,
  maxDrawdown: -12.4,
  var95: -2.8,
  var99: -4.6,
  annualizedVolatility: 18.2,
  beta: 0.76,
  alpha: 8.4,
  informationRatio: 1.12,
  treynorRatio: 0.22,
};

export interface MacroEvent {
  date: string;
  title: string;
  impact: "high" | "medium" | "low";
  category: string;
}

export const mockMacroEvents: MacroEvent[] = [
  { date: "2026-03-25", title: "CBK Interest Rate Decision", impact: "high", category: "Monetary Policy" },
  { date: "2026-03-27", title: "Kenya CPI Inflation Release", impact: "high", category: "Economic Data" },
  { date: "2026-03-28", title: "US Fed Meeting Minutes", impact: "medium", category: "Global" },
  { date: "2026-04-01", title: "NSE Q1 Market Report", impact: "medium", category: "Market" },
  { date: "2026-04-03", title: "Kenya GDP Growth Estimate", impact: "high", category: "Economic Data" },
  { date: "2026-04-05", title: "OPEC+ Production Meeting", impact: "medium", category: "Global" },
];

export interface SentimentData {
  source: string;
  sentiment: number; // -1 to 1
  mentions: number;
  trend: "up" | "down" | "stable";
}

export const mockSentiment: SentimentData[] = [
  { source: "News Articles", sentiment: 0.35, mentions: 142, trend: "up" },
  { source: "Social Media", sentiment: 0.12, mentions: 2840, trend: "stable" },
  { source: "Analyst Reports", sentiment: 0.58, mentions: 28, trend: "up" },
  { source: "Economic Indicators", sentiment: -0.15, mentions: 15, trend: "down" },
];
