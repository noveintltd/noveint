import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';

interface Props {
  lang: Language;
}

export const ApexCrypto: React.FC<Props> = ({ lang }) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#f0f4ff] to-[#e6f0fa] text-[#1a2b4c] p-5 font-sans flex flex-col overflow-y-auto relative custom-scrollbar">
      {/* Dynamic light effects */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-40 -left-20 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse" />

      {/* Header */}
      <div className="flex justify-between items-center z-10 relative mt-2">
        <div>
          <h2 className="text-sm font-medium text-slate-500">{lang === 'ZH' ? '總餘額' : 'Total Balance'}</h2>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black tracking-tighter text-slate-800">$124,500</span>
            <span className="text-sm font-bold text-slate-400">.00</span>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white flex items-center gap-1 font-bold text-sm text-green-500">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
          +4.2%
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-40 w-full mt-6 relative z-10">
        {/* Fake chart SVG */}
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <motion.path 
            d="M0,80 Q10,70 20,75 T40,50 T60,60 T80,30 T100,20 L100,100 L0,100 Z" 
            fill="url(#grad)" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          />
          <motion.path 
            d="M0,80 Q10,70 20,75 T40,50 T60,60 T80,30 T100,20" 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="3" 
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-6 z-10 relative">
        <button className="flex-1 bg-slate-800 text-white font-bold py-3.5 rounded-2xl shadow-lg border border-slate-700 hover:scale-[1.02] transition-transform active:scale-95">
          {lang === 'ZH' ? '買入' : 'Buy'}
        </button>
        <button className="flex-1 bg-white/60 backdrop-blur-md text-slate-800 font-bold py-3.5 rounded-2xl shadow-sm border border-white hover:scale-[1.02] transition-transform active:scale-95">
          {lang === 'ZH' ? '賣出' : 'Sell'}
        </button>
      </div>

      {/* Transactions */}
      <div className="mt-8 flex-1 z-10 relative">
        <h3 className="text-sm font-bold text-slate-500 mb-4">{lang === 'ZH' ? '近期交易' : 'Recent Transactions'}</h3>
        <div className="space-y-3">
          {[
            { id: 1, name: 'Bitcoin', icon: '₿', type: 'Buy', amount: '+0.045', value: '$2,400', color: 'bg-orange-100 text-orange-600' },
            { id: 2, name: 'Ethereum', icon: 'Ξ', type: 'Sell', amount: '-1.200', value: '-$3,100', color: 'bg-blue-100 text-blue-600' },
            { id: 3, name: 'Solana', icon: 'S', type: 'Buy', amount: '+12.50', value: '$1,250', color: 'bg-purple-100 text-purple-600' },
          ].map((tx, i) => (
            <motion.div 
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="bg-white/60 backdrop-blur-md p-3 rounded-2xl border border-white shadow-sm flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${tx.color}`}>
                  {tx.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{tx.name}</h4>
                  <p className="text-xs font-medium text-slate-500">{tx.type}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-800 text-sm">{tx.value}</div>
                <div className={`text-xs font-bold ${tx.type === 'Buy' ? 'text-green-500' : 'text-slate-500'}`}>{tx.amount}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
