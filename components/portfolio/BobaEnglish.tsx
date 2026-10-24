import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';

const cards = [
  { id: 1, en: 'Apple', zh: '蘋果', color: 'bg-red-400', img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=400' },
  { id: 2, en: 'Water', zh: '水', color: 'bg-blue-400', img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=400' },
  { id: 3, en: 'Sun', zh: '太陽', color: 'bg-yellow-400', img: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&q=80&w=400' },
];

interface Props {
  lang: Language;
}

export const BobaEnglish: React.FC<Props> = ({ lang }) => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  return (
    <div className="w-full bg-[#FFF5EB] text-[#4A4A4A] min-h-[600px] p-8 md:p-12 font-sans overflow-hidden relative">
      {/* Playful background blobs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-bounce" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse" />
      <div className="absolute bottom-20 left-1/3 w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <div className="text-center mb-16 mt-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-bold tracking-wide mb-6 shadow-sm border border-orange-200"
          >
            {lang === 'ZH' ? '開始學習 🚀' : 'Start Learning 🚀'}
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-[#2D3748] tracking-tight mb-4">
            Boba English <span className="text-orange-500">波霸英文</span>
          </h1>
          <p className="text-lg text-gray-600 font-medium max-w-md mx-auto">
            {lang === 'ZH' ? '為雙語大腦設計的輕量級、甜美學習模組。點擊卡片翻轉！' : 'Bite-sized, sweet learning modules for bilingual minds. Tap a card to flip!'}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              className="relative w-40 h-52 md:w-48 md:h-64 cursor-pointer [perspective:1000px]"
              onClick={() => setFlippedIndex(flippedIndex === idx ? null : idx)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-full h-full relative [transform-style:preserve-3d] transition-transform duration-500 shadow-xl rounded-3xl"
                animate={{ rotateY: flippedIndex === idx ? 180 : 0 }}
              >
                {/* Front (English) */}
                <div className={`absolute inset-0 [backface-visibility:hidden] flex flex-col items-center justify-center rounded-3xl border-4 border-white ${card.color} shadow-inner overflow-hidden`}>
                  <img src={card.img} alt={card.en} className="absolute inset-0 w-full h-full object-cover opacity-100" referrerPolicy="no-referrer" />
                  <span className="relative z-10 text-3xl md:text-4xl font-black text-white drop-shadow-md">{card.en}</span>
                </div>
                {/* Back (Chinese) */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center rounded-3xl border-4 border-white bg-white shadow-inner">
                  <span className="text-5xl md:text-6xl font-black text-gray-800">{card.zh}</span>
                  <div className={`absolute bottom-4 right-4 w-6 h-6 rounded-full ${card.color}`} />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 flex items-center gap-2 text-sm font-bold text-orange-400 bg-white px-6 py-3 rounded-2xl shadow-sm border border-orange-100">
          <span className="animate-bounce">↓</span> {lang === 'ZH' ? '查看進度表' : 'See progress dashboard'}
        </div>
      </div>
    </div>
  );
};
