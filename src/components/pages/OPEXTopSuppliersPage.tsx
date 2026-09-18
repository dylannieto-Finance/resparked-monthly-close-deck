import React, { useState } from 'react';
import { TOP_SUPPLIERS } from '../../data/mockFinancialData';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { Users, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const OPEXTopSuppliersPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('Julio 2026');

  // Sorted by amount descending
  const sortedSuppliers = [...TOP_SUPPLIERS].sort((a, b) => b.amount - a.amount);

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="bg-white p-5 rounded-xl border border-[#E8E2D9] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#5A5A40]" />
          <div>
            <h2 className="text-base font-bold text-[#3D3833]">Top 10 Proveedores OPEX</h2>
            <p className="text-xs text-[#7A736A]">Mayores receptores de facturación por servicios y suministros</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-[#7A736A] uppercase">Período:</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="text-xs bg-[#FAF7F2] border border-[#E8E2D9] rounded-lg px-3 py-1.5 text-[#3D3833] focus:outline-none focus:ring-1 focus:ring-[#8C9C8C]"
          >
            <option value="Julio 2026">Julio 2026</option>
            <option value="Q2 2026">Q2 2026</option>
            <option value="Q1 2026">Q1 2026</option>
            <option value="Año Completo 2025">Año Completo 2025</option>
          </select>
        </div>
      </div>

      {/* Top 10 Suppliers Table */}
      <div className="bg-white rounded-xl border border-[#E8E2D9] shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-[#F5F2ED] border-b border-[#E8E2D9] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#3D3833]">Ranking de Proveedores por Monto Acumulado</h3>
          <span className="text-xs font-mono text-[#7A736A]">Ordenado por Monto descendente</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#FAF7F2] text-[#5A5A40] border-b border-[#E8E2D9]">
                <th className="w-12 px-4 py-3 font-bold text-center">#</th>
                <th className="px-4 py-3 font-bold">Proveedor</th>
                <th className="px-4 py-3 font-bold">N° Contrato</th>
                <th className="px-4 py-3 font-bold">Categoría OPEX</th>
                <th className="px-4 py-3 font-bold text-right">Monto Incurrido</th>
                <th className="px-4 py-3 font-bold text-right">% Δ vs Período Ant.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE8]">
              {sortedSuppliers.map((supplier, idx) => {
                const isIncrease = supplier.pctChange > 0;

                return (
                  <tr key={supplier.id} className="hover:bg-[#FCFAF7] transition-colors">
                    <td className="px-4 py-3 text-center font-bold text-[#A8A298]">{idx + 1}</td>
                    <td className="px-4 py-3 font-bold text-[#3D3833]">{supplier.supplier}</td>
                    <td className="px-4 py-3 font-mono text-[#7A736A]">{supplier.contract}</td>
                    <td className="px-4 py-3 text-[#3D3833]">{supplier.category}</td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-[#3D3833]">
                      {formatCurrency(supplier.amount)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`inline-flex items-center gap-0.5 font-bold font-mono ${
                          isIncrease ? 'text-[#EF4444]' : 'text-[#22C55E]'
                        }`}
                      >
                        {isIncrease ? (
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowDownRight className="w-3.5 h-3.5" />
                        )}
                        {formatPercent(supplier.pctChange)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
