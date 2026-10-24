import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';
import { ShoppingBag, Search, Menu, Heart } from 'lucide-react';

interface Props {
  lang: Language;
}

export const GuevoApparelApp: React.FC<Props> = ({ lang }) => {
  return (
    <div className="w-full h-full bg-[#FAF9F6] text-[#1A1A1A] font-sans flex flex-col relative overflow-y-auto overflow-x-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-6 z-10 sticky top-0 bg-[#FAF9F6]/80 backdrop-blur-md">
        <Menu className="w-6 h-6" />
        <h1 className="font-serif text-xl tracking-widest font-bold uppercase">Guevo</h1>
        <div className="flex gap-4">
          <Search className="w-5 h-5" />
          <ShoppingBag className="w-5 h-5" />
        </div>
      </div>

      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="px-6 mb-8"
      >
        <div className="w-full aspect-[4/5] bg-gray-200 rounded-2xl overflow-hidden relative">
          <img 
            src="/assets/images/vogue_hero_autumn_1779807686651.png" 
            alt="Fashion" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-white text-3xl font-serif font-bold mb-2">
              {lang === 'ZH' ? '秋季新品' : 'Autumn Collection'}
            </h2>
            <button className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase w-max">
              {lang === 'ZH' ? '立即探索' : 'Explore Now'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <div className="px-6 mb-6 flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {['All', 'Dresses', 'Tops', 'Outerwear', 'Accessories'].map((cat, i) => (
          <span key={i} className={`whitespace-nowrap px-4 py-1.5 rounded-full border border-[#1A1A1A] text-xs font-bold tracking-widest uppercase ${i === 0 ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A]'}`}>
            {lang === 'ZH' && cat === 'All' ? '全部' : cat}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 px-6 pb-6 pt-2">
        {[
          { img: "/assets/images/vogue_silk_midi_dress_1779807704736.png", title: "Silk Midi Dress", price: "$145" },
          { img: "/assets/images/vogue_wool_blend_coat_1779807721923.png", title: "Wool Blend Coat", price: "$289" },
          { img: "/assets/images/vogue_knit_sweater_1779807740520.png", title: "Knit Sweater", price: "$85" },
          { img: "/assets/images/vogue_linen_trousers_1779807755806.png", title: "Linen Trousers", price: "$110" },
        ].map((item, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            key={i} className="flex flex-col gap-2"
          >
            <div className="w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden relative group">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              <button className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-[#1A1A1A]" />
              </button>
            </div>
            <div>
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-xs text-gray-500 font-mono">{item.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
