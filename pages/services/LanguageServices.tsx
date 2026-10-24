import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Language } from '../../App';
import ProjectStartSection from '../../components/ProjectStartSection';
import ServicePricing from '../../components/ServicePricing';
import VariableProximity from '../../components/VariableProximity';

interface ServicePageProps {
  lang: Language;
}

const LanguageServices: React.FC<ServicePageProps> = ({ lang }) => {
  const [toggle, setToggle] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const promoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setToggle(prev => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-64 pb-20 px-6 md:px-12 min-h-screen bg-black relative overflow-hidden">
      {/* Typography Transition Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] blur-sm pointer-events-none select-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={toggle ? 'zh' : 'en'}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1.5 }}
            className="text-[30vw] md:text-[25vw] font-black"
          >
            {toggle ? '語言' : 'VOICE'}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-[#39FF14] text-xs font-bold tracking-widest uppercase mb-12 hover:gap-4 transition-all"
          >
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            {lang === 'EN' ? 'Back to Services' : '返回服務項目'}
          </Link>
          <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-16 uppercase">
            {lang === 'EN' ? (
              <>
                <VariableProximity
                  label="Language"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={titleRef}
                  radius={150}
                  falloff="linear"
                />
                {" "}
                <VariableProximity
                  label="Services"
                  className="text-[#39FF14]"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={titleRef}
                  radius={150}
                  falloff="linear"
                />
              </>
            ) : (
              <>
                <VariableProximity
                  label="語言"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={titleRef}
                  radius={150}
                  falloff="linear"
                />
                <VariableProximity
                  label="服務"
                  className="text-[#39FF14]"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={titleRef}
                  radius={150}
                  falloff="linear"
                />
              </>
            )}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                {lang === 'EN' 
                  ? "More than just translation. We provide nuanced Traditional Chinese localization, verbal interpretation, and cultural consulting for a seamless market entry."
                  : "不僅僅是翻譯。我們提供細膩的繁體中文在地化、口譯及文化顧問服務，助力品牌順利進軍市場。"}
              </p>
              <p>
                {lang === 'EN'
                  ? "Our experts bridge the gap between languages, ensuring your brand voice remains authentic and powerful in every context."
                  : "我們的專家彌合了語言之間的鴻溝，確保您的品牌聲音在任何情境下都保持真實且強大。"}
              </p>
              
              <div className="pt-8 space-y-4">
                {[
                  { en: 'Localization', zh: '在地化' },
                  { en: 'Copywriting', zh: '廣告文案' },
                  { en: 'Interpretation', zh: '現場口譯' },
                  { en: 'Cultural Consulting', zh: '文化顧問' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-sm font-mono text-gray-500 uppercase">{item.en}</span>
                    <span className="text-[#39FF14] font-bold">{item.zh}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div ref={promoRef} className="bg-white/5 p-6 md:p-10 border border-white/10 flex flex-col justify-center overflow-hidden">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black mb-8 leading-tight break-words">
                {lang === 'EN' ? (
                  <>
                    <VariableProximity
                      label="AUTHENTIC"
                      className="text-[#39FF14]"
                      fromFontVariationSettings="'wght' 400, 'opsz' 9"
                      toFontVariationSettings="'wght' 1000, 'opsz' 40"
                      containerRef={promoRef}
                      radius={100}
                      falloff="linear"
                    />
                    <br/>
                    <VariableProximity
                      label="COMMUNICATION"
                      fromFontVariationSettings="'wght' 400, 'opsz' 9"
                      toFontVariationSettings="'wght' 1000, 'opsz' 40"
                      containerRef={promoRef}
                      radius={100}
                      falloff="linear"
                    />
                  </>
                ) : (
                  <>
                    <VariableProximity
                      label="真實"
                      className="text-[#39FF14]"
                      fromFontVariationSettings="'wght' 400, 'opsz' 9"
                      toFontVariationSettings="'wght' 1000, 'opsz' 40"
                      containerRef={promoRef}
                      radius={100}
                      falloff="linear"
                    />
                    <br/>
                    <VariableProximity
                      label="溝通"
                      fromFontVariationSettings="'wght' 400, 'opsz' 9"
                      toFontVariationSettings="'wght' 1000, 'opsz' 40"
                      containerRef={promoRef}
                      radius={100}
                      falloff="linear"
                    />
                  </>
                )}
              </div>
              <div className="w-24 h-1 bg-[#39FF14]" />
            </div>
          </div>
          <ServicePricing lang={lang} serviceType="language" />
          <ProjectStartSection lang={lang} />
        </motion.div>
      </div>
    </div>
  );
};

export default LanguageServices;
