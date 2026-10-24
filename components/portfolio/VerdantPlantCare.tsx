import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';

interface Props {
  lang: Language;
}

export const VerdantPlantCare: React.FC<Props> = ({ lang }) => {
  return (
    <div className="w-full h-full bg-[#f6f7f4] text-[#2c3e2e] p-6 font-serif flex flex-col overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#e8efe8] rounded-full mix-blend-multiply blur-3xl opacity-80 -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-end z-10 pt-2 mb-8">
        <div>
          <p className="text-xs font-sans tracking-widest text-[#728a75] uppercase mb-1">
            {lang === 'ZH' ? '早安' : 'Good Morning'}
          </p>
          <h1 className="text-3xl font-light tracking-tight text-[#1a261c]">
            {lang === 'ZH' ? '植物日誌' : 'Plant Journal'}
          </h1>
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>

      {/* Main Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgba(44,62,46,0.04)] border border-[#e8efe8] relative z-10 mb-6"
      >
        <div className="flex justify-between items-start mb-4">
          <span className="bg-[#e8efe8] text-[#2c3e2e] px-3 py-1 rounded-full text-[10px] font-sans font-bold tracking-widest uppercase">
            {lang === 'ZH' ? '需要澆水' : 'Needs Water'}
          </span>
          <span className="text-[#aebfab] font-sans text-xs font-bold">Today</span>
        </div>
        <div className="flex gap-4 items-center">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#f4f7f4]">
            <img src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=200" alt="Monstera" className="w-full h-full object-cover mix-blend-multiply" referrerPolicy="no-referrer" />
          </div>
          <div>
            <h2 className="text-xl font-medium text-[#1a261c] mb-1">Monstera</h2>
            <p className="text-sm font-sans text-[#728a75]">Swiss Cheese Plant</p>
          </div>
        </div>
        <button className="w-full mt-5 bg-[#2c3e2e] text-white py-3.5 rounded-xl font-sans text-sm font-bold shadow-md hover:bg-[#1a261c] transition-colors active:scale-[0.98]">
          {lang === 'ZH' ? '標記為已澆水' : 'Mark as Watered'}
        </button>
      </motion.div>

      <h3 className="font-sans text-[11px] tracking-widest text-[#728a75] font-bold uppercase mt-2 mb-4 z-10 relative">
        {lang === 'ZH' ? '我的叢林' : 'My Jungle'}
      </h3>
      
      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 flex-1 z-10 relative pb-4">
        <motion.div 
           whileHover={{ y: -2 }}
           className="bg-white p-4 rounded-2xl shadow-sm border border-[#e8efe8] flex flex-col items-center text-center justify-center cursor-pointer"
        >
          <img src="/assets/images/aloe_vera_plant_pot_1779807473498.png" alt="Aloe" className="w-16 h-16 object-cover rounded-full mb-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" referrerPolicy="no-referrer" />
          <h4 className="font-medium text-[#1a261c] text-sm">Aloe Vera</h4>
          <p className="text-[10px] font-sans text-[#aebfab] font-bold mt-1 uppercase">In 3 Days</p>
        </motion.div>
        
        <motion.div 
           whileHover={{ y: -2 }}
           className="bg-white p-4 rounded-2xl shadow-sm border border-[#e8efe8] flex flex-col items-center text-center justify-center cursor-pointer opacity-80"
        >
          <img src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80&w=150" alt="Snake" className="w-16 h-16 object-cover rounded-full mb-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" referrerPolicy="no-referrer" />
          <h4 className="font-medium text-[#1a261c] text-sm">Snake Plant</h4>
          <p className="text-[10px] font-sans text-[#aebfab] font-bold mt-1 uppercase">In 12 Days</p>
        </motion.div>
      </div>
    </div>
  );
};
