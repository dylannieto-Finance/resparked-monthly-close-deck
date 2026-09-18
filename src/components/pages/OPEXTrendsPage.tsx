import React from 'react';
import { OPEX_MONTHLY_TRENDS } from '../../data/mockFinancialData';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { LineChart as LineIcon, BarChart2, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

// Neutral palette (grays and blues) strictly adhering to prompt rules
const CATEGORY_COLORS: Record<string, string> = {
  Personal: '#1E40AF',  // Blue 800
  Marketing: '#3B82F6', // Blue 500
  Software: '#64748B',  // Slate 500
  Oficina: '#94A3B8',   // Slate 400
  Legal: '#475569',     // Slate 600
  Otros: '#CBD5E1',     // Slate 300
};

export const OPEXTrendsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white p-6 rounded-xl border border-[#E8E2D9] shadow-xs">
        <h2 className="text-xl font-bold text-[#3D3833]">Tendencias y Evolución de OPEX</h2>
        <p className="text-xs text-[#7A736A] mt-1">
          Análisis mensual multi-serie por categoría, composición acumulada de costos y trayectoria histórica de OPEX total.
        </p>
      </div>

      {/* Chart 1: Multi-series Line Chart by Category */}
      <div className="bg-white rounded-xl border border-[#E8E2D9] p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8E2D9]">
          <LineIcon className="w-5 h-5 text-[#5A5A40]" />
          <div>
            <h3 className="text-sm font-bold text-[#3D3833]">Tendencia Mensual por Categoría (Multi-Serie)</h3>
            <p className="text-xs text-[#7A736A]">Evolución individual de costos operativos por rubro</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={OPEX_MONTHLY_TRENDS} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E2D9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7A736A' }} />
              <YAxis
                tick={{ fontSize: 11, fill: '#7A736A' }}
                tickFormatter={(val) => `$${val / 1000}k`}
              />
              <Tooltip
                formatter={(value: any) => [formatCurrency(Number(value)), '']}
                contentStyle={{ backgroundColor: '#FCFAF7', borderColor: '#E8E2D9', borderRadius: '8px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="Personal" stroke={CATEGORY_COLORS.Personal} strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Marketing" stroke={CATEGORY_COLORS.Marketing} strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Software" stroke={CATEGORY_COLORS.Software} strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Oficina" stroke={CATEGORY_COLORS.Oficina} strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Legal" stroke={CATEGORY_COLORS.Legal} strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Otros" stroke={CATEGORY_COLORS.Otros} strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid for Chart 2 & Chart 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 2: Stacked Bar Chart */}
        <div className="bg-white rounded-xl border border-[#E8E2D9] p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8E2D9]">
            <BarChart2 className="w-5 h-5 text-[#5A5A40]" />
            <div>
              <h3 className="text-sm font-bold text-[#3D3833]">Composición Mensual (Barras Apiladas)</h3>
              <p className="text-xs text-[#7A736A]">Participación relativa de cada categoría sobre el total</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={OPEX_MONTHLY_TRENDS} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E2D9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7A736A' }} />
                <YAxis tick={{ fontSize: 11, fill: '#7A736A' }} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip
                  formatter={(value: any) => [formatCurrency(Number(value)), '']}
                  contentStyle={{ backgroundColor: '#FCFAF7', borderColor: '#E8E2D9', borderRadius: '8px' }}
                />
                <Bar dataKey="Personal" stackId="a" fill={CATEGORY_COLORS.Personal} />
                <Bar dataKey="Marketing" stackId="a" fill={CATEGORY_COLORS.Marketing} />
                <Bar dataKey="Software" stackId="a" fill={CATEGORY_COLORS.Software} />
                <Bar dataKey="Oficina" stackId="a" fill={CATEGORY_COLORS.Oficina} />
                <Bar dataKey="Legal" stackId="a" fill={CATEGORY_COLORS.Legal} />
                <Bar dataKey="Otros" stackId="a" fill={CATEGORY_COLORS.Otros} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Simple Line Chart for Total OPEX */}
        <div className="bg-white rounded-xl border border-[#E8E2D9] p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8E2D9]">
            <TrendingUp className="w-5 h-5 text-[#5A5A40]" />
            <div>
              <h3 className="text-sm font-bold text-[#3D3833]">Histórico Total OPEX</h3>
              <p className="text-xs text-[#7A736A]">Trayectoria agregada mensual de gasto operativo</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={OPEX_MONTHLY_TRENDS} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E2D9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7A736A' }} />
                <YAxis
                  domain={['auto', 'auto']}
                  tick={{ fontSize: 11, fill: '#7A736A' }}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip
                  formatter={(value: any) => [formatCurrency(Number(value)), 'Total OPEX']}
                  contentStyle={{ backgroundColor: '#FCFAF7', borderColor: '#E8E2D9', borderRadius: '8px' }}
                />
                <Line
                  type="monotone"
                  dataKey="Total"
                  stroke="#1E3A8A"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#1E3A8A' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
