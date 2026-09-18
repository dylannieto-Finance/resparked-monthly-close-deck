import React from 'react';
import { Grid, Trophy, AlertTriangle } from 'lucide-react';

interface HeatmapCellData {
  channel: string;
  channelColor: string;
  market: 'USA' | 'Internacional';
  familyValues: Record<string, number | null>;
  avgCanal: number | null;
}

const FAMILIES = ['Engraving', 'Leather', 'Kits', 'Bits', 'Stencils-Canvas'];

const USA_ROWS: HeatmapCellData[] = [
  {
    channel: 'Shopify',
    channelColor: 'text-[#2563EB]',
    market: 'USA',
    familyValues: {
      Engraving: 83.5,
      Leather: 68.8,
      Kits: 63.2,
      Bits: 83.1,
      'Stencils-Canvas': 84.4,
    },
    avgCanal: 76.6,
  },
  {
    channel: 'Amazon',
    channelColor: 'text-[#EA580C]',
    market: 'USA',
    familyValues: {
      Engraving: 72.1,
      Leather: 58.7,
      Kits: 62.4,
      Bits: 67.4,
      'Stencils-Canvas': null,
    },
    avgCanal: 65.1,
  },
  {
    channel: 'TikTok Shop',
    channelColor: 'text-[#9333EA]',
    market: 'USA',
    familyValues: {
      Engraving: 64.1,
      Leather: null,
      Kits: null,
      Bits: null,
      'Stencils-Canvas': 86.3,
    },
    avgCanal: 75.2,
  },
  {
    channel: 'Walmart',
    channelColor: 'text-[#16A34A]',
    market: 'USA',
    familyValues: {
      Engraving: 74.9,
      Leather: null,
      Kits: null,
      Bits: null,
      'Stencils-Canvas': null,
    },
    avgCanal: 74.9,
  },
];

const USA_AVG_FAMILIA: Record<string, number | null> = {
  Engraving: 73.7,
  Leather: 63.7,
  Kits: 62.8,
  Bits: 75.2,
  'Stencils-Canvas': 85.3,
};

const INT_ROWS: HeatmapCellData[] = [
  {
    channel: 'Shopify',
    channelColor: 'text-[#2563EB]',
    market: 'Internacional',
    familyValues: {
      Engraving: 81.2,
      Leather: 53.0,
      Kits: 65.6,
      Bits: 80.4,
      'Stencils-Canvas': 80.3,
    },
    avgCanal: 72.1,
  },
  {
    channel: 'Amazon',
    channelColor: 'text-[#EA580C]',
    market: 'Internacional',
    familyValues: {
      Engraving: 63.2,
      Leather: null,
      Kits: null,
      Bits: 64.4,
      'Stencils-Canvas': null,
    },
    avgCanal: 63.8,
  },
];

const INT_AVG_FAMILIA: Record<string, number | null> = {
  Engraving: 72.2,
  Leather: 53.0,
  Kits: 65.6,
  Bits: 72.4,
  'Stencils-Canvas': 80.3,
};

// Helper for cell styles based on exact GM2% ranges
function getCellStyles(val: number | null) {
  if (val === null) {
    return {
      bg: 'bg-[#F8FAFC]',
      textColor: 'text-[#94A3B8]',
      label: '—',
    };
  }

  const label = `${val.toFixed(1)}%`;

  if (val > 70) {
    return {
      bg: 'bg-[#EFF6FF]', // light blue background
      textColor: 'text-[#1D4ED8] font-bold',
      label,
    };
  }
  if (val >= 60) {
    return {
      bg: 'bg-[#F0FDF4]', // dark green background tint
      textColor: 'text-[#15803D] font-bold',
      label,
    };
  }
  if (val >= 50) {
    return {
      bg: 'bg-[#ECFDF5]', // light green background tint
      textColor: 'text-[#047857] font-bold',
      label,
    };
  }
  if (val >= 20) {
    return {
      bg: 'bg-[#FEF9C3]', // yellow background tint
      textColor: 'text-[#A16207] font-bold',
      label,
    };
  }
  if (val >= 0) {
    return {
      bg: 'bg-[#FFEDD5]', // orange background tint
      textColor: 'text-[#C2410C] font-bold',
      label,
    };
  }
  return {
    bg: 'bg-[#FEE2E2]', // red background tint
    textColor: 'text-[#B91C1C] font-bold',
    label,
  };
}

export const GM2HeatmapPage: React.FC = () => {
  // Top 3 and Bottom 3 combinations calculated from July 2026 data
  const topCombinations = [
    { channel: 'TikTok Shop', market: 'USA', family: 'Stencils-Canvas', gm2Pct: 86.3 },
    { channel: 'Shopify', market: 'USA', family: 'Stencils-Canvas', gm2Pct: 84.4 },
    { channel: 'Shopify', market: 'USA', family: 'Engraving', gm2Pct: 83.5 },
  ];

  const bottomCombinations = [
    { channel: 'Shopify', market: 'Internacional', family: 'Leather', gm2Pct: 53.0 },
    { channel: 'Amazon', market: 'USA', family: 'Leather', gm2Pct: 58.7 },
    { channel: 'Amazon', market: 'USA', family: 'Kits', gm2Pct: 62.4 },
  ];

  const renderHeatmapTable = (
    title: string,
    rows: HeatmapCellData[],
    avgFamiliaRow: Record<string, number | null>
  ) => {
    return (
      <div className="bg-white rounded-xl border border-[#2B3E50] overflow-hidden shadow-xs">
        {/* Table Header Bar */}
        <div className="bg-[#2B3E50] text-white px-4 py-2.5 flex items-center gap-2 font-bold text-sm">
          <span>{title}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#2B3E50] text-white border-b border-[#3E5266]">
                <th className="px-4 py-2.5 text-left font-bold w-1/6">Canal</th>
                {FAMILIES.map((fam) => (
                  <th key={fam} className="px-3 py-2.5 text-center font-bold">
                    {fam}
                  </th>
                ))}
                <th className="px-4 py-2.5 text-center font-bold bg-[#233342]">Avg canal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {rows.map((row) => (
                <tr key={row.channel} className="hover:bg-[#F8FAFC]">
                  {/* Channel Column */}
                  <td className={`px-4 py-3 font-bold border-r border-[#E2E8F0] ${row.channelColor}`}>
                    {row.channel}
                  </td>

                  {/* Family Columns */}
                  {FAMILIES.map((fam) => {
                    const val = row.familyValues[fam] ?? null;
                    const style = getCellStyles(val);
                    return (
                      <td
                        key={fam}
                        className={`px-3 py-3 text-center border-r border-[#E2E8F0] font-mono text-xs ${style.bg} ${style.textColor}`}
                      >
                        {style.label}
                      </td>
                    );
                  })}

                  {/* Avg Canal Column */}
                  {(() => {
                    const style = getCellStyles(row.avgCanal);
                    return (
                      <td
                        className={`px-4 py-3 text-center font-mono font-bold text-xs ${style.bg} ${style.textColor}`}
                      >
                        {style.label}
                      </td>
                    );
                  })()}
                </tr>
              ))}

              {/* Avg Familia Bottom Summary Row */}
              <tr className="bg-[#EDF2F7] border-t-2 border-[#CBD5E1]">
                <td className="px-4 py-2.5 font-bold text-[#2D3748] border-r border-[#CBD5E1]">
                  Avg familia
                </td>
                {FAMILIES.map((fam) => {
                  const val = avgFamiliaRow[fam] ?? null;
                  const style = getCellStyles(val);
                  return (
                    <td
                      key={fam}
                      className={`px-3 py-2.5 text-center font-mono font-bold text-xs border-r border-[#CBD5E1] ${style.textColor}`}
                    >
                      {style.label}
                    </td>
                  );
                })}
                <td className="px-4 py-2.5 bg-[#E2E8F0]" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white p-5 rounded-xl border border-[#E8E2D9] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#F5F2ED] text-[#5A5A40] rounded-lg">
            <Grid className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#3D3833]">Heatmap GM2% — Julio 2026</h2>
            <p className="text-xs text-[#7A736A]">
              Margen Bruto Nivel 2 (GM2%) por mercado, canal de venta y categoría de producto
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-[#F5F2ED] text-[#3D3833] font-bold text-xs rounded-lg border border-[#E8E2D9]">
            Julio 2026
          </span>
        </div>
      </div>

      {/* Heatmap Tables */}
      <div className="space-y-6">
        {renderHeatmapTable('🌎 USA', USA_ROWS, USA_AVG_FAMILIA)}
        {renderHeatmapTable('🌎 Internacional', INT_ROWS, INT_AVG_FAMILIA)}

        {/* Legend */}
        <div className="bg-white p-4 rounded-xl border border-[#E8E2D9] shadow-xs flex flex-wrap items-center justify-between text-xs text-[#5A5A40] gap-3">
          <span className="font-bold text-[#3D3833]">Escala de Color GM2%:</span>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#EF4444] inline-block" />
              <span>&lt;0%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#F97316] inline-block" />
              <span>0–20%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#EAB308] inline-block" />
              <span>20–50%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#10B981] inline-block" />
              <span>50–60%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#16A34A] inline-block" />
              <span>60–70%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#2563EB] inline-block" />
              <span>&gt;70%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 & Bottom 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Top 3 Combinations */}
        <div className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-[#16A34A]" />
            <h4 className="text-xs font-bold text-[#16A34A] uppercase tracking-wider">
              Top 3 Combinaciones de Mayor GM2%
            </h4>
          </div>
          <div className="space-y-2.5">
            {topCombinations.map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-[#F0FDF4] border border-[#DCFCE7] text-xs"
              >
                <div>
                  <span className="font-bold text-[#14532D] block">
                    {c.channel} ({c.market}) &bull; {c.family}
                  </span>
                  <span className="text-[11px] text-[#15803D]">Mercado: {c.market}</span>
                </div>
                <span className="font-mono font-bold text-sm text-[#15803D]">{c.gm2Pct.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom 3 Combinations */}
        <div className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-[#C2410C]" />
            <h4 className="text-xs font-bold text-[#C2410C] uppercase tracking-wider">
              Bottom 3 Combinaciones de Menor GM2%
            </h4>
          </div>
          <div className="space-y-2.5">
            {bottomCombinations.map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-[#FEF9C3] border border-[#FEF08A] text-xs"
              >
                <div>
                  <span className="font-bold text-[#713F12] block">
                    {c.channel} ({c.market}) &bull; {c.family}
                  </span>
                  <span className="text-[11px] text-[#A16207]">Mercado: {c.market}</span>
                </div>
                <span className="font-mono font-bold text-sm text-[#A16207]">{c.gm2Pct.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
