import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../App';
import VariableProximity from './VariableProximity';
import { NoveHealth } from './portfolio/NoveHealth';
import { SonicVinyl } from './portfolio/SonicVinyl';
import { ApexCrypto } from './portfolio/ApexCrypto';
import { SolaceSmartHome } from './portfolio/SolaceSmartHome';
import { LuminaChat } from './portfolio/LuminaChat';
import { AeroTask } from './portfolio/AeroTask';
import { NexusRide } from './portfolio/NexusRide';
import { VerdantPlantCare } from './portfolio/VerdantPlantCare';
import { OrbitSocial } from './portfolio/OrbitSocial';
import { ZenithWalletApp } from './portfolio/ZenithWalletApp';
import { AlphaSync } from './portfolio/AlphaSync';
import { BobaEnglish } from './portfolio/BobaEnglish';

const appPortfolios = [
  { id: 'health', Component: NoveHealth },
  { id: 'vinyl', Component: SonicVinyl },
  { id: 'crypto', Component: ApexCrypto },
  { id: 'solace', Component: SolaceSmartHome },
  { id: 'lumina', Component: LuminaChat },
  { id: 'aero', Component: AeroTask },
  { id: 'nexus', Component: NexusRide },
  { id: 'verdant', Component: VerdantPlantCare },
  { id: 'orbit', Component: OrbitSocial },
  { id: 'zenithw', Component: ZenithWalletApp },
  { id: 'alpha', Component: AlphaSync },
  { id: 'boba-web', Component: BobaEnglish },
];

interface AppPortfolioSliderProps {
  lang: Language;
}

export const AppPortfolioSlider: React.FC<AppPortfolioSliderProps> = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % appPortfolios.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + appPortfolios.length) % appPortfolios.length);
  };

  const ActiveComponent = appPortfolios[currentIndex].Component;

  return (
    <div id="portfolio" className="w-full mx-auto flex flex-col items-center gap-8 mt-12 py-10 px-4">
      <div className="w-full">
        <h3 ref={headingRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-12 text-right text-white">
          {lang === 'EN' ? (
            <>
              <VariableProximity
                label="APP DEVELOPMENT"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={headingRef}
                radius={100}
                falloff="linear"
              />
              <br className="block md:hidden" />
              {" "}
              <VariableProximity
                label="PORTFOLIO"
                className="text-[#39FF14]"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={headingRef}
                radius={100}
                falloff="linear"
              />
            </>
          ) : (
            <>
              <VariableProximity
                label="應用程式開發"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={headingRef}
                radius={100}
                falloff="linear"
              />
              <br className="block md:hidden" />
              {" "}
              <VariableProximity
                label="作品集"
                className="text-[#39FF14]"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={headingRef}
                radius={100}
                falloff="linear"
              />
            </>
          )}
        </h3>
      </div>
      <div className="relative mx-auto flex items-center justify-center">
        
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute -left-12 md:-left-20 z-30 p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-[#39FF14]/50 transition-all backdrop-blur-sm hidden md:flex"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Mobile Device Frame */}
        <div className="relative w-[320px] sm:w-[350px] aspect-[9/19.5] bg-black border-[8px] border-zinc-900 rounded-[3rem] shadow-2xl flex items-center justify-center relative overflow-hidden group shadow-[#39FF14]/5">
          {/* Hardware Details - Power/Volume Buttons */}
          <div className="absolute top-24 -right-[12px] w-[4px] h-16 bg-zinc-800 rounded-l-md" />
          <div className="absolute top-32 -left-[12px] w-[4px] h-10 bg-zinc-800 rounded-r-md" />
          <div className="absolute top-48 -left-[12px] w-[4px] h-10 bg-zinc-800 rounded-r-md" />

          {/* Removed Dynamic Island / Notch */}

          {/* Screen Content */}
          <div className="w-full h-full bg-[#050505] overflow-hidden rounded-[2.5rem] relative custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <ActiveComponent lang={lang} />
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Home indicator */}
          <div className="absolute bottom-2 w-full flex justify-center z-50 pointer-events-none">
            <div className="w-1/3 h-1 bg-white/20 rounded-full" />
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute -right-12 md:-right-20 z-30 p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-[#39FF14]/50 transition-all backdrop-blur-sm hidden md:flex"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Controls (Mobile & Dots) */}
      <div className="flex items-center gap-6 z-20">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white transition-colors backdrop-blur-sm md:hidden"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {appPortfolios.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-6 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white transition-colors backdrop-blur-sm md:hidden"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
