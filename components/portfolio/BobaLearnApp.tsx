import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';

interface Props {
  lang: Language;
}

export const BobaLearnApp: React.FC<Props> = ({ lang }) => {
  return (
    <div className="w-full h-full bg-[#FFFBF0] text-[#333] p-5 font-sans flex flex-col overflow-hidden relative">
      {/* Header */}
      <div className="flex justify-between items-center z-10 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-400 text-white flex items-center justify-center font-bold text-lg">
            B
          </div>
          <span className="font-bold text-lg text-orange-950 tracking-tight">Boba Learn</span>
        </div>
        <div className="flex bg-white px-3 py-1.5 rounded-full shadow-sm items-center gap-1 border border-orange-100">
          <span className="text-orange-500 font-bold">🔥</span>
          <span className="font-bold text-sm">12</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-8 z-10">
        <h2 className="text-2xl font-black text-slate-800 mb-1">{lang === 'ZH' ? 'Unit 4: 食物' : 'Unit 4: Food'}</h2>
        <p className="text-sm font-medium text-slate-500 mb-4">{lang === 'ZH' ? '點餐與飲料' : 'Ordering meals & drinks'}</p>
        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-orange-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Flashcards */}
      <div className="flex-1 mt-8 relative z-10 flex flex-col gap-4">
        <motion.div 
          whileTap={{ scale: 0.95 }}
          className="flex-1 overflow-hidden bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] border-2 border-orange-100 flex flex-col items-center justify-center relative cursor-pointer"
        >
          <div className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center">
            <div className="w-3 h-3 bg-slate-200 rounded-full" />
          </div>
          <div className="text-6xl mb-4">🧋</div>
          <h3 className="text-3xl font-black text-slate-800">珍珠奶茶</h3>
          <p className="text-slate-400 font-medium mt-2">Boba Milk Tea</p>
        </motion.div>
        
        <div className="flex justify-between gap-4 h-16">
          <button className="flex-1 bg-red-100 text-red-600 font-bold rounded-2xl flex items-center justify-center border-b-4 border-red-200 hover:mt-1 hover:border-b-0 transition-all">
             {lang === 'ZH' ? '忘了' : 'Forgot'}
          </button>
          <button className="flex-1 bg-green-400 text-white font-bold rounded-2xl flex items-center justify-center border-b-4 border-green-500 hover:mt-1 hover:border-b-0 transition-all">
             {lang === 'ZH' ? '記得了' : 'Got it'}
          </button>
        </div>
      </div>

      {/* Shapes background */}
      <div className="absolute top-40 -left-10 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
      <div className="absolute bottom-20 -right-10 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
    </div>
  );
};
