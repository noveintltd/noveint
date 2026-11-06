import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';

interface Props {
  lang: Language;
}

export const OrbitSocial: React.FC<Props> = ({ lang }) => {
  return (
    <div className="w-full h-full bg-[#050505] text-white p-0 font-sans flex flex-col overflow-hidden relative selection:bg-fuchsia-500/30">
      <div className="absolute top-[-20%] right-[-20%] w-[140%] h-[60vh] bg-gradient-to-br from-fuchsia-600/30 via-orange-500/20 to-transparent blur-3xl pointer-events-none" />

      {/* Nav */}
      <div className="pt-10 px-6 pb-4 flex justify-between items-center z-10 relative">
        <h1 className="text-2xl font-black tracking-tighter">orbit.</h1>
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border border-white/5 shadow-sm cursor-pointer">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto custom-scrollbar relative z-10 space-y-6">
        <div>
          <h2 className="text-3xl font-black mb-5 tracking-tight">
            {lang === 'ZH' ? '本週末' : 'This Weekend'}
          </h2>
          
          {/* Main Event Card */}
          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="w-full h-[280px] rounded-[2rem] overflow-hidden relative shadow-2xl group cursor-pointer border border-white/10"
          >
            <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800" alt="Event" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            
            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-xl px-3 py-1.5 rounded-2xl border border-white/20 flex flex-col items-center text-center shadow-lg">
              <span className="text-[10px] uppercase font-bold text-white/90 tracking-widest">OCT</span>
              <span className="text-xl font-black leading-none mt-0.5">24</span>
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs font-bold text-fuchsia-400 uppercase tracking-widest mb-1.5">
                {lang === 'ZH' ? '獨立藝術展' : 'Indie Art Show'}
              </p>
              <h3 className="text-2xl font-black mb-3">Neon Horizons</h3>
              <div className="flex justify-between items-center">
                 <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-zinc-800 border-2 border-black z-20 overflow-hidden"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="A" className="w-full h-full object-cover" referrerPolicy="no-referrer" /></div>
                    <div className="w-7 h-7 rounded-full bg-zinc-700 border-2 border-black z-10 overflow-hidden"><img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="A" className="w-full h-full object-cover" referrerPolicy="no-referrer" /></div>
                 </div>
                 <button className="bg-white text-black text-xs font-bold px-5 py-2.5 rounded-full hover:bg-fuchsia-500 hover:text-white transition-colors active:scale-95 shadow-lg">
                   {lang === 'ZH' ? '取得門票' : 'Get Tickets'}
                 </button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="pb-6">
          <h2 className="text-xs font-bold text-zinc-500 mb-4 tracking-widest uppercase">
            {lang === 'ZH' ? '為您推薦' : 'For You'}
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar -mx-6 px-6">
            <div className="min-w-[150px] h-[140px] rounded-2xl relative overflow-hidden bg-zinc-900 border border-white/10 group cursor-pointer flex-shrink-0">
               <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=300" alt="Music" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-500" referrerPolicy="no-referrer" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
               <div className="absolute bottom-4 left-4 text-sm font-bold leading-tight z-10">Midnight<br/>Sessions</div>
            </div>
            <div className="min-w-[150px] h-[140px] rounded-2xl relative overflow-hidden bg-zinc-900 border border-white/10 group cursor-pointer flex-shrink-0">
               <img src="https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=300" alt="Creative" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-500" referrerPolicy="no-referrer" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
               <div className="absolute bottom-4 left-4 text-sm font-bold leading-tight z-10">Creator<br/>Meetup</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
