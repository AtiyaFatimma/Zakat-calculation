
import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calculator, 
  Wallet, 
  Heart, 
  BarChart3, 
  Settings, 
  Plus,
  Moon,
  Sun,
  Globe,
  LogOut,
  ChevronRight,
  TrendingUp,
  History,
  RefreshCw
} from 'lucide-react';
import { translations, rtlLanguages } from './translations';
import { Language, User, Asset, Donation, ZakatCalculation, Currency, Madhab } from './types';
import { currencies as currencyMetadata, defaultRates } from './currencyData';
import Dashboard from './pages/Dashboard';
import CalculatorPage from './pages/Calculator';
import AssetsPage from './pages/Assets';
import DonationsPage from './pages/Donations';
import ReportsPage from './pages/Reports';
import SettingsPage from './pages/Settings';
import AuthPage from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Chatbot from './components/Chatbot';

// --- Context ---
interface AppContextType {
  user: User | null;
  setUser: (u: User | null) => void;
  lang: Language;
  setLang: (l: Language) => void;
  assets: Asset[];
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
  donations: Donation[];
  setDonations: React.Dispatch<React.SetStateAction<Donation[]>>;
  calculations: ZakatCalculation[];
  setCalculations: React.Dispatch<React.SetStateAction<ZakatCalculation[]>>;
  t: (key: string) => string;
  isRTL: boolean;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  // Currency System
  rates: Record<string, number>;
  primaryCurrency: string;
  setPrimaryCurrency: (c: string) => void;
  convertCurrency: (amount: number, from: string, to: string) => number;
  formatCurrency: (amount: number, code: string) => string;
  lastRatesUpdate: string;
  refreshRates: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

// --- Main App Component ---
export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'en');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as 'light' | 'dark') || 'light');
  const [primaryCurrency, setPrimaryCurrency] = useState<string>(() => localStorage.getItem('primaryCurrency') || 'USD');
  
  const [assets, setAssets] = useState<Asset[]>(() => {
    const saved = localStorage.getItem('assets');
    return saved ? JSON.parse(saved) : [];
  });
  const [donations, setDonations] = useState<Donation[]>(() => {
    const saved = localStorage.getItem('donations');
    return saved ? JSON.parse(saved) : [];
  });
  const [calculations, setCalculations] = useState<ZakatCalculation[]>(() => {
    const saved = localStorage.getItem('calculations');
    return saved ? JSON.parse(saved) : [];
  });

  const [rates, setRates] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('exchangeRates');
    return saved ? JSON.parse(saved) : defaultRates;
  });
  const [lastRatesUpdate, setLastRatesUpdate] = useState<string>(() => localStorage.getItem('ratesUpdated') || '');

  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem('onboarding_complete'));

  const refreshRates = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      setRates(data.rates);
      const now = new Date().toISOString();
      setLastRatesUpdate(now);
      localStorage.setItem('exchangeRates', JSON.stringify(data.rates));
      localStorage.setItem('ratesUpdated', now);
    } catch (err) {
      console.error('Failed to fetch rates, using fallback', err);
    }
  };

  useEffect(() => {
    // Check if rates need update (older than 24h)
    const hoursSinceUpdate = lastRatesUpdate 
      ? (Date.now() - new Date(lastRatesUpdate).getTime()) / (1000 * 60 * 60)
      : Infinity;
    
    if (hoursSinceUpdate > 24 && navigator.onLine) {
      refreshRates();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
    localStorage.setItem('primaryCurrency', primaryCurrency);
    localStorage.setItem('assets', JSON.stringify(assets));
    localStorage.setItem('donations', JSON.stringify(donations));
    localStorage.setItem('calculations', JSON.stringify(calculations));

    const isRTL = rtlLanguages.includes(lang);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [user, lang, theme, primaryCurrency, assets, donations, calculations]);

  const t = (path: string) => {
    const keys = path.split('.');
    let value = translations[lang];
    for (const key of keys) {
      value = value?.[key];
    }
    return value || path;
  };

  const isRTL = rtlLanguages.includes(lang);

  const convertCurrency = (amount: number, from: string, to: string) => {
    if (from === to) return amount;
    // Base is USD
    const amountInUSD = from === 'USD' ? amount : amount / (rates[from] || 1);
    return to === 'USD' ? amountInUSD : amountInUSD * (rates[to] || 1);
  };

  const formatCurrency = (amount: number, code: string) => {
    const meta = currencyMetadata[code] || { symbol: code, flag: '' };
    const formatted = new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
    return `${meta.symbol}${formatted}`;
  };

  const contextValue = useMemo(() => ({
    user, setUser, lang, setLang, assets, setAssets, donations, setDonations, calculations, setCalculations, t, isRTL, theme, setTheme,
    rates, primaryCurrency, setPrimaryCurrency, convertCurrency, formatCurrency, lastRatesUpdate, refreshRates
  }), [user, lang, assets, donations, calculations, theme, isRTL, rates, primaryCurrency, lastRatesUpdate]);

  if (showOnboarding) {
    return (
      <AppContext.Provider value={contextValue}>
        <Onboarding onComplete={() => setShowOnboarding(false)} />
      </AppContext.Provider>
    );
  }

  if (!user) {
    return (
      <AppContext.Provider value={contextValue}>
        <AuthPage />
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={contextValue}>
      <HashRouter>
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-gray-50 text-gray-900'} pb-20 md:pb-0 md:pl-64`}>
          <Sidebar />
          <main className="p-4 md:p-8 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/assets" element={<AssetsPage />} />
              <Route path="/donations" element={<DonationsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
          <BottomNav />
          <Chatbot />
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
}

// --- Sub-components ---

function Sidebar() {
  const { t, isRTL, theme, assets, convertCurrency, primaryCurrency, formatCurrency } = useApp();
  const location = useLocation();

  const totalAssetsValue = assets.reduce((acc, curr) => 
    acc + convertCurrency(curr.amount, curr.currency, primaryCurrency), 0);

  const navItems = [
    { path: '/', label: t('nav.home'), icon: LayoutDashboard },
    { path: '/calculator', label: t('nav.calculator'), icon: Calculator },
    { path: '/assets', label: t('nav.assets'), icon: Wallet },
    { path: '/donations', label: t('nav.donations'), icon: Heart },
    { path: '/reports', label: t('nav.reports'), icon: BarChart3 },
    { path: '/settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <aside className={`hidden md:flex flex-col fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-64 border-r ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900' : 'bg-white border-gray-200'}`}>
      <div className="p-6 flex items-center gap-3">
        <div className="bg-emerald-600 p-2 rounded-lg">
          <Heart className="text-white" size={24} />
        </div>
        <h1 className="text-xl font-bold text-emerald-600 truncate">{t('common.app_name')}</h1>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              location.pathname === item.path
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-zinc-800'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-6">
        <div className="p-4 bg-emerald-600 rounded-2xl text-white">
          <p className="text-xs opacity-80 mb-1">{t('dashboard.zakat_due')}</p>
          <p className="text-xl font-bold">{formatCurrency(totalAssetsValue * 0.025, primaryCurrency)}</p>
          <Link to="/calculator" className="mt-3 block w-full text-center py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors">
            {t('dashboard.calculate_zakat')}
          </Link>
        </div>
      </div>
    </aside>
  );
}

function BottomNav() {
  const { t, theme } = useApp();
  const location = useLocation();

  const navItems = [
    { path: '/', label: t('nav.home'), icon: LayoutDashboard },
    { path: '/calculator', label: t('nav.calculator'), icon: Calculator },
    { path: '/assets', label: t('nav.assets'), icon: Wallet },
    { path: '/donations', label: t('nav.donations'), icon: Heart },
    { path: '/settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <nav className={`md:hidden fixed bottom-0 left-0 right-0 h-16 border-t flex items-center justify-around z-50 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
            location.pathname === item.path ? 'text-emerald-600' : 'text-gray-400 dark:text-gray-500'
          }`}
        >
          <item.icon size={24} />
          <span className="text-[10px] mt-1 font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
