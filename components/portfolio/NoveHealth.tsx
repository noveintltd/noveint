import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';

interface Props {
  lang: Language;
}

export const NoveHealth: React.FC<Props> = ({ lang }) => {
  return (
    <div className="w-full h-full bg-[#0a0a0c] text-white p-6 font-sans flex flex-col justify-between overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center z-10 relative">
        <div>
          <h2 className="text-sm text-zinc-400 font-medium">Hello, Alex</h2>
          <h1 className="text-2xl font-bold tracking-tight">Today's Activity</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden border-2 border-[#39FF14]">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>

      {/* Main Rings Section */}
      <div className="flex-1 flex flex-col items-center justify-center relative mt-8 z-10">
        <div className="relative w-56 h-56 flex items-center justify-center">
          {/* Progress circles */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circles */}
            <circle cx="60" cy="60" r="46" fill="none" stroke="#27272a" strokeWidth="8" opacity="0.5" />
            <circle cx="60" cy="60" r="36" fill="none" stroke="#27272a" strokeWidth="8" opacity="0.5" />
            <circle cx="60" cy="60" r="26" fill="none" stroke="#27272a" strokeWidth="8" opacity="0.5" />

            <motion.circle cx="60" cy="60" r="46" fill="none" stroke="#39FF14" strokeWidth="8" strokeLinecap="round" strokeDasharray="289" strokeDashoffset="40" 
              initial={{ strokeDashoffset: 289 }} animate={{ strokeDashoffset: 40 }} transition={{ duration: 1.5, delay: 0.2 }}
              style={{ filter: 'drop-shadow(0 0 6px rgba(57, 255, 20, 0.5))' }} />
            <motion.circle cx="60" cy="60" r="36" fill="none" stroke="#FF0055" strokeWidth="8" strokeLinecap="round" strokeDasharray="226" strokeDashoffset="60" 
              initial={{ strokeDashoffset: 226 }} animate={{ strokeDashoffset: 60 }} transition={{ duration: 1.5, delay: 0.4 }}
              style={{ filter: 'drop-shadow(0 0 6px rgba(255, 0, 85, 0.5))' }} />
            <motion.circle cx="60" cy="60" r="26" fill="none" stroke="#00D0FF" strokeWidth="8" strokeLinecap="round" strokeDasharray="163" strokeDashoffset="80" 
               initial={{ strokeDashoffset: 163 }} animate={{ strokeDashoffset: 80 }} transition={{ duration: 1.5, delay: 0.6 }}
               style={{ filter: 'drop-shadow(0 0 6px rgba(0, 208, 255, 0.5))' }} />
          </svg>

          <div className="text-center font-bold">
            <span className="text-3xl">84</span>
            <span className="text-sm text-[#39FF14]">%</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mt-8 z-10 relative">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 flex flex-col gap-2">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">{lang === 'ZH' ? '消耗卡路里' : 'Move'}</span>
          <div className="flex items-end gap-1">
            <span className="text-2xl font-black text-[#FF0055]">640</span>
            <span className="text-xs text-zinc-500 mb-1">kcal</span>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 flex flex-col gap-2">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">{lang === 'ZH' ? '運動時間' : 'Exercise'}</span>
          <div className="flex items-end gap-1">
            <span className="text-2xl font-black text-[#39FF14]">32</span>
            <span className="text-xs text-zinc-500 mb-1">min</span>
          </div>
        </motion.div>
      </div>

      {/* Ambient glow backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#39FF14] rounded-full mix-blend-screen opacity-10 blur-[80px]"></div>
      <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-[#FF0055] rounded-full mix-blend-screen opacity-10 blur-[60px]"></div>
    </div>
  );
};
