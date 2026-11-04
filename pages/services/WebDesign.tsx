import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Language } from '../../App';
import { ImageSlider } from '../../components/ImageSlider';
import PricingSection from '../../components/PricingSection';
import ProjectStartSection from '../../components/ProjectStartSection';
import VariableProximity from '../../components/VariableProximity';

interface ServicePageProps {
  lang: Language;
}

const WebDesign: React.FC<ServicePageProps> = ({ lang }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <div className="pt-64 pb-20 px-6 md:px-12 min-h-screen bg-black relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 grid-bg" />
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
                  label="Web &"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={titleRef}
                  radius={150}
                  falloff="linear"
                />
                {" "}
                <VariableProximity
                  label="UI/UX Design"
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
                  label="網頁與"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={titleRef}
                  radius={150}
                  falloff="linear"
                />
                {" "}
                <VariableProximity
                  label="UI/UX 設計"
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
                  ? "We craft digital experiences that resonate across borders. Our specialty lies in creating bilingual interfaces that maintain aesthetic integrity in both Latin and Chinese typography."
                  : "我們打造跨越國界的數位體驗。我們專注於建立雙語介面，確保拉丁字母與中文字體在美學上保持一致。"}
              </p>
              <p>
                {lang === 'EN'
                  ? "From responsive websites to complex web applications, we prioritize user-centric design principles combined with high-performance engineering."
                  : "從響應式網站到複雜的網頁應用程式，我們優先考慮以使用者為中心的設計原則，並結合高效能工程。"}
              </p>
              
              <ul className="space-y-4 pt-8">
                {(lang === 'EN' 
                  ? ['Bilingual Typography', 'Responsive Architecture', 'Interactive Prototypes', 'Performance Optimization']
                  : ['雙語字體學', '響應式架構', '互動式原型', '效能優化']
                ).map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#39FF14]" />
                    <span className="text-sm font-bold tracking-widest uppercase">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative border border-[#39FF14]/20 p-8 bg-white/5 backdrop-blur-sm">
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#39FF14]" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#39FF14]" />
              
              <h3 className="text-[#39FF14] font-black uppercase tracking-widest mb-6">Technical Stack</h3>
              <div className="flex flex-wrap gap-4">
                {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Next.js'].map(tech => (
                  <span key={tech} className="px-4 py-2 border border-white/10 text-xs font-mono">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-24">
            <ImageSlider lang={lang} />
          </div>

          <PricingSection lang={lang} />
          <ProjectStartSection lang={lang} />
        </motion.div>
      </div>
    </div>
  );
};

export default WebDesign;
