import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';

interface Props {
  lang: Language;
}

export const ApexKinetics: React.FC<Props> = ({ lang }) => {
  return (
    <div className="w-full bg-[#050505] text-white font-sans relative overflow-x-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />
      
      {/* Background Graphic */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200" 
          alt="Athlete" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#050505] to-[#050505]" />
      </div>

      <div className="min-h-[600px] p-6 md:p-10 flex flex-col">
        <header className="flex justify-between items-center relative z-10 mb-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#E0FF00] flex items-center justify-center text-black font-black italic shadow-[0_0_15px_rgba(224,255,0,0.4)]">
              AK
            </div>
            <span className="font-bold tracking-widest uppercase text-sm">Apex Kinetics</span>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">{lang === 'ZH' ? '登入' : 'Log In'}</button>
            <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-zinc-900 border border-zinc-800 text-white hover:border-[#E0FF00] hover:text-[#E0FF00] transition-colors rounded">{lang === 'ZH' ? '開始試用' : 'Start Trial'}</button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10 flex-1">
          <div className="md:col-span-7 space-y-8 pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E0FF00]/10 border border-[#E0FF00]/20 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-[#E0FF00] animate-pulse" />
                <span className="text-[#E0FF00] text-[10px] font-bold tracking-widest uppercase">{lang === 'ZH' ? '專利生物辨識 V3.0' : 'Proprietary Biometrics V3.0'}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                {lang === 'ZH' ? '掌握你的' : 'Master Your'} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-600">{lang === 'ZH' ? '力學' : 'Mechanics.'}</span>
              </h1>
            </motion.div>

            <p className="text-zinc-400 max-w-md text-sm md:text-base font-medium leading-relaxed">
              {lang === 'ZH' ? '為菁英運動員提供先進的運動學分析和即時效能最佳化。以數據驅動的精準度突破生理極限。' : 'Advanced kinematic analysis and real-time performance optimization for elite athletes. Data-driven precision to break physical limits.'}
            </p>

            <div className="grid grid-cols-3 gap-4 border-t border-zinc-800 pt-8 mt-8">
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{lang === 'ZH' ? '延遲' : 'Latency'}</p>
                <p className="text-2xl font-black text-[#E0FF00]">{"<"}5ms</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{lang === 'ZH' ? '資料點' : 'Data Points'}</p>
                <p className="text-2xl font-black text-white">40k<span className="text-sm text-zinc-500">{lang === 'ZH' ? '/秒' : '/sec'}</span></p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{lang === 'ZH' ? '準確度' : 'Accuracy'}</p>
                <p className="text-2xl font-black text-white">99.8%</p>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-5 relative h-full flex flex-col justify-center"
          >
            <div className="absolute inset-0 bg-[#E0FF00] blur-[120px] opacity-10 rounded-full" />
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-4 overflow-hidden shadow-2xl h-[400px] flex flex-col">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-zinc-800">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{lang === 'ZH' ? '即時輸出' : 'Live Output'}</span>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="h-16 w-full bg-zinc-950 rounded flex items-end p-2 gap-1">
                  {[40, 70, 50, 90, 80, 60, 100, 75, 45, 85].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: "10%" }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
                      className="flex-1 bg-[#E0FF00] rounded-t-sm"
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-950 p-4 rounded text-center">
                    <div className="text-xs text-zinc-500 uppercase mb-1">{lang === 'ZH' ? '速度' : 'Velocity'}</div>
                    <div className="text-xl font-black">1.04<span className="text-xs text-zinc-600 ml-1">m/s</span></div>
                  </div>
                  <div className="bg-zinc-950 p-4 rounded text-center border border-[#E0FF00]/20">
                    <div className="text-xs text-[#E0FF00] uppercase mb-1">{lang === 'ZH' ? '功率輸出' : 'Power Output'}</div>
                    <div className="text-xl font-black text-[#E0FF00]">842<span className="text-xs text-[#E0FF00]/50 ml-1">W</span></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-24 px-8 md:px-20 relative z-10 border-t border-zinc-900 bg-black/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { t: lang === 'ZH' ? '神經整合' : 'Neural Integration', d: 'Direct synchronization with wearable arrays for sub-perceptual feedback.' },
            { t: lang === 'ZH' ? '動態負載' : 'Dynamic Loading', d: 'Predictive modeling of musculoskeletal stress during high-velocity movement.' },
            { t: lang === 'ZH' ? '恢復指標' : 'Recovery Metrics', d: 'Bespoke algorithms calculating optimal downtime for peak metabolic efficiency.' }
          ].map((feature, i) => (
            <div key={i} className="space-y-4">
              <div className="w-8 h-8 rounded border border-[#E0FF00]/40 flex items-center justify-center text-[#E0FF00] font-mono text-[10px]">
                0{i + 1}
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight">{feature.t}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{feature.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Full Width Metric Section */}
      <section className="py-32 px-8 overflow-hidden relative border-y border-zinc-900">
         <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E0FF00]/20 to-transparent" />
         <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">
              {lang === 'ZH' ? '比競爭對手快 18%' : '18% faster than the competition.'}
            </h2>
            <div className="w-full h-px bg-zinc-800 relative">
               <div className="absolute inset-y-0 left-0 bg-[#E0FF00] w-[18%] shadow-[0_0_15px_#E0FF00]" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-zinc-500">{lang === 'ZH' ? '效能基準測試' : 'Performance Benchmarking'}</p>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-6">
           <div className="text-2xl font-black italic text-[#E0FF00]">AK</div>
           <div className="h-8 w-px bg-zinc-800" />
           <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">© 2026 APEX KINETICS LABS</p>
        </div>
        <div className="flex gap-10 text-xs font-bold uppercase tracking-widest text-zinc-400">
           <span className="hover:text-white cursor-pointer transition-colors">Satellite</span>
           <span className="hover:text-white cursor-pointer transition-colors">Protocols</span>
           <span className="hover:text-white cursor-pointer transition-colors">Archive</span>
        </div>
        <div className="px-6 py-3 bg-zinc-900/50 border border-zinc-800 rounded text-[#E0FF00] text-[10px] font-bold tracking-[0.2em] uppercase">
          {lang === 'ZH' ? '系統已上線' : 'System Online'}
        </div>
      </footer>
    </div>
  );
};
