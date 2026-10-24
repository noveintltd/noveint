import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';

interface Props {
  lang: Language;
}

export const Kura: React.FC<Props> = ({ lang }) => {
  return (
    <div className="w-full bg-[#fdfcfbf4] text-[#2c2c2a] font-sans">
      <div className="p-8 md:p-16 min-h-[600px] flex flex-col">
        <nav className="flex justify-between items-center mb-20">
          <span className="text-xl font-medium tracking-tight">Kura.</span>
          <ul className="flex gap-8 text-sm text-gray-500">
            <li className="hover:text-black cursor-pointer transition-colors">{lang === 'ZH' ? '作品' : 'Work'}</li>
            <li className="hover:text-black cursor-pointer transition-colors">{lang === 'ZH' ? '工作室' : 'Studio'}</li>
            <li className="hover:text-black cursor-pointer transition-colors">{lang === 'ZH' ? '聯絡' : 'Contact'}</li>
          </ul>
        </nav>

        <div className="max-w-3xl mx-auto text-center space-y-8 flex-1 flex flex-col justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-normal tracking-tight text-[#1a1a1a]"
          >
            {lang === 'ZH' ? '少，即是好。' : 'Less, but better.'}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-gray-500 font-light max-w-xl mx-auto leading-relaxed"
          >
            {lang === 'ZH' ? '我們創造會呼吸的數位體驗。去除不必要的元素，讓有意義的事物發聲。' : 'We create digital experiences that breathe. Removing the unnecessary so the meaningful may speak.'}
          </motion.p>
        </div>
      </div>

      <section className="py-24 px-8 md:px-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -20 }}
            viewport={{ once: true }}
            className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative cursor-pointer group"
          >
            <img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800" alt="Interior" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
          
          <div className="flex flex-col justify-center space-y-6">
            <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">{lang === 'ZH' ? '精選專案' : 'Featured Project'}</span>
            <h2 className="text-4xl font-medium text-[#1a1a1a]">{lang === 'ZH' ? '寧靜空間' : 'Serene Spaces'}</h2>
            <p className="text-gray-500 font-light leading-relaxed text-lg">
              {lang === 'ZH' ? '線上傢俱零售的極簡主義方案，專注於寬敞的佈局、柔和的排版和高品質的圖像，讓產品本身閃耀。' : 'A minimalist approach to online furniture retail, focusing on spacious layouts, soft typography, and high-quality imagery that lets the products shine.'}
            </p>
            <button className="w-fit pb-1 border-b border-black text-sm hover:text-gray-500 hover:border-gray-500 transition-colors mt-4">
              {lang === 'ZH' ? '觀看案例' : 'View Case Study'}
            </button>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#f8f7f5] px-8 md:px-16 text-center">
         <div className="max-w-2xl mx-auto space-y-12">
            <span className="text-xs font-bold tracking-[0.4em] text-gray-400 uppercase">{lang === 'ZH' ? '我們的核心價值' : 'Core Values'}</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              {[
                { t: lang === 'ZH' ? '意圖' : 'Intent', d: 'Design with purpose.' },
                { t: lang === 'ZH' ? '清晰' : 'Clarity', d: 'Simplicity over noise.' },
                { t: lang === 'ZH' ? '工藝' : 'Craft', d: 'Precision in detail.' }
              ].map((val, i) => (
                <div key={i} className="space-y-4">
                  <h3 className="text-xl font-medium">{val.t}</h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{val.d}</p>
                </div>
              ))}
            </div>
         </div>
      </section>

      <section className="py-24 px-8 md:px-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
           {[
             'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=600',
             'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600',
             'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=600'
           ].map((url, i) => (
             <div key={i} className="aspect-square bg-gray-50 overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
               <img src={url} alt="Gallery" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
             </div>
           ))}
        </div>
      </section>

      <footer className="py-20 px-8 md:px-16 border-t border-black/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <span className="text-xl font-medium tracking-tight">Kura.</span>
            <p className="text-xs text-gray-400 mt-2 font-light">© 2026 Kura Digital Studio</p>
          </div>
          <div className="flex gap-12 text-xs font-medium text-gray-400 uppercase tracking-widest">
            <span className="hover:text-black cursor-pointer">Instagram</span>
            <span className="hover:text-black cursor-pointer">Pinterest</span>
          </div>
          <div className="text-right">
             <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">{lang === 'ZH' ? '保持聯繫' : 'Get in touch'}</p>
             <p className="text-sm mt-1 pb-1 border-b border-black/20">studio@kura.design</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
