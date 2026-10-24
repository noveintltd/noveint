import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';

interface Props {
  lang: Language;
}

export const AeroTask: React.FC<Props> = ({ lang }) => {
  return (
    <div className="w-full h-full bg-[#f4f5f7] text-[#1a1a1a] p-5 font-sans flex flex-col overflow-y-auto relative custom-scrollbar">
      {/* Header */}
      <div className="flex justify-between items-center z-10 pt-2 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{lang === 'ZH' ? '我的待辦' : 'My Tasks'}</h1>
          <p className="text-sm text-gray-500 font-medium">{lang === 'ZH' ? '12 任務 · 3 進行中' : '12 tasks · 3 in progress'}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shadow-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      </div>

      {/* Date Strip */}
      <div className="flex gap-3 overflow-hidden pb-4 mb-2 -mx-2 px-2 z-10 relative">
        {[
          { text: 'Mon', num: '12', active: false },
          { text: 'Tue', num: '13', active: true },
          { text: 'Wed', num: '14', active: false },
          { text: 'Thu', num: '15', active: false },
        ].map((day, i) => (
          <div key={i} className={`flex flex-col items-center justify-center w-14 h-16 rounded-2xl border ${day.active ? 'bg-black text-white border-black shadow-md' : 'bg-white text-gray-400 border-gray-100'}`}>
            <span className="text-[10px] font-bold uppercase tracking-wider">{day.text}</span>
            <span className={`text-lg font-black ${day.active ? 'text-white' : 'text-gray-800'}`}>{day.num}</span>
          </div>
        ))}
      </div>

      {/* Task List */}
      <div className="flex-1 flex flex-col gap-3 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4"
        >
          <div className="w-6 h-6 rounded-full border-2 border-orange-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 mb-1 leading-tight">{lang === 'ZH' ? '完成品牌規範設計' : 'Finalize brand guidelines'}</h3>
            <p className="text-xs text-gray-500 font-medium">10:00 AM - 12:30 PM</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black text-white p-4 rounded-2xl shadow-lg relative overflow-hidden flex items-start gap-4"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-[20px] -mr-8 -mt-8" />
          <div className="w-6 h-6 rounded-full bg-white/20 border border-white/40 flex-shrink-0 mt-0.5" />
          <div className="flex-1 relative z-10">
            <div className="flex justify-between items-start">
              <h3 className="font-bold mb-1 leading-tight">{lang === 'ZH' ? '團隊會議與衝刺計劃' : 'Team sync & sprint planning'}</h3>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-bold tracking-wider text-white">HIGH PRIORITY</span>
            </div>
            <p className="text-xs text-gray-300 font-medium">1:00 PM - 2:00 PM</p>
            
            {/* Avatars */}
            <div className="flex -space-x-2 mt-4">
              <div className="w-7 h-7 rounded-full border-2 border-black bg-gray-300">
                 <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="A" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="w-7 h-7 rounded-full border-2 border-black bg-gray-400">
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" alt="B" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="w-7 h-7 rounded-full border-2 border-black bg-white text-black flex flex-col items-center justify-center text-[10px] font-bold">+2</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 opacity-60"
        >
          <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-400 mb-1 leading-tight line-through">{lang === 'ZH' ? '回覆收件夾電子郵件' : 'Reply to inbox emails'}</h3>
            <p className="text-xs text-gray-400 font-medium">9:00 AM</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
