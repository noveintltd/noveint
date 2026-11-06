import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';
import { ShoppingCart, Search, Flame, ArrowRight } from 'lucide-react';

interface Props {
  lang: Language;
}

export const VelocitySportsApp: React.FC<Props> = ({ lang }) => {
  return (
    <div className="w-full h-full bg-[#0a0a0a] text-white font-sans flex flex-col relative overflow-y-auto overflow-x-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-6 z-10">
        <div className="flex items-center gap-2">
          <Flame className="w-6 h-6 text-[#FF4500]" />
          <h1 className="font-black text-xl italic tracking-tighter uppercase">VELOCITY</h1>
        </div>
        <div className="flex gap-4">
          <Search className="w-5 h-5 text-gray-300" />
          <ShoppingCart className="w-5 h-5 text-gray-300" />
        </div>
      </div>

      {/* Featured Shoe */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full px-6 mb-8 relative"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FF4500] rounded-full blur-[80px] opacity-30 pointer-events-none" />
        <div className="flex flex-col items-center">
          <img 
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800"
            alt="Running Shoe"
            className="w-[80%] hover:-translate-y-2 hover:rotate-3 transition-transform duration-500 saturate-150 drop-shadow-2xl z-10 rounded-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="mt-6 text-center z-10 w-full flex flex-col items-center">
            <span className="text-[#FF4500] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">New Release</span>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-1">Aura Runner V3</h2>
            <p className="text-gray-400 text-xs font-medium mb-4">Max performance, zero gravity.</p>
            <div className="flex justify-between items-center w-full max-w-[200px] mb-4">
              <span className="font-mono text-xl font-bold">$185.00</span>
              <button className="bg-[#FF4500] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#FF6347] transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recommended */}
      <div className="px-6 mb-4 flex justify-between items-end">
        <h3 className="text-lg font-black uppercase tracking-tight">{lang === 'ZH' ? '推薦商品' : 'Top Gear'}</h3>
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{lang === 'ZH' ? '查看全部' : 'View All'}</span>
      </div>

      <div className="px-6 flex gap-4 overflow-x-auto no-scrollbar pb-6">
        {[
          { img: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&q=80&w=400", title: "Compression Tee", price: "$45" },
          { img: "/assets/images/elite_shorts_2_0_1779807575759.png", title: "Elite Shorts 2.0", price: "$55" },
          { img: "https://images.unsplash.com/photo-1521774971864-62e842046145?auto=format&fit=crop&q=80&w=400", title: "Pro Crew Socks", price: "$18" }
        ].map((item, i) => (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            key={i} 
            className="flex-shrink-0 w-[140px] flex flex-col gap-3"
          >
            <div className="w-full aspect-square bg-[#1A1A1A] rounded-2xl overflow-hidden p-2 flex items-center justify-center">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover rounded-xl" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p className="text-sm font-bold truncate">{item.title}</p>
              <p className="text-xs text-gray-400 font-mono">{item.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
