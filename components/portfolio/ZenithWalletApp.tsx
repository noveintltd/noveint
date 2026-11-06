import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';
import { CreditCard, Send, ArrowDownLeft, Bell } from 'lucide-react';

interface Props {
  lang: Language;
}

export const ZenithWalletApp: React.FC<Props> = ({ lang }) => {
  return (
    <div className="w-full h-full bg-[#1A1A1A] text-white font-sans flex flex-col relative overflow-y-auto custom-scrollbar">
      <div className="p-6 pb-24">
        {/* Header */}
        <div className="flex justify-between items-center z-10 w-full mb-8 pt-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFB067]/20 border border-[#FFB067]/50 flex items-center justify-center overflow-hidden">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" alt="User" referrerPolicy="no-referrer" />
            </div>
            <span className="font-medium text-sm">Hello, Alex</span>
          </div>
          <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 relative">
            <Bell className="w-5 h-5 text-white" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-[#FFB067] rounded-full" />
          </div>
        </div>

        {/* Main Balance */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-2">{lang === 'ZH' ? '總餘額' : 'Total Balance'}</p>
          <h1 className="text-5xl font-black tracking-tighter flex items-center gap-2">
            <span className="text-[#FFB067] text-3xl">$</span>24,592<span className="text-gray-500 text-3xl">.80</span>
          </h1>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-10 w-full justify-between">
          {[
            { icon: <Send />, label: lang === 'ZH' ? '轉帳' : 'Send', color: 'bg-[#FFB067] text-black' },
            { icon: <ArrowDownLeft />, label: lang === 'ZH' ? '收款' : 'Receive', color: 'bg-white/10' },
            { icon: <CreditCard />, label: lang === 'ZH' ? '卡片' : 'Cards', color: 'bg-white/10' },
            { icon: <Bell />, label: lang === 'ZH' ? '帳單' : 'Bills', color: 'bg-white/10' }
          ].map((action, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-1">
              <button className={`w-full aspect-square rounded-[24px] flex items-center justify-center transition-all hover:scale-95 ${action.color}`}>
                 {React.cloneElement(action.icon as React.ReactElement, { className: "w-6 h-6" })}
              </button>
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">{action.label}</span>
            </div>
          ))}
        </div>

        {/* Cards Section - Horizontal scroll */}
        <div className="mb-10 -mx-6 px-6">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">{lang === 'ZH' ? '我的卡片' : 'My Cards'}</h3>
            <span className="text-[10px] text-[#FFB067] font-bold">{lang === 'ZH' ? '新增' : 'Add New'}</span>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
             <div className="min-w-[280px] aspect-[1.6/1] bg-gradient-to-br from-[#FFB067] to-[#FF8C37] rounded-[24px] p-6 text-black flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <span className="font-bold text-lg tracking-tighter uppercase italic">Zenith.</span>
                   <div className="w-10 h-6 bg-black/20 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-red-500 rounded-full -mr-1 opacity-80" />
                      <div className="w-4 h-4 bg-yellow-500 rounded-full opacity-80" />
                   </div>
                </div>
                <div>
                   <p className="text-[10px] opacity-60 font-bold uppercase mb-1">Platinum Credit</p>
                   <p className="font-mono text-lg tracking-widst">**** **** **** 4292</p>
                </div>
             </div>
             <div className="min-w-[280px] aspect-[1.6/1] bg-zinc-800 rounded-[24px] p-6 text-white flex flex-col justify-between border border-white/5">
                <div className="flex justify-between items-start">
                   <span className="font-bold text-lg tracking-tighter uppercase italic opacity-50">Zenith.</span>
                   <CreditCard className="w-6 h-6 opacity-40" />
                </div>
                <div>
                   <p className="text-[10px] opacity-30 font-bold uppercase mb-1">Daily Debit</p>
                   <p className="font-mono text-lg tracking-widst opacity-80">**** **** **** 8810</p>
                </div>
             </div>
          </div>
        </div>

        {/* Savings Goals */}
        <div className="mb-10">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{lang === 'ZH' ? '存款目標' : 'Savings Goals'}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/5 p-4 rounded-[24px]">
               <div className="w-8 h-8 bg-[#FFB067]/10 rounded-full flex items-center justify-center text-[#FFB067] mb-3">
                  <ArrowDownLeft className="w-4 h-4 rotate-45" />
               </div>
               <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{lang === 'ZH' ? '東京旅行' : 'Tokyo Trip'}</p>
               <div className="flex justify-between items-baseline mb-2">
                 <p className="text-lg font-black">$4,200</p>
                 <p className="text-[10px] text-gray-500">of $8k</p>
               </div>
               <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FFB067] w-[52%]" />
               </div>
            </div>
            <div className="bg-white/5 border border-white/5 p-4 rounded-[24px]">
               <div className="w-8 h-8 bg-[#39FF14]/10 rounded-full flex items-center justify-center text-[#39FF14] mb-3">
                  <ArrowDownLeft className="w-4 h-4 rotate-45" />
               </div>
               <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{lang === 'ZH' ? '新筆電' : 'New Laptop'}</p>
               <div className="flex justify-between items-baseline mb-2">
                 <p className="text-lg font-black">$1,850</p>
                 <p className="text-[10px] text-gray-500">of $2k</p>
               </div>
               <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#39FF14] w-[92%]" />
               </div>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 border border-white/5 rounded-[32px] p-6 -mx-2 backdrop-blur-md relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full mt-3" />
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 mt-4">{lang === 'ZH' ? '最近交易' : 'Recent Transactions'}</h3>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2D2D2D] rounded-2xl flex items-center justify-center">
                  <AppleIcon />
                </div>
                <div>
                  <p className="font-bold text-sm">Apple Store</p>
                  <p className="text-xs text-gray-500 font-medium">Electronics</p>
                </div>
              </div>
              <span className="font-mono font-bold text-sm">-$1,299.00</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2D2D2D] rounded-2xl flex items-center justify-center">
                  <CoffeeIcon />
                </div>
                <div>
                  <p className="font-bold text-sm">Blue Bottle</p>
                  <p className="text-xs text-gray-500 font-medium">Coffee & Tea</p>
                </div>
              </div>
              <span className="font-mono font-bold text-sm">-$5.50</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FFB067]/20 rounded-2xl flex items-center justify-center border border-[#FFB067]/50">
                  <ArrowDownLeft className="w-5 h-5 text-[#FFB067]" />
                </div>
                <div>
                  <p className="font-bold text-sm">Upwork Escrow</p>
                  <p className="text-xs text-gray-500 font-medium">Income</p>
                </div>
              </div>
              <span className="font-mono font-bold text-sm text-[#39FF14]">+$3,450.00</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M12.9 3.5c.7-.9 1.1-2 1-3.2-1 .1-2.2.6-2.9 1.4-.6.7-1.1 1.8-1 3 1.1 0 2.2-.5 2.9-1.2zm6.7 13.9c-.8 2-2.1 4.5-4.4 4.5-1 0-1.7-.6-3-.6s-2.1.6-3 .6c-2.2 0-3.6-2.6-4.4-4.5-1.5-3.6-1.5-7.7-.3-9.5 1-1.3 2.5-2 4.1-2 .9 0 1.9.4 2.6.9.7.5 1.3.5 2 0 .8-.5 1.8-.9 2.7-.9 1.5 0 2.8.6 3.7 1.8-3.1 1.6-2.6 6 1 7.2-.6 1.1-1.3 2-2 3.1z"/>
  </svg>
);

const CoffeeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
    <line x1="6" y1="1" x2="6" y2="4"></line>
    <line x1="10" y1="1" x2="10" y2="4"></line>
    <line x1="14" y1="1" x2="14" y2="4"></line>
  </svg>
);
