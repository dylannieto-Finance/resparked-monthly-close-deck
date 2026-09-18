import React from 'react';
import { BANK_ACCOUNTS, CASH_PROJECTION_POINTS } from '../../data/mockFinancialData';
import { formatCurrency } from '../../utils/formatters';
import { Wallet, Landmark, TrendingUp, ShieldCheck } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

export const CashFlowPage: React.FC = () => {
  // Current total cash position
  const totalCash = BANK_ACCOUNTS.reduce((acc, a) => acc + a.balance, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner & Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Scorecard: Current Cash Position */}
        <div className="bg-white p-6 rounded-xl border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#7A736A] uppercase">
                Posición de Caja Actual
              </span>
              <div className="p-2 bg-[#F5F2ED] text-[#5A5A40] rounded-lg">
                <Wallet className="w-5 h-5" />
              </div>
            </div>

            <div className="text-3xl font-bold text-[#3D3833] tracking-tight">
              {formatCurrency(totalCash)}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F0EDE8] flex items-center justify-between text-xs text-[#7A736A]">
            <span>Cuentas consolidadas: {BANK_ACCOUNTS.length}</span>
            <span className="font-semibold text-[#22C55E] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Liquidez OK
            </span>
          </div>
        </div>

        {/* Projection summary text card */}
        <div className="bg-white p-6 rounded-xl border border-[#E8E2D9] shadow-xs lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#3D3833]">Proyección de Flujo de Caja (30 / 60 / 90 Días)</h3>
            <p className="text-xs text-[#7A736A] mt-1">
              Estimación de saldo de tesorería considerando cobros pendientes por cuentas por cobrar e egresos programados de nómina y nómina operativa.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-[#F0EDE8] text-center">
            <div>
              <span className="text-[11px] text-[#7A736A] font-semibold block">Proyección 30 días</span>
              <span className="text-base font-bold text-[#3D3833] font-mono">$1,380,000</span>
            </div>
            <div>
              <span className="text-[11px] text-[#7A736A] font-semibold block">Proyección 60 días</span>
              <span className="text-base font-bold text-[#3D3833] font-mono">$1,590,000</span>
            </div>
            <div>
              <span className="text-[11px] text-[#7A736A] font-semibold block">Proyección 90 días</span>
              <span className="text-base font-bold text-[#3D3833] font-mono">$1,780,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* 30/60/90 Days Cash Flow Projection Line Chart */}
      <div className="bg-white rounded-xl border border-[#E8E2D9] p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8E2D9]">
          <TrendingUp className="w-5 h-5 text-[#5A5A40]" />
          <div>
            <h3 className="text-sm font-bold text-[#3D3833]">Trayectoria Proyectada de Caja</h3>
            <p className="text-xs text-[#7A736A]">Evolución del saldo disponible a 90 días en USD</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={CASH_PROJECTION_POINTS} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E2D9" />
              <XAxis dataKey="dayLabel" tick={{ fontSize: 11, fill: '#7A736A' }} />
              <YAxis
                domain={['auto', 'auto']}
                tick={{ fontSize: 11, fill: '#7A736A' }}
                tickFormatter={(val) => `$${val / 1000}k`}
              />
              <Tooltip
                formatter={(value: any) => [formatCurrency(Number(value)), 'Saldo Proyectado']}
                contentStyle={{ backgroundColor: '#FCFAF7', borderColor: '#E8E2D9', borderRadius: '8px' }}
              />
              <Line
                type="monotone"
                dataKey="projectedCash"
                stroke="#1E40AF"
                strokeWidth={3}
                dot={{ r: 4, fill: '#1E40AF' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table: Bank Accounts Breakdown */}
      <div className="bg-white rounded-xl border border-[#E8E2D9] shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-[#F5F2ED] border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-[#5A5A40]" />
            <h3 className="text-sm font-bold text-[#3D3833]">Detalle por Cuenta Bancaria</h3>
          </div>
          <span className="text-xs text-[#7A736A]">Total Consolidado: {formatCurrency(totalCash)}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#FAF7F2] text-[#5A5A40] border-b border-[#E8E2D9]">
                <th className="px-6 py-3 font-bold">Institución Bancaria</th>
                <th className="px-4 py-3 font-bold">Número de Cuenta</th>
                <th className="px-4 py-3 font-bold text-center">Moneda</th>
                <th className="px-4 py-3 font-bold text-center">Estado</th>
                <th className="px-4 py-3 font-bold text-right">Saldo Disponible</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE8]">
              {BANK_ACCOUNTS.map((acc) => (
                <tr key={acc.id} className="hover:bg-[#FCFAF7]">
                  <td className="px-6 py-3 font-bold text-[#3D3833]">{acc.bankName}</td>
                  <td className="px-4 py-3 font-mono text-[#7A736A]">{acc.accountNumber}</td>
                  <td className="px-4 py-3 text-center font-bold text-[#5A5A40]">{acc.currency}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#22C55E]/15 text-[#15803D]">
                      Activa
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-[#3D3833]">
                    {formatCurrency(acc.balance)}
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
