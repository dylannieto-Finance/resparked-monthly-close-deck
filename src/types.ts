export type PageView =
  | 'executive'
  | 'pl-real-vs-bp'
  | 'pl-us-vs-international'
  | 'opex-real-vs-bp'
  | 'opex-trends'
  | 'opex-suppliers'
  | 'balance-sheet'
  | 'gm2-summary'
  | 'gm2-heatmap'
  | 'q4-discounts'
  | 'profitability-drivers'
  | 'cash-flow';

export type BudgetStatus = 'on_track' | 'near_limit' | 'over_budget';

export interface ScorecardMetric {
  id: string;
  label: string;
  value: number;
  isCurrency?: boolean;
  isPercentage?: boolean;
  momChange?: number; // % change MoM
  yoyChange?: number; // % change YoY
  bpVariance?: number; // Variance vs BP
  scVariance?: number; // Variance vs SC
  secondaryLabel?: string;
  secondaryValue?: string | number;
  pctRevenueThisMonth?: string;
  pctRevenueLastMonth?: string;
  pctRevenueAvgAnnual?: string;
  sheetRow?: number;
  columnLetter?: string;
}

export interface PLRow {
  id: string;
  name: string;
  isIndent?: boolean;
  isHighlight?: boolean;
  isHeader?: boolean;
  real: number;
  bp: number;
  sc?: number;
  pctOfRevenueReal?: number;
  pctOfRevenueBP?: number;
  pctOfRevenueSC?: number;
}

export interface OPEXItem {
  id: string;
  bpLine: string;
  category: string;
  team: string;
  real: number;
  budget: number;
  executionPct: number;
  status: BudgetStatus;
}

export interface OPEXMoMVariation {
  id: string;
  bpLine: string;
  team: string;
  category: string;
  amount: number;
  pctChange: number;
}

export interface OPEXMonthlyTrend {
  month: string;
  Personal: number;
  Marketing: number;
  Software: number;
  Oficina: number;
  Legal: number;
  Otros: number;
  Total: number;
}

export interface SupplierItem {
  id: string;
  supplier: string;
  contract: string;
  category: string;
  amount: number;
  prevAmount: number;
  pctChange: number;
}

export interface BalanceSheetData {
  period: string; // e.g. "Julio 2026"
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  currentAssets: number;
  currentLiabilities: number;
  quickAssets: number;
  // Ratios
  currentRatio: number;
  quickRatio: number;
  debtToEquity: number;
  debtToAsset: number;
  assetBreakdown: { category: string; value: number }[];
  liabEquityBreakdown: { category: string; value: number }[];
}

export interface GM2Cell {
  channel: string;
  family: string;
  gm2Pct: number;
  revenue: number;
}

export interface GM2Comparison {
  id: string;
  channel: string;
  market: 'USA' | 'Internacional';
  family: string;
  revCurrent: number;
  gm2PctCurrent: number;
  revPrev: number;
  gm2PctPrev: number;
  diffPoints: number; // e.g. +2.4
  trend: 'up' | 'down' | 'flat';
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  currency: string;
  balance: number;
  status: 'active' | 'restricted';
}

export interface CashProjectionPoint {
  date: string;
  dayLabel: string;
  projectedCash: number;
  inflows: number;
  outflows: number;
}

export interface SheetsValueResponse {
  range: string;
  majorDimension: string;
  values?: string[][];
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

export interface SheetsApiError {
  error: string;
  details?: any;
}
