
import React, { useMemo, useState } from 'react';
import { useApp } from '../App';
import { 
  TrendingUp, 
  Wallet, 
  Heart, 
  Calendar, 
  Plus, 
  Receipt,
  ArrowRight,
  ArrowLeftRight,
  ChevronRight,
  RefreshCw,
  ArrowDownUp,
  Clock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { currencies as currencyMetadata } from '../currencyData';

export default function Dashboard() {
  const { t, assets, donations, user, theme, convertCurrency, primaryCurrency, formatCurrency, lastRatesUpdate, refreshRates } = useApp();

  const totalAssetsValue = useMemo(() => assets.reduce((acc, curr) => 
    acc + convertCurrency(curr.amount, curr.currency, primaryCurrency), 0), [assets, primaryCurrency]);
  
  const totalDonatedValue = useMemo(() => donations.reduce((acc, curr) => 
    acc + convertCurrency(curr.amount, curr.currency, primaryCurrency), 0), [donations, primaryCurrency]);
  
  const zakatPaidValue = useMemo(() => donations.filter(d => d.category === 'zakat').reduce((acc, curr) => 
    acc + convertCurrency(curr.amount, curr.currency, primaryCurrency), 0), [donations, primaryCurrency]);

  const chartData = [
    { name: 'Jan', amount: 400 },
    { name: 'Feb', amount: 300 },
    { name: 'Mar', amount: 600 },
    { name: 'Apr', amount: 800 },
    { name: 'May', amount: 500 },
    { name: 'Jun', amount: 900 },
  ];

  const pieData = [
    { name: 'Zakat', value: zakatPaidValue },
    { name: 'Sadaqah', value: totalDonatedValue - zakatPaidValue },
  ];

  const COLORS = ['#10b981', '#fbbf24'];

  const hijriDate = new Intl.DateTimeFormat('en-u-ca-islamic-uma', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t('dashboard.greeting')}, {user?.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
            <Calendar size={16} />
            <span>{hijriDate}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={refreshRates}
            className="p-2 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl hover:bg-gray-50 transition-colors"
            title={t('tools.last_updated') + ': ' + new Date(lastRatesUpdate).toLocaleTimeString()}
          >
            <RefreshCw size={20} className="text-gray-500" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 dark:shadow-none">
            <Plus size={18} />
            <span>{t('dashboard.add_asset')}</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<Wallet className="text-blue-600" size={20} />} 
          label={t('dashboard.total_assets')} 
          value={formatCurrency(totalAssetsValue, primaryCurrency)} 
          color="blue"
        />
        <StatCard 
          icon={<TrendingUp className="text-orange-600" size={20} />} 
          label={t('dashboard.zakat_due')} 
          value={formatCurrency(totalAssetsValue * 0.025, primaryCurrency)} 
          color="orange"
        />
        <StatCard 
          icon={<Heart className="text-emerald-600" size={20} />} 
          label={t('dashboard.zakat_paid')} 
          value={formatCurrency(zakatPaidValue, primaryCurrency)} 
          color="emerald"
        />
        <StatCard 
          icon={<Receipt className="text-purple-600" size={20} />} 
          label={t('dashboard.sadaqah_given')} 
          value={formatCurrency(totalDonatedValue - zakatPaidValue, primaryCurrency)} 
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6 min-w-0">
          <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'}`}>
            <h2 className="text-lg font-semibold mb-6">Donation Trends</h2>
            <div className="h-[250px] w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#27272a' : '#f1f5f9'} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: theme === 'dark' ? '#18181b' : '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <QuickConverter />
        </div>

        <div className={`p-6 rounded-2xl border min-w-0 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'}`}>
          <h2 className="text-lg font-semibold mb-6">Charity Distribution</h2>
          <div className="h-[200px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-3">
            {pieData.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                </div>
                <span className="text-sm font-semibold">{formatCurrency(item.value, primaryCurrency)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  const { theme } = useApp();
  const bgClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/10',
    orange: 'bg-orange-50 dark:bg-orange-900/10',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/10',
    purple: 'bg-purple-50 dark:bg-purple-900/10',
  }[color];

  return (
    <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'} flex items-center gap-4`}>
      <div className={`p-3 rounded-xl ${bgClasses}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate">{label}</p>
        <p className="text-xl font-bold mt-0.5 truncate">{value}</p>
      </div>
    </div>
  );
}

function QuickConverter() {
  const { theme, convertCurrency, formatCurrency, t, rates, lastRatesUpdate } = useApp();
  const [amt, setAmt] = useState<number>(100);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('SAR');

  const result = convertCurrency(amt, from, to);
  const currentRate = (rates[to] || 0) / (rates[from] || 1);

  const handleSwap = () => {
    const prevFrom = from;
    const prevTo = to;
    setFrom(prevTo);
    setTo(prevFrom);
    // Swap the amount to the result for a better UX (reversing the conversion)
    setAmt(parseFloat(result.toFixed(2)));
  };

  const formattedUpdateDate = lastRatesUpdate 
    ? new Date(lastRatesUpdate).toLocaleString() 
    : 'N/A';

  return (
    <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'}`}>
      <div className="flex items-center gap-2 mb-6">
        <ArrowDownUp size={20} className="text-emerald-600" />
        <h2 className="text-lg font-semibold">{t('tools.currency_converter')}</h2>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 w-full space-y-2">
          <input 
            type="number"
            value={amt || ''}
            onChange={e => setAmt(parseFloat(e.target.value) || 0)}
            className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-gray-50 border-gray-100'} outline-none focus:ring-2 focus:ring-emerald-500/20`}
          />
          <select 
            value={from}
            onChange={e => setFrom(e.target.value)}
            className={`w-full px-4 py-2 rounded-xl border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-gray-50 border-gray-100'} outline-none focus:ring-2 focus:ring-emerald-500/20`}
          >
            {Object.entries(currencyMetadata).map(([code, meta]) => (
              <option key={code} value={code}>{meta.flag} {code} - {meta.name}</option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={handleSwap}
          className="bg-emerald-100 dark:bg-emerald-900/30 p-2.5 rounded-full text-emerald-600 shrink-0 hover:bg-emerald-200 dark:hover:bg-emerald-800/40 transition-all active:scale-90 group"
          title="Swap Currencies"
        >
           <ArrowLeftRight className="rotate-90 md:rotate-0 group-hover:scale-110 transition-transform" size={20} />
        </button>

        <div className="flex-1 w-full space-y-2">
          <div className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-emerald-400' : 'bg-gray-50 border-gray-100 text-emerald-600'} font-bold`}>
            {formatCurrency(result, to)}
          </div>
          <select 
            value={to}
            onChange={e => setTo(e.target.value)}
            className={`w-full px-4 py-2 rounded-xl border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-gray-50 border-gray-100'} outline-none focus:ring-2 focus:ring-emerald-500/20`}
          >
            {Object.entries(currencyMetadata).map(([code, meta]) => (
              <option key={code} value={code}>{meta.flag} {code} - {meta.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-gray-100 dark:border-zinc-800 pt-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <TrendingUp size={14} className="text-emerald-500" />
          <span className="font-medium">1 {from} = {currentRate.toFixed(4)} {to}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-gray-400">
          <Clock size={12} />
          <span>{t('tools.last_updated')}: {formattedUpdateDate}</span>
        </div>
      </div>
    </div>
  );
}
