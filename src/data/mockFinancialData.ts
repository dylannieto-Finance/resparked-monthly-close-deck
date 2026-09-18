import {
  ScorecardMetric,
  PLRow,
  OPEXItem,
  OPEXMoMVariation,
  OPEXMonthlyTrend,
  SupplierItem,
  BalanceSheetData,
  GM2Cell,
  GM2Comparison,
  BankAccount,
  CashProjectionPoint,
} from '../types';

// 1. Executive Summary Scorecards (Agosto 2026 Cerrado)
export const EXECUTIVE_SCORECARDS: ScorecardMetric[] = [
  {
    id: 'net-revenue',
    label: 'Net Revenue del Mes',
    value: 576789,
    isCurrency: true,
    momChange: 29.1,
    bpVariance: 576789 - 1020000, // -443211
    scVariance: 576789 - 478900, // +97889
  },
  {
    id: 'gm1',
    label: 'GM1 del Mes',
    value: 521861,
    isCurrency: true,
    momChange: 29.7,
    secondaryLabel: '% sobre Revenue',
    secondaryValue: '90%',
  },
  {
    id: 'gm2',
    label: 'GM2 del Mes',
    value: 413633,
    isCurrency: true,
    momChange: 69.2,
    secondaryLabel: '% sobre Revenue',
    secondaryValue: '72%',
  },
  {
    id: 'gm3',
    label: 'GM3 del Mes',
    value: -46974,
    isCurrency: true,
    momChange: 58.1,
    secondaryLabel: '% sobre Revenue',
    secondaryValue: '-8%',
  },
  {
    id: 'advertising',
    label: 'Gasto de Ads',
    value: -460607,
    isCurrency: true,
    momChange: 29.2,
    pctRevenueThisMonth: '80%',
    pctRevenueLastMonth: '80%',
    pctRevenueAvgAnnual: '75%',
  },
  {
    id: 'net-income',
    label: 'Net Income del Mes',
    value: -313258,
    isCurrency: true,
    momChange: 20.8,
  },
];

// 2. P&L Main Lines Table Data (Agosto 2026 Cerrado)
export const PL_MAIN_ROWS: PLRow[] = [
  {
    id: 'net-revenue',
    name: 'Net Revenue',
    isHighlight: false,
    real: 576789,
    bp: 1000000,
    sc: 577376,
  },
  {
    id: 'cogs',
    name: 'COGS',
    isIndent: false,
    real: 54928,
    bp: 86372,
    sc: 50234,
    pctOfRevenueReal: 10,
    pctOfRevenueBP: 9,
    pctOfRevenueSC: 9,
  },
  {
    id: 'gm1',
    name: 'GM1',
    isHighlight: true,
    real: 521861,
    bp: 913628,
    sc: 527142,
    pctOfRevenueReal: 90,
    pctOfRevenueBP: 91,
    pctOfRevenueSC: 91,
  },
  {
    id: 'last-mile',
    name: 'Last Mile',
    isIndent: false,
    real: 70606,
    bp: 81694,
    sc: 41596,
    pctOfRevenueReal: 12,
    pctOfRevenueBP: 8,
    pctOfRevenueSC: 7,
  },
  {
    id: 'platform-fees',
    name: 'Platform Fees',
    isIndent: false,
    real: 37622,
    bp: 71348,
    sc: 35893,
    pctOfRevenueReal: 7,
    pctOfRevenueBP: 7,
    pctOfRevenueSC: 6,
  },
  {
    id: 'gm2',
    name: 'GM2',
    isHighlight: true,
    real: 413633,
    bp: 760586,
    sc: 449653,
    pctOfRevenueReal: 72,
    pctOfRevenueBP: 76,
    pctOfRevenueSC: 78,
  },
  {
    id: 'advertising',
    name: 'Advertising',
    isIndent: false,
    real: 460607,
    bp: 588235,
    sc: 448539,
    pctOfRevenueReal: 80,
    pctOfRevenueBP: 59,
    pctOfRevenueSC: 78,
  },
  {
    id: 'gm3',
    name: 'GM3',
    isHighlight: true,
    real: -46974,
    bp: 172351,
    sc: 1114,
    pctOfRevenueReal: -8,
    pctOfRevenueBP: 17,
    pctOfRevenueSC: 0,
  },
  {
    id: 'opex',
    name: 'OPEX',
    isIndent: false,
    real: 283874,
    bp: 372197,
    sc: 382028,
    pctOfRevenueReal: 49,
    pctOfRevenueBP: 37,
    pctOfRevenueSC: 66,
  },
  {
    id: 'ebitda',
    name: 'EBITDA',
    isHighlight: true,
    real: -330847,
    bp: -199846,
    sc: -380914,
    pctOfRevenueReal: -57,
    pctOfRevenueBP: -20,
    pctOfRevenueSC: -66,
  },
  {
    id: 'other-income',
    name: 'Other Income',
    isIndent: false,
    real: 19397,
    bp: 21811,
  },
  {
    id: 'other-expenses',
    name: 'Other Expenses',
    isIndent: false,
    real: 1807,
    bp: 7399,
  },
  {
    id: 'net-income',
    name: 'Net Income',
    isHighlight: true,
    real: -313258,
    bp: -185434,
    sc: -380914,
    pctOfRevenueReal: -54,
    pctOfRevenueBP: -19,
    pctOfRevenueSC: -66,
  },
];

// 3. OPEX Real vs BP Items
export const OPEX_REAL_VS_BP_ITEMS: OPEXItem[] = [
  {
    id: 'op-1',
    bpLine: 'OPEX-101',
    category: 'Personal & Nómina',
    team: 'Tecnología',
    real: 145000,
    budget: 140000,
    executionPct: 103.6,
    status: 'near_limit',
  },
  {
    id: 'op-2',
    bpLine: 'OPEX-102',
    category: 'Marketing Digital',
    team: 'Growth & Ads',
    real: 68500,
    budget: 55000,
    executionPct: 124.5,
    status: 'over_budget',
  },
  {
    id: 'op-3',
    bpLine: 'OPEX-103',
    category: 'Software & Cloud SaaS',
    team: 'Sistemas',
    real: 28400,
    budget: 30000,
    executionPct: 94.7,
    status: 'on_track',
  },
  {
    id: 'op-4',
    bpLine: 'OPEX-104',
    category: 'Oficina & Alquiler',
    team: 'Operaciones',
    real: 18500,
    budget: 18500,
    executionPct: 100.0,
    status: 'on_track',
  },
  {
    id: 'op-5',
    bpLine: 'OPEX-105',
    category: 'Servicios Legales & Fiscales',
    team: 'Finanzas',
    real: 14200,
    budget: 11000,
    executionPct: 129.1,
    status: 'over_budget',
  },
  {
    id: 'op-6',
    bpLine: 'OPEX-106',
    category: 'Viajes & Representación',
    team: 'Ventas Corp',
    real: 9800,
    budget: 12000,
    executionPct: 81.7,
    status: 'on_track',
  },
  {
    id: 'op-7',
    bpLine: 'OPEX-107',
    category: 'Consultoría Externa',
    team: 'Estrategia',
    real: 13800,
    budget: 13500,
    executionPct: 102.2,
    status: 'near_limit',
  },
  {
    id: 'op-8',
    bpLine: 'OPEX-108',
    category: 'Logística & Suministros',
    team: 'Depósito',
    real: 10500,
    budget: 12000,
    executionPct: 87.5,
    status: 'on_track',
  },
];

export const OPEX_MOM_VARIATIONS: OPEXMoMVariation[] = [
  {
    id: 'var-1',
    bpLine: 'OPEX-102',
    team: 'Growth & Ads',
    category: 'Marketing Digital',
    amount: 13500,
    pctChange: 24.5,
  },
  {
    id: 'var-2',
    bpLine: 'OPEX-105',
    team: 'Finanzas',
    category: 'Servicios Legales & Fiscales',
    amount: 3200,
    pctChange: 29.1,
  },
  {
    id: 'var-3',
    bpLine: 'OPEX-101',
    team: 'Tecnología',
    category: 'Personal & Nómina',
    amount: 5000,
    pctChange: 3.6,
  },
  {
    id: 'var-4',
    bpLine: 'OPEX-107',
    team: 'Estrategia',
    category: 'Consultoría Externa',
    amount: 300,
    pctChange: 2.2,
  },
];

// 4. OPEX Trends (Monthly Multi-Series & Stacked)
export const OPEX_MONTHLY_TRENDS: OPEXMonthlyTrend[] = [
  { month: 'Ene 2026', Personal: 132000, Marketing: 52000, Software: 26000, Oficina: 18000, Legal: 9500, Otros: 18500, Total: 256000 },
  { month: 'Feb 2026', Personal: 135000, Marketing: 54000, Software: 26500, Oficina: 18000, Legal: 10000, Otros: 19000, Total: 262500 },
  { month: 'Mar 2026', Personal: 138000, Marketing: 58000, Software: 27000, Oficina: 18200, Legal: 10500, Otros: 19500, Total: 271200 },
  { month: 'Abr 2026', Personal: 140000, Marketing: 60000, Software: 27500, Oficina: 18500, Legal: 11000, Otros: 20000, Total: 277000 },
  { month: 'May 2026', Personal: 141000, Marketing: 62000, Software: 28000, Oficina: 18500, Legal: 12000, Otros: 20500, Total: 282000 },
  { month: 'Jun 2026', Personal: 143000, Marketing: 65000, Software: 28200, Oficina: 18500, Legal: 13000, Otros: 21000, Total: 288700 },
  { month: 'Jul 2026', Personal: 145000, Marketing: 68500, Software: 28400, Oficina: 18500, Legal: 14200, Otros: 23600, Total: 298200 },
];

// 5. Top Suppliers
export const TOP_SUPPLIERS: SupplierItem[] = [
  { id: 'sup-1', supplier: 'Amazon Web Services (AWS)', contract: 'CT-2025-089', category: 'Software & Cloud SaaS', amount: 16800, prevAmount: 15400, pctChange: 9.1 },
  { id: 'sup-2', supplier: 'Google Ads & DoubleClick', contract: 'MKT-2026-01', category: 'Marketing Digital', amount: 34500, prevAmount: 28000, pctChange: 23.2 },
  { id: 'sup-3', supplier: 'Meta Platforms Ads', contract: 'MKT-2026-02', category: 'Marketing Digital', amount: 22100, prevAmount: 19500, pctChange: 13.3 },
  { id: 'sup-4', supplier: 'WeWork Office Spaces', contract: 'OFC-2024-11', category: 'Oficina & Alquiler', amount: 18500, prevAmount: 18500, pctChange: 0.0 },
  { id: 'sup-5', supplier: 'KPMG Audit & Tax', contract: 'FIN-2025-04', category: 'Servicios Legales & Fiscales', amount: 12000, prevAmount: 8500, pctChange: 41.2 },
  { id: 'sup-6', supplier: 'Salesforce Enterprise', contract: 'SFT-2025-10', category: 'Software & Cloud SaaS', amount: 8900, prevAmount: 8900, pctChange: 0.0 },
  { id: 'sup-7', supplier: 'McKinsey Advisory', contract: 'EST-2026-03', category: 'Consultoría Externa', amount: 11500, prevAmount: 11000, pctChange: 4.5 },
  { id: 'sup-8', supplier: 'FedEx Express Global', contract: 'LOG-2025-99', category: 'Logística & Suministros', amount: 7800, prevAmount: 8200, pctChange: -4.8 },
  { id: 'sup-9', supplier: 'Slack & Atlassian Bundle', contract: 'SFT-2024-03', category: 'Software & Cloud SaaS', amount: 4200, prevAmount: 4200, pctChange: 0.0 },
  { id: 'sup-10', supplier: 'Marsh McLennan Insurance', contract: 'INS-2025-01', category: 'Otros OPEX', amount: 3800, prevAmount: 3600, pctChange: 5.6 },
];

// 6. Balance Sheet Data (Julio 2026)
export const MOCK_BALANCE_SHEET: BalanceSheetData = {
  period: 'Julio 2026',
  totalAssets: 4850000,
  totalLiabilities: 1920000,
  totalEquity: 2930000,
  currentAssets: 2150000,
  currentLiabilities: 980000,
  quickAssets: 1720000,
  currentRatio: 2.19, // 2,150,000 / 980,000
  quickRatio: 1.76,   // 1,720,000 / 980,000
  debtToEquity: 0.66, // 1,920,000 / 2,930,000
  debtToAsset: 0.40,  // 1,920,000 / 4,850,000
  assetBreakdown: [
    { category: 'Caja y Bancos', value: 1240000 },
    { category: 'Cuentas por Cobrar', value: 480000 },
    { category: 'Inventarios', value: 430000 },
    { category: 'Propiedad y Equipo (PPE)', value: 2100000 },
    { category: 'Otros Activos No Corrientes', value: 600000 },
  ],
  liabEquityBreakdown: [
    { category: 'Proveedores y Pagarés', value: 620000 },
    { category: 'Deuda Corto Plazo', value: 360000 },
    { category: 'Deuda Largo Plazo', value: 940000 },
    { category: 'Capital Social', value: 2000000 },
    { category: 'Resultados Acumulados', value: 930000 },
  ],
};

// 7. Heatmap GM2% Data
export const CHANNELS = ['Amazon USA', 'Shopify DTC', 'Wholesale B2B', 'Retail Chains'];
export const FAMILIES = ['Apparel', 'Electronics', 'Accessories', 'Home & Deco', 'Beauty & Health'];

export const GM2_HEATMAP_DATA: GM2Cell[] = [
  { channel: 'Amazon USA', family: 'Apparel', gm2Pct: 58.4, revenue: 320000 },
  { channel: 'Amazon USA', family: 'Electronics', gm2Pct: 42.1, revenue: 210000 },
  { channel: 'Amazon USA', family: 'Accessories', gm2Pct: 62.5, revenue: 150000 },
  { channel: 'Amazon USA', family: 'Home & Deco', gm2Pct: 35.8, revenue: 95000 },
  { channel: 'Amazon USA', family: 'Beauty & Health', gm2Pct: 51.0, revenue: 120000 },

  { channel: 'Shopify DTC', family: 'Apparel', gm2Pct: 64.2, revenue: 280000 },
  { channel: 'Shopify DTC', family: 'Electronics', gm2Pct: 48.0, revenue: 160000 },
  { channel: 'Shopify DTC', family: 'Accessories', gm2Pct: 68.1, revenue: 140000 },
  { channel: 'Shopify DTC', family: 'Home & Deco', gm2Pct: 41.5, revenue: 85000 },
  { channel: 'Shopify DTC', family: 'Beauty & Health', gm2Pct: 59.3, revenue: 110000 },

  { channel: 'Wholesale B2B', family: 'Apparel', gm2Pct: 38.0, revenue: 190000 },
  { channel: 'Wholesale B2B', family: 'Electronics', gm2Pct: 22.4, revenue: 130000 },
  { channel: 'Wholesale B2B', family: 'Accessories', gm2Pct: 44.0, revenue: 90000 },
  { channel: 'Wholesale B2B', family: 'Home & Deco', gm2Pct: 18.5, revenue: 60000 },
  { channel: 'Wholesale B2B', family: 'Beauty & Health', gm2Pct: 31.2, revenue: 75000 },

  { channel: 'Retail Chains', family: 'Apparel', gm2Pct: 42.5, revenue: 140000 },
  { channel: 'Retail Chains', family: 'Electronics', gm2Pct: 28.1, revenue: 105000 },
  { channel: 'Retail Chains', family: 'Accessories', gm2Pct: 49.0, revenue: 80000 },
  { channel: 'Retail Chains', family: 'Home & Deco', gm2Pct: 24.0, revenue: 50000 },
  { channel: 'Retail Chains', family: 'Beauty & Health', gm2Pct: 37.6, revenue: 65000 },
];

export const GM2_COMPARISONS: GM2Comparison[] = [
  { id: 'gm-1', channel: 'Shopify DTC', market: 'USA', family: 'Accessories', revCurrent: 140000, gm2PctCurrent: 68.1, revPrev: 125000, gm2PctPrev: 65.0, diffPoints: 3.1, trend: 'up' },
  { id: 'gm-2', channel: 'Shopify DTC', market: 'USA', family: 'Apparel', revCurrent: 280000, gm2PctCurrent: 64.2, revPrev: 260000, gm2PctPrev: 62.1, diffPoints: 2.1, trend: 'up' },
  { id: 'gm-3', channel: 'Amazon USA', market: 'USA', family: 'Accessories', revCurrent: 150000, gm2PctCurrent: 62.5, revPrev: 145000, gm2PctPrev: 63.2, diffPoints: -0.7, trend: 'down' },
  { id: 'gm-4', channel: 'Amazon USA', market: 'USA', family: 'Apparel', revCurrent: 320000, gm2PctCurrent: 58.4, revPrev: 310000, gm2PctPrev: 57.0, diffPoints: 1.4, trend: 'up' },
  { id: 'gm-5', channel: 'Wholesale B2B', market: 'Internacional', family: 'Home & Deco', revCurrent: 60000, gm2PctCurrent: 18.5, revPrev: 65000, gm2PctPrev: 21.0, diffPoints: -2.5, trend: 'down' },
  { id: 'gm-6', channel: 'Wholesale B2B', market: 'Internacional', family: 'Electronics', revCurrent: 130000, gm2PctCurrent: 22.4, revPrev: 128000, gm2PctPrev: 22.2, diffPoints: 0.2, trend: 'flat' },
];

// 8. Cash Flow Data
export const BANK_ACCOUNTS: BankAccount[] = [
  { id: 'acc-1', bankName: 'JPMorgan Chase (Operating)', accountNumber: '**** 8842', currency: 'USD', balance: 742000, status: 'active' },
  { id: 'acc-2', bankName: 'Bank of America (Treasury)', accountNumber: '**** 1109', currency: 'USD', balance: 380000, status: 'active' },
  { id: 'acc-3', bankName: 'Silicon Valley Bank (Payroll)', accountNumber: '**** 4521', currency: 'USD', balance: 118000, status: 'active' },
];

export const CASH_PROJECTION_POINTS: CashProjectionPoint[] = [
  { date: '2026-08-07', dayLabel: 'Hoy', projectedCash: 1240000, inflows: 0, outflows: 0 },
  { date: '2026-08-14', dayLabel: '+7d', projectedCash: 1295000, inflows: 120000, outflows: 65000 },
  { date: '2026-08-21', dayLabel: '+14d', projectedCash: 1330000, inflows: 95000, outflows: 60000 },
  { date: '2026-08-31', dayLabel: '+24d', projectedCash: 1210000, inflows: 80000, outflows: 200000 }, // Payroll
  { date: '2026-09-07', dayLabel: '+30d', projectedCash: 1380000, inflows: 230000, outflows: 60000 },
  { date: '2026-09-21', dayLabel: '+45d', projectedCash: 1450000, inflows: 150000, outflows: 80000 },
  { date: '2026-10-07', dayLabel: '+60d', projectedCash: 1590000, inflows: 210000, outflows: 70000 },
  { date: '2026-10-21', dayLabel: '+75d', projectedCash: 1640000, inflows: 130000, outflows: 80000 },
  { date: '2026-11-07', dayLabel: '+90d', projectedCash: 1780000, inflows: 220000, outflows: 80000 },
];

// 9. P&L Apertura por Mercado: US vs International
export interface MarketPLItem {
  id: string;
  name: string;
  isSubtotal?: boolean;
  isPercentageRow?: boolean;
  isExpense?: boolean;
  us: number;
  international: number;
  total: number;
  usPctOfRevenue?: number;
  intlPctOfRevenue?: number;
  totalPctOfRevenue?: number;
}

export const MARKET_PL_ROWS: MarketPLItem[] = [
  {
    id: 'net-revenue',
    name: 'Net Revenue',
    isSubtotal: true,
    us: 393000.00,
    international: 183910.00,
    total: 576910.00,
    usPctOfRevenue: 100,
    intlPctOfRevenue: 100,
    totalPctOfRevenue: 100,
  },
  {
    id: 'cogs',
    name: 'COGS',
    isExpense: true,
    us: 39849.67,
    international: 14884.33,
    total: 54734.00,
    usPctOfRevenue: 10.14,
    intlPctOfRevenue: 8.09,
    totalPctOfRevenue: 9.49,
  },
  {
    id: 'gm1',
    name: 'GM1',
    isSubtotal: true,
    us: 353150.33,
    international: 169025.67,
    total: 522176.00,
    usPctOfRevenue: 89.86,
    intlPctOfRevenue: 91.91,
    totalPctOfRevenue: 90.51,
  },
  {
    id: 'gm1-pct',
    name: '% GM1',
    isPercentageRow: true,
    us: 89.86,
    international: 91.91,
    total: 90.51,
  },
  {
    id: 'last-mile',
    name: 'Last Mile',
    isExpense: true,
    us: 52800.00,
    international: 17800.00,
    total: 70600.00,
    usPctOfRevenue: 13.44,
    intlPctOfRevenue: 9.68,
    totalPctOfRevenue: 12.24,
  },
  {
    id: 'platform-fees',
    name: 'Platform Fees',
    isExpense: true,
    us: 28162.00,
    international: 9500.00,
    total: 37662.00,
    usPctOfRevenue: 7.17,
    intlPctOfRevenue: 5.17,
    totalPctOfRevenue: 6.53,
  },
  {
    id: 'gm2',
    name: 'GM2',
    isSubtotal: true,
    us: 272188.33,
    international: 141725.67,
    total: 413914.00,
    usPctOfRevenue: 69.26,
    intlPctOfRevenue: 77.06,
    totalPctOfRevenue: 71.75,
  },
  {
    id: 'gm2-pct',
    name: '% GM2',
    isPercentageRow: true,
    us: 69.26,
    international: 77.06,
    total: 71.75,
  },
  {
    id: 'ad-spend',
    name: 'Ad Spend',
    isExpense: true,
    us: 293821.21,
    international: 166785.80,
    total: 460607.01,
    usPctOfRevenue: 74.76,
    intlPctOfRevenue: 90.69,
    totalPctOfRevenue: 79.84,
  },
  {
    id: 'gm3',
    name: 'GM3',
    isSubtotal: true,
    us: -21632.88,
    international: -25060.13,
    total: -46693.01,
    usPctOfRevenue: -5.50,
    intlPctOfRevenue: -13.63,
    totalPctOfRevenue: -8.09,
  },
  {
    id: 'gm3-pct',
    name: '% GM3',
    isPercentageRow: true,
    us: -5.50,
    international: -13.63,
    total: -8.09,
  },
];

export const MARKET_MIX_INSIGHTS = {
  intlShareJanJulAvg: 13.0,
  intlShareAug: 31.88, // 183910 / 576910 = 31.88%
  usAvgSinceMay: 395000,
  usAugSales: 393000,
};

