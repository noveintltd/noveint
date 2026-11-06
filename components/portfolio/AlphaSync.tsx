import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';
import { Cpu, Zap, Activity, Shield } from 'lucide-react';

interface Props {
  lang: Language;
}

export const AlphaSync: React.FC<Props> = ({ lang }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full bg-[#030303] text-[#F4F4F5] font-sans flex flex-col relative min-h-full"
         onMouseEnter={() => setIsHovered(true)} 
         onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col relative overflow-hidden">
        {/* Background Gradients */}
        <div className={`absolute -top-[10%] -left-[20%] w-[80%] h-[60%] bg-[#4F46E5] rounded-full blur-[100px] mix-blend-screen transition-opacity duration-1000 ${isHovered ? 'opacity-30' : 'opacity-15'}`} />
        <div className={`absolute bottom-[10%] -right-[10%] w-[60%] h-[50%] bg-[#06B6D4] rounded-full blur-[100px] mix-blend-screen transition-opacity duration-1000 ${isHovered ? 'opacity-20' : 'opacity-10'}`} />
        
        {/* Grid Pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYwIDBMMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI3ZmZmZmZiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-20 pointer-events-none" />

        {/* Header */}
        <header className="w-full flex justify-between items-center p-6 z-10">
          <div className="flex items-center gap-2">
            <motion.div 
              animate={{ rotate: isHovered ? 90 : 0 }} 
              className="w-6 h-6 border-t-2 border-r-2 border-[#06B6D4] relative"
            >
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#4F46E5]" />
            </motion.div>
            <span className="text-lg font-black tracking-tighter uppercase">ALPHA<span className="text-[#06B6D4]">SYNC</span></span>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="px-4 py-1.5 border border-white/10 rounded-full text-[10px] font-bold tracking-widest bg-white/5 backdrop-blur-md uppercase"
          >
            {lang === 'ZH' ? '存取系統' : 'ACCESS'}
          </motion.div>
        </header>

        {/* Hero Section */}
        <main className="px-6 py-12 z-10">
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#4F46E5]/10 border-l border-[#4F46E5] text-[#4F46E5] text-[9px] font-mono tracking-widest mb-6 uppercase"
            animate={{ x: isHovered ? 5 : 0 }}
          >
            <Activity className="w-3 h-3" />
            {lang === 'ZH' ? '神經網路已上線' : 'Neural Network Online'}
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-4 uppercase">
            <span className="text-white">COGNITIVE</span>
            <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#4F46E5]">
              SYNDICATE
            </span>
          </h1>
          
          <p className="text-sm text-gray-400 font-medium mb-10 leading-relaxed max-w-[280px]">
            {lang === 'ZH' 
              ? '部署基於神經網絡的自主系統，加速營運效能。' 
              : 'Deploying autonomous systems powered by neural architecture for hyper-scale operations.'}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-10">
            {[
              { label: 'SYNAPSE', icon: Cpu, color: '#4F46E5' },
              { label: 'CORTEX', icon: Zap, color: '#06B6D4' },
              { label: 'NEXUS', icon: Activity, color: '#8B5CF6' },
              { label: 'VECTOR', icon: Shield, color: '#10B981' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-md flex flex-col gap-3 group transition-all hover:border-white/10"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <item.icon className="w-4 h-4 text-white/70" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-widest text-[#06B6D4] block">{item.label}</span>
                  <div className="h-0.5 w-6 bg-white/10" />
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>

      {/* Stats Board */}
      <section className="bg-zinc-900/50 border-y border-white/5 p-6 space-y-4">
        <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 tracking-widest uppercase">
          <span>Operational Metrics</span>
          <span className="text-[#06B6D4]">Live Update</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Latency', val: '0.04ms' },
            { label: 'Throughput', val: '9.2Tb' },
            { label: 'Nodes', val: '12,482' }
          ].map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-[9px] font-bold text-gray-500 uppercase">{stat.label}</div>
              <div className="text-sm font-black text-white">{stat.val}</div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: isHovered ? '70%' : '30%' }}
                  className="h-full bg-[#06B6D4]"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Integration Preview */}
      <section className="p-6 pb-20">
        <h3 className="text-[10px] font-black text-gray-500 tracking-[0.3em] uppercase mb-6">Latest Deployments</h3>
        <div className="space-y-4">
          {[
            { title: 'Project Zenith', category: 'Infrastructure', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400' },
            { title: 'Quantum Void', category: 'Security', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400' }
          ].map((proj, i) => (
            <div key={i} className="group relative rounded-xl overflow-hidden aspect-[16/9]">
              <img 
                src={proj.img} 
                alt={proj.title} 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-[8px] font-mono text-[#06B6D4] uppercase">{proj.category}</span>
                <h4 className="text-sm font-bold text-white uppercase">{proj.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Bar Container spacing */}
      <div className="h-10" />

      {/* Footer Branding */}
      <footer className="mt-auto p-8 border-t border-white/5 text-center">
         <div className="text-lg font-black tracking-tighter uppercase mb-2">ALPHA<span className="text-[#06B6D4]">SYNC</span></div>
         <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Automation Protocol © 2026</p>
      </footer>
      
      {/* Scanner line effect */}
      <motion.div 
        animate={{ y: ['0%', '100%', '0%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#06B6D4]/40 to-transparent z-0 pointer-events-none"
      />
    </div>
  );
};
