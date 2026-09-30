import React from 'react';
import { EXECUTIVE_SCORECARDS, PL_MAIN_ROWS } from '../../data/mockFinancialData';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { parsePLSheetData } from '../../utils/sheetParser';
import { SheetsValueResponse } from '../../types';
import { PLWaterfallChart } from '../PLWaterfallChart';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ExecutiveSummaryPageProps {
  sheetData?: SheetsValueResponse | null;
}

export const ExecutiveSummaryPage: React.FC<ExecutiveSummaryPageProps> = ({ sheetData }) => {
  const parsedData = parsePLSheetData(sheetData || null, PL_MAIN_ROWS);

  // Dynamically update scorecards if live data exists
  const netRevRow = parsedData.rows.find((r) => r.id === 'net-revenue');
  const gm1Row = parsedData.rows.find((r) => r.id === 'gm1');
  const gm2Row = parsedData.rows.find((r) => r.id === 'gm2');
  const gm3Row = parsedData.rows.find((r) => r.id === 'gm3');
  const advRow = parsedData.rows.find((r) => r.id === 'advertising');
  const netIncRow = parsedData.rows.find((r) => r.id === 'net-income');

  const scorecards = EXECUTIVE_SCORECARDS.map((card) => {
    if (card.id === 'net-revenue' && netRevRow) {
      return {
        ...card,
        value: netRevRow.real,
        bpVariance: netRevRow.real - netRevRow.bp,
        scVariance: netRevRow.real - netRevRow.sc,
      };
    }
    if (card.id === 'gm1' && gm1Row && netRevRow) {
      return {
        ...card,
        value: gm1Row.real,
        secondaryValue: `${Math.round((gm1Row.real / netRevRow.real) * 100)}%`,
      };
    }
    if (card.id === 'gm2' && gm2Row && netRevRow) {
      return {
        ...card,
        value: gm2Row.real,
        secondaryValue: `${Math.round((gm2Row.real / netRevRow.real) * 100)}%`,
      };
    }
    if (card.id === 'gm3' && gm3Row && netRevRow) {
      return {
        ...card,
        value: gm3Row.real,
        secondaryValue: `${Math.round((gm3Row.real / netRevRow.real) * 100)}%`,
      };
    }
    if (card.id === 'advertising' && advRow && netRevRow) {
      const pctThisMonth = `${Math.abs(Math.round((advRow.real / netRevRow.real) * 100))}%`;
      return {
        ...card,
        value: advRow.real,
        pctRevenueThisMonth: pctThisMonth,
        pctRevenueLastMonth: card.pctRevenueLastMonth || '74%',
        pctRevenueAvgAnnual: card.pctRevenueAvgAnnual || '68%',
      };
    }
    if (card.id === 'net-income' && netIncRow) {
      return {
        ...card,
        value: netIncRow.real,
      };
    }
    return card;
  });

  return (
    <div className="space-y-6">
      {/* Page Header Intro */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E8E2D9] shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-[#3D3833]">Resumen Ejecutivo Financiero</h2>
          <p className="text-xs text-[#7A736A] mt-1">
            Métricas principales de rendimiento del mes corriente, comparación contra Budget Plan (BP) y Same Scenario (SC).
          </p>
        </div>
        <div className="flex items-center gap-2">
          {parsedData.isLive ? (
            <div className="flex items-center gap-1.5 bg-[#E2F0D9] text-[#2E7D32] px-3 py-1.5 rounded-lg border border-[#C8E6C9] text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
              <span>Google Sheet En Vivo ({parsedData.rawRowsCount} filas)</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-[#F5F2ED] px-3 py-1.5 rounded-lg border border-[#E8E2D9] text-xs text-[#5A5A40] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#8C9C8C]" />
              <span>Mes Evaluado: Hoja PL</span>
            </div>
          )}
        </div>
      </div>

      {/* Scorecards Grid (6 Scorecards in 1 Row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {scorecards.map((card) => {
          const isPositiveMoM = (card.momChange || 0) >= 0;

          return (
            <div
              key={card.id}
              className="bg-white rounded-xl p-4 border border-[#E8E2D9] shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-semibold text-[#7A736A] uppercase tracking-wider block mb-1.5 truncate">
                  {card.label}
                </span>

                <div className="text-xl sm:text-2xl font-bold text-[#3D3833] tracking-tight">
                  {card.isCurrency ? formatCurrency(card.value) : card.value}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#F0EDE8] flex flex-col gap-1">
                {/* MoM Change badge */}
                {card.momChange !== undefined && (
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#A8A298]">vs Mes Anterior</span>
                    <span
                      className={`inline-flex items-center gap-0.5 font-bold ${
                        isPositiveMoM ? 'text-[#22C55E]' : 'text-[#EF4444]'
                      }`}
                    >
                      {formatPercent(card.momChange)}
                    </span>
                  </div>
                )}

                {/* Secondary Metric */}
                {card.secondaryLabel && (
                  <div className="flex items-center justify-between text-[11px] text-[#7A736A]">
                    <span>{card.secondaryLabel}</span>
                    <span className="font-semibold text-[#3D3833]">{card.secondaryValue}</span>
                  </div>
                )}

                {/* Special Advertising % of Revenue Comparisons */}
                {card.id === 'advertising' && (
                  <div className="flex flex-col gap-0.5 text-[10px] text-[#7A736A]">
                    <div className="flex items-center justify-between">
                      <span>% s/ Rev Mes:</span>
                      <span className="font-bold text-[#3D3833]">{card.pctRevenueThisMonth || '80%'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>vs Mes Ant.:</span>
                      <span className="font-semibold text-[#3D3833]">{card.pctRevenueLastMonth || '74%'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>vs Prom. Anual:</span>
                      <span className="font-semibold text-[#3D3833]">{card.pctRevenueAvgAnnual || '68%'}</span>
                    </div>
                  </div>
                )}

                {/* BP / SC Variance if present */}
                {card.bpVariance !== undefined && (
                  <div className="flex items-center justify-between text-[11px] text-[#7A736A]">
                    <span>Var vs BP</span>
                    <span className={`font-semibold ${card.bpVariance >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                      {card.bpVariance >= 0 ? '+' : ''}
                      {formatCurrency(card.bpVariance)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* P&L Waterfall Chart */}
      <PLWaterfallChart rows={parsedData.rows} />
    </div>
  );
};

