import React from 'react';
import {
  Globe,
  TrendingUp,
  TrendingDown,
  Layers,
} from 'lucide-react';
import { MARKET_PL_ROWS } from '../../data/mockFinancialData';

interface PLUSVsInternationalPageProps {
  onNavigateConsolidated?: () => void;
}

export const PLUSVsInternationalPage: React.FC<PLUSVsInternationalPageProps> = () => {
  const numberFormat: 'latam' | 'standard' = 'latam';

  // Format monetary value according to selected format
  const formatMoney = (val: number, isPctRow?: boolean) => {
    if (isPctRow) {
      const formattedPct = Math.abs(val).toFixed(2);
      const sign = val < 0 ? '-' : '';
      if (numberFormat === 'latam') {
        return `${sign}${formattedPct.replace('.', ',')}%`;
      }
      return `${sign}${formattedPct}%`;
    }

    const abs = Math.abs(val);
    const sign = val < 0 ? '-' : '';

    if (numberFormat === 'latam') {
      // 393.000,00
      const parts = abs.toFixed(2).split('.');
      const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return `${sign}$${intPart},${parts[1]}`;
    } else {
      // $393,000.00
      const parts = abs.toFixed(2).split('.');
      const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return `${sign}$${intPart}.${parts[1]}`;
    }
  };

  // Helper for percentage
  const formatPct = (val: number | undefined) => {
    if (val === undefined || isNaN(val)) return '-';
    const abs = Math.abs(val).toFixed(2);
    const sign = val < 0 ? '-' : '';
    if (numberFormat === 'latam') {
      return `${sign}${abs.replace('.', ',')}%`;
    }
    return `${sign}${abs}%`;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E8E2D9] shadow-xs">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FAF6F0] text-[#8C6D46] border border-[#E8DFC8]">
              <Globe className="w-3.5 h-3.5" />
              Apertura P&L por Mercado
            </span>
            <span className="text-xs font-semibold text-[#7A736A] px-2 py-0.5 bg-[#F5F2ED] rounded-full border border-[#E8E2D9]">
              Agosto 2026
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#3D3833]">
            P&L: Órdenes US vs Órdenes Internacional
          </h2>
          <p className="text-xs text-[#7A736A] mt-0.5 max-w-3xl">
            Análisis detallado de la estructura de márgenes brutos (<b>GM1</b>, <b>GM2</b> y <b>GM3</b>),
            eficiencias operativas de Last Mile / Fees y el impacto de Ad Spend por territorio.
          </p>
        </div>
      </div>

      {/* Key Strategic Takeaways Banners (User provided insights) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Insight 1: Expansión Internacional */}
        <div className="bg-white rounded-xl p-4 border border-[#E8E2D9] shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#2563EB]/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
              <Globe className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold text-[#7A736A] uppercase tracking-wider">
              Mix Ventas Internacional
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#3D3833]">31,9%</span>
            <span className="text-xs font-semibold text-[#22C55E] bg-[#E2F0D9] px-2 py-0.5 rounded-full">
              Agosto
            </span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#F0EDE8] flex items-center justify-between text-xs">
            <span className="text-[#7A736A]">Promedio Ene–Jul:</span>
            <span className="font-bold text-[#5A5A40]">13%</span>
          </div>
        </div>

        {/* Insight 2: US Sales Estabilidad */}
        <div className="bg-white rounded-xl p-4 border border-[#E8E2D9] shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#16A34A]/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-[#16A34A]/10 text-[#16A34A]">
              <TrendingUp className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold text-[#7A736A] uppercase tracking-wider">
              Estabilidad US Sales
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#3D3833]">$393.000</span>
            <span className="text-xs font-medium text-[#7A736A] bg-[#F5F2ED] px-2 py-0.5 rounded-full">
              Agosto
            </span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#F0EDE8] flex items-center justify-between text-xs">
            <span className="text-[#7A736A]">Promedio May–Jul:</span>
            <span className="font-bold text-[#5A5A40]">~395k</span>
          </div>
        </div>

        {/* Insight 3: Divergencia GM2 vs GM3 */}
        <div className="bg-white rounded-xl p-4 border border-[#E8E2D9] shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#C84B31]/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-[#C84B31]/10 text-[#C84B31]">
              <TrendingDown className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold text-[#7A736A] uppercase tracking-wider">
              Efecto Ad Spend en GM3
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#C84B31]">-13,63%</span>
            <span className="text-xs font-semibold text-[#7A736A]">
              vs -5,50% en US
            </span>
          </div>
          <p className="text-xs text-[#7A736A] mt-2 leading-relaxed">
            Pese a tener mejor <b>GM2 (77.06% vs 69.26%)</b>, el <b>Ad Spend internacional absorbió 90.69%</b> de su revenue vs 74.76% en US, profundizando el déficit en GM3.
          </p>
        </div>
      </div>

      {/* Main Comparative Table: US vs Internacional */}
      <div className="bg-white rounded-xl border border-[#E8E2D9] shadow-xs overflow-hidden">
        {/* Table Header / Subtitle */}
        <div className="p-5 border-b border-[#E8E2D9] flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#5A5A40]" />
            <h3 className="text-sm font-bold text-[#3D3833]">
              Estado de Resultados Comparativo: Órdenes US vs Internacional
            </h3>
          </div>
          <span className="text-xs text-[#7A736A]">
            Valores en USD correspondientes al cierre de Agosto 2026
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-[#F5F2ED] text-[#5A5A40] border-b border-[#E8E2D9]">
                <th className="px-6 py-3.5 font-bold uppercase tracking-wider text-xs w-1/3">
                  Línea P&L (Métrica)
                </th>
                <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-xs text-right border-l border-[#E8E2D9]">
                  US (Órdenes)
                </th>
                <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-xs text-right border-l border-[#E8E2D9]">
                  Internacional
                </th>
                <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-xs text-right border-l border-[#E8E2D9] bg-[#EFECE6]">
                  Total Consolidado
                </th>
                <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-xs text-right border-l border-[#E8E2D9]">
                  Brecha (Int vs US)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE8]">
              {MARKET_PL_ROWS.map((row) => {
                const isHighlight = row.isSubtotal || row.isPercentageRow;
                const isPct = row.isPercentageRow;
                const isNegative = row.us < 0 || row.international < 0;

                // Difference in % points or relative
                const deltaPoints = isPct ? row.international - row.us : null;

                return (
                  <tr
                    key={row.id}
                    className={`transition-colors ${
                      row.isSubtotal
                        ? 'bg-[#FAF7F2] font-bold text-[#3D3833] border-t border-[#E8E2D9]'
                        : isPct
                        ? 'bg-[#FCFAF7] text-[#5A5A40] font-semibold italic'
                        : 'bg-white text-[#3D3833] hover:bg-[#FCFAF7]'
                    }`}
                  >
                    {/* Metric Name */}
                    <td
                      className={`px-6 py-3 ${
                        row.isSubtotal
                          ? 'font-bold text-xs text-[#3D3833]'
                          : isPct
                          ? 'pl-10 text-[11px] font-bold text-[#7A736A]'
                          : 'pl-10 text-xs font-normal text-[#5A5A40]'
                      }`}
                    >
                      {row.name}
                    </td>

                    {/* US Column */}
                    <td
                      className={`px-5 py-3 text-right font-mono border-l border-[#F0EDE8] ${
                        row.isSubtotal
                          ? 'font-bold text-[#3D3833]'
                          : isPct
                          ? 'font-bold text-[#5A5A40]'
                          : 'text-[#3D3833]'
                      } ${isNegative ? 'text-[#C84B31]' : ''}`}
                    >
                      {formatMoney(row.us, isPct)}
                      {!isPct && row.usPctOfRevenue !== undefined && row.id !== 'net-revenue' && (
                        <span className="block text-[10px] text-[#A8A298] font-sans font-normal">
                          {formatPct(row.usPctOfRevenue)} s/ rev
                        </span>
                      )}
                    </td>

                    {/* International Column */}
                    <td
                      className={`px-5 py-3 text-right font-mono border-l border-[#F0EDE8] ${
                        row.isSubtotal
                          ? 'font-bold text-[#3D3833]'
                          : isPct
                          ? 'font-bold text-[#5A5A40]'
                          : 'text-[#3D3833]'
                      } ${isNegative ? 'text-[#C84B31]' : ''}`}
                    >
                      {formatMoney(row.international, isPct)}
                      {!isPct && row.intlPctOfRevenue !== undefined && row.id !== 'net-revenue' && (
                        <span className="block text-[10px] text-[#A8A298] font-sans font-normal">
                          {formatPct(row.intlPctOfRevenue)} s/ rev
                        </span>
                      )}
                    </td>

                    {/* Total Consolidado */}
                    <td
                      className={`px-5 py-3 text-right font-mono border-l border-[#E8E2D9] bg-[#FAF8F5] ${
                        row.isSubtotal ? 'font-bold text-[#1C1917]' : 'text-[#3D3833]'
                      } ${isNegative ? 'text-[#C84B31]' : ''}`}
                    >
                      {formatMoney(row.total, isPct)}
                      {!isPct && row.totalPctOfRevenue !== undefined && row.id !== 'net-revenue' && (
                        <span className="block text-[10px] text-[#7A736A] font-sans font-normal">
                          {formatPct(row.totalPctOfRevenue)} s/ rev
                        </span>
                      )}
                    </td>

                    {/* Delta / Gap Column */}
                    <td className="px-5 py-3 text-right font-mono border-l border-[#F0EDE8]">
                      {isPct && deltaPoints !== null ? (
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                            row.id === 'gm3-pct'
                              ? 'bg-[#FDE8E4] text-[#C84B31]'
                              : deltaPoints >= 0
                              ? 'bg-[#E2F0D9] text-[#2E7D32]'
                              : 'bg-[#FDE8E4] text-[#C84B31]'
                          }`}
                        >
                          {deltaPoints > 0 ? '+' : ''}
                          {deltaPoints.toFixed(2)} pp
                        </span>
                      ) : row.id === 'net-revenue' ? (
                        <span className="text-[10px] font-sans text-[#7A736A] font-medium">
                          68,1% US / 31,9% Int
                        </span>
                      ) : row.usPctOfRevenue !== undefined && row.intlPctOfRevenue !== undefined ? (
                        <span
                          className={`text-[11px] font-semibold ${
                            row.intlPctOfRevenue < row.usPctOfRevenue
                              ? 'text-[#2E7D32]'
                              : 'text-[#C84B31]'
                          }`}
                        >
                          {(row.intlPctOfRevenue - row.usPctOfRevenue).toFixed(2)} pp
                        </span>
                      ) : (
                        <span className="text-[#C4BEB4]">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Margin Comparison (GM1 -> GM2 -> GM3 Progression) */}
      <div className="bg-white rounded-xl p-6 border border-[#E8E2D9] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#3D3833]">
              Comparativa Visual de Márgenes: Cascada Relativa (% sobre Net Revenue)
            </h3>
            <p className="text-xs text-[#7A736A]">
              Cómo evoluciona cada $100 de revenue a lo largo de los tres niveles de Gross Margin en US vs Internacional.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-[#2563EB]" />
              <span className="font-semibold text-[#3D3833]">US Orders</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-[#F59E0B]" />
              <span className="font-semibold text-[#3D3833]">Internacional</span>
            </div>
          </div>
        </div>

        {/* 3 Steps: GM1, GM2, GM3 visual bars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* GM1 Comparison */}
          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E2D9]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#3D3833]">GM1 (Gross Margin 1)</span>
              <span className="text-[10px] font-bold text-[#2E7D32] bg-[#E2F0D9] px-2 py-0.5 rounded">
                +2.05 pp a favor Int
              </span>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-medium text-[#7A736A]">US ($353.150)</span>
                  <span className="font-bold text-[#3D3833]">89,86%</span>
                </div>
                <div className="w-full bg-[#E8E2D9] rounded-full h-3 overflow-hidden">
                  <div className="bg-[#2563EB] h-full rounded-full" style={{ width: '89.86%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-medium text-[#7A736A]">Internacional ($169.026)</span>
                  <span className="font-bold text-[#3D3833]">91,91%</span>
                </div>
                <div className="w-full bg-[#E8E2D9] rounded-full h-3 overflow-hidden">
                  <div className="bg-[#F59E0B] h-full rounded-full" style={{ width: '91.91%' }} />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-[#7A736A] mt-3 pt-2 border-t border-[#E8E2D9]/60">
              <b>Causa:</b> Menor incidencia del costo de producto (COGS) sobre ventas en internacional (8.09% vs 10.14%).
            </p>
          </div>

          {/* GM2 Comparison */}
          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E2D9]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#3D3833]">GM2 (Gross Margin 2)</span>
              <span className="text-[10px] font-bold text-[#2E7D32] bg-[#E2F0D9] px-2 py-0.5 rounded">
                +7.80 pp a favor Int
              </span>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-medium text-[#7A736A]">US ($272.188)</span>
                  <span className="font-bold text-[#3D3833]">69,26%</span>
                </div>
                <div className="w-full bg-[#E8E2D9] rounded-full h-3 overflow-hidden">
                  <div className="bg-[#2563EB] h-full rounded-full" style={{ width: '69.26%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-medium text-[#7A736A]">Internacional ($141.726)</span>
                  <span className="font-bold text-[#3D3833]">77,06%</span>
                </div>
                <div className="w-full bg-[#E8E2D9] rounded-full h-3 overflow-hidden">
                  <div className="bg-[#F59E0B] h-full rounded-full" style={{ width: '77.06%' }} />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-[#7A736A] mt-3 pt-2 border-t border-[#E8E2D9]/60">
              <b>Causa:</b> Menores gastos de Last Mile (9.68% vs 13.44%) y Platform Fees (5.17% vs 7.17%) en órdenes internacionales.
            </p>
          </div>

          {/* GM3 Comparison */}
          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E2D9]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#3D3833]">GM3 (Gross Margin 3)</span>
              <span className="text-[10px] font-bold text-[#C84B31] bg-[#FDE8E4] px-2 py-0.5 rounded">
                -8.13 pp brecha en Int
              </span>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-medium text-[#7A736A]">US (-$21.633)</span>
                  <span className="font-bold text-[#C84B31]">-5,50%</span>
                </div>
                <div className="w-full bg-[#E8E2D9] rounded-full h-3 overflow-hidden relative">
                  <div className="bg-[#2563EB] h-full rounded-full opacity-30" style={{ width: '5.5%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-medium text-[#7A736A]">Internacional (-$25.060)</span>
                  <span className="font-bold text-[#C84B31]">-13,63%</span>
                </div>
                <div className="w-full bg-[#E8E2D9] rounded-full h-3 overflow-hidden relative">
                  <div className="bg-[#F59E0B] h-full rounded-full opacity-30" style={{ width: '13.6%' }} />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-[#7A736A] mt-3 pt-2 border-t border-[#E8E2D9]/60">
              <b>Causa:</b> Ad Spend internacional de <b>90.69%</b> ($166.786) vs <b>74.76%</b> ($293.821) en US tracciona el déficit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
