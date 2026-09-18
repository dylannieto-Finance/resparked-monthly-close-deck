import React, { useState } from 'react';
import { MOCK_BALANCE_SHEET } from '../../data/mockFinancialData';
import { formatCurrency } from '../../utils/formatters';
import { Scale, CheckCircle2, BarChart2 } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export const BalanceSheetPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Julio 2026');

  // Cuadre calculation = Activo - Pasivo - Patrimonio
  const cuadre =
    MOCK_BALANCE_SHEET.totalAssets -
    MOCK_BALANCE_SHEET.totalLiabilities -
    MOCK_BALANCE_SHEET.totalEquity;

  const chartData = [
    {
      category: 'Activos Total',
      Activos: MOCK_BALANCE_SHEET.totalAssets,
      'Pasivo + Patrimonio': 0,
    },
    {
      category: 'Pasivo & Patrimonio',
      Activos: 0,
      'Pasivo + Patrimonio': MOCK_BALANCE_SHEET.totalLiabilities + MOCK_BALANCE_SHEET.totalEquity,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Filter Bar (Single Month Selection) */}
      <div className="bg-white p-5 rounded-xl border border-[#E8E2D9] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#5A5A40]" />
          <div>
            <h2 className="text-base font-bold text-[#3D3833]">Balance Sheet (Estado de Situación Financiera)</h2>
            <p className="text-xs text-[#7A736A]">Estructura de Activos, Pasivos, Patrimonio y Ratios de Liquidez y Endeudamiento</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-[#7A736A] uppercase">Selección de Período:</label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="text-xs bg-[#FAF7F2] border border-[#E8E2D9] rounded-lg px-3 py-1.5 text-[#3D3833] font-bold focus:outline-none focus:ring-1 focus:ring-[#8C9C8C]"
          >
            <option value="Julio 2026">Julio 2026</option>
            <option value="Junio 2026">Junio 2026</option>
            <option value="Mayo 2026">Mayo 2026</option>
            <option value="Abril 2026">Abril 2026</option>
          </select>
        </div>
      </div>

      {/* Main Scorecards Grid (Assets, Liabilities, Equity & Cuadre) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Assets */}
        <div className="bg-white p-5 rounded-xl border border-[#E8E2D9] shadow-xs">
          <span className="text-xs font-bold text-[#7A736A] uppercase block mb-1">Total Assets (Activos)</span>
          <div className="text-2xl font-bold text-[#3D3833]">
            {formatCurrency(MOCK_BALANCE_SHEET.totalAssets)}
          </div>
          <p className="text-xs text-[#7A736A] mt-2">Corriente: {formatCurrency(MOCK_BALANCE_SHEET.currentAssets)}</p>
        </div>

        {/* Total Liabilities */}
        <div className="bg-white p-5 rounded-xl border border-[#E8E2D9] shadow-xs">
          <span className="text-xs font-bold text-[#7A736A] uppercase block mb-1">Total Liabilities (Pasivos)</span>
          <div className="text-2xl font-bold text-[#3D3833]">
            {formatCurrency(MOCK_BALANCE_SHEET.totalLiabilities)}
          </div>
          <p className="text-xs text-[#7A736A] mt-2">Corriente: {formatCurrency(MOCK_BALANCE_SHEET.currentLiabilities)}</p>
        </div>

        {/* Total Equity */}
        <div className="bg-white p-5 rounded-xl border border-[#E8E2D9] shadow-xs">
          <span className="text-xs font-bold text-[#7A736A] uppercase block mb-1">Total Equity (Patrimonio)</span>
          <div className="text-2xl font-bold text-[#3D3833]">
            {formatCurrency(MOCK_BALANCE_SHEET.totalEquity)}
          </div>
          <p className="text-xs text-[#7A736A] mt-2">Capital + Reservas Acumuladas</p>
        </div>

        {/* Small Scorecard: Cuadre (Activo - Pasivo - Patrimonio = 0) */}
        <div className="bg-white p-5 rounded-xl border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-[#7A736A] uppercase block mb-1">Cuadre Contable</span>
            <div className="text-xl font-bold text-[#3D3833] font-mono">
              {formatCurrency(cuadre)}
            </div>
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#22C55E]/15 text-[#15803D] border border-[#22C55E]/30 w-fit">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Balance Perfecto ($0)</span>
          </div>
        </div>
      </div>

      {/* Financial Ratios Scorecards */}
      <div>
        <h3 className="text-xs font-bold text-[#7A736A] uppercase tracking-wider mb-3">
          Ratios Financieros Clave
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-[#E8E2D9] shadow-xs">
            <span className="text-xs text-[#7A736A] block font-medium">Liquidez Corriente</span>
            <div className="text-xl font-bold text-[#3D3833] font-mono mt-1">
              {MOCK_BALANCE_SHEET.currentRatio.toFixed(2)}x
            </div>
            <p className="text-[11px] text-[#A8A298] mt-1">Activo Corriente / Pasivo Corriente</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#E8E2D9] shadow-xs">
            <span className="text-xs text-[#7A736A] block font-medium">Liquidez Ácida</span>
            <div className="text-xl font-bold text-[#3D3833] font-mono mt-1">
              {MOCK_BALANCE_SHEET.quickRatio.toFixed(2)}x
            </div>
            <p className="text-[11px] text-[#A8A298] mt-1">(Activo Corr. − Inv.) / Pasivo Corr.</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#E8E2D9] shadow-xs">
            <span className="text-xs text-[#7A736A] block font-medium">Debt to Equity</span>
            <div className="text-xl font-bold text-[#3D3833] font-mono mt-1">
              {MOCK_BALANCE_SHEET.debtToEquity.toFixed(2)}
            </div>
            <p className="text-[11px] text-[#A8A298] mt-1">Pasivo Total / Patrimonio Total</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#E8E2D9] shadow-xs">
            <span className="text-xs text-[#7A736A] block font-medium">Debt to Asset</span>
            <div className="text-xl font-bold text-[#3D3833] font-mono mt-1">
              {(MOCK_BALANCE_SHEET.debtToAsset * 100).toFixed(1)}%
            </div>
            <p className="text-[11px] text-[#A8A298] mt-1">Pasivo Total / Activo Total</p>
          </div>
        </div>
      </div>

      {/* Bar Chart: Assets vs Liabilities & Equity */}
      <div className="bg-white rounded-xl border border-[#E8E2D9] p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8E2D9]">
          <BarChart2 className="w-5 h-5 text-[#5A5A40]" />
          <div>
            <h3 className="text-sm font-bold text-[#3D3833]">Comparación de Masa Patrimonial</h3>
            <p className="text-xs text-[#7A736A]">Estructura de Activos vs Pasivos + Patrimonio</p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E2D9" />
              <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#7A736A' }} />
              <YAxis tick={{ fontSize: 11, fill: '#7A736A' }} tickFormatter={(val) => `$${val / 1000000}M`} />
              <Tooltip
                formatter={(value: any) => [formatCurrency(Number(value)), '']}
                contentStyle={{ backgroundColor: '#FCFAF7', borderColor: '#E8E2D9', borderRadius: '8px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="Activos" fill="#2563EB" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Pasivo + Patrimonio" fill="#475569" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
