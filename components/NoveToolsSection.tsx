import React, { useRef } from 'react';
import { Language } from '../App';
import VariableProximity from './VariableProximity';

interface NoveToolsSectionProps {
  lang: Language;
}

const NoveToolsSection: React.FC<NoveToolsSectionProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  return (
    <div ref={containerRef} className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
      <div className="w-full lg:w-1/2 relative flex justify-center items-center order-2 lg:order-1">
        {/* Radar/Pulse Animation */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#39FF14]/30 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-4 rounded-full border border-[#39FF14]/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
          <div className="absolute inset-8 rounded-full border border-[#39FF14]/10 animate-ping" style={{ animationDuration: '3s', animationDelay: '2s' }} />
          
          {/* Radar Sweep */}
          <div className="absolute inset-0 rounded-full border border-[#39FF14]/50 overflow-hidden">
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-[#39FF14]/30 origin-right animate-[spin_4s_linear_infinite]" />
          </div>

          <div className="relative z-10 text-center">
            <div className="text-3xl md:text-4xl font-black text-[#39FF14] drop-shadow-[0_0_15px_rgba(57,255,20,0.8)]">
              NoveTools
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 text-center lg:text-left order-1 lg:order-2">
        <div className="inline-block border border-[#39FF14] px-4 py-1 mb-6 text-[#39FF14] text-xs font-bold tracking-[0.3em] uppercase">
          {lang === 'EN' ? 'Featured Product' : '精選產品'}
        </div>
        <h2 ref={headingRef} className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter uppercase">
          {lang === 'EN' ? (
            <>
              <VariableProximity
                label="AI INNOVATION"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={headingRef}
                radius={100}
                falloff="linear"
              />
              {" "}
              <VariableProximity
                label="LAB"
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
                label="AI 創新"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={headingRef}
                radius={100}
                falloff="linear"
              />
              {" "}
              <VariableProximity
                label="實驗室"
                className="text-[#39FF14]"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={headingRef}
                radius={100}
                falloff="linear"
              />
            </>
          )}
        </h2>
        <div className="space-y-6 text-gray-400 text-lg leading-relaxed mb-10">
          <p>
            {lang === 'EN' 
              ? "Explore our proprietary suite of AI-driven utilities designed for the global creator. From audio-first interfaces to advanced digital workflows, NoveTools is where we build the future of international connectivity."
              : "探索我們專為全球創作者設計的專屬 AI 驅動工具套件。從音訊優先的介面到進階數位工作流程，NoveTools 是我們建構國際連結未來的地方。"}
          </p>
        </div>
        <a 
          href="https://novetools.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="neon-button inline-block px-12 py-5 text-sm font-black tracking-[0.3em] uppercase rounded-none"
        >
          {lang === 'EN' ? 'Launch NoveTools' : '啟動 NoveTools'}
        </a>
      </div>
    </div>
  );
};

export default NoveToolsSection;
