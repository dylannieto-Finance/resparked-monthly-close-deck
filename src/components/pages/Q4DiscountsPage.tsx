import React, { useState } from 'react';
import {
  BadgePercent,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Layers,
  CheckCircle2,
  Shuffle,
  Pin,
  HelpCircle,
  ArrowUpRight,
  ArrowDownRight,
  SlidersHorizontal,
  DollarSign,
  Store,
  ShoppingCart,
  Globe2,
} from 'lucide-react';

type AspPlatformFilter = 'consolidated' | 'shopify' | 'amazon';

interface AspMetric {
  asp: number;
  aspDisplay: string;
  // Primary comparison: vs Regular BP ($68 / $78)
  vsRegularDelta: number;
  vsRegularDisplay: string;
  vsRegularStatus: 'positive' | 'negative' | 'neutral';
  // Secondary comparison: vs Projected BP Nov-Dic ($65 / $73)
  vsBpNovDicDelta: number;
  vsBpNovDicDisplay: string;
  vsBpNovDicStatus: 'positive' | 'negative';
  channelInsight: string;
}

interface PlatformAspConfig {
  id: AspPlatformFilter;
  label: string;
  channelName: string;
  badgeBg: string;
  badgeText: string;
  epn2: AspMetric;
  kit1: AspMetric;
}

const ASP_BY_PLATFORM: Record<AspPlatformFilter, PlatformAspConfig> = {
  consolidated: {
    id: 'consolidated',
    label: 'Consolidado (Todas)',
    channelName: 'Consolidado Todas las Plataformas',
    badgeBg: 'bg-[#FAF6F0]',
    badgeText: 'text-[#8C6D46]',
    epn2: {
      asp: 67.73,
      aspDisplay: '$67.73',
      vsRegularDelta: -0.27,
      vsRegularDisplay: '-$0.27 ($68)',
      vsRegularStatus: 'negative',
      vsBpNovDicDelta: +2.73,
      vsBpNovDicDisplay: '+$2.73 ($65)',
      vsBpNovDicStatus: 'positive',
      channelInsight: 'ASP YTD a solo -$0.27 del precio regular ($68); supera por +$2.73 la base de Q4 ($65).',
    },
    kit1: {
      asp: 71.38,
      aspDisplay: '$71.38',
      vsRegularDelta: -6.62,
      vsRegularDisplay: '-$6.62 ($78)',
      vsRegularStatus: 'negative',
      vsBpNovDicDelta: -1.62,
      vsBpNovDicDisplay: '-$1.62 ($73)',
      vsBpNovDicStatus: 'negative',
      channelInsight: 'ASP YTD promedio -$6.62 por debajo del regular y -$1.62 por debajo de la base de $73 para Q4.',
    },
  },
  shopify: {
    id: 'shopify',
    label: 'Shopify',
    channelName: 'Shopify Store (Canal Propio)',
    badgeBg: 'bg-[#EFF6FF]',
    badgeText: 'text-[#2563EB]',
    epn2: {
      asp: 66.95,
      aspDisplay: '$66.95',
      vsRegularDelta: -1.05,
      vsRegularDisplay: '-$1.05 ($68)',
      vsRegularStatus: 'negative',
      vsBpNovDicDelta: +1.95,
      vsBpNovDicDisplay: '+$1.95 ($65)',
      vsBpNovDicStatus: 'positive',
      channelInsight: 'Descuento moderado en tienda directa (-$1.05); se mantiene +$1.95 por encima del BP de Q4.',
    },
    kit1: {
      asp: 67.73,
      aspDisplay: '$67.73',
      vsRegularDelta: -10.27,
      vsRegularDisplay: '-$10.27 ($78)',
      vsRegularStatus: 'negative',
      vsBpNovDicDelta: -5.27,
      vsBpNovDicDisplay: '-$5.27 ($73)',
      vsBpNovDicStatus: 'negative',
      channelInsight: 'Alerta crítica en Shopify: ASP YTD -$10.27 vs regular y -$5.27 por debajo de los $73 de Q4.',
    },
  },
  amazon: {
    id: 'amazon',
    label: 'Amazon',
    channelName: 'Amazon Marketplace',
    badgeBg: 'bg-[#FFF7ED]',
    badgeText: 'text-[#EA580C]',
    epn2: {
      asp: 68.45,
      aspDisplay: '$68.45',
      vsRegularDelta: +0.45,
      vsRegularDisplay: '+$0.45 ($68)',
      vsRegularStatus: 'positive',
      vsBpNovDicDelta: +3.45,
      vsBpNovDicDisplay: '+$3.45 ($65)',
      vsBpNovDicStatus: 'positive',
      channelInsight: 'Sólida disciplina de precio en Amazon: +$0.45 sobre precio regular y +$3.45 sobre el BP de Q4.',
    },
    kit1: {
      asp: 73.23,
      aspDisplay: '$73.23',
      vsRegularDelta: -4.77,
      vsRegularDisplay: '-$4.77 ($78)',
      vsRegularStatus: 'negative',
      vsBpNovDicDelta: +0.23,
      vsBpNovDicDisplay: '+$0.23 ($73)',
      vsBpNovDicStatus: 'positive',
      channelInsight: 'En Amazon el ASP YTD supera la meta de Q4 (+$0.23 vs $73), aunque -$4.77 vs regular.',
    },
  },
};

interface DiscountScenario {
  id: string;
  scenarioName: string;
  iconType: 'pin' | 'check' | 'shuffle' | 'alert';
  priceDisplay: string;
  revenueDisplay: string;
  deltaDisplay: string;
  deltaType: 'baseline' | 'positive' | 'negative';
  impactText: string;
}

interface SkuDiscountAnalysis {
  sku: string;
  unitsFormatted: string;
  headerBg: string;
  metaBg: string;
  metaBorder: string;
  metaTextColor: string;
  metaText: string;
  baselinePrice: number;
  scenarios: DiscountScenario[];
}

const SKU_ANALYSES: SkuDiscountAnalysis[] = [
  {
    sku: 'EG-CMZ-EPN-2 — 484,722 unidades en Nov–Dic',
    unitsFormatted: '484,722 unidades',
    headerBg: 'bg-[#0D5D38]',
    metaBg: 'bg-[#EBF7EE]',
    metaBorder: 'border-[#C8E6C9]',
    metaTextColor: 'text-[#0F5132]',
    metaText: 'COGS $5.62 · GM% 91.7% a $68 · Cada $1 de descuento sobre 484,722 unidades = $484,722 de revenue perdido',
    baselinePrice: 65,
    scenarios: [
      {
        id: 'bp-baseline',
        scenarioName: 'BP planificado — promo a $65 (baseline)',
        iconType: 'pin',
        priceDisplay: '$65',
        revenueDisplay: '$31.506.930',
        deltaDisplay: 'Punto de referencia',
        deltaType: 'baseline',
        impactText: '—',
      },
      {
        id: 'regular-price',
        scenarioName: 'Precio regular $68 — mismas unidades, sin descuento',
        iconType: 'check',
        priceDisplay: '$68',
        revenueDisplay: '$32.961.096',
        deltaDisplay: '+$1.454.166',
        deltaType: 'positive',
        impactText: 'Capturás $1,454,166 adicionales de revenue',
      },
      {
        id: 'mix-50-50',
        scenarioName: 'Descuento más leve que el planificado',
        iconType: 'shuffle',
        priceDisplay: '$66.50 avg',
        revenueDisplay: '$32.234.013',
        deltaDisplay: '+$727.083',
        deltaType: 'positive',
        impactText: 'Capturás $727,083 adicionales de revenue',
      },
      {
        id: 'aggressive-discount',
        scenarioName: 'Descuento más agresivo que el BP — $63/unidad',
        iconType: 'alert',
        priceDisplay: '$63',
        revenueDisplay: '$30.537.486',
        deltaDisplay: '-$969.444',
        deltaType: 'negative',
        impactText: 'Perdés $969,444 vs. BP (~$969,444 de GM que no se recupera)',
      },
    ],
  },
  {
    sku: 'EG-CMZ-KIT-1 — 28,007 unidades en Nov–Dic',
    unitsFormatted: '28,007 unidades',
    headerBg: 'bg-[#1D4ED8]',
    metaBg: 'bg-[#EFF6FF]',
    metaBorder: 'border-[#BFDBFE]',
    metaTextColor: 'text-[#1E40AF]',
    metaText: 'COGS $6.52 · GM% 91.1% a $73',
    baselinePrice: 73,
    scenarios: [
      {
        id: 'bp-baseline',
        scenarioName: 'BP planificado — promo a $73 (baseline)',
        iconType: 'pin',
        priceDisplay: '$73',
        revenueDisplay: '$2.044.511',
        deltaDisplay: 'Punto de referencia',
        deltaType: 'baseline',
        impactText: '—',
      },
      {
        id: 'regular-price',
        scenarioName: 'Precio regular $78 — mismas unidades, sin descuento',
        iconType: 'check',
        priceDisplay: '$78',
        revenueDisplay: '$2.184.546',
        deltaDisplay: '+$140.035',
        deltaType: 'positive',
        impactText: 'Capturás $140,035 adicionales de revenue',
      },
      {
        id: 'mix-50-50',
        scenarioName: 'Descuento más leve que el planificado',
        iconType: 'shuffle',
        priceDisplay: '$75.50 avg',
        revenueDisplay: '$2.114.453',
        deltaDisplay: '+$69.942',
        deltaType: 'positive',
        impactText: 'Capturás $69,942 adicionales de revenue',
      },
      {
        id: 'aggressive-discount',
        scenarioName: 'Descuento más agresivo que el BP — $70/unidad',
        iconType: 'alert',
        priceDisplay: '$70',
        revenueDisplay: '$1.960.490',
        deltaDisplay: '-$84.021',
        deltaType: 'negative',
        impactText: 'Perdés $84,021 vs. BP (~$84,021 de GM que no se recupera)',
      },
    ],
  },
];

export const Q4DiscountsPage: React.FC = () => {
  const [aspPlatform, setAspPlatform] = useState<AspPlatformFilter>('consolidated');
  const currentAsp = ASP_BY_PLATFORM[aspPlatform];

  const renderIcon = (type: 'pin' | 'check' | 'shuffle' | 'alert') => {
    switch (type) {
      case 'pin':
        return <Pin className="w-4 h-4 text-[#D97706] rotate-45 flex-shrink-0" />;
      case 'check':
        return <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />;
      case 'shuffle':
        return <Shuffle className="w-4 h-4 text-[#0284C7] flex-shrink-0" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-[#DC2626] flex-shrink-0" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E8E2D9] shadow-xs">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FAF6F0] text-[#8C6D46] border border-[#E8DFC8]">
              <BadgePercent className="w-3.5 h-3.5" />
              Rentabilidad · Estrategia Q4
            </span>
            <span className="text-xs font-semibold text-[#7A736A] px-2 py-0.5 bg-[#F5F2ED] rounded-full border border-[#E8E2D9]">
              Noviembre – Diciembre 2026 (Peak Season)
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#3D3833]">
            Impacto de Descuentos en Top SKUs (Q4)
          </h2>
          <p className="text-xs text-[#7A736A] mt-0.5 max-w-3xl">
            Análisis del impacto en <b>Net Revenue</b> y <b>Gross Margin</b> que tendrá la política de descuentos
            en los 2 SKUs que generan el mayor volumen de facturación durante los meses pico de fin de año.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#7A736A] block">
              Volumen Clave Q4
            </span>
            <span className="text-sm font-extrabold text-[#3D3833] font-mono">
              512,729 unidades
            </span>
          </div>
        </div>
      </div>

      {/* Top 4 Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A736A] uppercase tracking-wider">
              Volumen Nov–Dic
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#FAF6F0] text-[#8C6D46] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-[#3D3833] font-mono">
            512,729
          </div>
          <div className="mt-1 text-[11px] text-[#7A736A]">
            484.7k (EPN-2) + 28.0k (KIT-1)
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A736A] uppercase tracking-wider">
              Revenue BP Baseline
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center">
              <Pin className="w-4 h-4 rotate-45" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-[#3D3833] font-mono">
            $33.551.441
          </div>
          <div className="mt-1 text-[11px] text-[#7A736A]">
            Base presupuestada a $65 y $73
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A736A] uppercase tracking-wider">
              Upside Sin Descuento
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#ECFDF5] text-[#15803D] flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-[#15803D] font-mono">
            +$1.594.201
          </div>
          <div className="mt-1 text-[11px] text-[#166534] font-medium">
            +4.75% de margen directo adicional
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E8E2D9] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A736A] uppercase tracking-wider">
              Riesgo Descuento Agresivo
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-[#DC2626] font-mono">
            -$1.053.465
          </div>
          <div className="mt-1 text-[11px] text-[#991B1B] font-medium">
            Pérdida neta directa de Gross Margin
          </div>
        </div>
      </div>

      {/* Main Analysis Tables for the Two SKUs */}
      <div className="space-y-6">
        {SKU_ANALYSES.map((analysis) => (
          <div
            key={analysis.sku}
            className="bg-white rounded-xl border border-[#CBD5E1] overflow-hidden shadow-xs"
          >
            {/* Dark Colored Header Bar */}
            <div className={`${analysis.headerBg} text-white px-5 py-3 font-bold text-sm sm:text-base tracking-wide flex items-center justify-between`}>
              <span>{analysis.sku}</span>
              <span className="text-xs font-normal opacity-90 hidden sm:inline-block">
                Q4 Peak Months
              </span>
            </div>

            {/* Light Colored Meta Subtitle Bar */}
            <div className={`${analysis.metaBg} ${analysis.metaBorder} ${analysis.metaTextColor} border-b px-5 py-2.5 text-xs font-medium italic`}>
              {analysis.metaText}
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1E3A5F] text-white">
                    <th className="px-5 py-3.5 text-left font-bold w-[34%]">
                      Escenario
                    </th>
                    <th className="px-4 py-3.5 text-center font-bold w-[12%]">
                      Precio
                    </th>
                    <th className="px-4 py-3.5 text-right font-bold w-[18%]">
                      Revenue Nov–Dic
                    </th>
                    <th className="px-4 py-3.5 text-right font-bold w-[18%]">
                      Δ vs BP (${analysis.baselinePrice}) — baseline
                    </th>
                    <th className="px-5 py-3.5 text-left font-bold w-[18%]">
                      Impacto
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {analysis.scenarios.map((scenario) => {
                    return (
                      <tr
                        key={scenario.id}
                        className={`transition-colors ${
                          scenario.deltaType === 'baseline'
                            ? 'bg-[#F8FAFC]'
                            : scenario.deltaType === 'positive'
                            ? 'hover:bg-[#F0FDF4]'
                            : 'hover:bg-[#FEF2F2]'
                        }`}
                      >
                        {/* Escenario Name with Icon */}
                        <td className="px-5 py-3.5 font-semibold text-[#1E293B]">
                          <div className="flex items-center gap-2.5">
                            {renderIcon(scenario.iconType)}
                            <span
                              className={
                                scenario.deltaType === 'negative'
                                  ? 'text-[#B91C1C] font-bold'
                                  : scenario.deltaType === 'positive' && scenario.id === 'regular-price'
                                  ? 'text-[#15803D] font-bold'
                                  : 'text-[#1E293B]'
                              }
                            >
                              {scenario.scenarioName}
                            </span>
                          </div>
                        </td>

                        {/* Precio */}
                        <td className="px-4 py-3.5 text-center font-bold font-mono text-[#0F172A]">
                          {scenario.priceDisplay}
                        </td>

                        {/* Revenue Nov–Dic */}
                        <td className="px-4 py-3.5 text-right font-bold font-mono text-[#0F172A]">
                          {scenario.revenueDisplay}
                        </td>

                        {/* Δ vs BP */}
                        <td className="px-4 py-3.5 text-right font-mono text-sm">
                          {scenario.deltaType === 'baseline' && (
                            <span className="italic font-medium text-[#2563EB]">
                              {scenario.deltaDisplay}
                            </span>
                          )}
                          {scenario.deltaType === 'positive' && (
                            <span className="font-extrabold text-[#15803D]">
                              {scenario.deltaDisplay}
                            </span>
                          )}
                          {scenario.deltaType === 'negative' && (
                            <span className="font-extrabold text-[#B91C1C]">
                              {scenario.deltaDisplay}
                            </span>
                          )}
                        </td>

                        {/* Impacto */}
                        <td className="px-5 py-3.5 text-left text-xs font-semibold leading-relaxed">
                          {scenario.impactText === '—' ? (
                            <span className="text-[#94A3B8] font-normal">—</span>
                          ) : scenario.deltaType === 'positive' ? (
                            <span className="text-[#166534]">
                              {scenario.impactText}
                            </span>
                          ) : (
                            <span className="text-[#B91C1C]">
                              {scenario.impactText}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Average Selling Price (ASP) YTD Scorecards with Dynamic Platform Filter */}
      <div className="bg-white p-6 rounded-xl border border-[#E8E2D9] shadow-xs space-y-4">
        {/* Filter Bar & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F0EDE8]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] text-[#8C6D46] flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#3D3833]">
                  Average Selling Price (ASP) YTD por SKU
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F5F2ED] text-[#7A736A] border border-[#E8E2D9]">
                  Ene – Ago 2026
                </span>
              </div>
              <p className="text-[11px] text-[#7A736A]">
                Precio promedio real de venta para calibrar el baseline del BP y monitorear desvíos por canal de venta. *No incluye envíos de samples
              </p>
            </div>
          </div>

          {/* Segmented Platform Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F5F2ED] rounded-lg border border-[#E8E2D9] self-start sm:self-auto">
            <button
              onClick={() => setAspPlatform('consolidated')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                aspPlatform === 'consolidated'
                  ? 'bg-[#5A5A40] text-white shadow-xs'
                  : 'text-[#7A736A] hover:text-[#3D3833] hover:bg-[#E8E2D9]/60'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>Consolidado</span>
            </button>

            <button
              onClick={() => setAspPlatform('shopify')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                aspPlatform === 'shopify'
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'text-[#7A736A] hover:text-[#3D3833] hover:bg-[#E8E2D9]/60'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Shopify</span>
            </button>

            <button
              onClick={() => setAspPlatform('amazon')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                aspPlatform === 'amazon'
                  ? 'bg-[#EA580C] text-white shadow-xs'
                  : 'text-[#7A736A] hover:text-[#3D3833] hover:bg-[#E8E2D9]/60'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Amazon</span>
            </button>
          </div>
        </div>

        {/* 2 Dynamic SKU ASP Scorecards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* SKU 1: EG-CMZ-EPN-2 */}
          <div className="p-5 rounded-xl border border-[#C8E6C9] bg-gradient-to-b from-[#F7FCF8] to-white shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0D5D38]" />
                  <span className="font-mono font-bold text-xs text-[#0D5D38]">
                    EG-CMZ-EPN-2
                  </span>
                  <span className="text-[10px] text-[#7A736A] hidden sm:inline">
                    (484.7k un. Q4)
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    aspPlatform === 'shopify'
                      ? 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]'
                      : aspPlatform === 'amazon'
                      ? 'bg-[#FFF7ED] text-[#EA580C] border-[#FFEDD5]'
                      : 'bg-[#FAF6F0] text-[#8C6D46] border-[#E8DFC8]'
                  }`}
                >
                  {currentAsp.label}
                </span>
              </div>

              <div className="mt-3 flex items-baseline justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#7A736A] block">
                    ASP Real YTD
                  </span>
                  <div className="text-3xl font-extrabold text-[#0D5D38] font-mono">
                    {currentAsp.epn2.aspDisplay}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#7A736A] block mb-1">
                    vs Regular BP
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-1 rounded-lg border font-mono ${
                      currentAsp.epn2.vsRegularStatus === 'positive'
                        ? 'bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]'
                        : 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]'
                    }`}
                  >
                    {currentAsp.epn2.vsRegularStatus === 'positive' ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    {currentAsp.epn2.vsRegularDisplay}
                  </span>
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] font-mono">
                    <span className="text-[#7A736A]">vs BP Nov-Dic:</span>
                    <span
                      className={`font-bold ${
                        currentAsp.epn2.vsBpNovDicStatus === 'positive'
                          ? 'text-[#15803D]'
                          : 'text-[#DC2626]'
                      }`}
                    >
                      {currentAsp.epn2.vsBpNovDicDisplay}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E8F5E9] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#5A5A40] gap-1">
              <div className="flex items-center gap-3 text-[#7A736A]">
                <span>
                  Regular BP: <strong className="text-[#3D3833] font-mono">$68.00</strong>
                </span>
                <span>•</span>
                <span>
                  BP Nov–Dic: <strong className="text-[#3D3833] font-mono">$65.00</strong>
                </span>
              </div>
              <span className="text-[10px] text-[#0D5D38] font-semibold italic">
                {currentAsp.epn2.channelInsight}
              </span>
            </div>
          </div>

          {/* SKU 2: EG-CMZ-KIT-1 */}
          <div className="p-5 rounded-xl border border-[#BFDBFE] bg-gradient-to-b from-[#F8FAFF] to-white shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]" />
                  <span className="font-mono font-bold text-xs text-[#1D4ED8]">
                    EG-CMZ-KIT-1
                  </span>
                  <span className="text-[10px] text-[#7A736A] hidden sm:inline">
                    (28.0k un. Q4)
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    aspPlatform === 'shopify'
                      ? 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]'
                      : aspPlatform === 'amazon'
                      ? 'bg-[#FFF7ED] text-[#EA580C] border-[#FFEDD5]'
                      : 'bg-[#FAF6F0] text-[#8C6D46] border-[#E8DFC8]'
                  }`}
                >
                  {currentAsp.label}
                </span>
              </div>

              <div className="mt-3 flex items-baseline justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#7A736A] block">
                    ASP Real YTD
                  </span>
                  <div
                    className={`text-3xl font-extrabold font-mono ${
                      currentAsp.kit1.vsRegularStatus === 'negative'
                        ? 'text-[#B91C1C]'
                        : 'text-[#1D4ED8]'
                    }`}
                  >
                    {currentAsp.kit1.aspDisplay}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#7A736A] block mb-1">
                    vs Regular BP
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-1 rounded-lg border font-mono ${
                      currentAsp.kit1.vsRegularStatus === 'positive'
                        ? 'bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]'
                        : 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]'
                    }`}
                  >
                    {currentAsp.kit1.vsRegularStatus === 'positive' ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    {currentAsp.kit1.vsRegularDisplay}
                  </span>
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] font-mono">
                    <span className="text-[#7A736A]">vs BP Nov-Dic:</span>
                    <span
                      className={`font-bold ${
                        currentAsp.kit1.vsBpNovDicStatus === 'positive'
                          ? 'text-[#15803D]'
                          : 'text-[#DC2626]'
                      }`}
                    >
                      {currentAsp.kit1.vsBpNovDicDisplay}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EFF6FF] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#5A5A40] gap-1">
              <div className="flex items-center gap-3 text-[#7A736A]">
                <span>
                  Regular BP: <strong className="text-[#3D3833] font-mono">$78.00</strong>
                </span>
                <span>•</span>
                <span>
                  BP Nov–Dic: <strong className="text-[#3D3833] font-mono">$73.00</strong>
                </span>
              </div>
              <span
                className={`text-[10px] font-semibold italic ${
                  currentAsp.kit1.vsRegularStatus === 'negative'
                    ? 'text-[#B91C1C]'
                    : 'text-[#1D4ED8]'
                }`}
              >
                {currentAsp.kit1.channelInsight}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
