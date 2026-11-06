import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';

interface Props {
  lang: Language;
}

export const TalonStudio: React.FC<Props> = ({ lang }) => {
  return (
    <div className="w-full h-full bg-[#111] text-[#E5E5E5] font-serif relative overflow-y-auto">
      <div className="p-8 md:p-12 min-h-[600px] flex flex-col relative overflow-hidden">
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-12 relative z-10 flex-1">
          <header className="flex justify-between items-end border-b border-white/10 pb-6 mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter uppercase"
            >
              Talon
            </motion.h1>
            <div className="text-right pb-2">
              <p className="text-sm font-sans tracking-widest text-[#A3A3A3] uppercase">FW / 26</p>
              <p className="text-xs font-sans text-white/40 mt-1">{lang === 'ZH' ? '特別版' : 'Édition Spéciale'}</p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[450px]">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="md:col-span-8 group relative overflow-hidden bg-black flex flex-col justify-end p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img src="https://images.unsplash.com/photo-1549298240-0d8e60513026?auto=format&fit=crop&q=80&w=1200" alt="Fashion 1" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-60" referrerPolicy="no-referrer" />
              <div className="relative z-20">
                <h2 className="text-3xl font-light tracking-wide mb-2">{lang === 'ZH' ? '前衛系列' : 'The Avant-Garde Collection'}</h2>
                <button className="text-sm font-sans tracking-widest border-b border-white hover:text-[#E6C27A] hover:border-[#E6C27A] transition-colors pb-1 uppercase">{lang === 'ZH' ? '觀看專題' : 'View Editorials'}</button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="md:col-span-4 group relative overflow-hidden bg-black flex flex-col justify-between p-8 border-l border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10 pointer-events-none group-hover:opacity-60 transition-opacity duration-700" />
              <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800" alt="Details" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out opacity-60" referrerPolicy="no-referrer" />
              
              <div className="relative z-20 text-left">
                <div className="w-8 h-[1px] bg-[#E6C27A] mb-4 transition-all duration-500 group-hover:w-16"></div>
                <span className="text-xs font-sans tracking-widest text-[#E6C27A] uppercase drop-shadow-md">
                  {lang === 'ZH' ? '工藝' : 'Craftsmanship'}
                </span>
                <h3 className="text-3xl font-light mt-2 leading-tight text-white drop-shadow-lg">
                  {lang === 'ZH' ? <>冷漠 <br/><span className="italic font-serif">與</span> 結構</> : <>Apathy <br/><span className="italic font-serif">&</span> Structure</>}
                </h3>
              </div>

              <div className="relative z-20 text-right mt-auto">
                <p className="text-xs font-sans text-white/70 max-w-[180px] ml-auto leading-relaxed drop-shadow-md">
                  {lang === 'ZH' ? '探索本季系列的結構之美。' : 'Discover the structural beauty of this season\'s silhouette.'}
                </p>
                <button className="mt-4 text-[10px] font-sans tracking-widest uppercase border border-white/20 px-3 py-1.5 hover:bg-white hover:text-black transition-colors backdrop-blur-sm">
                  {lang === 'ZH' ? '閱讀更多' : 'Read More'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Lookbook Grid */}
      <section className="py-24 px-8 md:px-12 bg-black">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600'
          ].map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700"
            >
              <img src={img} alt={`Look ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-8 md:px-12 bg-[#111]">
        <div className="max-w-3xl mx-auto text-center space-y-8">
           <span className="text-[10px] font-sans tracking-[0.4em] text-[#E6C27A] uppercase">{lang === 'ZH' ? '品牌理念' : 'The Creed'}</span>
           <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-relaxed">
             {lang === 'ZH' 
               ? '我們在混亂中尋找沉默。' 
               : 'Finding silence within the dissonance.'}
           </h2>
           <p className="text-sm font-sans text-white/50 leading-loose max-w-xl mx-auto">
             {lang === 'ZH'
               ? 'TALON 不僅僅是服裝；它是對當前數位喧囂的一種冷淡反應。透過精確的裁剪與對單色美學的堅持，我們建立了一個極簡主義的避風港。'
               : 'TALON is not merely apparel; it is a detached response to the current digital noise. Through precision tailoring and an adherence to monochromatic aesthetics, we establish a minimalist sanctuary.'}
           </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 md:px-12 border-t border-white/5 text-[#A3A3A3]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="space-y-6">
             <h2 className="text-3xl font-bold uppercase tracking-tighter text-white">Talon</h2>
             <p className="text-[10px] font-sans tracking-[0.2em] leading-relaxed uppercase">
               Atelier / Paris <br/> 
               22 Rue du Minimalisme <br/>
               75001 Paris, FR
             </p>
          </div>
          <div className="flex gap-16">
            <div className="space-y-4">
               <span className="text-[10px] font-sans font-bold tracking-widest text-[#E6C27A] uppercase">FOLLOW</span>
               <ul className="text-[10px] font-sans space-y-2 uppercase tracking-widest">
                 <li className="hover:text-white cursor-pointer transition-colors">Instagram</li>
                 <li className="hover:text-white cursor-pointer transition-colors">Twitter X</li>
               </ul>
            </div>
            <div className="space-y-4">
               <span className="text-[10px] font-sans font-bold tracking-widest text-[#E6C27A] uppercase">LEGAL</span>
               <ul className="text-[10px] font-sans space-y-2 uppercase tracking-widest">
                 <li className="hover:text-white cursor-pointer transition-colors">Terms</li>
                 <li className="hover:text-white cursor-pointer transition-colors">Privacy</li>
               </ul>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/5 text-[9px] font-sans tracking-[0.3em] uppercase text-center opacity-30">
          © 2026 TALON STUDIO ALL RIGHTS RESERVED / SCULPTED IN VOID
        </div>
      </footer>
    </div>
  );
};
