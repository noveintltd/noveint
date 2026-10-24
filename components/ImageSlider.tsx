import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../App';
import { TalonStudio } from './portfolio/TalonStudio';
import { ChromaNails } from './portfolio/ChromaNails';
import { Kura } from './portfolio/Kura';
import { SolaceLiving } from './portfolio/SolaceLiving';
import { ApexKinetics } from './portfolio/ApexKinetics';
import { BoutiqueMarketplace } from './portfolio/BoutiqueMarketplace';
import { VelocitySportsApp } from './portfolio/VelocitySportsApp';
import { GuevoApparelApp } from './portfolio/GuevoApparelApp';

import { ZenithArchitecture } from './portfolio/ZenithArchitecture';
import { LussoResidences } from './portfolio/LussoResidences';

const portfolios = [
  { id: 'zenith', Component: ZenithArchitecture },
  { id: 'lusso', Component: LussoResidences },
  { id: 'talon', Component: TalonStudio },
  { id: 'chroma-nails', Component: ChromaNails },
  { id: 'kura', Component: Kura },
  { id: 'solace', Component: SolaceLiving },
  { id: 'apex', Component: ApexKinetics },
  { id: 'boutique', Component: BoutiqueMarketplace },
  { id: 'velocity', Component: VelocitySportsApp },
  { id: 'guevo', Component: GuevoApparelApp },
];

interface ImageSliderProps {
  lang: Language;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % portfolios.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + portfolios.length) % portfolios.length);
  };

  const ActiveComponent = portfolios[currentIndex].Component;

  return (
    <div id="portfolio" className="w-full max-w-5xl mx-auto flex flex-col items-center gap-6 mt-12 py-10 px-4">
      <div className="w-full">
        <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-12 text-right text-white">
          {lang === 'EN' ? (
            <>
              WEB & UI/UX <br className="block md:hidden" />
              <span className="text-[#39FF14]">PORTFOLIO</span>
            </>
          ) : (
            <>
              網頁與 UI/UX <br className="block md:hidden" />
              <span className="text-[#39FF14]">作品集</span>
            </>
          )}
        </h3>
      </div>
      <div className="relative w-full aspect-[4/5] md:aspect-[16/10] bg-[#0a0a0a] border border-[#39FF14]/20 rounded-xl overflow-hidden shadow-2xl shadow-[#39FF14]/10 group">
        {/* Browser Chrome */}
        <div className="absolute top-0 left-0 w-full h-10 bg-[#111] border-b border-[#39FF14]/10 flex items-center px-4 z-20">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#39FF14]/30"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
          </div>
          <div className="mx-auto px-6 py-1 bg-black/40 rounded-full border border-[#39FF14]/5 text-[9px] text-[#39FF14]/60 font-mono tracking-[0.2em] uppercase">
            nove.digital / portfolio
          </div>
        </div>

        {/* Content Area */}
        <div className="absolute inset-0 pt-10 bg-[#0a0a0a] overflow-hidden">
          <div className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                className="w-full h-full"
              >
                <ActiveComponent lang={lang} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Navigation Overlays (Desktop Hover) */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-[#39FF14]/20 border border-transparent hover:border-[#39FF14]/50 text-white rounded-full md:opacity-0 md:group-hover:opacity-100 transition-all z-30"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-[#39FF14]/20 border border-transparent hover:border-[#39FF14]/50 text-white rounded-full md:opacity-0 md:group-hover:opacity-100 transition-all z-30"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Manual Controls (Dots & Arrows below) */}
      <div className="flex items-center gap-6">
        <button 
          onClick={handlePrev}
          className="text-gray-500 hover:text-[#39FF14] transition-colors p-1"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-2">
          {portfolios.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#39FF14] w-6' 
                  : 'bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button 
          onClick={handleNext}
          className="text-gray-500 hover:text-[#39FF14] transition-colors p-1"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
