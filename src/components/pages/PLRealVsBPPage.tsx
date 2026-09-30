import React, { useState } from 'react';
import { PL_MAIN_ROWS } from '../../data/mockFinancialData';
import { formatPnlCurrency } from '../../utils/formatters';
import { parsePLSheetData } from '../../utils/sheetParser';
import { SheetsValueResponse } from '../../types';
import { Database, CheckCircle2, RefreshCw, MessageSquare } from 'lucide-react';

interface PLRealVsBPPageProps {
  sheetData: SheetsValueResponse | null;
  onRefreshSheet?: () => void;
}

const ROW_COMMENTS: Record<string, string> = {
  cogs: '4.5K etiquetas de Amazon para Custo',
  'last-mile': `+21.6k Gastos de dic25
+18.8k Gastos de Ene26
+5.3k Gastos de Feb26
+9.7k Gastos de Mar26
+18.7 Gastos de Abr26
+7.7k Gastos de May26 (habiamos tenido provi en exceso durante el mes pasado que nos jugó a favor)
+3.7k Defecto de provi junio`,
  'platform-fees': 'La diferencia vs SC se explica por 2k fee fijo Shopify que viene por invoice',
  advertising: 'Diferencia vs SC generada por Meta por desfasaje de días',
  opex: `Aumento de Opex generado principalmente por:
- Mayor gasto en mentorías
- Tavel (Aumento generado por Evento Growth, TB de Growth, y compra de pasajes para la JA)
- Freelancers & Agents: aumento principalmente por nuevos proveedores y mayores gastos, destacándose nuevos freelancers.
- Mayor costo de people costo por recalibración de salarios`,
};

export const PLRealVsBPPage: React.FC<PLRealVsBPPageProps> = ({ sheetData, onRefreshSheet }) => {
  const [viewMode, setViewMode] = useState<'structured' | 'raw_sheet'>('structured');

  const parsedData = parsePLSheetData(sheetData, PL_MAIN_ROWS);

  return (
    <div className="space-y-6">
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E8E2D9] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-[#3D3833]">Estado de Resultados (P&L): Real vs BP vs SC</h2>
            {parsedData.isLive && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#E2F0D9] text-[#2E7D32] px-2.5 py-0.5 rounded-full border border-[#C8E6C9]">
                <CheckCircle2 className="w-3 h-3" />
                Google Sheet En Vivo
              </span>
            )}
          </div>
          <p className="text-xs text-[#7A736A]">
            Comparativa adaptada con datos oficiales de <b>PL (Real)</b>, <b>BP (Budget Plan)</b> y <b>SC (Forecast)</b>.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {onRefreshSheet && (
            <button
              onClick={onRefreshSheet}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#5A5A40] bg-[#F5F2ED] hover:bg-[#E8E2D9] rounded-lg border border-[#E8E2D9] transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Actualizar Sheet</span>
            </button>
          )}

          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-[#F5F2ED] p-1 rounded-lg border border-[#E8E2D9]">
            <button
              onClick={() => setViewMode('structured')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                viewMode === 'structured'
                  ? 'bg-[#3D3833] text-white font-bold shadow-xs'
                  : 'text-[#7A736A] hover:text-[#3D3833]'
              }`}
            >
              Tabla Adaptada P&L
            </button>
            <button
              onClick={() => setViewMode('raw_sheet')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                viewMode === 'raw_sheet'
                  ? 'bg-[#3D3833] text-white font-bold shadow-xs'
                  : 'text-[#7A736A] hover:text-[#3D3833]'
              }`}
            >
              Google Sheet Crudo
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'structured' ? (
        <div className="bg-white rounded-xl border border-[#E8E2D9] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-sans">
              <thead>
                <tr className="bg-[#F5F2ED] text-[#5A5A40] border-b border-[#E8E2D9]">
                  <th className="px-6 py-3.5 font-bold uppercase tracking-wider text-xs w-1/4">Línea P&L (Metric)</th>
                  <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-xs text-right border-l border-[#E8E2D9] w-28">PL (Real)</th>
                  <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-xs text-right border-l border-[#E8E2D9] w-28">BP (Budget)</th>
                  <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-xs text-right border-l border-[#E8E2D9] w-28">SC (Forecast)</th>
                  <th className="px-6 py-3.5 font-bold uppercase tracking-wider text-xs text-left border-l border-[#E8E2D9]">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#5A5A40]" />
                      <span>Comments</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EDE8]">
                {parsedData.rows.map((row) => {
                  const hasPct = row.pctOfRevenueReal !== undefined && row.id !== 'net-revenue';
                  const commentText = ROW_COMMENTS[row.id];

                  return (
                    <React.Fragment key={row.id}>
                      {/* Main Metric Row */}
                      <tr
                        className={`transition-colors ${
                          row.isHighlight
                            ? 'bg-[#FAF7F2] text-[#3D3833] font-bold text-xs border-y border-[#E8E2D9]'
                            : 'bg-white text-[#3D3833] font-medium text-xs hover:bg-[#FCFAF7]'
                        }`}
                      >
                        <td className={`px-6 py-3 ${row.isIndent ? 'pl-10 text-[#5A5A40]' : 'font-bold'}`}>
                          {row.name}
                        </td>

                        {/* PL (Real) */}
                        <td className={`px-5 py-3 text-right font-mono border-l border-[#F0EDE8] ${row.isHighlight ? 'font-bold text-[#3D3833]' : 'text-[#3D3833]'}`}>
                          {formatPnlCurrency(row.real)}
                        </td>

                        {/* BP */}
                        <td className={`px-5 py-3 text-right font-mono border-l border-[#F0EDE8] text-[#7A736A] ${row.isHighlight ? 'font-bold' : ''}`}>
                          {formatPnlCurrency(row.bp)}
                        </td>

                        {/* SC */}
                        <td className={`px-5 py-3 text-right font-mono border-l border-[#F0EDE8] text-[#7A736A] ${row.isHighlight ? 'font-bold' : ''}`}>
                          {formatPnlCurrency(row.sc)}
                        </td>

                        {/* Comments Column */}
                        <td className="px-6 py-3 border-l border-[#F0EDE8] text-[#5A5A40] text-xs">
                          {commentText ? (
                            <div className="whitespace-pre-line leading-relaxed font-sans text-[11px] bg-[#FAF7F2] p-2 rounded-md border border-[#E8E2D9]/80 text-[#3D3833]">
                              {commentText}
                            </div>
                          ) : (
                            <span className="text-[#C4BEB4] italic">-</span>
                          )}
                        </td>
                      </tr>

                      {/* % of Revenue Sub-Row */}
                      {hasPct && (
                        <tr key={`${row.id}-pct`} className="bg-[#FCFAF7] text-[#7A736A] text-[11px] italic">
                          <td className="px-6 py-1.5 pl-12 text-[#7A736A]">
                            % of Revenue
                          </td>
                          <td className="px-5 py-1.5 text-right font-mono border-l border-[#F0EDE8]">
                            {row.pctOfRevenueReal !== undefined ? `${Math.round(row.pctOfRevenueReal)}%` : '-'}
                          </td>
                          <td className="px-5 py-1.5 text-right font-mono border-l border-[#F0EDE8]">
                            {row.pctOfRevenueBP !== undefined ? `${Math.round(row.pctOfRevenueBP)}%` : '-'}
                          </td>
                          <td className="px-5 py-1.5 text-right font-mono border-l border-[#F0EDE8]">
                            {row.pctOfRevenueSC !== undefined ? `${Math.round(row.pctOfRevenueSC)}%` : '-'}
                          </td>
                          <td className="px-6 py-1.5 border-l border-[#F0EDE8]" />
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Raw Google Sheet View */
        <div className="bg-white rounded-xl border border-[#E8E2D9] p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#3D3833]">Datos Crudos de la Hoja PL!A1:AR250</h3>
              <p className="text-xs text-[#7A736A] mt-0.5">
                Vista sin procesar devuelta directamente por la Google Sheets API.
              </p>
            </div>
            {onRefreshSheet && (
              <button
                onClick={onRefreshSheet}
                className="text-xs font-semibold text-[#5A5A40] underline hover:text-[#3D3833] cursor-pointer"
              >
                Volver a solicitar a Google API
              </button>
            )}
          </div>

          {sheetData && sheetData.values ? (
            <div className="overflow-auto max-h-[600px] border border-[#E8E2D9] rounded-lg">
              <table className="min-w-full divide-y divide-[#E8E2D9] text-xs font-mono">
                <tbody className="divide-y divide-[#F0EDE8]">
                  {sheetData.values.slice(0, 100).map((row, rIdx) => (
                    <tr key={rIdx} className={rIdx === 0 ? 'bg-[#F5F2ED] font-bold' : 'hover:bg-[#FCFAF7]'}>
                      <td className="px-3 py-1.5 bg-[#E8E2D9] text-center font-bold text-[#7A736A] border-r border-[#D8D2C9]">
                        {rIdx + 1}
                      </td>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-3 py-1.5 border-r border-[#F0EDE8] whitespace-nowrap">
                          {cell || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-[#7A736A]">
              <Database className="w-8 h-8 text-[#A8A298] mx-auto mb-2" />
              <p className="text-xs">No hay datos del Google Sheet cargados en este momento.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

