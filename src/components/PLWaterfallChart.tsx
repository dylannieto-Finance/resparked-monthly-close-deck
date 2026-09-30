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

  // Extract key values from rows if available, otherwise fallback to exact July 2026 validated figures
  const getVal = (id: string, fallback: number) => {
    if (!rows) return fallback;
    const found = rows.find((r) => r.id === id);
    return found ? found.real : fallback;
  };

  const netRevenue = getVal('net-revenue', 446660);
  const cogs = getVal('cogs', -44367);
  const gm1 = getVal('gm1', 402293);
  const lastMile = getVal('last-mile', -125682);
  const platformFees = getVal('platform-fees', -32161);
  const gm2 = getVal('gm2', 244449);
  const advertising = getVal('advertising', -356525);
  const gm3 = getVal('gm3', -112076);
  const opex = getVal('opex', -308040);
  const ebitda = getVal('ebitda', -420116);
  const otherIncome = getVal('other-income', 19361);
  const otherExpenses = getVal('other-expenses', -1605);
  const otherNet = otherIncome + (otherExpenses < 0 ? otherExpenses : -otherExpenses); // +17756
  const netIncome = getVal('net-income', -402360);

  // Build the sequential waterfall steps
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
      value: cogs,
      startValue: netRevenue,
      endValue: netRevenue + cogs, // 402293
      isTotal: false,
      type: 'expense',
      color: '#C84B31',
    },
    {
      id: 'gm1',
      name: 'GM1',
      value: gm1,
      startValue: 0,
      endValue: gm1,
      isTotal: true,
      type: 'subtotal',
      color: '#5A5A40',
    },
    {
      id: 'last-mile',
      name: 'Last Mile',
      value: lastMile,
      startValue: gm1,
      endValue: gm1 + lastMile, // 276611
      isTotal: false,
      type: 'expense',
      color: '#C84B31',
    },
    {
      id: 'platform-fees',
      name: 'Platform Fees',
      value: platformFees,
      startValue: gm1 + lastMile,
      endValue: gm1 + lastMile + platformFees, // 244449
      isTotal: false,
      type: 'expense',
      color: '#C84B31',
    },
    {
      id: 'gm2',
      name: 'GM2',
      value: gm2,
      startValue: 0,
      endValue: gm2,
      isTotal: true,
      type: 'subtotal',
      color: '#3D3833',
    },
    {
      id: 'advertising',
      name: 'Ad Spend',
      value: advertising,
      startValue: gm2,
      endValue: gm2 + advertising, // -112076
      isTotal: false,
      type: 'expense',
      color: '#C84B31',
    },
    {
      id: 'gm3',
      name: 'GM3',
      value: gm3,
      startValue: gm3,
      endValue: 0,
      isTotal: true,
      type: 'subtotal',
      color: '#7A736A',
    },
    {
      id: 'opex',
      name: 'OPEX',
      value: opex,
      startValue: gm3,
      endValue: gm3 + opex, // -420116
      isTotal: false,
      type: 'expense',
      color: '#C84B31',
    },
    {
      id: 'ebitda',
      name: 'EBITDA',
      value: ebitda,
      startValue: ebitda,
      endValue: 0,
      isTotal: true,
      type: 'subtotal',
      color: '#3D3833',
    },
    {
      id: 'other-net',
      name: 'Otros Neto',
      value: otherNet,
      startValue: ebitda,
      endValue: ebitda + otherNet, // -402360
      isTotal: false,
      type: 'income',
      color: '#2E7D32',
    },
    {
      id: 'net-income',
      name: 'Net Income',
      value: netIncome,
      startValue: netIncome,
      endValue: 0,
      isTotal: true,
      type: 'subtotal',
      color: '#1E293B',
    },
  ];

  // Calculate Y domain range for SVG scaling
  const minY = -480000;
  const maxY = 500000;
  const totalRange = maxY - minY;

  // Helper to map monetary value to percentage height/y-position
  const getYPct = (val: number) => {
    return ((maxY - val) / totalRange) * 100;
  };

  const formatShortK = (num: number) => {
    const sign = num > 0 ? '' : '';
    const formatted = Math.abs(num) / 1000;
    if (num < 0) {
      return `-$${formatted.toFixed(1)}k`;
    }
    return `$${formatted.toFixed(1)}k`;
  };

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
              Flujo desde Net Revenue hasta Net Income con deducciones y subtotales intermedios (USD)
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
            <span className="w-3 h-3 rounded-xs bg-[#2E7D32] inline-block" />
            <span className="text-[#5A5A40] font-medium">Otros Ingresos</span>
          </div>
        </div>
      </div>

      {/* Main Waterfall Graphic Canvas */}
      <div className="relative w-full h-[340px] pt-4 pb-8 select-none">
        {/* Zero baseline */}
        <div
          className="absolute left-0 right-0 border-b border-dashed border-[#A8A298] z-0"
          style={{ top: `${getYPct(0)}%` }}
        >
          <span className="absolute right-0 -top-3 text-[10px] font-bold text-[#7A736A] bg-white px-1">
            $0
          </span>
        </div>

        {/* Horizontal grid lines */}
        {[-300000, -100000, 200000, 400000].map((gridVal) => (
          <div
            key={gridVal}
            className="absolute left-0 right-0 border-b border-[#F0EDE8] z-0"
            style={{ top: `${getYPct(gridVal)}%` }}
          >
            <span className="absolute left-0 -top-2.5 text-[9px] text-[#A8A298]">
              ${gridVal / 1000}k
            </span>
          </div>
        ))}

        {/* Bars Container */}
        <div className="relative w-full h-full flex items-stretch justify-between px-6 z-10">
          {steps.map((step, idx) => {
            const topVal = Math.max(step.startValue, step.endValue);
            const bottomVal = Math.min(step.startValue, step.endValue);

            const topPct = getYPct(topVal);
            const bottomPct = getYPct(bottomVal);
            const heightPct = Math.max(bottomPct - topPct, 1.2); // minimum height for visual touch

            const isHovered = hoveredStep?.id === step.id;

            return (
              <div
                key={step.id}
                className="relative flex-1 flex flex-col items-center group cursor-pointer px-0.5"
                onMouseEnter={() => setHoveredStep(step)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Connecting step line to next bar */}
                {idx < steps.length - 1 && (
                  <div
                    className="absolute right-0 w-full border-b border-dotted border-[#B8B0A2] z-0 opacity-40 group-hover:opacity-100 transition-opacity"
                    style={{ top: `${getYPct(step.endValue)}%` }}
                  />
                )}

                {/* Floating Value Label on top or bottom of bar */}
                <div
                  className="absolute z-20 whitespace-nowrap text-[10px] font-bold transition-transform group-hover:scale-110"
                  style={{
                    top: step.value >= 0 ? `${topPct - 6}%` : `${bottomPct + 1}%`,
                    color: step.isTotal ? '#3D3833' : step.type === 'expense' ? '#C84B31' : '#2E7D32',
                  }}
                >
                  {formatShortK(step.value)}
                </div>

                {/* Actual Bar Element */}
                <div
                  className={`w-full max-w-[36px] rounded-xs transition-all duration-200 z-10 ${
                    isHovered ? 'ring-2 ring-offset-1 ring-[#3D3833] brightness-110' : ''
                  }`}
                  style={{
                    position: 'absolute',
                    top: `${topPct}%`,
                    height: `${heightPct}%`,
                    backgroundColor: step.color,
                  }}
                />

                {/* X-Axis Category Label */}
                <div className="absolute bottom-[-32px] text-center w-full">
                  <span
                    className={`block text-[10px] truncate leading-tight transition-colors ${
                      step.isTotal ? 'font-bold text-[#3D3833]' : 'font-medium text-[#7A736A]'
                    } ${isHovered ? 'text-[#3D3833] underline' : ''}`}
                  >
                    {step.name}
                  </span>
                </div>
              </div>
            );
          })}
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
                  {((hoveredStep.value / netRevenue) * 100).toFixed(1)}%
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
