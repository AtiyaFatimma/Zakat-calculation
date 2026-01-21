
import React, { useMemo } from 'react';
import { useApp } from '../App';
import { FileText, Download, Share2, Printer, ChevronRight, CheckCircle2, Globe } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { currencies as currencyMetadata } from '../currencyData';

export default function ReportsPage() {
  const { t, theme, assets, donations, convertCurrency, primaryCurrency, formatCurrency } = useApp();

  const totalAssetsPrimary = assets.reduce((sum, a) => sum + convertCurrency(a.amount, a.currency, primaryCurrency), 0);
  const totalDonatedPrimary = donations.reduce((sum, d) => sum + convertCurrency(d.amount, d.currency, primaryCurrency), 0);
  const zakatPaidPrimary = donations.filter(d => d.category === 'zakat').reduce((sum, d) => sum + convertCurrency(d.amount, d.currency, primaryCurrency), 0);
  const zakatDuePrimary = totalAssetsPrimary * 0.025;
  const isCompliant = zakatPaidPrimary >= zakatDuePrimary;

  const categoryData = [
    { name: 'Zakat', value: zakatPaidPrimary },
    { name: 'Sadaqah', value: donations.filter(d => d.category === 'sadaqah').reduce((sum, d) => sum + convertCurrency(d.amount, d.currency, primaryCurrency), 0) },
    { name: 'Fidya', value: donations.filter(d => d.category === 'fidya').reduce((sum, d) => sum + convertCurrency(d.amount, d.currency, primaryCurrency), 0) },
    { name: 'Other', value: donations.filter(d => !['zakat', 'sadaqah', 'fidya'].includes(d.category)).reduce((sum, d) => sum + convertCurrency(d.amount, d.currency, primaryCurrency), 0) },
  ].filter(d => d.value > 0);

  const currencyBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {};
    donations.forEach(d => {
      breakdown[d.currency] = (breakdown[d.currency] || 0) + d.amount;
    });
    return Object.entries(breakdown).map(([code, amt]) => ({
      code,
      amount: amt,
      inPrimary: convertCurrency(amt, code, primaryCurrency)
    })).sort((a, b) => b.inPrimary - a.inPrimary);
  }, [donations, primaryCurrency]);

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t('reports.title')}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Annual summary in {primaryCurrency} for 2025</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
            <Download size={18} />
            {t('reports.export_pdf')}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-2 p-8 rounded-3xl border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Annual Zakat Summary</h2>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isCompliant ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30'}`}>
              <CheckCircle2 size={14} />
              {isCompliant ? 'Compliant' : 'Pending'}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <p className="text-gray-400 text-sm mb-1">Due ({primaryCurrency})</p>
              <p className="text-3xl font-black">{formatCurrency(zakatDuePrimary, primaryCurrency)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Paid</p>
              <p className="text-3xl font-black text-emerald-600">{formatCurrency(zakatPaidPrimary, primaryCurrency)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Remaining</p>
              <p className="text-3xl font-black text-red-500">{formatCurrency(Math.max(0, zakatDuePrimary - zakatPaidPrimary), primaryCurrency)}</p>
            </div>
          </div>

          <h3 className="font-bold text-gray-400 uppercase text-xs mb-4 flex items-center gap-2">
            <Globe size={14} />
            {t('reports.donations_by_currency')}
          </h3>
          <div className="space-y-3">
            {currencyBreakdown.map((item) => {
              const meta = currencyMetadata[item.code] || { flag: '', name: item.code };
              return (
                <div key={item.code} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/50">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{meta.flag}</span>
                    <div>
                      <p className="text-sm font-bold">{meta.name}</p>
                      <p className="text-[10px] text-gray-400">{item.code}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-emerald-600">{formatCurrency(item.amount, item.code)}</p>
                    {item.code !== primaryCurrency && (
                      <p className="text-[10px] text-gray-400">≈ {formatCurrency(item.inPrimary, primaryCurrency)}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`p-8 rounded-3xl border min-w-0 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
          <h2 className="text-xl font-bold mb-8">Impact Breakdown</h2>
          <div className="h-[250px] w-full min-w-0 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {categoryData.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatCurrency(item.value, primaryCurrency)}</p>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{Math.round((item.value / totalDonatedPrimary) * 100)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
