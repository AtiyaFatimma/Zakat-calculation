
import React from 'react';
import { useApp } from '../App';
import { 
  Globe, 
  Moon, 
  Sun, 
  LogOut, 
  Shield, 
  ChevronRight, 
  Bell, 
  Database, 
  UserCircle,
  Coins,
  RefreshCw
} from 'lucide-react';
import { Language, Currency, Madhab } from '../types';
import { currencies as currencyMetadata } from '../currencyData';

export default function SettingsPage() {
  const { t, lang, setLang, theme, setTheme, user, setUser, primaryCurrency, setPrimaryCurrency, lastRatesUpdate, refreshRates } = useApp();

  const handleLogout = () => {
    if (confirm('Logout?')) {
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  const madhabs: Madhab[] = ['hanafi', 'shafi', 'maliki', 'hanbali'];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">{t('settings.title')}</h1>

      <section className={`p-6 rounded-3xl border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
            <UserCircle size={40} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-1">
          <SettingItem 
            icon={<Globe size={20} />} 
            label={t('settings.language')} 
            value={
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value as Language)}
                className="bg-transparent font-medium text-emerald-600 outline-none cursor-pointer"
              >
                {languages.map(l => (
                  <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
                ))}
              </select>
            } 
          />
          <SettingItem 
            icon={<Coins size={20} />} 
            label={t('settings.currency')} 
            value={
              <select 
                value={primaryCurrency} 
                onChange={(e) => setPrimaryCurrency(e.target.value)}
                className="bg-transparent font-medium text-emerald-600 outline-none max-w-[150px] cursor-pointer"
              >
                {Object.entries(currencyMetadata).map(([code, meta]) => (
                  <option key={code} value={code}>{meta.flag} {code}</option>
                ))}
              </select>
            } 
          />
          <SettingItem 
            icon={<Shield size={20} />} 
            label={t('settings.madhab')} 
            value={
              <select className="bg-transparent font-medium text-emerald-600 outline-none cursor-pointer">
                {madhabs.map(m => (
                  <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
                ))}
              </select>
            } 
          />
          <SettingItem 
            icon={theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />} 
            label={t('settings.theme')} 
            value={
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="font-medium text-emerald-600"
              >
                {theme === 'dark' ? t('settings.dark') : t('settings.light')}
              </button>
            } 
          />
          <SettingItem icon={<Bell size={20} />} label="Notifications" value={<span className="text-gray-400">On</span>} />
          
          <div className="p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <RefreshCw size={20} className="text-gray-400" />
                 <span className="font-medium">{t('settings.auto_update_rates')}</span>
               </div>
               <button 
                onClick={refreshRates}
                className="p-1.5 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 rounded-lg"
               >
                 <RefreshCw size={14} />
               </button>
            </div>
            <p className="text-[10px] text-gray-400 ml-8">{t('tools.last_updated')}: {new Date(lastRatesUpdate).toLocaleString()}</p>
          </div>
        </div>
      </section>

      <button 
        onClick={handleLogout}
        className="w-full py-4 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
      >
        <LogOut size={20} />
        {t('settings.logout')}
      </button>

      <div className="text-center">
        <p className="text-xs text-gray-400">Zakat Tracker v1.1.0 (Multi-Currency Support)</p>
      </div>
    </div>
  );
}

function SettingItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-zinc-800/50 rounded-2xl transition-colors cursor-pointer group">
      <div className="flex items-center gap-3">
        <div className="text-gray-400 group-hover:text-emerald-500 transition-colors">
          {icon}
        </div>
        <span className="font-medium">{label}</span>
      </div>
      <div>{value}</div>
    </div>
  );
}
