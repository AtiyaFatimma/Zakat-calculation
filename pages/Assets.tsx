
import React, { useState } from 'react';
import { useApp } from '../App';
import { Wallet, Plus, Trash2, Edit3, Briefcase, Landmark, Coins, Building2, HelpCircle, Globe } from 'lucide-react';
import { AssetType } from '../types';
import { currencies as currencyMetadata } from '../currencyData';

export default function AssetsPage() {
  const { t, theme, assets, setAssets, convertCurrency, primaryCurrency, formatCurrency } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [newAsset, setNewAsset] = useState({
    name: '',
    type: 'cash' as AssetType,
    amount: 0,
    currency: primaryCurrency,
    hawlDate: new Date().toISOString().split('T')[0]
  });

  const getIcon = (type: AssetType) => {
    switch (type) {
      case 'cash': return < Landmark size={20} className="text-blue-500" />;
      case 'gold': return <Coins size={20} className="text-yellow-500" />;
      case 'silver': return <Coins size={20} className="text-gray-400" />;
      case 'stocks': return <Briefcase size={20} className="text-indigo-500" />;
      case 'property': return <Building2 size={20} className="text-orange-500" />;
      default: return <HelpCircle size={20} className="text-emerald-500" />;
    }
  };

  const addAsset = () => {
    if (!newAsset.name || newAsset.amount <= 0) return;
    const asset = {
      ...newAsset,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString().split('T')[0],
      isPaid: false
    };
    setAssets(prev => [asset as any, ...prev]);
    setShowForm(false);
    setNewAsset({ name: '', type: 'cash', amount: 0, currency: primaryCurrency, hawlDate: new Date().toISOString().split('T')[0] });
  };

  const removeAsset = (id: string) => {
    if (confirm(t('common.delete') + '?')) {
      setAssets(prev => prev.filter(a => a.id !== id));
    }
  };

  const totalValueInPrimary = assets.reduce((sum, a) => sum + convertCurrency(a.amount, a.currency, primaryCurrency), 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t('assets.title')}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{t('assets.total_value')}: {formatCurrency(totalValueInPrimary, primaryCurrency)}</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 dark:shadow-none"
        >
          <Plus size={20} />
          {t('assets.add_new')}
        </button>
      </div>

      {showForm && (
        <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-xl'}`}>
          <h2 className="text-lg font-bold mb-6">Enter Asset Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-1.5 lg:col-span-2">
              <label className="text-xs font-bold uppercase text-gray-500">Name</label>
              <input 
                value={newAsset.name}
                onChange={e => setNewAsset(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-100'} outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500`}
                placeholder="e.g. Bank Savings"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-gray-500">Type</label>
              <select 
                value={newAsset.type}
                onChange={e => setNewAsset(prev => ({ ...prev, type: e.target.value as AssetType }))}
                className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-100'} outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500`}
              >
                <option value="cash">Cash / Savings</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="stocks">Stocks / Investments</option>
                <option value="property">Investment Property</option>
                <option value="business">Business Asset</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-gray-500">Value</label>
              <input 
                type="number"
                value={newAsset.amount || ''}
                onChange={e => setNewAsset(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-100'} outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500`}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-gray-500">Currency</label>
              <select 
                value={newAsset.currency}
                onChange={e => setNewAsset(prev => ({ ...prev, currency: e.target.value }))}
                className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-100'} outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500`}
              >
                {Object.entries(currencyMetadata).map(([code, meta]) => (
                  <option key={code} value={code}>{meta.flag} {code}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button 
                onClick={() => setShowForm(false)}
                className="px-6 py-3 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button 
                onClick={addAsset}
                className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700"
              >
                {t('common.add')}
              </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.length > 0 ? assets.map((asset) => {
          const converted = convertCurrency(asset.amount, asset.currency, primaryCurrency);
          const isPrimary = asset.currency === primaryCurrency;
          return (
            <div key={asset.id} className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'} hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl">
                  {getIcon(asset.type)}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => removeAsset(asset.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{asset.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-4">{asset.type}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Value</p>
                    <p className="text-xl font-black text-emerald-600">{formatCurrency(asset.amount, asset.currency)}</p>
                    {!isPrimary && (
                       <p className="text-[10px] text-gray-400 font-bold">≈ {formatCurrency(converted, primaryCurrency)}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Added</p>
                    <p className="text-sm font-medium">{asset.dateAdded}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="col-span-full py-20 text-center">
            <div className="bg-gray-100 dark:bg-zinc-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="text-gray-400" size={32} />
            </div>
            <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto">{t('assets.no_assets')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
