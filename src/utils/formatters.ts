import { BudgetStatus } from '../types';

/**
 * Formats a number as USD currency without decimals ($#,##0)
 */
export function formatCurrency(value: number): string {
  if (value === undefined || value === null || isNaN(value)) return '$0';
  const isNegative = value < 0;
  const absVal = Math.abs(value);
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(absVal);

  return isNegative ? `-${formatted}` : formatted;
}

/**
 * Formats financial values matching exact screenshot format:
 * Positive: $446.660
 * Negative: ($36.926)
 * Zero: -
 */
export function formatPnlCurrency(value: number | undefined | null): string {
  if (value === undefined || value === null || value === 0) return '-';
  const isNegative = value < 0;
  const absVal = Math.round(Math.abs(value));
  
  // Format with dot thousands separator as in spreadsheet: 446.660
  const numStr = absVal.toLocaleString('es-AR');

  if (isNegative) {
    return `($${numStr})`;
  }
  return `$${numStr}`;
}

/**
 * Formats a number as percentage with 1 decimal place (0.0%)
 */
export function formatPercent(value: number): string {
  if (value === undefined || value === null || isNaN(value)) return '0.0%';
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);

  return `${value > 0 ? '+' : ''}${formatted}%`;
}

/**
 * Returns exact Hex color and label for Traffic Light (Semáforo de estado)
 * Verde #22C55E (on track)
 * Ámbar #F59E0B (near limit)
 * Rojo #EF4444 (over budget)
 */
export function getStatusBadge(status: BudgetStatus): {
  colorHex: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  label: string;
} {
  switch (status) {
    case 'on_track':
      return {
        colorHex: '#22C55E',
        bgColor: 'bg-[#22C55E]/10',
        textColor: 'text-[#15803D]',
        borderColor: 'border-[#22C55E]/30',
        label: 'On Track',
      };
    case 'near_limit':
      return {
        colorHex: '#F59E0B',
        bgColor: 'bg-[#F59E0B]/10',
        textColor: 'text-[#B45309]',
        borderColor: 'border-[#F59E0B]/30',
        label: 'Near Limit',
      };
    case 'over_budget':
      return {
        colorHex: '#EF4444',
        bgColor: 'bg-[#EF4444]/10',
        textColor: 'text-[#B91C1C]',
        borderColor: 'border-[#EF4444]/30',
        label: 'Over Budget',
      };
  }
}

/**
 * Heatmap color scale calculator for GM2% (e.g. 15% - 65%)
 */
export function getGM2HeatmapBg(gm2Pct: number): string {
  if (gm2Pct >= 50) return 'bg-[#22C55E] text-white font-semibold';
  if (gm2Pct >= 40) return 'bg-[#86EFAC] text-[#14532D] font-medium';
  if (gm2Pct >= 30) return 'bg-[#FEF08A] text-[#713F12] font-medium';
  if (gm2Pct >= 20) return 'bg-[#FDE047] text-[#854D0E] font-medium';
  if (gm2Pct >= 10) return 'bg-[#FCA5A5] text-[#7F1D1D] font-medium';
  return 'bg-[#EF4444] text-white font-semibold';
}
