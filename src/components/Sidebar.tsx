import React from 'react';
import { PageView } from '../types';
import {
  LayoutDashboard,
  TrendingUp,
  LineChart,
  Users,
  Scale,
  Grid,
  BarChart3,
  Wallet,
  FileText,
  ChevronLeft,
  ChevronRight,
  Database,
} from 'lucide-react';

interface SidebarProps {
  activePage: PageView;
  onSelectPage: (page: PageView) => void;
  isOpen: boolean;
  onToggle: () => void;
  sheetsConnected: boolean;
  onConnectSheets: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onSelectPage,
  isOpen,
  onToggle,
  sheetsConnected,
  onConnectSheets,
}) => {
  const navItemClass = (page: PageView) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
      activePage === page
        ? 'bg-[#5A5A40] text-white shadow-xs'
        : 'text-[#5A5A40] hover:bg-[#E8E2D9] hover:text-[#3D3833]'
    }`;

  return (
    <aside
      className={`bg-[#FCFAF7] border-r border-[#E8E2D9] flex flex-col justify-between transition-all duration-300 z-20 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      {/* Top Brand / Toggle Bar */}
      <div className="p-4 border-b border-[#E8E2D9] flex items-center justify-between">
        {isOpen ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FBBF4A] text-white font-extrabold flex items-center justify-center font-serif text-lg">
              R·
            </div>
            <div>
              <span className="text-sm font-bold text-[#5A5A40] block leading-tight">
                Finance Suite
              </span>
              <span className="text-[10px] text-[#7A736A]">Control & Reporting</span>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-[#FBBF4A] text-white font-extrabold flex items-center justify-center font-serif text-lg mx-auto">
            R·
          </div>
        )}

        <button
          onClick={onToggle}
          className={`p-1 text-[#7A736A] hover:text-[#3D3833] hover:bg-[#E8E2D9] rounded-md transition-colors cursor-pointer ${
            !isOpen && 'hidden'
          }`}
          title="Colapsar menú"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {!isOpen && (
        <button
          onClick={onToggle}
          className="p-2 text-[#7A736A] hover:text-[#3D3833] hover:bg-[#E8E2D9] rounded-md mx-auto my-2 transition-colors cursor-pointer"
          title="Expandir menú"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Main Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {/* Standalone Top Item: Resumen Ejecutivo */}
        <div>
          <button
            onClick={() => onSelectPage('executive')}
            className={navItemClass('executive')}
            title="Resumen Ejecutivo"
          >
            <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
            {isOpen && <span>Resumen Ejecutivo</span>}
          </button>
        </div>

        {/* Section: P&L */}
        <div>
          {isOpen && (
            <div className="px-3 text-[10px] font-bold text-[#A8A298] uppercase tracking-wider mb-2">
              P&L
            </div>
          )}
          <div className="space-y-1">
            <button
              onClick={() => onSelectPage('pl-real-vs-bp')}
              className={navItemClass('pl-real-vs-bp')}
              title="Real vs BP vs SC"
            >
              <FileText className="w-4 h-4 flex-shrink-0" />
              {isOpen && <span>Real vs BP vs SC</span>}
            </button>
          </div>
        </div>

        {/* Section: Rentabilidad */}
        <div>
          {isOpen && (
            <div className="px-3 text-[10px] font-bold text-[#A8A298] uppercase tracking-wider mb-2">
              Rentabilidad
            </div>
          )}
          <div className="space-y-1">
            <button
              onClick={() => onSelectPage('gm2-summary')}
              className={navItemClass('gm2-summary')}
              title="Resumen Análisis"
            >
              <BarChart3 className="w-4 h-4 flex-shrink-0" />
              {isOpen && <span>Resumen Análisis</span>}
            </button>
            <button
              onClick={() => onSelectPage('gm2-heatmap')}
              className={navItemClass('gm2-heatmap')}
              title="Heatmap GM2% por Canal"
            >
              <Grid className="w-4 h-4 flex-shrink-0" />
              {isOpen && <span>Heatmap GM2% por Canal</span>}
            </button>
          </div>
        </div>

        {/* Section: OPEX */}
        <div>
          {isOpen && (
            <div className="px-3 flex items-center justify-between text-[10px] font-bold text-[#A8A298] uppercase tracking-wider mb-2">
              <span>OPEX</span>
              <span className="px-1.5 py-0.5 bg-[#E8E2D9] text-[#7A736A] text-[9px] rounded font-bold font-mono tracking-normal">
                WIP
              </span>
            </div>
          )}
          <div className="space-y-1">
            <button
              onClick={() => onSelectPage('opex-real-vs-bp')}
              className={navItemClass('opex-real-vs-bp')}
              title="Real vs BP (WIP)"
            >
              <TrendingUp className="w-4 h-4 flex-shrink-0" />
              {isOpen && <span>Real vs BP</span>}
            </button>
            <button
              onClick={() => onSelectPage('opex-trends')}
              className={navItemClass('opex-trends')}
              title="Tendencias (WIP)"
            >
              <LineChart className="w-4 h-4 flex-shrink-0" />
              {isOpen && <span>Tendencias</span>}
            </button>
            <button
              onClick={() => onSelectPage('opex-suppliers')}
              className={navItemClass('opex-suppliers')}
              title="Top Proveedores (WIP)"
            >
              <Users className="w-4 h-4 flex-shrink-0" />
              {isOpen && <span>Top Proveedores</span>}
            </button>
          </div>
        </div>

        {/* Section: Balance Sheet */}
        <div>
          {isOpen && (
            <div className="px-3 flex items-center justify-between text-[10px] font-bold text-[#A8A298] uppercase tracking-wider mb-2">
              <span>Balance Sheet</span>
              <span className="px-1.5 py-0.5 bg-[#E8E2D9] text-[#7A736A] text-[9px] rounded font-bold font-mono tracking-normal">
                WIP
              </span>
            </div>
          )}
          <div className="space-y-1">
            <button
              onClick={() => onSelectPage('balance-sheet')}
              className={navItemClass('balance-sheet')}
              title="Balance Sheet (WIP)"
            >
              <Scale className="w-4 h-4 flex-shrink-0" />
              {isOpen && <span>Balance Sheet</span>}
            </button>
          </div>
        </div>

        {/* Section: Cash Flow */}
        <div>
          {isOpen && (
            <div className="px-3 flex items-center justify-between text-[10px] font-bold text-[#A8A298] uppercase tracking-wider mb-2">
              <span>Cash Flow</span>
              <span className="px-1.5 py-0.5 bg-[#E8E2D9] text-[#7A736A] text-[9px] rounded font-bold font-mono tracking-normal">
                WIP
              </span>
            </div>
          )}
          <div className="space-y-1">
            <button
              onClick={() => onSelectPage('cash-flow')}
              className={navItemClass('cash-flow')}
              title="Posición y Proyección (WIP)"
            >
              <Wallet className="w-4 h-4 flex-shrink-0" />
              {isOpen && <span>Posición y Proyección</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Footer: Google Sheets Status */}
      <div className="p-3 border-t border-[#E8E2D9] bg-[#F5F2ED]">
        {isOpen ? (
          <div className="flex items-center justify-between text-xs text-[#7A736A]">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  sheetsConnected ? 'bg-[#22C55E]' : 'bg-[#F59E0B]'
                }`}
              />
              <span className="font-medium text-[11px]">
                {sheetsConnected ? 'Google Sheet OK' : 'Sheet Desconectado'}
              </span>
            </div>
            {!sheetsConnected && (
              <button
                onClick={onConnectSheets}
                className="text-[10px] font-bold text-[#5A5A40] underline hover:text-[#3D3833] cursor-pointer"
              >
                Conectar
              </button>
            )}
          </div>
        ) : (
          <div className="flex justify-center" title={sheetsConnected ? 'Google Sheet Conectado' : 'Google Sheet Desconectado'}>
            <Database className={`w-4 h-4 ${sheetsConnected ? 'text-[#22C55E]' : 'text-[#F59E0B]'}`} />
          </div>
        )}
      </div>
    </aside>
  );
};
