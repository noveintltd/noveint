import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../App';
import VariableProximity from './VariableProximity';

interface Props {
  lang: Language;
}

const KINETIC_AI = ({ lang }: { lang: Language }) => {
  const [logs, setLogs] = useState<string[]>(['> SYSTEM_INIT_OK', '> AWAITING_INPUT']);

  const addLog = () => {
    setLogs(prev => [...prev, `> EXECUTION_CYCLE_${Math.floor(Math.random() * 1000)}`, '> DATA_SYNC_COMPLETE']);
  };

  return (
    <div className="w-full h-full bg-black text-[#39ff14] font-mono border border-[#39ff14]/30 p-4 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#39ff14]/30 pb-2 mb-4 relative z-10">
        <h3 className="text-xs font-bold uppercase tracking-widest">KINETIC-AI // Web3</h3>
        <div className="flex gap-1 items-center">
          <div className="w-2 h-2 bg-[#39ff14] animate-pulse" />
          <span className="text-[9px] uppercase">Online</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto mb-4 flex flex-col gap-4 relative z-10 custom-scrollbar pr-2">
        <div className="self-end max-w-[80%] bg-[#39ff14]/10 border border-[#39ff14]/30 p-3 text-xs shadow-[0_0_10px_rgba(57,255,20,0.1)]">
          {lang === 'ZH' ? '目前的節點狀態是什麼？' : 'What is the current node status?'}
        </div>
        
        <div className="self-start max-w-[80%] bg-black border border-[#39ff14]/50 p-4 text-xs shadow-[0_0_15px_rgba(57,255,20,0.2)]">
          <div className="flex gap-2 items-center mb-2">
            <span className="text-[#39ff14]">●</span>
            <span className="opacity-80">
               {lang === 'ZH' ? '分析中...' : 'Analyzing...'}
            </span>
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              _
            </motion.div>
          </div>
          <p className="opacity-90 leading-relaxed text-[#39ff14]/80">
            {lang === 'ZH' ? '主網正常。已檢測到三個智能合約異常。建議立即掃描。' : 'Mainnet operational. 3 Smart contract anomalies detected. Immediate scan recommended.'}
          </p>
        </div>
      </div>

      {/* System Log Ticker */}
      <div className="h-20 border border-[#39ff14]/20 bg-black/50 p-2 overflow-y-auto custom-scrollbar flex flex-col gap-1 text-[9px] mb-4 relative z-10">
        {logs.map((log, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            key={i}
          >
            {log}
          </motion.div>
        ))}
      </div>

      {/* Quick Replies */}
      <div className="flex gap-2 relative z-10">
        <button 
          onClick={addLog}
          className="flex-1 px-3 py-2 border border-[#39ff14]/40 bg-[#39ff14]/5 hover:bg-[#39ff14]/20 text-[10px] uppercase font-bold transition-colors text-left"
        >
          {lang === 'ZH' ? '[ 初始化掃描 ]' : '[ Init Scan ]'}
        </button>
        <button 
          onClick={addLog}
          className="flex-1 px-3 py-2 border border-[#39ff14]/40 bg-[#39ff14]/5 hover:bg-[#39ff14]/20 text-[10px] uppercase font-bold transition-colors text-left"
        >
          {lang === 'ZH' ? '[ 查詢日誌 ]' : '[ Query Logs ]'}
        </button>
      </div>
    </div>
  );
};

const LYRA_VOICE = ({ lang }: { lang: Language }) => {
  return (
    <div className="w-full h-full bg-[#fcfbfa] text-[#4a3e3d] font-serif border border-[#eedfd6] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#fcfbfa] to-[#eedfd6]/30 pointer-events-none" />
      
      {/* Header */}
      <div className="flex justify-center items-center py-6 relative z-10">
        <h3 className="text-xl font-light tracking-[0.2em] italic">Lyra</h3>
      </div>

      {/* Center Voice Node */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="relative flex items-center justify-center w-32 h-32 mb-12">
           <motion.div 
             className="absolute inset-0 border border-[#d4bcae] rounded-full mix-blend-multiply"
             animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
             transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
           />
           <motion.div 
             className="absolute inset-2 border border-[#d4bcae] rounded-full mix-blend-multiply"
             animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
             transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
           />
           <div className="w-12 h-12 bg-gradient-to-tr from-[#d4bcae] to-[#eedfd6] rounded-full shadow-[0_0_20px_rgba(212,188,174,0.6)]" />
        </div>

        <motion.p 
          className="text-sm tracking-widest text-[#8a7672] font-sans font-light uppercase px-8 text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {lang === 'ZH' ? '「我能為您準備什麼？」' : '"What may I prepare for you?"'}
        </motion.p>
      </div>

      {/* Suggestions */}
      <div className="p-6 flex flex-col gap-3 relative z-10">
         <button className="w-full py-4 bg-white border border-[#eedfd6] rounded-full text-xs font-sans tracking-widest uppercase text-[#8a7672] hover:bg-[#faf5f2] transition-colors shadow-sm">
           {lang === 'ZH' ? '預訂水療' : 'Reserve Spa Time'}
         </button>
         <button className="w-full py-4 bg-white border border-[#eedfd6] rounded-full text-xs font-sans tracking-widest uppercase text-[#8a7672] hover:bg-[#faf5f2] transition-colors shadow-sm">
           {lang === 'ZH' ? '客房餐飲服務' : 'In-Room Dining'}
         </button>
      </div>
    </div>
  );
};

const ECOM_COMPANION = ({ lang }: { lang: Language }) => {
  return (
    <div className="w-full h-full bg-[#f4f6f8] text-[#111827] font-sans flex flex-col relative overflow-hidden">
       {/* Details Header */}
       <div className="bg-white px-5 pt-5 pb-4 shadow-sm border-b border-gray-100 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
             </div>
             <div>
               <h3 className="font-bold text-sm">Retail Assistant</h3>
               <p className="text-[10px] text-gray-500 font-medium">Normally replies instantly</p>
             </div>
          </div>
       </div>

       {/* Chat Body */}
       <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 relative z-10 custom-scrollbar">
          <div className="self-end bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-none text-sm max-w-[80%] shadow-md">
            {lang === 'ZH' ? '我正在尋找極簡風格的客廳家具。' : 'I am looking for minimalist living room furniture.'}
          </div>

          <div className="self-start max-w-[90%]">
             <div className="flex items-end gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                </div>
                <div className="bg-white text-gray-800 p-3 rounded-2xl rounded-tl-none text-sm shadow-sm border border-gray-100">
                  {lang === 'ZH' ? '沒問題！為您的空間找到了一些極簡的絕佳搭配：' : 'Absolutely! Found some great minimalist matches for your space:'}
                </div>
             </div>

             {/* Horizontal Carousel inside chat */}
             <div className="flex gap-3 overflow-x-auto pb-4 pt-2 -mx-2 px-2 custom-scrollbar ml-10">
                {[
                  { img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=300', name: 'Klippan Sofa', price: '$899' },
                  { img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=200', name: 'Norden Table', price: '$345' },
                  { img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=200', name: 'Arne Chair', price: '$220' }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    className="min-w-[140px] bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
                    whileHover={{ y: -4, shadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  >
                     <img src={item.img} alt={item.name} className="w-full h-24 object-cover" referrerPolicy="no-referrer" />
                     <div className="p-3">
                        <p className="font-bold text-xs">{item.name}</p>
                        <p className="text-xs text-indigo-600 font-bold mt-1">{item.price}</p>
                     </div>
                  </motion.div>
                ))}
             </div>
          </div>
       </div>

       {/* Voice Interaction Interface */}
       <div className="p-4 bg-white border-t border-gray-100 z-20">
          <div className="bg-indigo-50 border border-indigo-100 rounded-full p-2 px-4 flex items-center justify-between shadow-inner">
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                <span className="text-xs text-indigo-900 font-medium font-sans">
                  {lang === 'ZH' ? '語音聆聽中 (請說話)...' : 'Listening (Speak to search)...'}
                </span>
             </div>
             <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
             </div>
          </div>
       </div>
    </div>
  );
};

const BILINGUAL_HUB = ({ lang }: { lang: Language }) => {
  const [level, setLevel] = useState(0);

  const nextLevel = () => {
    if (level < 2) setLevel(l => l + 1);
  };

  const reset = () => setLevel(0);

  return (
    <div className="w-full h-full bg-[#1e293b] text-white font-sans flex flex-col relative overflow-hidden">
       {/* Header Corp */}
       <div className="bg-[#0f172a] p-4 flex justify-between items-center border-b border-[#334155] z-20">
         <div className="flex flex-col">
            <span className="font-bold text-sm tracking-widest uppercase text-slate-200">Global Hub</span>
            <span className="text-[10px] text-slate-400 font-mono">ID: X7-992A</span>
         </div>
         <div className="flex gap-2">
            <span className="px-2 py-0.5 bg-slate-700 rounded text-[10px] font-bold">EN</span>
            <span className="px-2 py-0.5 bg-blue-600 rounded text-[10px] font-bold">中文</span>
         </div>
       </div>

       {/* Conversation Flow */}
       <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6 relative z-10 custom-scrollbar">
          
          {/* Level 0 */}
          <div className="self-start w-[85%] bg-[#334155] rounded-xl p-4 shadow-lg border border-slate-600">
             <p className="text-sm mb-4 leading-relaxed font-medium">
                Welcome to Enterprise Support. How can we direct your request today?<br/><br/>
                <span className="text-blue-300">歡迎來到企業支援中心。今天我們能如何處理您的請求？</span>
             </p>
             <div className="flex flex-col gap-2">
                <button onClick={nextLevel} className="bg-slate-800 border border-slate-600 hover:bg-blue-600 transition-colors p-3 rounded-lg text-xs font-bold text-left flex justify-between group">
                   <span>Speak to Sales / 聯絡業務</span>
                   <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
                <button onClick={nextLevel} className="bg-slate-800 border border-slate-600 hover:bg-blue-600 transition-colors p-3 rounded-lg text-xs font-bold text-left flex justify-between group">
                   <span>Technical Support / 技術支援</span>
                   <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
             </div>
          </div>

          {/* Level 1 */}
          <AnimatePresence>
             {level >= 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="self-end w-[85%] bg-blue-600 rounded-xl p-4 shadow-lg"
                >
                   <p className="text-sm font-bold mb-1">Speak to Sales</p>
                   <p className="text-xs text-blue-200">聯絡業務</p>
                </motion.div>
             )}
          </AnimatePresence>

          {/* Level 2 */}
          <AnimatePresence>
             {level >= 2 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="self-start w-[85%] bg-[#334155] rounded-xl p-4 shadow-[0_10px_30px_rgba(37,99,235,0.2)] border border-blue-500/30"
                >
                   <p className="text-sm mb-4 leading-relaxed font-medium">
                      Routing you to the APAC Sales Division. Please select your region:<br/><br/>
                      <span className="text-blue-300">正在為您轉接至亞太區業務部門。請選擇您的地區：</span>
                   </p>
                   <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-800 border border-slate-600 hover:bg-blue-600 transition-colors p-2 rounded text-center text-xs font-bold cursor-pointer">Taiwan (台灣)</div>
                      <div className="bg-slate-800 border border-slate-600 hover:bg-blue-600 transition-colors p-2 rounded text-center text-xs font-bold cursor-pointer">Japan (日本)</div>
                      <div className="bg-slate-800 border border-slate-600 hover:bg-blue-600 transition-colors p-2 rounded text-center text-xs font-bold cursor-pointer">Singapore</div>
                      <div onClick={reset} className="bg-red-900/50 border border-red-500/50 hover:bg-red-600 transition-colors p-2 rounded text-center text-xs font-bold cursor-pointer text-red-200">Reset System</div>
                   </div>
                </motion.div>
             )}
          </AnimatePresence>
       </div>
    </div>
  );
};


const ArchetypeButton = ({ 
  arch, 
  isActive, 
  onClick
}: { 
  arch: { name: string; desc: string }; 
  isActive: boolean; 
  onClick: () => void;
  key?: React.Key;
}) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={containerRef}
      onClick={onClick}
      className={`text-left p-4 rounded-2xl transition-all duration-300 border ${
        isActive 
          ? 'bg-white/10 border-white/30 shadow-lg scale-[1.02]' 
          : 'bg-transparent border-transparent hover:bg-white/5 text-white/60'
      }`}
    >
      <h5 className={`font-black tracking-tight text-lg ${isActive ? 'text-white' : ''}`}>
        <VariableProximity
          label={arch.name}
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRef}
          radius={60}
          falloff="linear"
        />
      </h5>
      <p className="text-[10px] font-mono tracking-widest uppercase mt-1 opacity-70">{arch.desc}</p>
    </button>
  );
};

export const VoiceBotShowcase: React.FC<Props> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const archetypes = [
    { name: 'KINETIC-AI', desc: 'Web3 / Tech Support', bgMode: 'bg-black text-[#39ff14]/80' },
    { name: 'LYRA VOICE', desc: 'Luxury Hospitality', bgMode: 'bg-[#faf5f2] text-[#8a7672]' },
    { name: 'E-COM COMPANION', desc: 'Modern Retail Assistant', bgMode: 'bg-slate-100 text-slate-800' },
    { name: 'BILINGUAL HUB', desc: 'Global Enterprise Router', bgMode: 'bg-[#0f172a] text-slate-300' }
  ];

  return (
    <div id="portfolio" className="w-full mt-24 border-t border-white/10 pt-24 mb-16 px-4">
      <h3 ref={headingRef} className="text-[clamp(1.4rem,4.5vw,3.75rem)] font-black uppercase tracking-tighter leading-[1.05] mb-8 md:mb-12 text-right text-white break-words">
        {lang === 'EN' ? (
          <>
            <VariableProximity
              label="LIVE CHATBOT"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={headingRef}
              radius={100}
              falloff="linear"
            />
            <br className="block" />
            <VariableProximity
              label="SIMULATION MATRIX"
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
              label="即時聊天機器人"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={headingRef}
              radius={100}
              falloff="linear"
            />
            <br />
            {" "}
            <VariableProximity
              label="模擬矩陣"
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
      
      <div className="flex flex-col-reverse md:flex-row gap-0 bg-[#0a0a0a] border border-white/20 rounded-3xl overflow-hidden shadow-2xl max-w-6xl mx-auto min-h-[600px]">
        {/* Left Side Navigation */}
        <div className="w-full md:w-1/3 bg-[#111] p-6 border-t md:border-t-0 md:border-r border-white/10 flex flex-col">
           <h4 className="text-white font-bold uppercase tracking-widest mb-8 text-xs border-b border-white/10 pb-4">
             {lang === 'EN' ? 'Select Archetype' : '選擇原型'}
           </h4>
           
           <div className="flex flex-col gap-3">
              {archetypes.map((arch, idx) => (
                <ArchetypeButton
                  key={idx}
                  arch={arch}
                  isActive={activeTab === idx}
                  onClick={() => setActiveTab(idx)}
                />
              ))}
           </div>

           <div className="mt-auto pt-8 opacity-40">
              <div className="flex gap-1 mb-2 items-end h-[30px]">
                {[...Array(6)].map((_, i) => (
                   <motion.div 
                     key={i}
                     animate={{ height: [`${Math.random() * 8 + 4}px`, `${Math.random() * 20 + 10}px`, `${Math.random() * 8 + 4}px`] }}
                     transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                     className="w-1 bg-white rounded-full"
                   />
                ))}
              </div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-white">Simulation Engine</p>
           </div>
        </div>

        {/* Right Side Content Frame */}
        <div className="w-full md:w-2/3 bg-black flex items-center justify-center p-4 md:p-12 relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_white_0%,_black_70%)]" />
           
           {/* Mobile Device Mockup */}
           <div className="w-full max-w-[360px] h-[640px] rounded-[2.5rem] border-[8px] border-zinc-900 bg-black overflow-hidden relative shadow-2xl z-10 mx-auto">
              <AnimatePresence mode="wait">
                 <motion.div
                   key={activeTab}
                   initial={{ opacity: 0, y: 20, scale: 0.98 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: -20, scale: 0.98 }}
                   transition={{ duration: 0.4 }}
                   className="w-full h-full"
                 >
                    {activeTab === 0 && <KINETIC_AI lang={lang} />}
                    {activeTab === 1 && <LYRA_VOICE lang={lang} />}
                    {activeTab === 2 && <ECOM_COMPANION lang={lang} />}
                    {activeTab === 3 && <BILINGUAL_HUB lang={lang} />}
                 </motion.div>
              </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
};
