import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../../App';

interface Props {
  lang: Language;
}

export const LussoResidences: React.FC<Props> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: 'THE ESTATE', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200' },
    { title: 'AMENITIES', image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=1200' },
    { title: 'INTERIORS', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200' },
  ];

  return (
    <div className="w-full h-full bg-[#1A1A1A] text-[#F3EFEA] font-serif flex flex-col md:flex-row relative overflow-y-auto" style={{ minHeight: '100%' }}>
      
      {/* Visual Side */}
      <div className="w-full md:w-3/5 h-[50vh] md:h-full relative order-2 md:order-1 bg-[#111]">
        {tabs.map((tab, idx) => (
          <img
            key={idx}
            src={tab.image}
            alt={tab.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${activeTab === idx ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}
            referrerPolicy="no-referrer"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#1A1A1A] pointer-events-none z-20" />
      </div>

      {/* Content Side */}
      <div className="w-full md:w-2/5 h-1/2 md:h-full p-8 md:p-16 flex flex-col justify-center order-1 md:order-2 z-10 bg-[#1A1A1A]">
        <div className="mb-8">
          <h2 className="text-[10px] font-sans tracking-[0.3em] text-[#CDB083] mb-4 uppercase">
            {lang === 'ZH' ? '獨家呈現' : 'Exclusive Collection'}
          </h2>
          <h1 className="text-4xl md:text-5xl font-normal tracking-wide leading-tight mb-6">
            LUSSO<br/>RESIDENCES
          </h1>
          <p className="text-sm font-sans font-light text-gray-400 leading-relaxed max-w-sm">
            {lang === 'ZH' 
              ? '重新定義都市奢華生活。座落於城市之巔，俯瞰令人屏息的天際線。' 
              : 'Redefining urban luxury living. Perched at the crest of the city, overseeing breathtaking skyline views.'}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col gap-4 mt-8">
          {tabs.map((tab, idx) => (
            <motion.div 
              key={idx}
              className="flex items-center gap-4 cursor-pointer group"
              onClick={() => setActiveTab(idx)}
            >
              <div className="text-xs font-sans tracking-widest text-gray-500 w-4">
                0{idx + 1}
              </div>
              <motion.div 
                className="h-[1px] bg-[#CDB083]"
                initial={{ width: activeTab === idx ? 40 : 0 }}
                animate={{ width: activeTab === idx ? 40 : 0 }}
                transition={{ duration: 0.4 }}
              />
              <span className={`text-sm tracking-widest transition-colors duration-300 ${activeTab === idx ? 'text-[#F3EFEA]' : 'text-gray-500 group-hover:text-gray-300'}`}>
                {tab.title}
              </span>
            </motion.div>
          ))}
        </div>

        <button className="mt-16 w-max px-8 py-3 border border-[#CDB083] text-[#CDB083] text-xs font-sans tracking-widest hover:bg-[#CDB083] hover:text-[#1A1A1A] transition-colors duration-500">
          {lang === 'ZH' ? '預約私人參觀' : 'SCHEDULE VIEWING'}
        </button>
      </div>

    </div>
  );
};
