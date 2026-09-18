import React, { useState } from 'react';
import { ValidationResult } from '../utils/sheetParser';
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface ValidationBannerProps {
  validation: ValidationResult;
}

export const ValidationBanner: React.FC<ValidationBannerProps> = ({ validation }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!validation) return null;

  const { passed, errors, metrics } = validation;

  return (
    <div className={`mb-6 rounded-xl border p-4 transition-all shadow-xs ${
      passed ? 'bg-[#E2F0D9]/70 border-[#A8D08D] text-[#1E4620]' : 'bg-[#FCE8E6] border-[#F28B82] text-[#C5221F]'
    }`}>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          {passed ? (
            <div className="p-2 bg-[#C8E6C9] rounded-lg text-[#2E7D32]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          ) : (
            <div className="p-2 bg-[#FAD2CF] rounded-lg text-[#C5221F]">
              <AlertTriangle className="w-5 h-5" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm">
                {passed
                  ? '✅ Test de Validación de Datos (Agosto 2026): APROBADO'
                  : '❌ ERROR DE VALIDACIÓN: Los datos no coinciden con la especificación de Agosto 2026'}
              </h4>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/60 font-semibold">
                {passed ? 'Métricas Matemáticamente Consistentes' : `${errors.length} Discrepancias Detectadas`}
              </span>
            </div>
            <p className="text-xs opacity-90 mt-0.5">
              {passed
                ? 'Lectura verificada con consistencia matemática y de balance para el mes de Agosto 2026 cerrado.'
                : 'Se encontraron valores fuera del margen esperado en la lectura del Google Sheet o la fórmula.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            passed
              ? 'bg-[#C8E6C9] hover:bg-[#A8D08D] text-[#1E4620]'
              : 'bg-[#F8A29B] hover:bg-[#F28B82] text-[#5C0A0A]'
          }`}
        >
          <span>{showDetails ? 'Ocultar Detalle' : 'Ver Métricas Validadas'}</span>
          {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Errors list if validation failed */}
      {!passed && errors.length > 0 && (
        <div className="mt-4 p-3 bg-white/80 rounded-lg border border-[#F28B82] text-xs font-mono space-y-1.5">
          <p className="font-bold text-[#C5221F]">Listado de Errores de Validación:</p>
          {errors.map((err, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-[#900C0A]">
              <span>•</span>
              <span>{err}</span>
            </div>
          ))}
        </div>
      )}

      {/* Details drawer */}
      {showDetails && (
        <div className="mt-4 pt-3 border-t border-current/20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 text-xs font-mono">
          <div className="bg-white/60 p-2 rounded border border-current/10">
            <span className="block text-[10px] opacity-75">Net Revenue</span>
            <span className="font-bold">{formatCurrency(metrics.netRevenue)}</span>
          </div>
          <div className="bg-white/60 p-2 rounded border border-current/10">
            <span className="block text-[10px] opacity-75">COGS</span>
            <span className="font-bold">{formatCurrency(metrics.cogs)}</span>
          </div>
          <div className="bg-white/60 p-2 rounded border border-current/10">
            <span className="block text-[10px] opacity-75">GM1</span>
            <span className="font-bold">{formatCurrency(metrics.gm1)}</span>
          </div>
          <div className="bg-white/60 p-2 rounded border border-current/10">
            <span className="block text-[10px] opacity-75">Last Mile</span>
            <span className="font-bold">{formatCurrency(metrics.lastMile)}</span>
          </div>
          <div className="bg-white/60 p-2 rounded border border-current/10">
            <span className="block text-[10px] opacity-75">Platform Fees</span>
            <span className="font-bold">{formatCurrency(metrics.platformFees)}</span>
          </div>
          <div className="bg-white/60 p-2 rounded border border-current/10">
            <span className="block text-[10px] opacity-75">GM2</span>
            <span className="font-bold">{formatCurrency(metrics.gm2)}</span>
          </div>
          <div className="bg-white/60 p-2 rounded border border-current/10">
            <span className="block text-[10px] opacity-75">Advertising</span>
            <span className="font-bold">{formatCurrency(metrics.advertising)}</span>
          </div>
          <div className="bg-white/60 p-2 rounded border border-current/10">
            <span className="block text-[10px] opacity-75">GM3</span>
            <span className="font-bold">{formatCurrency(metrics.gm3)}</span>
          </div>
          <div className="bg-white/60 p-2 rounded border border-current/10">
            <span className="block text-[10px] opacity-75">OPEX</span>
            <span className="font-bold">{formatCurrency(metrics.opex)}</span>
          </div>
          <div className="bg-white/60 p-2 rounded border border-current/10">
            <span className="block text-[10px] opacity-75">EBITDA</span>
            <span className="font-bold">{formatCurrency(metrics.ebitda)}</span>
          </div>
          <div className="bg-white/60 p-2 rounded border border-current/10">
            <span className="block text-[10px] opacity-75">Other Income</span>
            <span className="font-bold">{formatCurrency(metrics.otherIncome)}</span>
          </div>
          <div className="bg-white/60 p-2 rounded border border-current/10">
            <span className="block text-[10px] opacity-75">Other Expenses</span>
            <span className="font-bold">{formatCurrency(metrics.otherExpenses)}</span>
          </div>
          <div className="bg-white/60 p-2 rounded border border-current/10 col-span-2">
            <span className="block text-[10px] opacity-75">Net Income</span>
            <span className="font-bold">{formatCurrency(metrics.netIncome)}</span>
          </div>
        </div>
      )}
    </div>
  );
};
