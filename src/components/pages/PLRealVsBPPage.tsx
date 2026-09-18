import React from 'react';
import { PL_MAIN_ROWS } from '../../data/mockFinancialData';
import { formatPnlCurrency } from '../../utils/formatters';
import { MessageSquare } from 'lucide-react';

const ROW_COMMENTS: Record<string, React.ReactNode> = {
  'net-revenue': (
    <div className="flex items-center gap-3 text-[11px] whitespace-nowrap">
      <div className="space-y-0.5 font-medium text-[#2C2825]">
        <div>74% Shopify</div>
        <div>25% Amazon</div>
        <div>1% Others</div>
      </div>
      <span className="text-[#8C827A] text-[11px] font-semibold select-none">
        vs
      </span>
      <div className="space-y-0.5 font-medium text-[#5A524A]">
        <div>56% Shopify</div>
        <div>41% Amazon</div>
        <div>3% Others</div>
      </div>
    </div>
  ),
  cogs: '+4.5k amazon transparency',
  'last-mile': `+6k defecto de provi julio (la provi no contemplaba otros conceptos como inbound, pick and pack)
+6k prorrateo packing material comprado en Q4 2025
+4k outbound mayo
+3k shipping junio
+5k se empieza a provisionar conceptos no contemplados anteriormente (DWH no los toma como LM)

A su vez, el gasto en LM como tal aumentó en agosto porque triplicamos las ordenes internacionales respecto de Julio`,
  'platform-fees': 'La diferencia vs SC se explica por 2k fee fijo Shopify que viene por invoice',
  opex: `Professional Services: +$4.1K por el pago inicial del proyecto de análisis de 50 estados.
Software & Apps: +$3.5K, principalmente por Yuma AI e Intelligems.
Travel & Freelancers: disminuyeron luego de los mayores gastos registrados en julio.
Logistics & Fulfillment: aumento por costos de almacenamiento de inventario de CJ.
Others Marketing: disminución principalmente por la ausencia de SMC Media Company y menores gastos de Content Marketing.`,
  'other-income': 'Mismo resultado de Julio pero con mayor participación de Cashback y menor de Intereses',
};

interface PLRealVsBPPageProps {
  sheetData?: unknown;
  onRefreshSheet?: () => void;
}

export const PLRealVsBPPage: React.FC<PLRealVsBPPageProps> = () => {
  return (
    <div className="space-y-6">
      {/* Page Header Bar */}
      <div className="bg-white p-6 rounded-xl border border-[#E8E2D9] shadow-xs">
        <h2 className="text-xl font-bold text-[#3D3833]">Estado de Resultados (P&L): Real vs BP vs SC</h2>
        <p className="text-xs text-[#7A736A] mt-1">
          Comparativa adaptada con datos oficiales de <b>PL (Real)</b>, <b>BP (Budget Plan)</b> y <b>SC (Forecast)</b>.
        </p>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-[#E8E2D9] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-[#F5F2ED] text-[#5A5A40] border-b border-[#E8E2D9]">
                <th className="px-6 py-3.5 font-bold uppercase tracking-wider text-xs w-1/4">Línea P&L (Metric)</th>
                <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-xs text-right border-l border-[#E8E2D9] w-28">PL</th>
                <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-xs text-right border-l border-[#E8E2D9] w-28">BP</th>
                <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-xs text-right border-l border-[#E8E2D9] w-28">SC</th>
                <th className="px-6 py-3.5 font-bold uppercase tracking-wider text-xs text-left border-l border-[#E8E2D9]">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#5A5A40]" />
                    <span>Comments</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE8]">
              {PL_MAIN_ROWS.map((row) => {
                const hasPct = row.pctOfRevenueReal !== undefined;
                const commentText = ROW_COMMENTS[row.id];

                return (
                  <React.Fragment key={row.id}>
                    {/* Main Metric Row */}
                    <tr
                      className={`transition-colors ${
                        row.isHighlight
                          ? 'bg-[#FDF4E7] text-[#3D3833] font-bold text-xs border-y border-[#F3DFC1]'
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
                      <td className={`px-5 py-3 text-right font-mono border-l border-[#F0EDE8] text-[#7A736A] ${row.isHighlight ? 'font-bold text-[#3D3833]' : ''}`}>
                        {formatPnlCurrency(row.bp)}
                      </td>

                      {/* SC */}
                      <td className={`px-5 py-3 text-right font-mono border-l border-[#F0EDE8] text-[#7A736A] ${row.isHighlight ? 'font-bold text-[#3D3833]' : ''}`}>
                        {row.sc !== undefined ? formatPnlCurrency(row.sc) : '-'}
                      </td>

                      {/* Comments Column */}
                      <td className="px-6 py-3 border-l border-[#F0EDE8] text-[#5A5A40] text-xs">
                        {commentText ? (
                          <div className="whitespace-pre-line leading-relaxed font-sans text-[11px] bg-[#FAF7F2] p-2.5 rounded-md border border-[#E8E2D9]/80 text-[#3D3833]">
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
                        <td className="px-6 py-1.5 pl-10 text-[#7A736A]">
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
    </div>
  );
};
