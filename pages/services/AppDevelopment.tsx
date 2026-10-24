import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Language } from '../../App';
import { AppPortfolioSlider } from '../../components/AppPortfolioSlider';
import ProjectStartSection from '../../components/ProjectStartSection';
import ServicePricing from '../../components/ServicePricing';
import VariableProximity from '../../components/VariableProximity';

interface ServicePageProps {
  lang: Language;
}

const AppDevelopment: React.FC<ServicePageProps> = ({ lang }) => {
  const [activeButtons, setActiveButtons] = useState<Set<number>>(new Set());
  const titleRef = useRef<HTMLHeadingElement>(null);

  const toggleButton = (id: number) => {
    const newActive = new Set(activeButtons);
    if (newActive.has(id)) {
      newActive.delete(id);
    } else {
      newActive.add(id);
    }
    setActiveButtons(newActive);
  };

  return (
    <div className="pt-64 pb-20 px-6 md:px-12 min-h-screen bg-black relative overflow-hidden">
      {/* Floating UI Elements Animation Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-[#39FF14] rounded-lg"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 150 + 80,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 5, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: Math.random() * 3 + 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
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

          <h1 ref={titleRef} className="text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-16 uppercase leading-[0.85]">
            {lang === 'EN' ? (
              <>
                <VariableProximity
                  label="CROSS-PLATFORM"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={titleRef}
                  radius={150}
                  falloff="linear"
                />
                <br />
                <VariableProximity
                  label="APP"
                  className="text-[#39FF14]"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={titleRef}
                  radius={150}
                  falloff="linear"
                />
                <br />
                <VariableProximity
                  label="DEVELOPMENT"
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
                  label="跨平台"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={titleRef}
                  radius={150}
                  falloff="linear"
                />
                <br />
                <VariableProximity
                  label="應用程式開發"
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-24">
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed content-start">
              <p>
                {lang === 'EN' 
                  ? "Scalable SaaS solutions and high-performance mobile applications for iOS and Android. We build the technical backbone that allows your business to scale globally with confidence."
                  : "具擴展性的 SaaS 解決方案以及適用於 iOS 和 Android 的高效能行動應用程式。我們打造技術骨幹，讓您的企業能充滿信心地在全球範圍內擴展。"}
              </p>
              <p>
                {lang === 'EN'
                  ? "From initial architecture to final deployment, we focus on performance, security, and a seamless user experience across all devices and platforms."
                  : "從最初的架構設計到最終的部署，我們專注於效能、安全性以及在所有裝置和平台上的無縫使用者體驗。"}
              </p>
            </div>
              
            <div className="grid grid-cols-1 gap-4 content-start">
              {[
                lang === 'EN' ? 'SaaS Architecture' : 'SaaS 架構設計',
                lang === 'EN' ? 'iOS & Android Native/Hybrid' : 'iOS 與 Android 原生/混合開發',
                lang === 'EN' ? 'Scalable Backend Systems' : '可擴展後端系統',
                lang === 'EN' ? 'API Integration & Security' : 'API 整合與安全性'
              ].map(item => (
                <div key={item} className="flex items-center gap-4 p-4 border border-white/5 bg-white/5 hover:bg-[#39FF14]/5 transition-colors">
                  <div className="w-1 h-1 bg-[#39FF14]" />
                  <span className="text-xs font-black tracking-widest uppercase">{item}</span>
                </div>
              ))}
            </div>
          </div>
            
          <div className="w-full flex items-center justify-center">
             <AppPortfolioSlider lang={lang} />
          </div>
          <ServicePricing lang={lang} serviceType="apps" />
          <ProjectStartSection lang={lang} />
        </motion.div>
      </div>
    </div>
  );
};

export default AppDevelopment;
