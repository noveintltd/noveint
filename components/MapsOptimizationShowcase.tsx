import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../App';
import VariableProximity from './VariableProximity';

interface Props {
  lang: Language;
}

const PROFILES = [
  { id: 'foundry', name: 'THE FOUNDRY', type: 'Premium Fitness Center', coords: { x: 30, y: 40 } },
  { id: 'mirai', name: 'MIRAI', type: 'Fusion Bistro & Lounge', coords: { x: 65, y: 25 } },
  { id: 'lantern', name: 'LANTERN', type: 'Boutique Creative Workspace', coords: { x: 25, y: 70 } },
  { id: 'crossroads', name: 'CROSSROADS', type: 'Bilingual Corporate Logistics', coords: { x: 75, y: 75 } },
];

const ProfileButton = ({ 
  profile, 
  isActive, 
  onClick 
}: { 
  profile: (typeof PROFILES)[0]; 
  isActive: boolean; 
  onClick: () => void;
  key?: React.Key;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div 
      ref={containerRef}
      onClick={onClick}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30"
      style={{ left: `${profile.coords.x}%`, top: `${profile.coords.y}%` }}
    >
      <div className="relative flex items-center justify-center">
        {/* Active Ping */}
        {isActive && (
           <motion.div 
             animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
             transition={{ duration: 1.5, repeat: Infinity }}
             className="absolute w-6 h-6 rounded-full bg-[#39FF14]/50 pointer-events-none" 
           />
        )}
        {/* Pin Core */}
        <div className={`w-3 h-3 rounded-sm rotate-45 border transition-all duration-300 ${
           isActive 
             ? 'bg-[#39FF14] border-[#39FF14] shadow-[0_0_15px_#39FF14]' 
             : 'bg-black border-white/50 group-hover:border-white group-hover:bg-white/20'
        }`} />
      </div>
      {/* Tooltip */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/20 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap pointer-events-none">
        <VariableProximity
          label={profile.name}
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRef}
          radius={40}
          falloff="linear"
        />
      </div>
    </div>
  );
};

const MetricBar = ({ label, vol, idx }: { label: string; vol: number; idx: number }) => (
  <div className="flex items-center gap-3">
    <span className="w-1/2 text-xs text-white truncate">{label}</span>
    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${vol}%` }}
          transition={{ duration: 1, delay: 0.2 + (idx * 0.1) }}
          className="h-full bg-gradient-to-r from-blue-500 to-[#39FF14]"
        />
    </div>
  </div>
);

export const MapsOptimizationShowcase: React.FC<Props> = ({ lang }) => {
  const [activeId, setActiveId] = useState(PROFILES[0].id);
  const [crossroadsLang, setCrossroadsLang] = useState<'EN' | 'ZH'>('EN');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardTitleRef = useRef<HTMLHeadingElement>(null);

  const activeProfile = PROFILES.find(p => p.id === activeId);

  return (
    <div id="portfolio" className="w-full mt-24 border-t border-white/10 pt-24 mb-16 px-4">
      <h3 ref={headingRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-12 text-right text-white">
        {lang === 'EN' ? (
          <>
            <VariableProximity
              label="GEO-SPATIAL"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={headingRef}
              radius={100}
              falloff="linear"
            />
            <br className="block md:hidden" />
            {" "}
            <VariableProximity
              label="OPTIMIZATION"
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
              label="地理空間"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={headingRef}
              radius={100}
              falloff="linear"
            />
            <br className="block md:hidden" />
            {" "}
            <VariableProximity
              label="最佳化矩陣"
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
      
      <div className="flex flex-col md:flex-row gap-0 bg-[#0a0a0a] border border-white/20 rounded-3xl overflow-hidden shadow-2xl max-w-6xl mx-auto min-h-[650px]">
        
        {/* Left Side: Vector Map Interface */}
        <div className="w-full md:w-1/2 bg-[#050505] relative overflow-hidden flex-shrink-0 min-h-[300px] md:min-h-0 border-b md:border-b-0 md:border-r border-white/10">
           {/* Abstract Map Grid & Topology */}
           <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                 <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                       <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
                    </pattern>
                 </defs>
                 <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
           </div>
           
           {/* Abstract Map Lines */}
           <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 100 100">
             <path d="M 0 30 Q 30 30 40 50 T 80 60 L 100 60" fill="none" stroke="#39FF14" strokeWidth="0.5" />
             <path d="M 20 0 L 20 40 L 40 50 L 40 100" fill="none" stroke="white" strokeWidth="0.5" />
             <path d="M 70 0 Q 60 40 80 80 L 100 100" fill="none" stroke="white" strokeWidth="0.5" />
           </svg>

           {/* Current Target Overlay */}
           <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md border border-white/20 p-4 rounded-xl z-20">
              <p className="text-[10px] text-[#39FF14] font-mono tracking-widest uppercase mb-1">{lang === 'EN' ? 'Active Target' : '當前目標'}</p>
              <h4 ref={cardTitleRef} className="text-white font-bold tracking-wider">
                <VariableProximity
                  label={activeProfile?.name || ""}
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={cardTitleRef}
                  radius={60}
                  falloff="linear"
                />
              </h4>
              <p className="text-xs text-white/50">{activeProfile?.coords.x}°N, {activeProfile?.coords.y}°E</p>
           </div>
           
           {/* Map Pins */}
           {PROFILES.map((p, i) => (
             <ProfileButton 
               key={i} 
               profile={p} 
               isActive={activeId === p.id} 
               onClick={() => setActiveId(p.id)} 
             />
           ))}
        </div>

        {/* Right Side: AI Insights Engine Dashboard */}
        <div className="w-full md:w-1/2 bg-[#111] p-6 lg:p-10 flex flex-col relative overflow-hidden">
           <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <div>
                <h4 className="text-white font-bold uppercase tracking-widest text-xs">AI Insights Engine</h4>
                <p className="text-[#39FF14] text-[10px] font-mono mt-1">Live Sync Active</p>
              </div>
              <div className="flex gap-1">
                 <div className="w-1.5 h-1.5 bg-[#39FF14] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                 <div className="w-1.5 h-1.5 bg-[#39FF14] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                 <div className="w-1.5 h-1.5 bg-[#39FF14] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
           </div>

           <div className="flex-1 relative">
             <AnimatePresence mode="wait">
                
                {/* 1. THE FOUNDRY */}
                {activeId === 'foundry' && (
                  <motion.div
                    key="foundry"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6"
                  >
                     <div className="bg-black border border-white/10 p-5 rounded-2xl shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                          <h5 className="text-xl font-bold text-white tracking-tight">The Foundry</h5>
                          <div className="bg-blue-600/20 text-blue-400 text-[10px] px-2 py-1 rounded font-bold">Premium Fitness Center</div>
                        </div>
                        <div className="flex gap-2 text-xs text-white/50 font-bold items-center mb-4">
                           <span className="text-yellow-500">★★★★★</span>
                           <span>4.9 (248)</span>
                           <span>•</span>
                           <span>Open 24/7</span>
                        </div>
                        <p className="text-sm text-white/80 border-l-2 border-[#39FF14] pl-3 py-1">
                          {lang === 'EN' ? '"Highest rated functional training facility in the metropolitan area."' : '"都會區評分最高的綜合訓練設施。"'}
                        </p>
                     </div>

                     <div className="space-y-2">
                        <p className="text-[10px] text-white/60 font-mono tracking-widest uppercase">High-Volume Local Keywords</p>
                        {[
                          { word: 'Crossfit gym near me', vol: 85 },
                          { word: 'Personal trainer downtown', vol: 62 },
                          { word: '24/7 fitness studio', vol: 45 }
                        ].map((kw, idx) => (
                           <div key={idx} className="flex items-center gap-3">
                              <span className="w-1/2 text-xs text-white truncate">{kw.word}</span>
                              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                 <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${kw.vol}%` }}
                                    transition={{ duration: 1, delay: 0.2 + (idx * 0.1) }}
                                    className="h-full bg-gradient-to-r from-blue-500 to-[#39FF14]"
                                 />
                              </div>
                           </div>
                        ))}
                     </div>

                     <div className="mt-auto bg-white/5 border border-white/10 p-4 rounded-xl relative overflow-hidden group">
                        <p className="text-[10px] text-white/60 font-mono tracking-widest uppercase mb-3">Interactive Peak Hours</p>
                        <div className="flex items-end h-16 gap-1 relative z-10">
                           {[2, 4, 3, 5, 8, 10, 7, 5, 4, 6, 9, 8].map((h, i) => (
                              <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h * 10}%` }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                className={`flex-1 rounded-t-sm ${i === 5 ? 'bg-[#39FF14]' : 'bg-white/20 group-hover:bg-white/40 transition-colors'}`}
                              />
                           ))}
                        </div>
                        <div className="absolute top-4 right-4 bg-black px-2 py-1 text-[10px] font-bold text-[#39FF14] rounded z-20 shadow-md">
                          Peak: 6:00 PM
                        </div>
                     </div>
                  </motion.div>
                )}

                {/* 2. MIRAI */}
                {activeId === 'mirai' && (
                  <motion.div
                    key="mirai"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6"
                  >
                     <div className="bg-[#1a1a1a] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&q=80')] mix-blend-overlay opacity-20 filter grayscale hover:grayscale-0 hover:opacity-40 transition-all duration-700" />
                        <div className="relative z-10 flex flex-col gap-3">
                           <h5 className="text-3xl font-black font-serif italic text-white">Mirai</h5>
                           <p className="text-xs tracking-[0.2em] uppercase text-rose-400">Fusion Bistro & Lounge</p>
                           
                           <motion.button 
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="mt-4 bg-rose-600 text-white font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-none border border-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.3)] hover:bg-rose-500 transition-colors w-max"
                           >
                              {lang === 'EN' ? 'Reserve a Table' : '預訂好位'}
                           </motion.button>
                        </div>
                     </div>

                     <div className="bg-black/50 border border-white/10 rounded-xl p-4 font-mono text-[10px] text-zinc-400 shadow-inner overflow-hidden">
                        <div className="text-indigo-400 mb-2">// Structured Menu Snippet Data</div>
                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                           <span className="text-pink-400">"@context"</span>: <span className="text-yellow-300">"https://schema.org"</span>,<br/>
                           <span className="text-pink-400">"@type"</span>: <span className="text-yellow-300">"Menu"</span>,<br/>
                           <span className="text-pink-400">"hasMenuItem"</span>: {'['}<br/>
                           &nbsp;&nbsp;{'{'}<br/>
                           &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">"@type"</span>: <span className="text-yellow-300">"MenuItem"</span>,<br/>
                           &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">"name"</span>: <span className="text-yellow-300">"Yuzu Miso Cod"</span>,<br/>
                           &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">"offers"</span>: {'{'} <span className="text-pink-400">"price"</span>: <span className="text-cyan-300">32.00</span> {'}'}<br/>
                           &nbsp;&nbsp;{'}'}<br/>
                           {']'}
                        </motion.div>
                     </div>

                     <div className="space-y-3">
                        <p className="text-[10px] text-white/60 font-mono tracking-widest uppercase">Optimized Local Image Alt-Text</p>
                        <div className="flex gap-2 flex-wrap">
                           <span className="bg-white/10 text-white/80 px-2 py-1 rounded text-[10px] border border-white/5 hover:border-rose-400 transition-colors cursor-default">"modern asian fusion restaurant interior downtown"</span>
                           <span className="bg-white/10 text-white/80 px-2 py-1 rounded text-[10px] border border-white/5 hover:border-rose-400 transition-colors cursor-default">"craft cocktails lounge happy hour near me"</span>
                        </div>
                     </div>
                  </motion.div>
                )}

                {/* 3. LANTERN */}
                {activeId === 'lantern' && (
                  <motion.div
                    key="lantern"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-5 h-full"
                  >
                     <div className="flex items-center justify-between">
                        <div>
                           <h5 className="text-2xl font-black text-white tracking-tight">LANTERN</h5>
                           <p className="text-xs text-amber-500 font-bold uppercase tracking-widest mt-1">Boutique Creative Workspace</p>
                        </div>
                        <div className="w-12 h-12 rounded-full border-2 border-amber-500/30 flex items-center justify-center relative bg-amber-500/10">
                           <div className="absolute inset-0 rounded-full border border-amber-500 animate-ping opacity-20" />
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </div>
                     </div>

                     <p className="text-[10px] text-white/60 font-mono tracking-widest uppercase mt-4">Geo-Fenced Review Signals</p>
                     
                     <div className="space-y-4">
                        <motion.div 
                          className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-lg relative overflow-hidden"
                          whileHover={{ scale: 1.02 }}
                        >
                           <div className="flex text-amber-500 text-xs mb-2">★★★★★</div>
                           <p className="text-sm text-zinc-300 italic">
                             "Perfect spot for deep work. The <span className="text-[#39FF14] font-bold bg-[#39FF14]/10 px-1 rounded animate-pulse">fast wi-fi</span> and <span className="text-cyan-400 font-bold bg-cyan-400/10 px-1 rounded">quiet ambience</span> really helped our team focus during the design sprint."
                           </p>
                        </motion.div>

                        <motion.div 
                          className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-lg"
                          whileHover={{ scale: 1.02 }}
                        >
                           <div className="flex text-amber-500 text-xs mb-2">★★★★☆</div>
                           <p className="text-sm text-zinc-300 italic">
                             "Great meeting rooms. Love the <span className="text-fuchsia-400 font-bold bg-fuchsia-400/10 px-1 rounded">ergonomic chairs</span> and the <span className="text-amber-400 font-bold bg-amber-400/10 px-1 rounded">artisan coffee</span> bar."
                           </p>
                        </motion.div>
                     </div>

                     <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                        <span className="text-white/50 font-mono">Entity Match Rate:</span>
                        <span className="text-[#39FF14] font-bold font-mono">94%</span>
                     </div>
                  </motion.div>
                )}

                {/* 4. CROSSROADS */}
                {activeId === 'crossroads' && (
                  <motion.div
                    key="crossroads"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full"
                  >
                     <div className="flex justify-between items-center mb-6">
                        <h5 className="text-xl font-black text-white">CROSSROADS</h5>
                        <div className="flex bg-black border border-white/20 p-1 rounded-lg">
                           <button 
                             onClick={() => setCrossroadsLang('EN')}
                             className={`px-3 py-1 text-[10px] font-bold rounded-md transition-colors ${crossroadsLang === 'EN' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
                           >
                             EN
                           </button>
                           <button 
                             onClick={() => setCrossroadsLang('ZH')}
                             className={`px-3 py-1 text-[10px] font-bold rounded-md transition-colors ${crossroadsLang === 'ZH' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
                           >
                             繁中
                           </button>
                        </div>
                     </div>

                     <div className="bg-white p-5 rounded-xl shadow-xl flex-1 text-black relative overflow-hidden">
                        
                        <div className="flex gap-4">
                           <div className="w-16 h-16 bg-blue-600 rounded-lg flex-shrink-0 flex items-center justify-center shadow-inner">
                              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                           </div>
                           <div className="flex-1">
                              <AnimatePresence mode="wait">
                                 <motion.div
                                    key={crossroadsLang}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 5 }}
                                    transition={{ duration: 0.2 }}
                                 >
                                    <h6 className="text-xl font-bold text-gray-900 leading-tight">
                                       {crossroadsLang === 'EN' ? 'Crossroads Logistics Corp.' : '十字路口跨國物流中心'}
                                    </h6>
                                    <p className="text-sm text-gray-600 mt-1">
                                       {crossroadsLang === 'EN' ? 'Bilingual Corporate Logistics' : '雙語企業級物流方案'}
                                    </p>
                                 </motion.div>
                              </AnimatePresence>
                           </div>
                        </div>

                        <div className="mt-6 space-y-4 border-t border-gray-100 pt-4">
                           <div className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-gray-400 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                              <div className="text-sm text-gray-700">
                                 <AnimatePresence mode="wait">
                                     <motion.span key={crossroadsLang} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        {crossroadsLang === 'EN' ? 'Building 4, Global Trade Park, Dist 9' : '貿易園區第四棟 9區'}
                                     </motion.span>
                                 </AnimatePresence>
                              </div>
                           </div>
                           <div className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-green-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                              <div className="text-sm">
                                 <span className="text-green-600 font-bold">{crossroadsLang === 'EN' ? 'Open' : '營業中'}</span>
                                 <span className="text-gray-500 ml-2">
                                    <AnimatePresence mode="wait">
                                       <motion.span key={crossroadsLang} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                         {crossroadsLang === 'EN' ? '⋅ Closes 10:00 PM' : '⋅ 晚上 10:00 休息'}
                                       </motion.span>
                                    </AnimatePresence>
                                 </span>
                              </div>
                           </div>
                        </div>
                        
                        {/* Simulation Overlay Badge */}
                        <div className="absolute bottom-4 right-4 bg-blue-100 text-blue-800 text-[9px] font-bold px-2 py-1 rounded uppercase tracking-widest shadow-sm">
                           {crossroadsLang === 'EN' ? 'Search Snippet Preview' : '搜尋結果預覽'}
                        </div>
                     </div>
                  </motion.div>
                )}
             </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
};
