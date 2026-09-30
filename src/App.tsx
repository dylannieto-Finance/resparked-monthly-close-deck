import { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, getAccessToken, logout } from './lib/auth';
import { PageView, SheetsValueResponse, SheetsApiError } from './types';

// Layout & Navigation Components
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

// Pages
import { ExecutiveSummaryPage } from './components/pages/ExecutiveSummaryPage';
import { PLRealVsBPPage } from './components/pages/PLRealVsBPPage';
import { OPEXRealVsBPPage } from './components/pages/OPEXRealVsBPPage';
import { OPEXTrendsPage } from './components/pages/OPEXTrendsPage';
import { OPEXTopSuppliersPage } from './components/pages/OPEXTopSuppliersPage';
import { BalanceSheetPage } from './components/pages/BalanceSheetPage';
import { GM2AnalysisSummaryPage } from './components/pages/GM2AnalysisSummaryPage';
import { GM2HeatmapPage } from './components/pages/GM2HeatmapPage';
import { CashFlowPage } from './components/pages/CashFlowPage';

export default function App() {
  const [activePage, setActivePage] = useState<PageView>('executive');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Auth & Google Sheets State
  const [user, setUser] = useState<User | null>(null);
  const [needsAuth, setNeedsAuth] = useState<boolean>(true);
  const [loadingSheet, setLoadingSheet] = useState<boolean>(false);
  const [sheetData, setSheetData] = useState<SheetsValueResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Single-call function to fetch server-side Google Sheets P&L data
  const fetchSheetData = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setNeedsAuth(true);
      return;
    }

    setLoadingSheet(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/sheets/pl', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        const errPayload = data as SheetsApiError;
        setErrorMsg(errPayload.error || 'Ocurrió un error al cargar la hoja de Google Sheets.');
      } else {
        setSheetData(data as SheetsValueResponse);
      }
    } catch (err: any) {
      console.error('Error fetching sheet data:', err);
      setErrorMsg(err.message || 'Error de conexión con el servidor.');
    } finally {
      setLoadingSheet(false);
    }
  }, []);

  // Initialize Auth state listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (currUser, _token) => {
        setUser(currUser);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  // Auto-fetch sheet when user authenticates
  useEffect(() => {
    if (!needsAuth && user) {
      fetchSheetData();
    }
  }, [needsAuth, user, fetchSheetData]);

  const handleLogin = async () => {
    setErrorMsg(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setNeedsAuth(false);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMsg(err.message || 'No se pudo completar la autenticación.');
    }
  };

  // Get Page Title for solid header bar
  const getPageTitle = (page: PageView): string => {
    switch (page) {
      case 'executive':
        return 'Resumen Ejecutivo';
      case 'pl-real-vs-bp':
        return 'P&L - Real vs BP vs SC';
      case 'opex-real-vs-bp':
        return 'OPEX - Real vs BP';
      case 'opex-trends':
        return 'OPEX - Tendencias';
      case 'opex-suppliers':
        return 'OPEX - Top Proveedores';
      case 'balance-sheet':
        return 'Balance Sheet';
      case 'gm2-summary':
        return 'Rentabilidad - Resumen Análisis';
      case 'gm2-heatmap':
        return 'Rentabilidad - Heatmap GM2% por Canal';
      case 'cash-flow':
        return 'Cash Flow - Posición y Proyección';
    }
  };

  return (
    <div className="min-h-screen bg-[#E7E4D9] text-[#3D3833] flex flex-row font-sans overflow-x-hidden">
      {/* Left Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        onSelectPage={setActivePage}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        sheetsConnected={!needsAuth && !!user}
        onConnectSheets={handleLogin}
      />

      {/* Right Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Amber Solid Header Bar with "R·" Logo */}
        <Header
          pageTitle={getPageTitle(activePage)}
          user={user}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onRefreshData={!needsAuth && user ? fetchSheetData : undefined}
          isRefreshing={loadingSheet}
        />

        {/* Page Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {activePage === 'executive' && <ExecutiveSummaryPage sheetData={sheetData} />}
          {activePage === 'pl-real-vs-bp' && (
            <PLRealVsBPPage sheetData={sheetData} onRefreshSheet={fetchSheetData} />
          )}
          {activePage === 'opex-real-vs-bp' && <OPEXRealVsBPPage />}
          {activePage === 'opex-trends' && <OPEXTrendsPage />}
          {activePage === 'opex-suppliers' && <OPEXTopSuppliersPage />}
          {activePage === 'balance-sheet' && <BalanceSheetPage />}
          {activePage === 'gm2-summary' && <GM2AnalysisSummaryPage />}
          {activePage === 'gm2-heatmap' && <GM2HeatmapPage />}
          {activePage === 'cash-flow' && <CashFlowPage />}
        </main>
      </div>
    </div>
  );
}
