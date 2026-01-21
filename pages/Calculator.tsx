
import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { Info, Calculator, Save, AlertCircle, TrendingDown, ChevronRight, ChevronLeft, Globe } from 'lucide-react';
import { currencies as currencyMetadata } from '../currencyData';

export default function CalculatorPage() {
  const { t, theme, assets: globalAssets, setCalculations, convertCurrency, primaryCurrency, formatCurrency } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    cash: 0,
    cashCurrency: primaryCurrency,
    goldGrams: 0,
    silverGrams: 0,
    stocks: 0,
    stocksCurrency: primaryCurrency,
    business: 0,
    businessCurrency: primaryCurrency,
    property: 0,
    propertyCurrency: primaryCurrency,
    other: 0,
    otherCurrency: primaryCurrency,
    liabilities: 0,
    liabilitiesCurrency: primaryCurrency,
    nisabBasis: 'gold' as 'gold' | 'silver'
  });

  // Mock prices for demo (prices in USD per gram)
  const goldPricePerGramUSD = 75.50;
  const silverPricePerGramUSD = 0.95;

  const totalAssetsPrimary = 
    convertCurrency(formData.cash, formData.cashCurrency, primaryCurrency) + 
    convertCurrency(formData.goldGrams * goldPricePerGramUSD, 'USD', primaryCurrency) + 
    convertCurrency(formData.silverGrams * silverPricePerGramUSD, 'USD', primaryCurrency) + 
    convertCurrency(formData.stocks, formData.stocksCurrency, primaryCurrency) + 
    convertCurrency(formData.business, formData.businessCurrency, primaryCurrency) + 
    convertCurrency(formData.property, formData.propertyCurrency, primaryCurrency) + 
    convertCurrency(formData.other, formData.otherCurrency, primaryCurrency);

  const totalLiabilitiesPrimary = convertCurrency(formData.liabilities, formData.liabilitiesCurrency, primaryCurrency);
  const netWealthPrimary = Math.max(0, totalAssetsPrimary - totalLiabilitiesPrimary);
  
  const nisabGoldPrimary = convertCurrency(goldPricePerGramUSD * 85, 'USD', primaryCurrency);
  const nisabSilverPrimary = convertCurrency(silverPricePerGramUSD * 595, 'USD', primaryCurrency);
  
  const nisabThreshold = formData.nisabBasis === 'gold' ? nisabGoldPrimary : nisabSilverPrimary;
  const isAboveNisab = netWealthPrimary >= nisabThreshold;
  const zakatAmount = isAboveNisab ? netWealthPrimary * 0.025 : 0;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const handleCurrencyChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const saveResult = () => {
    const newCalc = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      assets: { ...formData },
      liabilities: totalLiabilitiesPrimary,
      nisabThreshold,
      nisabType: formData.nisabBasis,
      totalZakatable: totalAssetsPrimary,
      zakatAmount,
      aboveNisab: isAboveNisab
    };
    setCalculations(prev => [newCalc as any, ...prev]);
    alert(t('common.success'));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-emerald-600">{t('calculator.title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">{t('calculator.subtitle')}</p>
        <p className="text-xs text-emerald-500 font-medium mt-1">{t('calculator.currency_note')}</p>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center justify-center mb-8 gap-4">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              step === s ? 'bg-emerald-600 text-white' : 
              step > s ? 'bg-emerald-200 text-emerald-800' : 'bg-gray-200 text-gray-500'
            }`}>
              {s}
            </div>
            {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-emerald-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className={`p-8 rounded-3xl border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50'}`}>
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calculator className="text-emerald-600" size={24} />
              {t('calculator.assets_section')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                label={t('calculator.cash_savings')} 
                value={formData.cash} 
                currency={formData.cashCurrency}
                onValueChange={(v) => handleInputChange('cash', v)} 
                onCurrencyChange={(c) => handleCurrencyChange('cashCurrency', c)}
              />
              <InputField 
                label={t('calculator.gold_weight')} 
                value={formData.goldGrams} 
                onValueChange={(v) => handleInputChange('goldGrams', v)} 
                unit="g" 
              />
              <InputField 
                label={t('calculator.silver_weight')} 
                value={formData.silverGrams} 
                onValueChange={(v) => handleInputChange('silverGrams', v)} 
                unit="g" 
              />
              <InputField 
                label={t('calculator.stocks')} 
                value={formData.stocks} 
                currency={formData.stocksCurrency}
                onValueChange={(v) => handleInputChange('stocks', v)} 
                onCurrencyChange={(c) => handleCurrencyChange('stocksCurrency', c)}
              />
              <InputField 
                label={t('calculator.business')} 
                value={formData.business} 
                currency={formData.businessCurrency}
                onValueChange={(v) => handleInputChange('business', v)} 
                onCurrencyChange={(c) => handleCurrencyChange('businessCurrency', c)}
              />
              <InputField 
                label={t('calculator.other')} 
                value={formData.other} 
                currency={formData.otherCurrency}
                onValueChange={(v) => handleInputChange('other', v)} 
                onCurrencyChange={(c) => handleCurrencyChange('otherCurrency', c)}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TrendingDown className="text-red-500" size={24} />
              {t('calculator.liabilities_section')}
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <InputField 
                label={t('calculator.short_term_debts')} 
                value={formData.liabilities} 
                currency={formData.liabilitiesCurrency}
                onValueChange={(v) => handleInputChange('liabilities', v)} 
                onCurrencyChange={(c) => handleCurrencyChange('liabilitiesCurrency', c)}
              />
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl flex gap-3 text-amber-800 dark:text-amber-200 text-sm">
              <Info className="shrink-0" size={20} />
              <p>Only deduct short-term debts or immediate liabilities. Long-term loans like mortgages are usually handled differently by various Madhabs.</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <div className="text-center pb-6 border-b border-dashed border-gray-200 dark:border-zinc-800">
              <p className="text-gray-500 dark:text-gray-400 mb-1">{t('calculator.zakat_amount')}</p>
              <p className="text-5xl font-black text-emerald-600">{formatCurrency(zakatAmount, primaryCurrency)}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SummaryItem label={t('calculator.total_assets')} value={formatCurrency(totalAssetsPrimary, primaryCurrency)} />
              <SummaryItem label={t('calculator.total_liabilities')} value={formatCurrency(totalLiabilitiesPrimary, primaryCurrency)} />
              <SummaryItem label={t('calculator.net_assets')} value={formatCurrency(netWealthPrimary, primaryCurrency)} highlight />
              
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 uppercase font-bold">{t('calculator.nisab_info')}</span>
                  <div className="flex gap-1">
                    <button onClick={() => setFormData(p => ({...p, nisabBasis: 'gold'}))} className={`px-2 py-0.5 rounded text-[10px] font-bold ${formData.nisabBasis === 'gold' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'}`}>GOLD</button>
                    <button onClick={() => setFormData(p => ({...p, nisabBasis: 'silver'}))} className={`px-2 py-0.5 rounded text-[10px] font-bold ${formData.nisabBasis === 'silver' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'}`}>SILVER</button>
                  </div>
                </div>
                <p className="text-xl font-black">{formatCurrency(nisabThreshold, primaryCurrency)}</p>
                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-zinc-700 flex gap-2">
                  <span className="text-[10px] text-gray-400">≈ {formatCurrency(convertCurrency(nisabThreshold, primaryCurrency, 'USD'), 'USD')}</span>
                  <span className="text-[10px] text-gray-400">≈ {formatCurrency(convertCurrency(nisabThreshold, primaryCurrency, 'SAR'), 'SAR')}</span>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl flex items-center gap-4 ${isAboveNisab ? 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-800 dark:text-emerald-200' : 'bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-200'}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isAboveNisab ? 'bg-emerald-100 dark:bg-emerald-800' : 'bg-red-100 dark:bg-red-800'}`}>
                <AlertCircle />
              </div>
              <p className="font-semibold text-lg">{isAboveNisab ? t('calculator.above_nisab') : t('calculator.below_nisab')}</p>
            </div>

            <button 
              onClick={saveResult}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"
            >
              <Save size={20} />
              {t('calculator.save_calculation')}
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100 dark:border-zinc-800">
          <button 
            disabled={step === 1}
            onClick={() => setStep(s => s - 1)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
              step === 1 ? 'opacity-0' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-zinc-800'
            }`}
          >
            <ChevronLeft size={20} />
            {t('common.back')}
          </button>
          <button 
            disabled={step === 3}
            onClick={() => setStep(s => s + 1)}
            className={`flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 dark:shadow-none ${
              step === 3 ? 'opacity-0' : ''
            }`}
          >
            {t('common.next')}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, currency, onValueChange, onCurrencyChange, unit }: { 
  label: string, 
  value: number, 
  currency?: string,
  onValueChange: (v: string) => void, 
  onCurrencyChange?: (c: string) => void,
  unit?: string 
}) {
  const { theme } = useApp();
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">{label}</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input 
            type="number" 
            value={value || ''} 
            onChange={(e) => onValueChange(e.target.value)}
            placeholder="0.00"
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
              theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-200'
            }`}
          />
          {unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">{unit}</span>}
        </div>
        {onCurrencyChange && (
          <select 
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className={`px-3 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-emerald-500/20 ${
              theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-gray-50 border-gray-200'
            }`}
          >
            {['USD', 'SAR', 'AED', 'PKR', 'EUR', 'GBP', 'TRY', 'INR'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}

function SummaryItem({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className={`p-4 rounded-xl flex flex-col gap-1 ${highlight ? 'bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800' : 'bg-gray-50 dark:bg-zinc-800/50'}`}>
      <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold">{label}</span>
      <span className={`text-xl font-black ${highlight ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>{value}</span>
    </div>
  );
}
