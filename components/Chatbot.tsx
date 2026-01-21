
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../App';
import { GoogleGenAI } from '@google/genai';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User as UserIcon, 
  Sparkles, 
  ChevronDown,
  Info
} from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function Chatbot() {
  const { t, theme, isRTL, assets, primaryCurrency, formatCurrency, convertCurrency } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const totalAssetsValue = assets.reduce((acc, curr) => 
    acc + convertCurrency(curr.amount, curr.currency, primaryCurrency), 0);
  const zakatDue = totalAssetsValue * 0.025;

  const sendMessage = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isTyping) return;

    const userMsg: Message = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are a specialized Zakat and Sadaqah counselor for the "Zakat Tracker" app. 
          Provide accurate Islamic guidance on Zakat rules. 
          Current User Context: 
          - Total Assets Tracked: ${formatCurrency(totalAssetsValue, primaryCurrency)}
          - Estimated Zakat Due: ${formatCurrency(zakatDue, primaryCurrency)}
          - Preferred Currency: ${primaryCurrency}
          
          Guidelines:
          1. Be kind, helpful, and concise. 
          2. Explain concepts like Nisab (threshold), Hawl (one lunar year requirement), and eligible recipients (Asnaf).
          3. Mention different Madhab perspectives (Hanafi, Shafi'i, etc.) if relevant or asked.
          4. If asked about the user's specific Zakat, refer to the context provided above.
          5. Use formatting like bullet points for clarity.
          6. Always start with a friendly Islamic greeting if it's the start of the conversation.`,
        },
      });

      const responseStream = await chat.sendMessageStream({ message: textToSend });
      
      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of responseStream) {
        fullText += chunk.text;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].text = fullText;
          return updated;
        });
      }
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages(prev => [...prev, { role: 'model', text: t('chatbot.error') }]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestions = [
    t('chatbot.suggest_nisab'),
    t('chatbot.suggest_calculation'),
    t('chatbot.suggest_recipients')
  ];

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-8 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-emerald-700 transition-all hover:scale-110 active:scale-95 z-40 group animate-bounce-subtle"
      >
        <MessageSquare size={24} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-zinc-950 animate-ping" />
      </button>
    );
  }

  return (
    <div className={`fixed inset-0 md:inset-auto md:bottom-8 md:right-8 md:w-[400px] md:h-[600px] z-50 flex flex-col ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} md:rounded-3xl shadow-2xl border ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-100'} overflow-hidden transition-all duration-300 transform`}>
      {/* Header */}
      <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-tight">{t('chatbot.title')}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" />
              <span className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Online Assistant</span>
            </div>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth custom-scrollbar"
      >
        {messages.length === 0 && (
          <div className="text-center py-8 px-4 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
              <Sparkles size={32} />
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-white">{t('chatbot.greeting')}</p>
              <p className="text-xs text-gray-500 mt-1">AI-powered Zakat & Sadaqah Counselor</p>
            </div>
            <div className="grid grid-cols-1 gap-2 pt-4">
              {suggestions.map((s, idx) => (
                <button 
                  key={idx}
                  onClick={() => sendMessage(s)}
                  className="px-4 py-2.5 text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors text-left flex items-center justify-between group"
                >
                  {s}
                  <ChevronDown className="-rotate-90 opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200/50 dark:border-zinc-700/50'
            }`}>
              <div className="whitespace-pre-wrap">
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-zinc-800 p-3 rounded-2xl rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className={`p-4 border-t ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900' : 'bg-white border-gray-100'}`}>
        <div className="flex items-center gap-2">
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder={t('chatbot.placeholder')}
            className={`flex-1 px-4 py-3 text-sm rounded-xl border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-gray-50 border-gray-200'} outline-none focus:ring-2 focus:ring-emerald-500/20`}
          />
          <button 
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTyping}
            className={`p-3 rounded-xl transition-all ${
              !input.trim() || isTyping 
                ? 'bg-gray-100 text-gray-400 dark:bg-zinc-800' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200 dark:shadow-none active:scale-95'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-center gap-1 opacity-40">
          <Info size={10} />
          <span className="text-[9px] uppercase tracking-widest font-bold">AI responses are for guidance only</span>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f46;
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
