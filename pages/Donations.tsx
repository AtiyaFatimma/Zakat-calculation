
import React, { useState } from 'react';
import { useApp } from '../App';
import { Heart, Plus, Receipt, Calendar, Tag, Building, Globe } from 'lucide-react';
import { DonationCategory } from '../types';
import { currencies as currencyMetadata } from '../currencyData';

export default function DonationsPage() {
  const { t, theme, donations, setDonations, primaryCurrency, convertCurrency, formatCurrency } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: 0,
    category: 'sadaqah' as DonationCategory,
    currency: primaryCurrency,
    organization: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const addDonation = () => {
    if (formData.amount <= 0 || !formData.organization) return;
    const newDonation = {
      ...formData,
      id: crypto.randomUUID()
    };
    setDonations(prev => [newDonation as any, ...prev]);
    setShowForm(false);
    setFormData({ amount: 0, category: 'sadaqah', currency: primaryCurrency, organization: '', date: new Date().toISOString().split('T')[0], notes: '' });
  };

  const totalDonatedPrimary = donations.reduce((sum, d) => sum + convertCurrency(d.amount, d.currency, primaryCurrency), 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t('donations.title')}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Total Giving: {formatCurrency(totalDonatedPrimary, primaryCurrency)}</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 dark:shadow-none"
        >
          <Plus size={20} />
          {t('donations.log_donation')}
        </button>
      </div>

      {showForm && (
        <div className={`p-8 rounded-3xl border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-xl'}`}>
          <h2 className="text-xl font-bold mb-8">Record Charitable Donation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-500 ml-1">Recipient / Organization</label>
                <div className="relative">
                  <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    value={formData.organization}
                    onChange={e => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-100'} outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500`}
                    placeholder="e.g. Mosque, Charity Name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-gray-500 ml-1">Amount</label>
                  <input 
                    type="number"
                    value={formData.amount || ''}
                    onChange={e => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                    className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-100'} outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500`}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-gray-500 ml-1">Currency</label>
                  <select 
                    value={formData.currency}
                    onChange={e => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-100'} outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500`}
                  >
                    {Object.entries(currencyMetadata).map(([code, meta]) => (
                      <option key={code} value={code}>{meta.flag} {code}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-500 ml-1">Category</label>
                <div className="relative">
                  <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select 
                    value={formData.category}
                    onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as DonationCategory }))}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-100'} outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500`}
                  >
                    <option value="zakat">Zakat</option>
                    <option value="sadaqah">Sadaqah</option>
                    <option value="fidya">Fidya</option>
                    <option value="kaffarah">Kaffarah</option>
                    <option value="general">General Charity</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-500 ml-1">Date</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-100'} outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <button 
              onClick={addDonation}
              className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-transform active:scale-95 shadow-lg shadow-emerald-200"
            >
              Log Donation
            </button>
            <button 
              onClick={() => setShowForm(false)}
              className="px-8 py-4 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className={`rounded-3xl border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm overflow-hidden'}`}>
        <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
          <h2 className="text-lg font-bold">{t('donations.donation_history') || 'Donation History'}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-zinc-800/50">
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Recipient</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Category</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {donations.length > 0 ? donations.map((donation) => {
                const isPrimary = donation.currency === primaryCurrency;
                const converted = convertCurrency(donation.amount, donation.currency, primaryCurrency);
                return (
                  <tr key={donation.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium">{donation.organization}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        donation.category === 'zakat' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {donation.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{donation.date}</td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-black text-emerald-600">{formatCurrency(donation.amount, donation.currency)}</p>
                      {!isPrimary && (
                        <p className="text-[10px] text-gray-400 font-bold">≈ {formatCurrency(converted, primaryCurrency)}</p>
                      )}
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <Heart className="mx-auto text-gray-300 mb-4" size={40} />
                    <p className="text-gray-500 dark:text-gray-400">{t('donations.no_donations')}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
