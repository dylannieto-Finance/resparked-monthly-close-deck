import React, { useState } from 'react';
import { formatCurrency } from '../utils/formatters';
import { PLRow } from '../types';
import { Layers, Info } from 'lucide-react';

interface PLWaterfallChartProps {
  rows?: PLRow[];
}

interface WaterfallStep {
  id: string;
  name: string;
  value: number; // delta or absolute total
  startValue: number; // Y start position
  endValue: number; // Y end position
  isTotal: boolean;
  type: 'subtotal' | 'expense' | 'income';
  color: string;
}

export const PLWaterfallChart: React.FC<PLWaterfallChartProps> = ({ rows }) => {
  const [hoveredStep, setHoveredStep] = useState<WaterfallStep | null>(null);

  // Extract key values from rows if available, otherwise fallback to exact official figures
  const getVal = (id: string, fallback: number) => {
    if (!rows) return fallback;
    const found = rows.find((r) => r.id === id);
    return found ? found.real : fallback;
  };

  const netRevenue = Math.abs(getVal('net-revenue', 576789));
  const cogsVal = Math.abs(getVal('cogs', 54928));
  const gm1 = getVal('gm1', 521861);
  const lastMileVal = Math.abs(getVal('last-mile', 70606));
  const platformFeesVal = Math.abs(getVal('platform-fees', 37622));
  const gm2 = getVal('gm2', 413633);
  const advertisingVal = Math.abs(getVal('advertising', 460607));
  const gm3 = getVal('gm3', -46974);
  const opexVal = Math.abs(getVal('opex', 283874));
  const ebitda = getVal('ebitda', -330847);
  const otherIncomeVal = Math.abs(getVal('other-income', 19397));
  const otherExpensesVal = Math.abs(getVal('other-expenses', 1807));
  const otherNet = otherIncomeVal - otherExpensesVal; // +17590
  const netIncome = getVal('net-income', -313258);

  // Build the sequential waterfall steps strictly respecting financial arithmetic
  const steps: WaterfallStep[] = [
    {
      id: 'net-revenue',
      name: 'Net Revenue',
      value: netRevenue,
      startValue: 0,
      endValue: netRevenue,
      isTotal: true,
      type: 'subtotal',
      color: '#3D3833',
    },
    {
      id: 'cogs',
      name: 'COGS',
      value: -cogsVal,
      startValue: netRevenue,
      endValue: netRevenue - cogsVal, // 521861
      isTotal: false,
      type: 'expense',
      color: '#C84B31',
    },
    {
      id: 'gm1',
      name: 'GM1',
      value: gm1,
      startValue: 0,
      endValue: gm1, // 521861
      isTotal: true,
      type: 'subtotal',
      color: '#3D3833',
    },
    {
      id: 'last-mile',
      name: 'Last Mile',
      value: -lastMileVal,
      startValue: gm1,
      endValue: gm1 - lastMileVal, // 451255
      isTotal: false,
      type: 'expense',
      color: '#C84B31',
    },
    {
      id: 'platform-fees',
      name: 'Platform Fees',
      value: -platformFeesVal,
      startValue: gm1 - lastMileVal,
      endValue: gm2, // 413633
      isTotal: false,
      type: 'expense',
      color: '#C84B31',
    },
    {
      id: 'gm2',
      name: 'GM2',
      value: gm2,
      startValue: 0,
      endValue: gm2, // 413633
      isTotal: true,
      type: 'subtotal',
      color: '#3D3833',
    },
    {
      id: 'advertising',
      name: 'Ad Spend',
      value: -advertisingVal,
      startValue: gm2,
      endValue: gm3, // -46974
      isTotal: false,
      type: 'expense',
      color: '#C84B31',
    },
    {
      id: 'gm3',
      name: 'GM3',
      value: gm3,
      startValue: 0,
      endValue: gm3, // -46974
      isTotal: true,
      type: 'subtotal',
      color: '#3D3833',
    },
    {
      id: 'opex',
      name: 'OPEX',
      value: -opexVal,
      startValue: gm3,
      endValue: ebitda, // -330847
      isTotal: false,
      type: 'expense',
      color: '#C84B31',
    },
    {
      id: 'ebitda',
      name: 'EBITDA',
      value: ebitda,
      startValue: 0,
      endValue: ebitda, // -330847
      isTotal: true,
      type: 'subtotal',
      color: '#3D3833',
    },
    {
      id: 'other-net',
      name: 'Otros Neto',
      value: otherNet,
      startValue: ebitda,
      endValue: netIncome, // -313258
      isTotal: false,
      type: 'income',
      color: '#15803D',
    },
    {
      id: 'net-income',
      name: 'Net Income',
      value: netIncome,
      startValue: 0,
      endValue: netIncome, // -313258
      isTotal: true,
      type: 'subtotal',
      color: '#3D3833',
    },
  ];

  // Calculate Y domain range for unified coordinate scaling
  const minY = -450000;
  const maxY = 650000;
  const totalRange = maxY - minY;

  // Helper to map monetary value to percentage height/y-position within plot box
  const getYPct = (val: number) => {
    return ((maxY - val) / totalRange) * 100;
  };

  const formatShortK = (num: number, type: 'subtotal' | 'expense' | 'income') => {
    const formatted = Math.abs(num) / 1000;
    if (num < 0) {
      return `-$${formatted.toFixed(1)}k`;
    }
    if (type === 'income') {
      return `+$${formatted.toFixed(1)}k`;
    }
    return `$${formatted.toFixed(1)}k`;
  };

  // Grid values every 200k, centered on $0
  const gridValues = [600000, 400000, 200000, 0, -200000, -400000];

  return (
    <div className="bg-white rounded-xl border border-[#E8E2D9] p-6 shadow-xs">
      {/* Chart Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#E8E2D9]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#F5F2ED] text-[#5A5A40] rounded-lg">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#3D3833]">Cascada de Resultados P&L (Waterfall)</h3>
            <p className="text-xs text-[#7A736A]">
              Flujo desde Net Revenue hasta Net Income con deducciones y subtotales alineados al eje $0 (USD)
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#3D3833] inline-block" />
            <span className="text-[#5A5A40] font-medium">Subtotales / Hitos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#C84B31] inline-block" />
            <span className="text-[#5A5A40] font-medium">Costos / Egresos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#15803D] inline-block" />
            <span className="text-[#5A5A40] font-medium">Otros Ingresos</span>
          </div>
        </div>
      </div>

      {/* Main Waterfall Graphic Area with Horizontal Scroll for narrow screens */}
      <div className="overflow-x-auto">
        <div className="min-w-[760px] relative w-full h-[370px] select-none">
          {/* Exact Unified Plot Box: ALL Y-coordinates (grid lines, $0 baseline, bars, connectors) share this box */}
          <div className="absolute left-16 right-12 top-5 bottom-12">
            {/* Grid lines and Left Y-Axis labels */}
            {gridValues.map((gridVal) => {
              const isZero = gridVal === 0;
              const yPct = getYPct(gridVal);

              return (
                <div
                  key={gridVal}
                  className={`absolute left-0 right-0 pointer-events-none ${
                    isZero
                      ? 'border-b-2 border-[#292524] z-10'
                      : 'border-b border-[#E7E5E4] border-dashed z-0'
                  }`}
                  style={{ top: `${yPct}%` }}
                >
                  {/* Left Y-axis label */}
                  <span
                    className={`absolute right-full mr-3 -translate-y-1/2 text-right font-mono text-[10px] whitespace-nowrap ${
                      isZero ? 'font-bold text-[#1C1917]' : 'text-[#78716C]'
                    }`}
                  >
                    {isZero ? '$0' : `${gridVal > 0 ? '$' : '-$'}${Math.abs(gridVal) / 1000}k`}
                  </span>
                </div>
              );
            })}

            {/* Bars and Steps Container: shares exact inset-0 of the plot box */}
            <div className="absolute inset-0 flex items-stretch justify-between z-20">
              {steps.map((step, idx) => {
                const topVal = Math.max(step.startValue, step.endValue);
                const bottomVal = Math.min(step.startValue, step.endValue);

                const topPct = getYPct(topVal);
                const bottomPct = getYPct(bottomVal);
                // Minimum visual bar height of 3px
                const heightPct = Math.max(bottomPct - topPct, 0.8);

                const isHovered = hoveredStep?.id === step.id;

                // Value label placement
                // Negative subtotals (GM3, EBITDA, Net Income): placed below their bar bottom
                // Positive subtotals & all deductions/incomes: placed above their bar top
                const isNegativeSubtotal = step.isTotal && step.value < 0;
                const labelIsAbove = !isNegativeSubtotal;

                // Determine border radius logic
                let roundedClass = 'rounded-xs';
                if (step.isTotal) {
                  roundedClass = step.value >= 0 ? 'rounded-t-xs' : 'rounded-b-xs';
                }

                return (
                  <div
                    key={step.id}
                    className="relative flex-1 flex flex-col items-center group cursor-pointer px-1"
                    onMouseEnter={() => setHoveredStep(step)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    {/* Connecting step line to next bar (at transition endValue) */}
                    {idx < steps.length - 1 && (
                      <div
                        className="absolute left-1/2 w-full border-b border-dashed border-[#A8A29E]/70 z-0 pointer-events-none group-hover:border-[#3D3833] transition-colors"
                        style={{ top: `${getYPct(step.endValue)}%` }}
                      />
                    )}

                    {/* Floating Value Label */}
                    <div
                      className="absolute z-30 whitespace-nowrap text-[10px] font-bold transition-transform group-hover:scale-110 pointer-events-none"
                      style={
                        labelIsAbove
                          ? {
                              top: `${topPct}%`,
                              transform: 'translateY(-100%) translateY(-5px)',
                              color: step.isTotal
                                ? '#1C1917'
                                : step.type === 'expense'
                                ? '#C84B31'
                                : '#15803D',
                            }
                          : {
                              top: `${bottomPct}%`,
                              transform: 'translateY(5px)',
                              color: step.isTotal
                                ? '#1C1917'
                                : step.type === 'expense'
                                ? '#C84B31'
                                : '#15803D',
                            }
                      }
                    >
                      {formatShortK(step.value, step.type)}
                    </div>

                    {/* Actual Bar Element */}
                    <div
                      className={`w-full max-w-[34px] ${roundedClass} transition-all duration-150 z-20 ${
                        isHovered
                          ? 'ring-2 ring-offset-1 ring-[#1C1917] brightness-110 shadow-md'
                          : 'shadow-xs'
                      }`}
                      style={{
                        position: 'absolute',
                        top: `${topPct}%`,
                        height: `${heightPct}%`,
                        backgroundColor: step.color,
                      }}
                    />

                    {/* X-Axis Category Label below the plot box */}
                    <div className="absolute top-[100%] pt-2.5 text-center w-full">
                      <span
                        className={`block text-[10px] truncate leading-tight transition-colors ${
                          step.isTotal ? 'font-bold text-[#1C1917]' : 'font-medium text-[#78716C]'
                        } ${isHovered ? 'text-[#1C1917] underline font-semibold' : ''}`}
                        title={step.name}
                      >
                        {step.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Details Box on Hover */}
      <div className="mt-8 pt-3 border-t border-[#F0EDE8] flex items-center justify-between min-h-[40px] text-xs bg-[#FCFAF7] px-4 py-2.5 rounded-lg border border-[#E8E2D9]">
        {hoveredStep ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: hoveredStep.color }}
              />
              <span className="font-bold text-[#3D3833]">{hoveredStep.name}</span>
              <span className="text-[#7A736A] text-[11px]">
                ({hoveredStep.isTotal ? 'Línea de Subtotal' : hoveredStep.type === 'expense' ? 'Costo / Egreso' : 'Ingreso Adicional'})
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#7A736A]">
                Impacto / Monto: <strong className="text-[#3D3833]">{formatCurrency(hoveredStep.value)}</strong>
              </span>
              <span className="text-[#7A736A]">
                % s/ Revenue:{' '}
                <strong className="text-[#5A5A40]">
                  {hoveredStep.isTotal
                    ? `${((hoveredStep.value / netRevenue) * 100).toFixed(1)}%`
                    : `${((Math.abs(hoveredStep.value) / netRevenue) * 100).toFixed(1)}%`}
                </strong>
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-[#7A736A] text-xs">
            <Info className="w-4 h-4 text-[#8C9C8C]" />
            <span>Pasa el cursor sobre cualquier barra para ver el desglose exacto y el impacto sobre el Net Revenue.</span>
          </div>
        )}
      </div>
    </div>
  );
};
