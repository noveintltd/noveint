import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Language } from '../App';
import VariableProximity from './VariableProximity';

interface TaiwanBridgeProps {
  lang: Language;
}

const TaiwanBridge: React.FC<TaiwanBridgeProps> = ({ lang }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 100 });

  // Parallax layers for text and visual
  const textColY = useTransform(smoothProgress, [0, 1], ['40px', '-40px']);
  const visualColY = useTransform(smoothProgress, [0, 1], ['-40px', '40px']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: x * 20, y: y * -20 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div ref={sectionRef} className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      {/* Left Column with Parallax Lift */}
      <motion.div 
        style={{ y: textColY }}
        className="w-full lg:w-1/2 will-change-transform"
      >
        <div className="inline-block border border-[#39FF14] px-4 py-1 mb-6 text-[#39FF14] text-xs font-bold tracking-[0.3em] uppercase">
          {lang === 'EN' ? 'Feature Focus' : '重點推介'}
        </div>
        <h2 ref={headingRef} className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter uppercase min-h-[1.2em]">
          {lang === 'EN' ? (
            <>
              <VariableProximity
                label="THE"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={headingRef}
                radius={100}
                falloff="linear"
              />
              {" "}
              <VariableProximity
                label="DIGITAL ARCHITECT"
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
                label="數位架構師"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={headingRef}
                radius={100}
                falloff="linear"
              />
              {" "}
              <VariableProximity
                label="(The Digital Architect)"
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
        <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
          {lang === 'EN' ? (
            <>
              <p>
                Scaling a brand across international borders requires more than just a translator; it requires a digital architect.
              </p>
              <p>
                We specialize in future-proofing digital footprints for global enterprises—from high-growth tech startups to the international hospitality and tourism sectors. Whether you are a hotel engaging global travelers or a brand integrating AI voice implementation, we eliminate the friction of entry. We don't just translate; we optimize visual hierarchies for multilingual interfaces and utilize AI-driven technology to ensure your message is resonant, accessible, and promoted worldwide.
              </p>
            </>
          ) : (
            <>
              <p>
                要在國際市場擴展品牌，您需要的不僅僅是翻譯，而是一位<strong>『數位架構師』</strong>。
              </p>
              <p>
                我們專注於為全球企業打造具備前瞻性的數位佈局——從高成長科技新創到國際餐旅觀光產業。無論是需要吸引全球旅客的飯店，或是尋求 AI 語音導入 的品牌，我們都能為您消除市場進入的隔閡。我們不只是翻譯，更透過優化多語系介面的視覺層次，並利用 AI 驅動技術，確保您的品牌訊息在全球範圍內都能獲得共鳴、精準傳達並廣泛推廣。
              </p>
            </>
          )}
          <ul className="space-y-3 pb-8 lg:pb-0">
            {(lang === 'EN' 
              ? ["Global Market Connectivity", "Cross-Cultural Brand DNA", "Multilingual Interface Specialists"]
              : ["全球市場鏈結", "跨文化品牌基因", "多語系介面專家"]
            ).map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-[#39FF14] rounded-full shadow-[0_0_8px_#39FF14]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Right Column with Counter-Parallax and 3D Interactive Hover */}
      <motion.div 
        style={{ y: visualColY }}
        className="w-full lg:w-1/2 relative flex justify-center items-center will-change-transform"
      >
        {/* Mobile sizing: max-w-[320px], Desktop sizing: full width up to 1/2 container */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="aspect-square w-full max-w-[300px] md:max-w-[400px] lg:max-w-none relative group cursor-crosshair transition-transform duration-200 ease-out flex items-center justify-center p-8 md:p-12"
          style={{ 
            transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          }}
        >
          {/* Main Symbol Image */}
          <img 
            src="/assets/images/noveint_logo.webp" 
            alt={lang === 'EN' ? 'Nove International Symbol' : '英商了解文化標誌'} 
            className="w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 object-contain relative z-10 transition-all duration-700 group-hover:scale-110 select-none pointer-events-none"
          />

          <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-[#39FF14] transition-all duration-500 group-hover:scale-110" />
          <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-[#39FF14] transition-all duration-500 group-hover:scale-110" />
          <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-[#39FF14] transition-all duration-500 group-hover:scale-110" />
          <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-[#39FF14] transition-all duration-500 group-hover:scale-110" />
        </div>
      </motion.div>
    </div>
  );
};

export default TaiwanBridge;