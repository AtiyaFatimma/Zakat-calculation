
import React, { useState } from 'react';
import { useApp } from '../App';
import { Heart, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const { setUser, t, theme } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    
    const userData = {
      id: crypto.randomUUID(),
      name: formData.name || 'User',
      email: formData.email,
      preferences: {
        language: 'en',
        currency: 'USD',
        madhab: 'hanafi',
        theme: 'light',
        notifications: true
      }
    };
    setUser(userData as any);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-md p-8 rounded-3xl border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 shadow-2xl shadow-black/50' : 'bg-white border-gray-100 shadow-xl'}`}>
        <div className="flex flex-col items-center mb-8">
          <div className="bg-emerald-600 p-3 rounded-2xl shadow-lg shadow-emerald-200 mb-4">
            <Heart className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-black text-emerald-600">{t('common.app_name')}</h1>
          <p className="text-gray-500 text-sm mt-1">{isLogin ? 'Welcome back!' : 'Join our community'}</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-500 ml-1">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-100'} outline-none focus:ring-2 focus:ring-emerald-500/20`}
                  placeholder="Enter your name"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-500 ml-1">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-100'} outline-none focus:ring-2 focus:ring-emerald-500/20`}
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-500 ml-1">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="password"
                required
                value={formData.password}
                onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-100'} outline-none focus:ring-2 focus:ring-emerald-500/20`}
                placeholder="••••••••"
              />
            </div>
          </div>

          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-xs font-bold text-emerald-600 hover:underline">Forgot Password?</button>
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-200 dark:shadow-none"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-black text-emerald-600 hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
