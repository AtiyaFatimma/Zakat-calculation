
import React, { useState } from 'react';
import { useApp } from '../App';
import { Calculator, Wallet, Heart, Globe, ArrowRight, Check } from 'lucide-react';

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const { setLang, lang, theme } = useApp();
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to Zakat Tracker",
      desc: "The most comprehensive and secure way to manage your Islamic charitable obligations.",
      icon: <div className="bg-emerald-100 dark:bg-emerald-900/30 p-8 rounded-3xl"><Heart size={80} className="text-emerald-600 dark:text-emerald-400" /></div>
    },
    {
      title: "Accurate Calculation",
      desc: "Calculate your zakat based on current gold and silver prices with built-in Nisab detection.",
      icon: <div className="bg-blue-100 dark:bg-blue-900/30 p-8 rounded-3xl"><Calculator size={80} className="text-blue-600 dark:text-blue-400" /></div>
    },
    {
      title: "Track Your Giving",
      desc: "Log assets and charitable donations to stay compliant and see your impact throughout the year.",
      icon: <div className="bg-purple-100 dark:bg-purple-900/30 p-8 rounded-3xl"><Wallet size={80} className="text-purple-600 dark:text-purple-400" /></div>
    },
    {
      title: "Select Language",
      desc: "Choose your preferred language for the interface.",
      icon: <div className="bg-orange-100 dark:bg-orange-900/30 p-8 rounded-3xl"><Globe size={80} className="text-orange-600 dark:text-orange-400" /></div>,
      isLanguage: true
    }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'ur', name: 'اردو' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'id', name: 'Bahasa Indonesia' },
  ];

  const handleNext = () => {
    if (slide < slides.length - 1) {
      setSlide(s => s + 1);
    } else {
      localStorage.setItem('onboarding_complete', 'true');
      onComplete();
    }
  };

  const current = slides[slide];

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-lg p-12 rounded-[40px] border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 shadow-2xl shadow-black/50' : 'bg-white border-gray-100 shadow-2xl'}`}>
        <div className="flex flex-col items-center text-center space-y-8">
          {current.icon}
          
          <div className="space-y-4">
            <h1 className="text-3xl font-black">{current.title}</h1>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">{current.desc}</p>
          </div>

          {current.isLanguage && (
            <div className="grid grid-cols-2 gap-3 w-full">
              {languages.map(l => (
                <button 
                  key={l.code}
                  onClick={() => setLang(l.code as any)}
                  className={`px-4 py-3 rounded-2xl border font-bold transition-all ${
                    lang === l.code 
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-none' 
                      : 'border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  {l.name}
                  {lang === l.code && <Check className="inline-block ml-2" size={16} />}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2 mb-8">
            {slides.map((_, idx) => (
              <div key={idx} className={`h-1.5 rounded-full transition-all ${slide === idx ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-200 dark:bg-zinc-800'}`} />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-full py-5 bg-emerald-600 text-white rounded-[24px] font-black text-xl flex items-center justify-center gap-3 hover:bg-emerald-700 transition-transform active:scale-95 shadow-xl shadow-emerald-200 dark:shadow-none"
          >
            {slide === slides.length - 1 ? 'Get Started' : 'Continue'}
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
