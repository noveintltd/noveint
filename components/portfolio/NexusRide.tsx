import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';

interface Props {
  lang: Language;
}

export const NexusRide: React.FC<Props> = ({ lang }) => {
  return (
    <div className="w-full h-full bg-[#0D0E15] text-white p-5 font-sans flex flex-col overflow-hidden relative">
      {/* Map pseudo background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0D0E15]/80 to-[#0D0E15] pointer-events-none" />
      
      {/* Header */}
      <div className="flex justify-between items-center z-10 pt-2 mb-8">
        <div>
          <h1 className="text-xl font-bold tracking-tight">{lang === 'ZH' ? 'NEXUS 電動車' : 'NEXUS EV'}</h1>
          <p className="text-xs text-blue-400 font-medium tracking-widest uppercase mt-1">{lang === 'ZH' ? '已連線' : 'Connected'}</p>
        </div>
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md shadow-lg">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20"></path>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
      </div>

      {/* Car Display */}
      <div className="flex-1 relative z-10 flex flex-col items-center justify-center -mt-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
        
        <motion.img 
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=600" 
          alt="EV Car" 
          className="w-[120%] h-auto object-cover rounded-xl shadow-2xl drop-shadow-2xl z-20"
          referrerPolicy="no-referrer"
          style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 85%, 0 100%)' }}
        />
        
        <div className="flex gap-10 mt-8">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-white">84<span className="text-sm text-blue-400 ml-0.5">%</span></span>
            <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-1">
              {lang === 'ZH' ? '電池' : 'Battery'}
            </span>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-white">312<span className="text-sm text-blue-400 ml-0.5">mi</span></span>
            <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-1">
              {lang === 'ZH' ? '續航里程' : 'Range'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="grid grid-cols-2 gap-4 z-10 relative mt-4">
        <button className="bg-white/5 border border-white/10 p-4 rounded-[2rem] backdrop-blur-md flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          <span className="text-xs font-bold">{lang === 'ZH' ? '車門解鎖' : 'Unlock'}</span>
        </button>
        <button className="bg-blue-600 text-white p-4 rounded-[2rem] shadow-[0_0_20px_rgba(37,99,235,0.4)] flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform border border-blue-500">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          <span className="text-xs font-bold">{lang === 'ZH' ? '啟動引擎' : 'Start Engine'}</span>
        </button>
      </div>
    </div>
  );
};
