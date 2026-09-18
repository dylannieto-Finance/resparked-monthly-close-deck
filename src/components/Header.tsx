import React from 'react';
import { Menu, RefreshCw, FileSpreadsheet } from 'lucide-react';
import { User } from 'firebase/auth';

interface HeaderProps {
  pageTitle: string;
  user: User | null;
  onToggleSidebar: () => void;
  onRefreshData?: () => void;
  isRefreshing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  pageTitle,
  user,
  onToggleSidebar,
  onRefreshData,
  isRefreshing,
}) => {
  return (
    <header className="bg-[#FBBF4A] border-b border-[#F59E0B]/30 sticky top-0 z-30 shadow-xs">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Hamburger toggle + Bold Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-1.5 text-white hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
            title="Alternar Menú Lateral"
          >
            <Menu className="w-5 h-5" />
          </button>

          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {pageTitle}
          </h1>
        </div>

        {/* Right: Actions & "R·" Logo */}
        <div className="flex items-center gap-4">
          {onRefreshData && (
            <button
              onClick={onRefreshData}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#5A5A40] bg-white/90 hover:bg-white rounded-lg shadow-2xs transition-colors disabled:opacity-50 cursor-pointer"
              title="Refrescar datos"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refrescar Sheet</span>
            </button>
          )}

          {user && (
            <div className="hidden lg:flex items-center gap-2 bg-white/15 px-2.5 py-1 rounded-full text-xs text-white">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span className="truncate max-w-[120px] font-medium">{user.displayName || user.email}</span>
            </div>
          )}

          {/* Logo "R·" in white bold display */}
          <div className="flex items-center justify-center pl-2 border-l border-white/20">
            <span className="text-2xl font-extrabold text-white tracking-tighter select-none font-serif">
              R&middot;
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
