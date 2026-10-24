import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';

interface Props {
  lang: Language;
}

export const BoutiqueMarketplace: React.FC<Props> = ({ lang }) => {
  return (
    <div className="w-full bg-[#111] text-[#E5E5E5] font-serif relative">
      <div className="min-h-[600px] flex flex-col md:flex-row overflow-hidden relative border-b border-white/5">
        <div className="p-6 md:p-12 flex justify-between items-center z-20 absolute top-0 left-0 w-full bg-gradient-to-b from-black/80 to-transparent">
          <span className="text-xl font-bold tracking-tighter uppercase">Boutique</span>
          <div className="flex items-center gap-6">
             <span className="text-sm font-sans tracking-widest uppercase hover:text-[#7BA05B] transition-colors cursor-pointer hidden md:block">Collections</span>
             <span className="text-sm font-sans tracking-widest uppercase hover:text-[#7BA05B] transition-colors cursor-pointer hidden md:block">Designers</span>
             <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center bg-black/50 backdrop-blur-md">
               <span className="text-xs font-sans">2</span>
             </div>
          </div>
        </div>

        <div className="relative h-[400px] md:h-[600px] w-full md:w-[65%] bg-black">
          <motion.img 
            src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1200" 
            alt="Fashion" 
            className="w-full h-full object-cover opacity-80"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] md:from-black/60 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-10">
            <h2 className="text-3xl md:text-5xl font-light leading-none mb-2 md:mb-4">Objets d'Art</h2>
            <p className="text-sm font-sans tracking-widest text-[#7BA05B] uppercase">{lang === 'ZH' ? '春季系列' : 'Spring Collection'}</p>
          </div>
          
          <div className="absolute bottom-8 right-6 md:bottom-12 md:right-12 flex gap-2">
            <div className="w-6 h-1 bg-white rounded-full"></div>
            <div className="w-2 h-1 bg-white/30 rounded-full"></div>
            <div className="w-2 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>

        <div className="flex-1 bg-[#111] p-6 md:p-12 flex flex-col justify-end md:justify-center z-10 border-t md:border-t-0 md:border-l border-white/10">
          <p className="text-sm md:text-base text-[#A3A3A3] font-sans leading-relaxed mb-6 md:mb-12">
            {lang === 'ZH' 
              ? '探索精心挑選的全球獨立設計師前衛單品。重新定義您的日常空間。' 
              : 'Explore a curated selection of avant-garde pieces from independent global designers. Redefining your everyday spaces.'}
          </p>

          <motion.button 
            whileTap={{ scale: 0.95 }}
            whileHover={{ backgroundColor: '#7BA05B', color: 'white' }}
            className="w-full py-4 bg-white text-black font-sans uppercase tracking-[0.2em] text-xs font-bold flex justify-between items-center px-6 transition-colors border border-transparent hover:border-[#7BA05B]"
          >
            <span>{lang === 'ZH' ? '立即探索' : 'Explore Now'}</span>
            <span>$1,250</span>
          </motion.button>
        </div>
      </div>

      <section className="py-24 px-6 md:px-12">
        <h3 className="text-xs font-sans font-bold tracking-[0.4em] uppercase text-zinc-500 mb-12">{lang === 'ZH' ? '當季推薦' : 'Curated Picks'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
             { t: 'VESSEL', p: '$450', img: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=600' },
             { t: 'LUMINAIRE', p: '$820', img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=600' },
             { t: 'TEXTILE', p: '$240', img: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=600' }
           ].map((item, i) => (
             <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/5] bg-zinc-900 overflow-hidden mb-4 rounded-lg">
                   <img src={item.img} alt={item.t} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="flex justify-between items-baseline">
                   <h4 className="text-sm font-bold tracking-widest uppercase">{item.t}</h4>
                   <span className="text-xs font-sans text-zinc-500">{item.p}</span>
                </div>
             </div>
           ))}
        </div>
      </section>

      <footer className="py-20 px-6 md:px-12 border-t border-white/5 bg-black/20">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-2 space-y-6">
               <span className="text-xl font-bold tracking-tighter uppercase">Boutique</span>
               <p className="max-w-xs text-xs font-sans text-zinc-500 leading-loose uppercase tracking-widest">
                  Fine goods for the modern inhabitant. Worldwide distribution from our Hong Kong hub.
               </p>
            </div>
            <div className="space-y-4">
               <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-[#7BA05B] uppercase">ENQUIRIES</span>
               <p className="text-xs font-sans text-zinc-400">concierge@boutique.int</p>
            </div>
            <div className="space-y-4">
               <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-[#7BA05B] uppercase">SOCIAL</span>
               <p className="text-xs font-sans text-zinc-400 uppercase tracking-widest">Instagram / Are.na</p>
            </div>
         </div>
         <div className="mt-20 text-center opacity-20">
            <span className="text-[9px] font-sans tracking-[0.5em] uppercase">BOUTIQUE INT © 2026</span>
         </div>
      </footer>
    </div>
  );
};
