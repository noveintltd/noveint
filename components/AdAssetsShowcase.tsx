import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../App';
import VariableProximity from './VariableProximity';

interface AdAssetsShowcaseProps {
  lang: Language;
}

export const AdAssetsShowcase: React.FC<AdAssetsShowcaseProps> = ({ lang }) => {
  const [modulrSlide, setModulrSlide] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  return (
    <div id="portfolio" className="w-full mt-24">
      <h3 ref={headingRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-12 text-right text-white">
        {lang === 'EN' ? (
          <>
            <VariableProximity
              label="AD ASSET"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={headingRef}
              radius={100}
              falloff="linear"
            />
            <br className="block md:hidden" />
            {" "}
            <VariableProximity
              label="CONCEPTS"
              className="text-[#39FF14]"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={headingRef}
              radius={100}
              falloff="linear"
            />
          </>
        ) : (
          <>
            <VariableProximity
              label="廣告創意"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={headingRef}
              radius={100}
              falloff="linear"
            />
            <br className="block md:hidden" />
            {" "}
            <VariableProximity
              label="概念"
              className="text-[#39FF14]"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={headingRef}
              radius={100}
              falloff="linear"
            />
          </>
        )}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] grid-flow-row-dense">
        {/* Concept 1: CHRONOS */}
        <div className="relative group overflow-hidden bg-black text-white border border-white/10 md:row-span-2">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" />
          <div className="absolute inset-0 flex flex-col">
            <div className="h-1/2 w-full border-b border-white/20 relative overflow-hidden backdrop-blur-sm bg-black/40 flex items-center justify-center">
              <div 
                className="absolute inset-0 opacity-30 max-w-full"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                  backgroundPosition: 'center center'
                }}
              />
              <motion.div 
                animate={{ x: [0, -20, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80')] bg-cover mix-blend-overlay"
              />
              <h3 className="font-serif text-4xl font-light tracking-[0.3em] uppercase z-10 text-white drop-shadow-xl">
                Chronos
              </h3>
            </div>
            <div className="h-1/2 w-full p-6 flex flex-col justify-end bg-gradient-to-t from-black via-black/80 to-transparent relative z-10">
              <p className="font-sans text-[10px] tracking-widest text-[#39FF14] mb-4 uppercase">The New Standard</p>
              <button className="w-full py-4 border border-white/20 bg-white/5 backdrop-blur-md font-sans text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors relative shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                <span className="relative z-10 font-bold">Pre-Order Now</span>
                <span className="absolute inset-0 bg-white/10 animate-pulse rounded-sm pointer-events-none" />
              </button>
            </div>
          </div>
        </div>

        {/* Concept 2: RAW FOOD LAB */}
        <div className="relative group overflow-hidden bg-[#E5E5E5] text-black border border-black p-6 flex flex-col justify-between hover:bg-[#D4D4D4] transition-colors duration-500">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-multiply opacity-20 filter grayscale group-hover:grayscale-0 group-hover:opacity-30 transition-all duration-500" />
          
          <div className="relative z-10 flex flex-col h-full">
            <h3 className="text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.8] mb-4 group-hover:tracking-widest transition-all duration-700 ease-out origin-left">
              RAW FOOD LAB
            </h3>
            
            <div className="mt-auto overflow-hidden">
              <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col gap-2 border-t-4 border-black pt-4">
                 <div className="flex justify-between text-xs font-bold font-mono"><span>01 // SALAD</span><span>$14</span></div>
                 <div className="flex justify-between text-xs font-bold font-mono"><span>02 // BOWL</span><span>$18</span></div>
                 <div className="flex justify-between text-xs font-bold font-mono"><span>03 // JUICE</span><span>$08</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Concept 3: NEON HORIZON */}
        <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden bg-black text-white border border-fuchsia-500/20 p-8 flex flex-col md:flex-row items-start md:items-center justify-between shadow-[inset_0_0_50px_rgba(217,70,239,0.1)]">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/40 via-black to-cyan-900/40" />
          
          {/* Audio Waveform */}
          <div className="absolute bottom-0 left-0 w-full h-[60%] flex items-end gap-1 opacity-40 px-4 pointer-events-none">
             {[...Array(24)].map((_, i) => (
               <motion.div key={i} className="flex-1 bg-gradient-to-t from-cyan-400 to-fuchsia-500" 
                 animate={{ height: [`${Math.random() * 20 + 5}%`, `${Math.random() * 100 + 20}%`, `${Math.random() * 20 + 5}%`] }}
                 transition={{ duration: Math.random() * 0.8 + 0.4, repeat: Infinity, ease: "easeInOut" }}
               />
             ))}
          </div>
          
          <div className="relative z-10 mb-6 md:mb-0">
            <h3 className="text-5xl md:text-6xl font-black tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 uppercase animate-pulse">
              NEON HORIZON
            </h3>
            <p className="font-mono text-xs text-white/70 mt-2 uppercase tracking-[0.2em]">{lang === 'ZH' ? '電子音樂祭 // 2026' : 'Electronic Music Festival // 2026'}</p>
          </div>
          
          <button className="relative z-10 border-2 border-fuchsia-500 text-fuchsia-400 font-bold uppercase tracking-widest text-xs px-8 py-4 hover:bg-fuchsia-500 hover:text-white hover:shadow-[0_0_40px_rgba(217,70,239,0.6)] transition-all duration-300 backdrop-blur-sm">
            {lang === 'ZH' ? '取得門票' : 'Get Tickets'}
          </button>
        </div>

        {/* Concept 4: MODULR */}
        <div 
          onClick={() => setModulrSlide((s) => (s + 1) % 3)}
          className="relative group overflow-hidden bg-[#fafafa] text-gray-900 border border-white/10 cursor-pointer"
        >
           <div className="absolute inset-0 overflow-hidden">
               <motion.div 
                  key={modulrSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
               >
                 <img 
                   src={[
                     'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80',
                     'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80',
                     'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80'
                   ][modulrSlide]} 
                   className="w-full h-full object-cover opacity-90 filter brightness-105" 
                   alt="Furniture"
                   referrerPolicy="no-referrer"
                 />
               </motion.div>
           </div>
           
           <div className="absolute inset-0 flex flex-col justify-between p-6">
              <div className="flex justify-between items-center z-10">
                 <h3 className="font-sans font-black tracking-tighter text-3xl uppercase text-black drop-shadow-md bg-white/60 px-2 py-1 backdrop-blur-sm">
                   MODULR
                 </h3>
                 <div className="flex gap-1.5 bg-black/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                    {[0,1,2].map(i => (
                      <span key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${modulrSlide === i ? 'bg-black' : 'bg-black/30'}`}></span>
                    ))}
                 </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none z-10">
                  <svg className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 drop-shadow-lg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                     <motion.path d="M10,80 L10,30 L60,30 L60,80 Z" fill="none" stroke="black" strokeWidth="1" strokeDasharray="4 4" 
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1.5 }}
                     />
                     <motion.path d="M60,30 L80,50 L80,90 L60,80" fill="none" stroke="black" strokeWidth="1" strokeDasharray="4 4" 
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1.5 }}
                     />
                     <text x="12" y="78" fontSize="4" fontFamily="monospace" fill="black" fontWeight="bold">W: 240cm</text>
                     <text x="62" y="55" fontSize="4" fontFamily="monospace" fill="black" fontWeight="bold">D: 90cm</text>
                  </svg>
              </div>

              <div className="bg-white/90 backdrop-blur-md p-3 text-xs font-mono font-bold flex justify-between items-center shadow-lg border border-black/10 z-10">
                 <span>{lang === 'ZH' ? `配置 ${['A', 'B', 'C'][modulrSlide]}` : `Configuration ${['A', 'B', 'C'][modulrSlide]}`}</span>
                 <span className="uppercase text-[10px] tracking-widest flex items-center gap-2">
                   {lang === 'ZH' ? '點擊滑動' : 'Tap to cycle'} 
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                 </span>
              </div>
           </div>
        </div>

        {/* Concept 5: AURA */}
        <div className="relative group overflow-hidden bg-gradient-to-br from-[#f8ecec] to-[#e6f2f0] border border-rose-100 p-8 flex flex-col justify-center items-center text-center">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80')] mix-blend-overlay opacity-40 object-cover bg-center transition-transform duration-1000 group-hover:scale-105" />
           
           <div className="absolute inset-0 translate-x-[-150%] skew-x-[-20deg] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-white/60 to-transparent w-full z-10 pointer-events-none" />

           <motion.div 
             className="relative z-10 bg-white/40 backdrop-blur-sm p-8 rounded-full border border-white/50 w-48 h-48 flex flex-col items-center justify-center shadow-sm group-hover:shadow-[0_0_40px_rgba(255,255,255,0.8)] transition-shadow duration-700"
             whileHover={{ scale: 1.05 }}
           >
             <h3 className="font-serif italic text-4xl text-rose-900 mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-700">
               Aura
             </h3>
             <p className="font-sans text-[9px] font-bold tracking-[0.3em] uppercase text-rose-800/80">Holistic Skincare</p>
           </motion.div>
           
           <button className="relative z-10 mt-8 border-b-2 border-rose-800/30 text-rose-900 font-sans text-[10px] font-bold uppercase tracking-[0.2em] pb-1 hover:text-rose-600 hover:border-rose-600 transition-colors">
             {lang === 'ZH' ? '探索儀式' : 'Discover Rituals'}
           </button>
        </div>

        {/* Concept 6: TOKYO UNDERGROUND */}
        <div className="md:row-span-2 relative group overflow-hidden bg-[#0A0A0A] text-[#FFE600] border border-[#FFE600]/20 p-6 flex flex-col shadow-[inset_0_0_20px_rgba(255,230,0,0.05)]">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 mix-blend-luminosity transition-all duration-700" />
           
           <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-8 flex flex-col items-center justify-start overflow-hidden opacity-50 font-bold border-l border-[#FFE600]/20 text-[10px] tracking-widest font-mono">
                  <motion.div 
                    animate={{ y: [0, -200] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="flex flex-col gap-8 whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl' }}
                  >
                     <span>TOKYO UNDERGROUND</span>
                     <span className="text-white">東京地下</span>
                     <span>TOKYO UNDERGROUND</span>
                     <span className="text-white">東京地下</span>
                  </motion.div>
              </div>
              
              <div className="mt-auto pr-10">
                 <h3 className="text-5xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-[0.85] mb-2 drop-shadow-[0_0_10px_rgba(255,230,0,0.4)]">
                   <span className="block">Tokyo</span>
                   <span className="text-white block">Underground</span>
                 </h3>
                 <h4 className="text-2xl font-bold mb-6 font-serif opacity-80">
                   東京地下
                 </h4>
                 
                 <div className="w-14 h-14 rounded-full border border-[#FFE600] bg-black/50 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-[#FFE600] hover:text-black transition-colors shadow-[0_0_20px_rgba(255,230,0,0.3)] group-hover:shadow-[0_0_40px_rgba(255,230,0,0.6)]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
                 </div>
              </div>
           </div>
        </div>
        {/* Concept 7: ECLIPSE */}
        <div className="relative group overflow-hidden bg-black text-white border border-white/10 p-6 flex flex-col justify-end">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-1000" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
           
           <div className="relative z-10 w-full">
              <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-1 drop-shadow-lg group-hover:text-red-500 transition-colors duration-500 text-white">
                Eclipse
              </h3>
              <p className="text-xs font-mono text-red-500 mb-4 tracking-[0.2em] font-bold">GT-R // 2026</p>
              
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-4">
                 <motion.div 
                   className="h-full bg-red-600"
                   initial={{ width: 0 }}
                   whileInView={{ width: '100%' }}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                 />
              </div>
              
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-white/70">
                 <span>0-60mph</span>
                 <span className="text-white">2.9s</span>
              </div>
           </div>
        </div>

        {/* Concept 8: LUMINA */}
        <div className="md:col-span-2 relative group overflow-hidden bg-slate-900 border border-indigo-500/30 p-8 flex flex-col justify-center shadow-[inset_0_0_80px_rgba(79,70,229,0.15)]">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000 animate-pulse" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-screen filter blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000 animate-pulse" style={{ animationDelay: '1s' }} />

           <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between w-full">
              <div className="flex-1">
                 <h3 className="text-3xl lg:text-5xl font-black tracking-tight text-white mb-2">
                   Lumina
                 </h3>
                 <p className="text-indigo-300 font-medium text-sm lg:text-base font-sans leading-relaxed max-w-sm mb-6">
                   {lang === 'ZH' ? '重新定義全球金融架構。毫秒級結算。' : 'Redefining global financial architecture. Millisecond settlements.'}
                 </p>
                 <button className="bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow cursor-pointer">
                   {lang === 'ZH' ? '開啟帳戶' : 'Open Account'}
                 </button>
              </div>

              <div className="w-full md:w-1/2 flex items-center justify-center relative">
                 {/* Chart Mockup */}
                 <div className="w-full h-32 md:h-48 border-b-2 border-l-2 border-white/20 relative">
                    <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <motion.path 
                        d="M0,90 Q10,70 20,80 T40,60 T60,50 T80,20 T100,10" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                      />
                      <motion.path 
                         d="M0,90 Q10,70 20,80 T40,60 T60,50 T80,20 T100,10 L100,100 L0,100 Z"
                         fill="url(#grad)"
                         opacity="0.2"
                         initial={{ opacity: 0 }}
                         whileInView={{ opacity: 0.2 }}
                         transition={{ duration: 2, delay: 0.5 }}
                      />
                      <defs>
                        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                 </div>
              </div>
           </div>
        </div>

        {/* Concept 9: VENTURE */}
        <div className="relative group overflow-hidden bg-[#2D2A26] text-[#F4EBD9] border border-[#D9A05B]/30 p-6 flex flex-col items-center justify-center text-center">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:scale-110 transition-transform duration-[2s] ease-out" />
           <div className="absolute inset-0 bg-[#D9A05B] mix-blend-color opacity-20" />
           
           <div className="relative z-10 p-6 border-4 border-[#D9A05B]/0 group-hover:border-[#D9A05B]/80 transition-colors duration-500 w-[90%] h-[90%] flex flex-col justify-center items-center bg-black/20 backdrop-blur-[2px]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D9A05B" strokeWidth="2" strokeLinecap="square" className="mb-4 group-hover:-translate-y-2 transition-transform duration-500">
                <path d="M2 22l10-20 10 20" />
                <path d="M12 14v8" />
              </svg>
              <h3 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2 drop-shadow-md">
                Venture
              </h3>
              <p className="text-[10px] font-bold tracking-[0.3em] text-[#D9A05B] uppercase mb-6 drop-shadow-md">Built for the Wild</p>
              
              <div className="text-xs font-bold border-b-2 border-transparent group-hover:border-[#D9A05B] uppercase tracking-widest pb-1 transition-all cursor-pointer">
                {lang === 'ZH' ? '購買裝備' : 'Shop Gear'}
              </div>
           </div>
        </div>

        {/* Concept 10: ZENITH */}
        <div className="relative group overflow-hidden bg-zinc-100 text-zinc-900 border border-zinc-200 p-6 flex flex-col justify-between text-center items-center">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-multiply group-hover:scale-110 transition-transform duration-[3s] ease-out" />
           <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-zinc-100 to-transparent pointer-events-none" />
           
           <div className="relative z-10 w-full pt-8">
              <h3 className="font-serif text-4xl font-light tracking-[0.2em] uppercase mb-2">
                Zenith
              </h3>
              <p className="text-[10px] font-sans tracking-[0.2em] text-zinc-500 uppercase">{lang === 'ZH' ? '全新香氛' : "L'Eau de Parfum"}</p>
           </div>
           
           <button className="relative z-10 mt-auto border border-zinc-900 bg-transparent text-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-colors duration-300 w-3/4 backdrop-blur-sm">
              {lang === 'ZH' ? '探索' : 'Explore'}
           </button>
        </div>

        {/* Concept 11: KINETIC */}
        <div className="relative group overflow-hidden bg-[#FF4500] text-black border border-black p-6 flex flex-col justify-center">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552066344-2464c1135c32?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-50 grayscale contrast-150 group-hover:grayscale-0 transition-all duration-500" />
           <div className="absolute inset-0 bg-gradient-to-tr from-[#FF4500]/80 via-transparent to-transparent pointer-events-none" />
           
           <div className="relative z-10 w-full overflow-hidden flex flex-col gap-0 items-start -ml-2 group-hover:ml-0 transition-all duration-300">
              <h3 className="text-6xl font-black italic uppercase tracking-tighter mix-blend-color-burn">
                KNTC.
              </h3>
              <div className="flex items-center gap-2 mt-2 bg-black text-[#FF4500] px-3 py-1 font-mono text-xl font-bold uppercase">
                 <span className="animate-pulse">00:14:59</span>
              </div>
           </div>

           <div className="relative z-10 mt-auto flex justify-between items-end">
              <p className="text-xs font-black uppercase tracking-widest leading-tight">
                 {lang === 'ZH' ? '突破極限' : 'Push limits'} <br/> 
                 {lang === 'ZH' ? '無畏前行' : 'Defy gravity'}
              </p>
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
