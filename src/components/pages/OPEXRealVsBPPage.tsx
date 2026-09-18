import React, { useState, useMemo } from 'react';
import { OPEX_REAL_VS_BP_ITEMS, OPEX_MOM_VARIATIONS } from '../../data/mockFinancialData';
import { formatCurrency, formatPercent, getStatusBadge } from '../../utils/formatters';
import { BudgetStatus } from '../../types';
import { Filter, ArrowUpDown, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export const OPEXRealVsBPPage: React.FC = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('Ene 2026 - Jul 2026');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedTeam, setSelectedTeam] = useState('Todos');
  const [sortField, setSortField] = useState<'bpLine' | 'real' | 'budget' | 'executionPct'>('executionPct');
  const [sortAsc, setSortAsc] = useState(false);

  // Extract unique categories and teams for filter dropdowns
  const categories = useMemo(() => {
    const set = new Set(OPEX_REAL_VS_BP_ITEMS.map((i) => i.category));
    return ['Todas', ...Array.from(set)];
  }, []);

  const teams = useMemo(() => {
    const set = new Set(OPEX_REAL_VS_BP_ITEMS.map((i) => i.team));
    return ['Todos', ...Array.from(set)];
  }, []);

  // Filtered Items
  const filteredItems = useMemo(() => {
    return OPEX_REAL_VS_BP_ITEMS.filter((item) => {
      const matchCat = selectedCategory === 'Todas' || item.category === selectedCategory;
      const matchTeam = selectedTeam === 'Todos' || item.team === selectedTeam;
      return matchCat && matchTeam;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        return sortAsc
          ? (valA as string).localeCompare(valB as string)
          : (valB as string).localeCompare(valA as string);
      }
      return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });
  }, [selectedCategory, selectedTeam, sortField, sortAsc]);

  // Traffic light counts
  const counts = useMemo(() => {
    let onTrack = 0;
    let nearLimit = 0;
    let overBudget = 0;

    filteredItems.forEach((i) => {
      if (i.status === 'on_track') onTrack++;
      if (i.status === 'near_limit') nearLimit++;
      if (i.status === 'over_budget') overBudget++;
    });

    return { onTrack, nearLimit, overBudget };
  }, [filteredItems]);

  const handleSort = (field: 'bpLine' | 'real' | 'budget' | 'executionPct') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Filters Bar */}
      <div className="bg-white p-5 rounded-xl border border-[#E8E2D9] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-bold text-[#3D3833]">
          <Filter className="w-4 h-4 text-[#5A5A40]" />
          <span>Filtros OPEX</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Date Range Dropdown */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-[#7A736A] uppercase mb-1">Rango de Fecha</label>
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="text-xs bg-[#FAF7F2] border border-[#E8E2D9] rounded-lg px-3 py-1.5 text-[#3D3833] focus:outline-none focus:ring-1 focus:ring-[#8C9C8C]"
            >
              <option value="Ene 2026 - Jul 2026">Ene 2026 - Jul 2026</option>
              <option value="Q1 2026">Q1 2026</option>
              <option value="Q2 2026">Q2 2026</option>
              <option value="Julio 2026">Julio 2026</option>
            </select>
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-[#7A736A] uppercase mb-1">Categoría OPEX</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs bg-[#FAF7F2] border border-[#E8E2D9] rounded-lg px-3 py-1.5 text-[#3D3833] focus:outline-none focus:ring-1 focus:ring-[#8C9C8C]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Team Dropdown */}
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-[#7A736A] uppercase mb-1">Equipo</label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="text-xs bg-[#FAF7F2] border border-[#E8E2D9] rounded-lg px-3 py-1.5 text-[#3D3833] focus:outline-none focus:ring-1 focus:ring-[#8C9C8C]"
            >
              {teams.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Top Metrics: Scorecards MoM / YoY & Semáforo Counts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Scorecard MoM */}
        <div className="bg-white p-5 rounded-xl border border-[#E8E2D9] shadow-xs">
          <span className="text-xs font-semibold text-[#7A736A] block mb-1">Variación OPEX MoM</span>
          <div className="text-2xl font-bold text-[#3D3833]">+3.3%</div>
          <p className="text-xs text-[#7A736A] mt-1">Incremento de +$9,500 vs junio 2026</p>
        </div>

        {/* Scorecard YoY */}
        <div className="bg-white p-5 rounded-xl border border-[#E8E2D9] shadow-xs">
          <span className="text-xs font-semibold text-[#7A736A] block mb-1">Variación OPEX YoY</span>
          <div className="text-2xl font-bold text-[#3D3833]">+8.1%</div>
          <p className="text-xs text-[#7A736A] mt-1">Comparado con Julio 2025</p>
        </div>

        {/* Semáforo Conteo Cards (Green / Amber / Red) */}
        <div className="bg-white p-5 rounded-xl border border-[#E8E2D9] shadow-xs col-span-1 md:col-span-2 flex items-center justify-around">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#22C55E]/15 text-[#22C55E] flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold text-[#3D3833]">{counts.onTrack}</span>
              <span className="text-xs text-[#7A736A] block font-medium">On Track</span>
            </div>
          </div>

          <div className="h-8 w-px bg-[#E8E2D9]" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold text-[#3D3833]">{counts.nearLimit}</span>
              <span className="text-xs text-[#7A736A] block font-medium">Near Limit</span>
            </div>
          </div>

          <div className="h-8 w-px bg-[#E8E2D9]" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EF4444]/15 text-[#EF4444] flex items-center justify-center font-bold">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold text-[#3D3833]">{counts.overBudget}</span>
              <span className="text-xs text-[#7A736A] block font-medium">Over Budget</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table: Real vs Budget */}
      <div className="bg-white rounded-xl border border-[#E8E2D9] shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-[#F5F2ED] border-b border-[#E8E2D9] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#3D3833]">Tabla Real vs Budget (OPEX)</h3>
          <span className="text-xs text-[#7A736A]">Mostrando {filteredItems.length} líneas de costo</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#FAF7F2] text-[#5A5A40] border-b border-[#E8E2D9]">
                <th
                  onClick={() => handleSort('bpLine')}
                  className="px-6 py-3 font-bold cursor-pointer hover:bg-[#E8E2D9]/40"
                >
                  <div className="flex items-center gap-1">
                    <span>Línea BP</span>
                    <ArrowUpDown className="w-3 h-3 text-[#7A736A]" />
                  </div>
                </th>
                <th className="px-4 py-3 font-bold">Categoría</th>
                <th className="px-4 py-3 font-bold">Equipo</th>
                <th className="px-4 py-3 font-bold text-center">Estado (Semáforo)</th>
                <th
                  onClick={() => handleSort('real')}
                  className="px-4 py-3 font-bold text-right cursor-pointer hover:bg-[#E8E2D9]/40"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Real</span>
                    <ArrowUpDown className="w-3 h-3 text-[#7A736A]" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('budget')}
                  className="px-4 py-3 font-bold text-right cursor-pointer hover:bg-[#E8E2D9]/40"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Budget</span>
                    <ArrowUpDown className="w-3 h-3 text-[#7A736A]" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('executionPct')}
                  className="px-4 py-3 font-bold text-right cursor-pointer hover:bg-[#E8E2D9]/40"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>% Ejecución</span>
                    <ArrowUpDown className="w-3 h-3 text-[#7A736A]" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE8]">
              {filteredItems.map((item) => {
                const badge = getStatusBadge(item.status);

                return (
                  <tr key={item.id} className="hover:bg-[#FCFAF7] transition-colors">
                    <td className="px-6 py-3 font-mono font-bold text-[#3D3833]">{item.bpLine}</td>
                    <td className="px-4 py-3 text-[#3D3833]">{item.category}</td>
                    <td className="px-4 py-3 text-[#7A736A]">{item.team}</td>

                    {/* Semáforo badge using exact requested hex codes */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${badge.bgColor} ${badge.textColor} ${badge.borderColor}`}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: badge.colorHex }}
                        />
                        {badge.label}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right font-mono font-bold text-[#3D3833]">
                      {formatCurrency(item.real)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-[#7A736A]">
                      {formatCurrency(item.budget)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-[#5A5A40]">
                      {item.executionPct.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Secondary Table: Variaciones MoM */}
      <div className="bg-white rounded-xl border border-[#E8E2D9] shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-[#F5F2ED] border-b border-[#E8E2D9]">
          <h3 className="text-sm font-bold text-[#3D3833]">Variaciones MoM Significativas</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#FAF7F2] text-[#5A5A40] border-b border-[#E8E2D9]">
                <th className="px-6 py-3 font-bold">Línea BP</th>
                <th className="px-4 py-3 font-bold">Equipo</th>
                <th className="px-4 py-3 font-bold">Categoría</th>
                <th className="px-4 py-3 font-bold text-right">Monto Incremento</th>
                <th className="px-4 py-3 font-bold text-right">% Δ MoM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE8]">
              {OPEX_MOM_VARIATIONS.map((varItem) => (
                <tr key={varItem.id} className="hover:bg-[#FCFAF7] transition-colors">
                  <td className="px-6 py-3 font-mono font-bold text-[#3D3833]">{varItem.bpLine}</td>
                  <td className="px-4 py-3 text-[#3D3833]">{varItem.team}</td>
                  <td className="px-4 py-3 text-[#7A736A]">{varItem.category}</td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-[#EF4444]">
                    +{formatCurrency(varItem.amount)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-[#EF4444]">
                    +{varItem.pctChange.toFixed(1)}%
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
