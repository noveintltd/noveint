import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';

interface Props {
  lang: Language;
}

export const SonicVinyl: React.FC<Props> = ({ lang }) => {
  return (
    <div className="w-full h-full bg-[#E5E5E5] text-[#111] p-6 font-mono flex flex-col justify-between overflow-hidden shadow-inner">
      <div className="flex justify-between items-center text-xs border-b-2 border-[#111] pb-2">
        <span className="font-bold tracking-widest uppercase">Sonic_OS</span>
        <span className="bg-[#111] text-[#E5E5E5] px-1 font-bold">12:00 PM</span>
        <span className="font-bold tracking-widest uppercase">Stereo</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center -mt-8">
        <motion.div 
          className="relative w-56 h-56 rounded-full bg-black shadow-2xl flex items-center justify-center p-1 border border-zinc-700"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          {/* Vinyl Grooves */}
          <div className="absolute inset-2 rounded-full border border-zinc-800" />
          <div className="absolute inset-4 rounded-full border border-zinc-800" />
          <div className="absolute inset-6 rounded-full border border-zinc-800" />
          <div className="absolute inset-8 rounded-full border border-zinc-800" />
          <div className="absolute inset-10 rounded-full border border-zinc-800" />
          <div className="absolute inset-12 rounded-full border border-zinc-800" />
          
          {/* Center Label */}
          <div className="w-20 h-20 rounded-full bg-yellow-400 border-4 border-black flex items-center justify-center relative shadow-inner overflow-hidden">
            <div className="w-3 h-3 bg-[#E5E5E5] rounded-full z-10 border border-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]" />
            <div className="absolute inset-0 bg-yellow-500 opacity-30 transform rotate-45" />
            <div className="absolute bottom-1 right-1 text-[6px] font-black leading-none">SIDE<br/>A</div>
          </div>

          {/* Glare effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none mix-blend-overlay overlay" />
        </motion.div>

        <div className="w-full mt-12 text-center space-y-1">
          <div className="text-[10px] font-black uppercase tracking-widest bg-yellow-400 inline-block px-1 mb-2 border border-black">{lang === 'ZH' ? '現正播放' : 'Now Playing'}</div>
          <h2 className="text-2xl font-black uppercase tracking-tighter mix-blend-difference text-white line-clamp-1 bg-black p-1">Analog Dreams</h2>
          <p className="text-sm font-bold text-zinc-600 uppercase tracking-widest">Synthwave Collective</p>
        </div>
      </div>

      <div className="border-t-2 border-[#111] pt-4 mb-4">
        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold">01:42</span>
          <div className="flex-1 h-2 bg-zinc-300 border border-[#111]">
            <motion.div 
              className="h-full bg-[#111]"
              initial={{ width: 0 }}
              animate={{ width: '40%' }}
              transition={{ duration: 1.5 }}
            />
          </div>
          <span className="text-xs font-bold">04:20</span>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center px-4">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors border border-transparent hover:border-black">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
              <polygon points="19 20 9 12 19 4 19 20" fill="currentColor"></polygon>
              <line x1="5" y1="19" x2="5" y2="5"></line>
            </svg>
          </button>
          <button className="w-14 h-14 bg-black text-white flex items-center justify-center rounded-full hover:scale-105 transition-transform shadow-lg border-2 border-black hover:bg-yellow-400 hover:text-black">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
               <rect x="6" y="4" width="4" height="16" fill="currentColor"></rect>
               <rect x="14" y="4" width="4" height="16" fill="currentColor"></rect>
             </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors border border-transparent hover:border-black">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
              <polygon points="5 4 15 12 5 20 5 4" fill="currentColor"></polygon>
              <line x1="19" y1="5" x2="19" y2="19"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
