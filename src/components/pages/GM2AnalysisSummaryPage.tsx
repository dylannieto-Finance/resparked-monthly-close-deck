import React from 'react';
import { BarChart3, Trophy, AlertTriangle, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface ChannelSummary {
  channel: string;
  channelColor: string;
  netRevenue: number;
  gm2Dollar: number;
  gm2Pct: number;
  platformFeePct: number | null;
  mixNR: number;
}

interface TopBottomRow {
  channel: string;
  channelColor: string;
  market: 'USA' | 'Internacional';
  family: string;
  netRev: number;
  gm1Pct: number;
  gm2Pct: number;
  gm2Dollar: number;
}

const CHANNEL_SUMMARY_DATA: ChannelSummary[] = [
  {
    channel: 'Shopify',
    channelColor: 'text-[#2563EB]',
    netRevenue: 282837,
    gm2Dollar: 233052,
    gm2Pct: 82.4,
    platformFeePct: 3.5,
    mixNR: 63.4,
  },
  {
    channel: 'Amazon',
    channelColor: 'text-[#EA580C]',
    netRevenue: 155613,
    gm2Dollar: 111779,
    gm2Pct: 71.8,
    platformFeePct: 12.2,
    mixNR: 34.9,
  },
  {
    channel: 'TikTok Shop',
    channelColor: 'text-[#9333EA]',
    netRevenue: 6450,
    gm2Dollar: 4153,
    gm2Pct: 64.4,
    platformFeePct: 20.3,
    mixNR: 1.4,
  },
  {
    channel: 'Walmart',
    channelColor: 'text-[#16A34A]',
    netRevenue: 1400,
    gm2Dollar: 1049,
    gm2Pct: 74.9,
    platformFeePct: 11.9,
    mixNR: 0.3,
  },
];

const TOTAL_SUMMARY = {
  netRevenue: 446301,
  gm2Dollar: 350033,
  gm2Pct: 78.4,
  mixNR: 100,
};

const TOP_5_DATA: TopBottomRow[] = [
  {
    channel: 'TikTok Shop',
    channelColor: 'text-[#9333EA]',
    market: 'USA',
    family: 'Stencils-Canvas',
    netRev: 75,
    gm1Pct: 97.0,
    gm2Pct: 86.3,
    gm2Dollar: 65,
  },
  {
    channel: 'Shopify',
    channelColor: 'text-[#2563EB]',
    market: 'USA',
    family: 'Stencils-Canvas',
    netRev: 10998,
    gm1Pct: 92.9,
    gm2Pct: 84.4,
    gm2Dollar: 9277,
  },
  {
    channel: 'Shopify',
    channelColor: 'text-[#2563EB]',
    market: 'USA',
    family: 'Engraving',
    netRev: 169350,
    gm1Pct: 92.2,
    gm2Pct: 83.5,
    gm2Dollar: 141393,
  },
  {
    channel: 'Shopify',
    channelColor: 'text-[#2563EB]',
    market: 'USA',
    family: 'Bits',
    netRev: 41710,
    gm1Pct: 89.6,
    gm2Pct: 83.1,
    gm2Dollar: 34654,
  },
  {
    channel: 'Shopify',
    channelColor: 'text-[#2563EB]',
    market: 'Internacional',
    family: 'Engraving',
    netRev: 44170,
    gm1Pct: 92.6,
    gm2Pct: 81.2,
    gm2Dollar: 35882,
  },
];

const BOTTOM_5_DATA: TopBottomRow[] = [
  {
    channel: 'Shopify',
    channelColor: 'text-[#2563EB]',
    market: 'Internacional',
    family: 'Leather',
    netRev: 1008,
    gm1Pct: 63.9,
    gm2Pct: 53.0,
    gm2Dollar: 534,
  },
  {
    channel: 'Amazon',
    channelColor: 'text-[#EA580C]',
    market: 'USA',
    family: 'Leather',
    netRev: 588,
    gm1Pct: 78.7,
    gm2Pct: 58.7,
    gm2Dollar: 345,
  },
  {
    channel: 'Amazon',
    channelColor: 'text-[#EA580C]',
    market: 'USA',
    family: 'Kits',
    netRev: 311,
    gm1Pct: 87.5,
    gm2Pct: 62.4,
    gm2Dollar: 194,
  },
  {
    channel: 'Shopify',
    channelColor: 'text-[#2563EB]',
    market: 'USA',
    family: 'Kits',
    netRev: 4184,
    gm1Pct: 80.1,
    gm2Pct: 63.2,
    gm2Dollar: 2643,
  },
  {
    channel: 'Amazon',
    channelColor: 'text-[#EA580C]',
    market: 'Internacional',
    family: 'Engraving',
    netRev: 1740,
    gm1Pct: 85.3,
    gm2Pct: 63.2,
    gm2Dollar: 1100,
  },
];

// Helper to format GM2% badge in tables
function getGm2BadgeStyle(pct: number) {
  if (pct >= 80) return 'text-[#1D4ED8] font-bold'; // deep blue
  if (pct >= 70) return 'text-[#15803D] font-bold'; // green
  if (pct >= 60) return 'text-[#047857] font-bold'; // emerald green
  if (pct >= 50) return 'text-[#A16207] font-bold bg-[#FEF9C3] px-1.5 py-0.5 rounded'; // yellow tint
  return 'text-[#C2410C] font-bold bg-[#FFEDD5] px-1.5 py-0.5 rounded';
}

export const GM2AnalysisSummaryPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-xl border border-[#E8E2D9] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#F5F2ED] text-[#5A5A40] rounded-lg">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#3D3833]">Resumen Análisis de Rentabilidad — Julio 2026</h2>
            <p className="text-xs text-[#7A736A]">
              Desglose general por canal de venta, mix de ventas y rendimiento extremo por producto y mercado
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-[#F5F2ED] text-[#3D3833] font-bold text-xs rounded-lg border border-[#E8E2D9]">
            Julio 2026
          </span>
        </div>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
          <span className="text-xs font-bold text-[#7A736A] uppercase tracking-wider">
            Net Revenue Total
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#3D3833] font-mono">
            {formatCurrency(TOTAL_SUMMARY.netRevenue)}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
          <span className="text-xs font-bold text-[#7A736A] uppercase tracking-wider">
            GM2 Total ($)
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#3D3833] font-mono">
            {formatCurrency(TOTAL_SUMMARY.gm2Dollar)}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A736A] uppercase tracking-wider">
              GM2 Promedio
            </span>
            <AlertCircle className="w-4 h-4 text-[#EAB308]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#3D3833] font-mono">
              71.4%
            </span>
            <span className="text-xs text-[#7A736A] font-medium">
              (78.4% Ponderado Total)
            </span>
          </div>
        </div>
      </div>

      {/* RESUMEN POR CANAL Table */}
      <div className="bg-white rounded-xl border border-[#2B3E50] overflow-hidden shadow-xs">
        <div className="bg-[#2B3E50] text-white px-5 py-3 font-bold text-sm tracking-wide">
          RESUMEN POR CANAL
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#2B3E50] text-white border-b border-[#3E5266]">
                <th className="px-5 py-3 text-left font-bold w-1/5">Canal</th>
                <th className="px-5 py-3 text-right font-bold w-1/5">Net Revenue</th>
                <th className="px-5 py-3 text-right font-bold w-1/5">GM2 ($)</th>
                <th className="px-5 py-3 text-right font-bold w-1/6">GM2%</th>
                <th className="px-5 py-3 text-right font-bold w-1/6">Platform Fee%</th>
                <th className="px-5 py-3 text-right font-bold w-1/6">Mix NR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {CHANNEL_SUMMARY_DATA.map((row) => (
                <tr key={row.channel} className="hover:bg-[#F8FAFC]">
                  <td className={`px-5 py-3 font-bold text-sm ${row.channelColor}`}>
                    {row.channel}
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-sm text-[#3D3833] font-semibold">
                    {formatCurrency(row.netRevenue)}
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-sm text-[#3D3833] font-semibold">
                    {formatCurrency(row.gm2Dollar)}
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-sm">
                    <span className={getGm2BadgeStyle(row.gm2Pct)}>{row.gm2Pct.toFixed(1)}%</span>
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-sm text-[#5A5A40]">
                    {row.platformFeePct !== null ? `${row.platformFeePct.toFixed(1)}%` : '—'}
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-sm text-[#3D3833] font-bold">
                    {row.mixNR.toFixed(1)}%
                  </td>
                </tr>
              ))}

              {/* TOTAL ROW */}
              <tr className="bg-[#2B3E50] text-white font-bold border-t-2 border-[#3E5266]">
                <td className="px-5 py-3 text-sm uppercase tracking-wider">TOTAL</td>
                <td className="px-5 py-3 text-right font-mono text-sm">
                  {formatCurrency(TOTAL_SUMMARY.netRevenue)}
                </td>
                <td className="px-5 py-3 text-right font-mono text-sm">
                  {formatCurrency(TOTAL_SUMMARY.gm2Dollar)}
                </td>
                <td className="px-5 py-3 text-right font-mono text-sm text-[#60A5FA]">
                  {TOTAL_SUMMARY.gm2Pct.toFixed(1)}%
                </td>
                <td className="px-5 py-3 text-right font-mono text-sm">—</td>
                <td className="px-5 py-3 text-right font-mono text-sm text-[#60A5FA]">
                  {TOTAL_SUMMARY.mixNR}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* TOP 5 — Mejor GM2% */}
      <div className="bg-white rounded-xl border border-[#CBD5E1] overflow-hidden shadow-xs">
        <div className="bg-[#EFF6FF] border-b border-[#BFDBFE] px-5 py-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#1D4ED8]" />
          <h3 className="font-bold text-sm text-[#1E3A8A]">TOP 5 — Mejor GM2%</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#2B3E50] text-white border-b border-[#3E5266]">
                <th className="px-4 py-2.5 text-left font-bold">Canal</th>
                <th className="px-4 py-2.5 text-left font-bold">Mercado</th>
                <th className="px-4 py-2.5 text-left font-bold">Familia</th>
                <th className="px-4 py-2.5 text-right font-bold">Net Rev</th>
                <th className="px-4 py-2.5 text-right font-bold">GM1%</th>
                <th className="px-4 py-2.5 text-right font-bold">GM2%</th>
                <th className="px-4 py-2.5 text-right font-bold">GM2 ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {TOP_5_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFC]">
                  <td className={`px-4 py-2.5 font-bold ${row.channelColor}`}>{row.channel}</td>
                  <td className="px-4 py-2.5 text-[#5A5A40] font-medium">{row.market}</td>
                  <td className="px-4 py-2.5 text-[#3D3833] font-semibold">{row.family}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-[#3D3833]">
                    {formatCurrency(row.netRev)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono text-[#5A5A40]">
                    {row.gm1Pct.toFixed(1)}%
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono font-bold text-[#1D4ED8]">
                    {row.gm2Pct.toFixed(1)}%
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono font-bold text-[#1D4ED8]">
                    {formatCurrency(row.gm2Dollar)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BOTTOM 5 — Peor GM2% */}
      <div className="bg-white rounded-xl border border-[#CBD5E1] overflow-hidden shadow-xs">
        <div className="bg-[#FEF2F2] border-b border-[#FECACA] px-5 py-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
          <h3 className="font-bold text-sm text-[#991B1B]">BOTTOM 5 — Peor GM2%</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#2B3E50] text-white border-b border-[#3E5266]">
                <th className="px-4 py-2.5 text-left font-bold">Canal</th>
                <th className="px-4 py-2.5 text-left font-bold">Mercado</th>
                <th className="px-4 py-2.5 text-left font-bold">Familia</th>
                <th className="px-4 py-2.5 text-right font-bold">Net Rev</th>
                <th className="px-4 py-2.5 text-right font-bold">GM1%</th>
                <th className="px-4 py-2.5 text-right font-bold">GM2%</th>
                <th className="px-4 py-2.5 text-right font-bold">GM2 ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {BOTTOM_5_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFC]">
                  <td className={`px-4 py-2.5 font-bold ${row.channelColor}`}>{row.channel}</td>
                  <td className="px-4 py-2.5 text-[#5A5A40] font-medium">{row.market}</td>
                  <td className="px-4 py-2.5 text-[#3D3833] font-semibold">{row.family}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-[#3D3833]">
                    {formatCurrency(row.netRev)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono text-[#5A5A40]">
                    {row.gm1Pct.toFixed(1)}%
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono">
                    <span className={getGm2BadgeStyle(row.gm2Pct)}>{row.gm2Pct.toFixed(1)}%</span>
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono font-bold text-[#D97706]">
                    {formatCurrency(row.gm2Dollar)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
