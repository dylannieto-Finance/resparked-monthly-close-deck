import React, { useState } from 'react';
import {
  Megaphone,
  ShoppingCart,
  Package,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Target,
  ArrowRight,
  Sparkles,
  Info,
  Layers,
  Percent,
  DollarSign,
  ArrowUpRight,
} from 'lucide-react';

interface DriverItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  icon: React.ElementType;
  impactLevel: 'CRÍTICO' | 'ALTO IMPACTO' | 'MEDIO IMPACTO';
  accentColor: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  description: string;
  economicImpactHeader: string;
  summaryMetric: {
    label: string;
    value: string;
    sublabel: string;
    status: 'negative' | 'warning' | 'positive';
  };
  scenariosOrBreakdown: {
    type: 'scenarios' | 'mix_comparison' | 'family_mix';
    title: string;
    items: Array<{
      label: string;
      sub?: string;
      val1?: string;
      val2?: string;
      tag?: string;
      status?: 'danger' | 'warning' | 'success' | 'target' | 'neutral';
    }>;
  };
  takeaway: {
    title: string;
    formula: string;
    note: string;
  };
}

const DRIVERS_DATA: DriverItem[] = [
  {
    id: 'mer-efficiency',
    number: '1',
    name: 'MER — Eficiencia del gasto publicitario',
    tagline: 'Marketing Efficiency Ratio & Escalabilidad de P&L',
    icon: Megaphone,
    impactLevel: 'CRÍTICO',
    accentColor: '#DC2626',
    borderColor: '#FCA5A5',
    badgeBg: '#7F1D1D',
    badgeText: '#FEE2E2',
    badgeBorder: '#991B1B',
    description:
      'En 2026 Ene–Ago el MER cayó a 1.42x (vs 2.05x en 2025 y 2.07x proyectado en el BP Q4).',
    economicImpactHeader: 'Escenarios Q4 2026 sobre $48M NR (GM2 76%):',
    summaryMetric: {
      label: 'Δ GM3 vs Plan BP',
      value: '-$10.6M',
      sublabel: 'Caída de utilidad si el MER se mantiene en 1.42x',
      status: 'negative',
    },
    scenariosOrBreakdown: {
      type: 'scenarios',
      title: 'Sensibilidad de Margen (GM3) según Eficiencia Publicitaria',
      items: [
        {
          label: 'MER 1.42x',
          sub: 'YTD Ene–Ago Real',
          val1: 'Ads $33.8M',
          val2: 'GM3 $1.7M',
          tag: 'Riesgo Crítico',
          status: 'danger',
        },
        {
          label: 'MER 1.70x',
          sub: 'Sensibilidad Media',
          val1: 'Ads $28.2M',
          val2: 'GM3 $7.3M',
          tag: 'Presión Moderada',
          status: 'warning',
        },
        {
          label: 'MER 2.07x',
          sub: 'Meta Presupuesto BP Q4',
          val1: 'Ads $23.2M',
          val2: 'GM3 $12.3M',
          tag: 'Baseline BP',
          status: 'success',
        },
        {
          label: 'MER 2.30x',
          sub: 'Escenario Óptimo',
          val1: 'Ads $20.9M',
          val2: 'GM3 $14.7M',
          tag: 'Upside Objetivo',
          status: 'target',
        },
      ],
    },
    takeaway: {
      title: 'Impacto en Margen Operativo:',
      formula: 'Δ GM3 entre MER 1.42x y 2.07x: -$10.6M',
      note: 'Cada mejora de 0.10x en el MER ahorra aprox. $1.1M en gasto directo de publicidad sobre los $48M de ventas proyectadas.',
    },
  },
  {
    id: 'channel-mix',
    number: '2',
    name: 'Mix de canal Shopify vs Amazon',
    tagline: 'Platform Fees & Retención de Relación con el Cliente',
    icon: ShoppingCart,
    impactLevel: 'ALTO IMPACTO',
    accentColor: '#EA580C',
    borderColor: '#FDBA74',
    badgeBg: '#7C2D12',
    badgeText: '#FFEDD5',
    badgeBorder: '#9A3412',
    description:
      'Amazon cobró un platform fee efectivo del 12.7% vs 3.4% en Shopify (diferencial de 9.3pp). Durante 2026 Ene–Jul, Amazon ganó participación: pasó de 28.2% del revenue Q4-25 a 40.2% del revenue YTD-26. El BP Q4 2026 proyecta Amazon en 33.4%. Si la tendencia del año se mantiene en Q4, el costo en fees adicionales y la pérdida de la relación directa con el cliente escalan.',
    economicImpactHeader: 'Platform fees sobre $48M Q4 según mix:',
    summaryMetric: {
      label: 'Sobrecosto en Fees',
      value: '+$537K',
      sublabel: 'Si Amazon mantiene share YTD (40.2%) vs mix Q4-25',
      status: 'warning',
    },
    scenariosOrBreakdown: {
      type: 'mix_comparison',
      title: 'Costos de Plataforma Proyectados según Participación de Amazon',
      items: [
        {
          label: 'Mix Q4-25',
          sub: 'Amazon 28.2%',
          val1: 'Fees $2.9M',
          val2: 'Base histórica',
          status: 'neutral',
        },
        {
          label: 'Mix Q4-26 BP',
          sub: 'Amazon 33.4%',
          val1: 'Fees $3.1M',
          val2: '+$230K vs Q4-25',
          status: 'warning',
        },
        {
          label: 'Mix YTD-26',
          sub: 'Amazon 40.2%',
          val1: 'Fees $3.4M',
          val2: '+$537K vs Q4-25',
          status: 'danger',
        },
      ],
    },
    takeaway: {
      title: 'Sensibilidad por Migración de Canal:',
      formula: 'Cada 1pp de Amazon → Shopify ahorra $44.7K en fees Q4. Cada 5pp de migración = $223K de GM2 recuperado.',
      note: 'Diferencial de comisión de plataforma: Amazon 12.7% vs Shopify 3.4% (9.3 puntos porcentuales de margen neto absorbidos por Amazon).',
    },
  },
  {
    id: 'product-mix',
    number: '3',
    name: 'Mix de producto Peso del SKU ancla en Q4',
    tagline: 'Participación EPN-2 Customizer & Estructura de Margen Blended',
    icon: Package,
    impactLevel: 'MEDIO IMPACTO',
    accentColor: '#2563EB',
    borderColor: '#93C5FD',
    badgeBg: '#1E3A8A',
    badgeText: '#DBEAFE',
    badgeBorder: '#1D4ED8',
    description:
      'EPN-2 (Customizer) representa el 71% del revenue Q4 BP con un GM1 del 91.7%. Es el producto que financia todo el P&L. A medida que Leather (GM1 ~78%) y otros SKUs ganan participación, el margen blended del portfolio se erosiona. La clave es que en Q4 el foco de marketing y stock debe estar 100% alineado al SKU de mayor margen y volumen.',
    economicImpactHeader: 'Revenue por familia Q4 2026 BP:',
    summaryMetric: {
      label: 'Share SKU Ancla',
      value: '75.8%',
      sublabel: 'Customizer aporta $36.3M con GM1 ~91%',
      status: 'positive',
    },
    scenariosOrBreakdown: {
      type: 'family_mix',
      title: 'Composición de Revenue y Margen Bruto por Familia en BP Q4',
      items: [
        {
          label: 'Customizer',
          sub: 'SKU Ancla EPN-2',
          val1: '$36.3M (75.8%)',
          val2: 'GM1 ~91%',
          tag: 'Financia el P&L',
          status: 'success',
        },
        {
          label: 'Bits',
          sub: 'Accesorios',
          val1: '$6M (12.6%)',
          val2: 'GM1 ~89%',
          tag: 'Alto Margen',
          status: 'neutral',
        },
        {
          label: 'Leather',
          sub: 'Materiales & Accesorios',
          val1: '$3.3M (7.0%)',
          val2: 'GM1 ~78%',
          tag: 'Menor Margen',
          status: 'warning',
        },
        {
          label: 'Kits',
          sub: 'Sets de Grabado',
          val1: '$1.4M (3.0%)',
          val2: 'GM1 ~85%',
          tag: 'Margen Medio',
          status: 'neutral',
        },
        {
          label: 'Stencils',
          sub: 'Plantillas y Moldes',
          val1: '$893K (1.9%)',
          val2: 'GM1 ~93%',
          tag: 'Margen Máximo',
          status: 'neutral',
        },
      ],
    },
    takeaway: {
      title: 'Erosión por Desviación de Mix:',
      formula: 'Cada 1pp que Customizer pierde hacia Leather: Erosión de -14 bps de GM1 blended = -$67K de GM1 sobre $48M de revenue Q4.',
      note: '',
    },
  },
];

export const ProfitabilityDriversPage: React.FC = () => {
  const [selectedDriver, setSelectedDriver] = useState<string>('all');

  const filteredDrivers =
    selectedDriver === 'all'
      ? DRIVERS_DATA
      : DRIVERS_DATA.filter((d) => d.id === selectedDriver);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-[#E8E2D9] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-[#FAF6F0] text-[#8C6D46] font-bold text-xs border border-[#E8DFC8]">
              Rentabilidad Q4
            </span>
            <span className="text-xs text-[#7A736A]">•</span>
            <span className="text-xs text-[#7A736A] font-medium">
              Base de Análisis: $48M Net Revenue Q4 2026
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#3D3833]">
            Drivers de Rentabilidad — Análisis Clave Q4
          </h2>
          <p className="text-xs text-[#7A736A] mt-1 max-w-3xl">
            Identificación, dinámica operativa y sensibilidad económica de los 3 drivers estructurales que determinan el margen y la generación de EBITDA en el cierre de año.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F5F2ED] rounded-lg border border-[#E8E2D9] self-start md:self-auto">
          <button
            onClick={() => setSelectedDriver('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              selectedDriver === 'all'
                ? 'bg-[#5A5A40] text-white shadow-xs'
                : 'text-[#7A736A] hover:text-[#3D3833] hover:bg-[#E8E2D9]/60'
            }`}
          >
            Todos (3)
          </button>
          <button
            onClick={() => setSelectedDriver('mer-efficiency')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              selectedDriver === 'mer-efficiency'
                ? 'bg-[#DC2626] text-white shadow-xs'
                : 'text-[#7A736A] hover:text-[#3D3833] hover:bg-[#E8E2D9]/60'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>1. MER Ads</span>
          </button>
          <button
            onClick={() => setSelectedDriver('channel-mix')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              selectedDriver === 'channel-mix'
                ? 'bg-[#EA580C] text-white shadow-xs'
                : 'text-[#7A736A] hover:text-[#3D3833] hover:bg-[#E8E2D9]/60'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>2. Mix Canal</span>
          </button>
          <button
            onClick={() => setSelectedDriver('product-mix')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              selectedDriver === 'product-mix'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-[#7A736A] hover:text-[#3D3833] hover:bg-[#E8E2D9]/60'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>3. Mix Producto</span>
          </button>
        </div>
      </div>

      {/* Top 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-xl border border-[#FCA5A5] shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#DC2626]" />
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#991B1B]">
                #1 • Eficiencia Publicitaria
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]">
                CRÍTICO
              </span>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#DC2626] font-mono">
              -$10.6M GM3
            </div>
            <p className="text-xs text-[#7A736A] mt-1 font-medium">
              Impacto entre mantener MER en <strong>1.42x</strong> vs meta BP de <strong>2.07x</strong> sobre $48M.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#FEE2E2] text-[11px] font-semibold text-[#991B1B] flex items-center justify-between">
            <span>YTD: 1.42x | BP: 2.07x</span>
            <span className="font-mono">Ads: $33.8M vs $23.2M</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-xl border border-[#FDBA74] shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#EA580C]" />
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A3412]">
                #2 • Mix Shopify vs Amazon
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#FFEDD5] text-[#9A3412] border border-[#FDBA74]">
                ALTO IMPACTO
              </span>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#EA580C] font-mono">
              9.3 pp Fee
            </div>
            <p className="text-xs text-[#7A736A] mt-1 font-medium">
              Amazon cobra <strong>12.7%</strong> vs <strong>3.4%</strong> en Shopify. Cada 5pp migrado = <strong>+$223K GM2</strong>.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#FFEDD5] text-[11px] font-semibold text-[#9A3412] flex items-center justify-between">
            <span>Amazon Share YTD: 40.2%</span>
            <span className="font-mono">+$537K fees vs Q4-25</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-xl border border-[#93C5FD] shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#2563EB]" />
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A8A]">
                #3 • Peso SKU Ancla (EPN-2)
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#DBEAFE] text-[#1D4ED8] border border-[#93C5FD]">
                MEDIO IMPACTO
              </span>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#1D4ED8] font-mono">
              75.8% Share
            </div>
            <p className="text-xs text-[#7A736A] mt-1 font-medium">
              Customizer genera <strong>$36.3M con GM1 ~91%</strong>. Cada 1pp cedido a Leather erosiona <strong>-$67K GM1</strong>.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#DBEAFE] text-[11px] font-semibold text-[#1E3A8A] flex items-center justify-between">
            <span>GM1 EPN-2: 91.7%</span>
            <span className="font-mono">Leather: ~78% (-14 bps)</span>
          </div>
        </div>
      </div>

      {/* Main Slide / Matrix Layout (Faithful to presentation slide) */}
      <div className="bg-white rounded-xl border border-[#E8E2D9] shadow-xs overflow-hidden">
        {/* Slide Header Row */}
        <div className="grid grid-cols-12 text-white font-bold text-xs uppercase tracking-wider border-b border-[#0F2942]">
          <div className="col-span-1 py-3 px-3 bg-[#0F2942] text-center border-r border-[#1E3A8A]/30">
            #
          </div>
          <div className="col-span-4 py-3 px-4 bg-[#1E293B] border-r border-slate-700/50">
            DRIVER DE MARGEN
          </div>
          <div className="col-span-2 py-3 px-4 bg-[#1E293B] border-r border-slate-700/50 text-center">
            ¿QUÉ ES Y CÓMO FUNCIONA?
          </div>
          <div className="col-span-5 py-3 px-4 bg-[#064E3B]">
            IMPACTO ECONÓMICO / FINANCIERO
          </div>
        </div>

        {/* Slide Driver Rows */}
        <div className="divide-y divide-[#E8E2D9]">
          {filteredDrivers.map((driver) => {
            const IconComponent = driver.icon;
            return (
              <div
                key={driver.id}
                className="grid grid-cols-12 transition-colors hover:bg-[#FAF8F5]/50"
              >
                {/* Col 1: Number Badge with colored left-stripe */}
                <div
                  className="col-span-1 flex flex-col items-center justify-center p-3 font-extrabold text-2xl font-mono text-white relative"
                  style={{ backgroundColor: driver.accentColor }}
                >
                  <span>{driver.number}</span>
                </div>

                {/* Col 2: Driver Title & Explanation */}
                <div className="col-span-4 p-5 flex flex-col justify-between border-r border-[#E8E2D9] bg-white">
                  <div>
                    {/* Driver Tag/Header Pill */}
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-white font-bold text-xs shadow-2xs mb-3"
                      style={{ backgroundColor: driver.accentColor }}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{driver.name}</span>
                    </div>

                    <p className="text-xs text-[#3D3833] leading-relaxed font-normal">
                      {driver.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F0EDE8] flex items-center justify-between text-[11px] text-[#7A736A]">
                    <span className="font-semibold text-[#5A5A40]">
                      {driver.tagline}
                    </span>
                  </div>
                </div>

                {/* Col 3: Impact Badge */}
                <div className="col-span-2 p-5 flex flex-col items-center justify-center border-r border-[#E8E2D9] bg-[#FAF8F5]/40 text-center">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold tracking-wide uppercase shadow-2xs"
                    style={{
                      backgroundColor: driver.badgeBg,
                      color: driver.badgeText,
                      border: `1px solid ${driver.badgeBorder}`,
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                    {driver.impactLevel}
                  </span>
                  <span className="text-[10px] text-[#7A736A] mt-2 font-mono">
                    Prioridad de Gestión
                  </span>
                </div>

                {/* Col 4: Economic & Financial Impact Detail */}
                <div className="col-span-5 p-5 bg-[#FAFDFC]/50 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-xs font-bold text-[#064E3B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>{driver.economicImpactHeader}</span>
                    </div>

                    {/* Breakdown based on driver type */}
                    {driver.scenariosOrBreakdown.type === 'scenarios' && (
                      <div className="space-y-1.5 text-xs font-mono">
                        {driver.scenariosOrBreakdown.items.map((item, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center justify-between p-2 rounded-lg border text-xs transition-colors ${
                              item.status === 'danger'
                                ? 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
                                : item.status === 'warning'
                                ? 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]'
                                : item.status === 'success'
                                ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534] font-bold'
                                : 'bg-[#EFF6FF] border-[#BFDBFE] text-[#1E40AF]'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold min-w-[75px]">
                                {item.label}
                              </span>
                              <span className="text-[10px] opacity-75">→</span>
                              <span className="text-[11px]">{item.val1}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] opacity-75">→</span>
                              <span className="font-extrabold">{item.val2}</span>
                              {item.status === 'danger' && <span>❌</span>}
                              {item.status === 'warning' && <span>⚠️</span>}
                              {item.status === 'success' && <span>✅ (BP)</span>}
                              {item.status === 'target' && <span>🎯</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {driver.scenariosOrBreakdown.type === 'mix_comparison' && (
                      <div className="space-y-1.5 text-xs font-mono">
                        {driver.scenariosOrBreakdown.items.map((item, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center justify-between p-2 rounded-lg border text-xs ${
                              item.status === 'danger'
                                ? 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
                                : item.status === 'warning'
                                ? 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]'
                                : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#334155]'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{item.label}</span>
                              <span className="text-[11px] text-[#7A736A]">
                                ({item.sub})
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-extrabold text-[#0D5D38]">
                                {item.val1}
                              </span>
                              <span className="text-[10px] text-[#7A736A]">
                                {item.val2}
                              </span>
                            </div>
                          </div>
                        ))}
                        <div className="mt-2 p-2 bg-[#FFF7ED] rounded-lg border border-[#FFEDD5] text-[11px] text-[#9A3412] font-semibold">
                          Si Amazon mantiene share YTD en Q4: <strong>+$537K en fees vs mix Q4-25</strong>
                        </div>
                      </div>
                    )}

                    {driver.scenariosOrBreakdown.type === 'family_mix' && (
                      <div className="space-y-1 text-xs font-mono">
                        {driver.scenariosOrBreakdown.items.map((item, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border ${
                              item.status === 'success'
                                ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534] font-bold'
                                : item.status === 'warning'
                                ? 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]'
                                : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#334155]'
                            }`}
                          >
                            <span className="font-semibold">{item.label}:</span>
                            <div className="flex items-center gap-3">
                              <span>{item.val1}</span>
                              <span className="text-[10px] opacity-75">—</span>
                              <span className="font-bold">{item.val2}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Takeaway / Formula Box */}
                  <div className="p-3 bg-white rounded-lg border border-[#C8E6C9] shadow-2xs">
                    <div className="text-[11px] font-bold text-[#0D5D38] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#0D5D38]" />
                      <span>{driver.takeaway.title}</span>
                    </div>
                    <div className="mt-1 text-xs font-mono font-extrabold text-[#1F2937]">
                      {driver.takeaway.formula}
                    </div>
                    {driver.takeaway.note && (
                      <p className="mt-1 text-[11px] text-[#5A5A40] leading-snug">
                        {driver.takeaway.note}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
