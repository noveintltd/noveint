import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Language } from '../../App';
import { AdAssetsShowcase } from '../../components/AdAssetsShowcase';
import AdAssetsPricing from '../../components/AdAssetsPricing';
import ProjectStartSection from '../../components/ProjectStartSection';
import VariableProximity from '../../components/VariableProximity';

interface ServicePageProps {
  lang: Language;
}

const CreativeAssets: React.FC<ServicePageProps> = ({ lang }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <div className="pt-64 pb-20 px-6 md:px-12 min-h-screen bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
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
                  label="Creative"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={titleRef}
                  radius={150}
                  falloff="linear"
                />
                {" "}
                <VariableProximity
                  label="Ad Assets"
                  className="text-[#39FF14]"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={titleRef}
                  radius={150}
                  falloff="linear"
                />
              </>
            ) : (
              <VariableProximity
                label="廣告創意素材"
                className="text-[#39FF14]"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={titleRef}
                radius={150}
                falloff="linear"
              />
            )}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                {lang === 'EN' 
                  ? "Visual storytelling for the global market. We create high-impact graphic design, motion assets, and brand identities that bridge Western flair with Eastern nuances."
                  : "為全球市場打造視覺故事。我們建立具備西方創意與東方內涵的高質感平面設計、動態素材與品牌識別。"}
              </p>
              <p>
                {lang === 'EN'
                  ? "Our creative team ensures your message is not just seen, but felt, across all digital and physical touchpoints."
                  : "我們的創意團隊確保您的訊息不僅被看見，而且能在所有數位和實體接觸點被感受到。"}
              </p>
              
              <div className="pt-8 grid grid-cols-2 gap-4">
                {(lang === 'EN'
                  ? ['Motion Graphics', 'Brand Identity', 'Social Content', 'OOH Design']
                  : ['動態圖像', '品牌識別', '社群內容', '戶外廣告設計']
                ).map(item => (
                  <div key={item} className="p-4 border border-white/5 bg-white/5">
                    <span className="text-xs font-black tracking-widest uppercase text-[#39FF14]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative group flex items-center justify-center">
              <img 
                src="/assets/images/noveint_logo.webp" 
                alt={lang === 'EN' ? 'Creative Ad Assets Emblem' : '廣告創意資產標誌'}
                className="w-full max-w-[400px] h-auto object-contain transition-all duration-700 relative z-10 select-none pointer-events-none"
              />
            </div>
          </div>
          
          <AdAssetsShowcase lang={lang} />
          <AdAssetsPricing lang={lang} />
          <ProjectStartSection lang={lang} />
        </motion.div>
      </div>
    </div>
  );
};

export default CreativeAssets;
