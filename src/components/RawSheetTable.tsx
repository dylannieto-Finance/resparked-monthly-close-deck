import React, { useState, useMemo } from 'react';
import { getColumnLetter } from '../utils/sheetUtils';
import { Search, Info, Table as TableIcon } from 'lucide-react';

interface RawSheetTableProps {
  range: string;
  majorDimension: string;
  values?: string[][];
}

export const RawSheetTable: React.FC<RawSheetTableProps> = ({ range, majorDimension, values = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Find max columns count across all rows (up to 44 columns for AR)
  const maxCols = useMemo(() => {
    let max = 0;
    values.forEach((row) => {
      if (row.length > max) max = row.length;
    });
    return Math.max(max, 44); // Ensure at least AR columns if needed
  }, [values]);

  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) {
      return values.map((row, idx) => ({ rowData: row, originalIndex: idx + 1 }));
    }
    const lower = searchTerm.toLowerCase();
    return values
      .map((row, idx) => ({ rowData: row, originalIndex: idx + 1 }))
      .filter(({ rowData }) =>
        rowData.some((cell) => cell && String(cell).toLowerCase().includes(lower))
      );
  }, [values, searchTerm]);

  return (
    <div className="bg-white rounded-xl shadow-[0_10px_30px_rgba(90,90,64,0.05)] border border-[#E8E2D9] overflow-hidden flex flex-col h-full">
      {/* Table Metadata Bar */}
      <div className="px-6 py-4 border-b border-[#E8E2D9] bg-[#F5F2ED] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#E8E2D9] text-[#5A5A40] rounded-lg">
            <TableIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-serif italic text-[#5A5A40] flex items-center gap-2">
              Tabla Cruda de Datos
              <span className="text-xs font-mono font-normal bg-[#E8E2D9] text-[#7A736A] px-2 py-0.5 rounded border border-[#D8D2C9]">
                {range}
              </span>
            </h3>
            <p className="text-xs text-[#7A736A] py-0.5">
              Dimensión: <span className="font-semibold text-[#3D3833]">{majorDimension}</span> &bull;{' '}
              {values.length} filas &bull; {maxCols} columnas ({getColumnLetter(0)} - {getColumnLetter(maxCols - 1)})
            </p>
          </div>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#A8A298] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar valor en celda..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-[#E8E2D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C9C8C]/30 focus:border-[#8C9C8C] text-[#3D3833] placeholder-[#A8A298]"
          />
        </div>
      </div>

      {/* Raw Matrix Scrollable Container */}
      <div className="overflow-auto flex-1 max-h-[calc(100vh-280px)] min-h-[400px]">
        {values.length === 0 ? (
          <div className="p-12 text-center text-[#7A736A]">
            <Info className="w-8 h-8 text-[#A8A298] mx-auto mb-2" />
            <p className="text-sm font-medium">La hoja no devolvió ninguna fila o el rango está vacío.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-[#E8E2D9] text-xs text-left border-collapse font-mono">
            {/* Table Header: Column letters */}
            <thead className="bg-[#F5F2ED] text-[#5A5A40] sticky top-0 z-10 border-b border-[#E8E2D9]">
              <tr>
                <th className="w-12 px-3 py-2.5 bg-[#E8E2D9] text-center font-bold text-[#7A736A] border-r border-[#D8D2C9] select-none text-[11px]">
                  #
                </th>
                {Array.from({ length: maxCols }).map((_, colIdx) => (
                  <th
                    key={colIdx}
                    className="px-3 py-2.5 border-r border-[#E8E2D9] font-bold text-[#5A5A40] min-w-[120px] max-w-[240px] truncate text-center select-none bg-[#F5F2ED] hover:bg-[#E8E2D9] transition-colors"
                  >
                    {getColumnLetter(colIdx)}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body: Raw values matrix */}
            <tbody className="divide-y divide-[#F0EDE8] bg-white">
              {filteredRows.map(({ rowData, originalIndex }) => {
                const isEven = originalIndex % 2 === 0;
                return (
                  <tr
                    key={originalIndex}
                    className={`${isEven ? 'bg-[#FCFAF7]' : 'bg-white'} hover:bg-[#F5F2ED] transition-colors`}
                  >
                    {/* Row Index */}
                    <td className="px-3 py-2 bg-[#F5F2ED]/70 font-semibold text-[#A8A298] text-center border-r border-[#E8E2D9] select-none text-[11px]">
                      {originalIndex}
                    </td>

                    {/* Cell Values */}
                    {Array.from({ length: maxCols }).map((_, colIdx) => {
                      const cellVal = rowData[colIdx];
                      const isEmpty = cellVal === undefined || cellVal === null || cellVal === '';

                      return (
                        <td
                          key={colIdx}
                          className={`px-3 py-2 border-r border-[#F0EDE8] whitespace-nowrap text-ellipsis overflow-hidden ${
                            isEmpty ? 'text-[#C0B8AD] italic font-sans' : 'text-[#3D3833]'
                          }`}
                          title={cellVal ? String(cellVal) : ''}
                        >
                          {isEmpty ? <span className="text-[10px]">&mdash;</span> : String(cellVal)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-6 py-3 bg-[#F5F2ED] border-t border-[#E8E2D9] text-xs text-[#7A736A] flex justify-between items-center">
        <span className="font-medium">Mostrando {filteredRows.length} de {values.length} filas</span>
        <span className="font-mono text-[11px] text-[#A8A298]">P&L Spreadsheet ID: 1qmOvJqQ1YzREsO2pS18AAODuplAYE28pcJWcr-YC72A &bull; Range: A1:AR250</span>
      </div>
    </div>
  );
};
