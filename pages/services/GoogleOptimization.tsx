import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Language } from '../../App';
import { MapsOptimizationShowcase } from '../../components/MapsOptimizationShowcase';
import ProjectStartSection from '../../components/ProjectStartSection';
import ServicePricing from '../../components/ServicePricing';
import VariableProximity from '../../components/VariableProximity';

interface ServicePageProps {
  lang: Language;
}

const GoogleOptimization: React.FC<ServicePageProps> = ({ lang }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <div className="pt-64 pb-20 px-6 md:px-12 min-h-screen bg-black relative overflow-hidden">
      {/* Radar Animation Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-[#39FF14]/30 rounded-full"
            initial={{ width: 0, height: 0, opacity: 0.5 }}
            animate={{ 
              width: ['0vw', '100vw'],
              height: ['0vw', '100vw'],
              opacity: [0.5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              delay: i * 1.3,
              ease: "easeOut"
            }}
          />
        ))}
        <div className="w-2 h-2 bg-[#39FF14] rounded-full shadow-[0_0_20px_#39FF14]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
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
                  label="Google AI &"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={titleRef}
                  radius={150}
                  falloff="linear"
                />
                {" "}
                <VariableProximity
                  label="Maps Optimization"
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
                  label="Google AI 與"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={titleRef}
                  radius={150}
                  falloff="linear"
                />
                {" "}
                <VariableProximity
                  label="地圖優化"
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
                  ? "Transform how your brand appears across the Google ecosystem. We optimize your digital presence for AI search results and Google Maps, ensuring maximum visibility."
                  : "全面提升品牌在 Google 生態系統中的能見度。針對 AI 搜尋結果與 Google 地圖進行深度優化，確保最高信任度。"}
              </p>
              <p>
                {lang === 'EN'
                  ? "In the age of AI-driven discovery, being found is about more than just keywords—it's about authority and precision data."
                  : "在 AI 驅動的探索時代，被發現不僅僅是關鍵字的問題，更是關於權威性和精準數據。"}
              </p>
              
              <div className="pt-8 grid grid-cols-1 gap-4">
                {(lang === 'EN' ? [
                  'AI Search Visibility (SGE)',
                  'Google Maps Dominance',
                  'Knowledge Graph Management',
                  'Local Authority Building'
                ] : [
                  'AI 搜尋能見度 (SGE)',
                  'Google 地圖主導地位',
                  '知識圖譜管理',
                  '在地權威建立'
                ]).map(item => (
                  <div key={item} className="flex items-center gap-4 p-4 border border-white/5 bg-white/5 hover:bg-[#39FF14]/5 transition-colors">
                    <div className="w-1 h-1 bg-[#39FF14]" />
                    <span className="text-xs font-black tracking-widest uppercase">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative border border-white/10 overflow-hidden h-[350px] md:h-[500px] flex items-center justify-center">
              <div className="absolute inset-0 bg-[#050505]" />
              <div className="absolute inset-0 grid-bg opacity-30" />
              
              {/* Flat Grid and Pointer Stage */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                {/* The Flat Grid - Fills the box */}
                <div 
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    backgroundPosition: 'center center',
                  }}
                />

                {/* The Flat Pointer - Moving along grid lines strictly (no diagonal) */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                  animate={{ 
                    x: [-120, 40, 40, -80, -80, 120, 120, 0, 0, -120, -120],
                    y: [-40, -40, 80, 80, 0, 0, -120, -120, 40, 40, -40],
                  }}
                  transition={{ 
                    duration: 25, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  <motion.div 
                    className="w-16 h-16 md:w-20 md:h-20 border-2 border-[#39FF14] rounded-full flex items-center justify-center relative"
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(57, 255, 20, 0.2)",
                        "0 0 40px rgba(57, 255, 20, 0.4)",
                        "0 0 20px rgba(57, 255, 20, 0.2)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-[#39FF14] rounded-full shadow-[0_0_15px_#39FF14]" />
                    
                    {/* Scanning HUD lines around pointer */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-3 bg-[#39FF14]/60" />
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-px h-3 bg-[#39FF14]/60" />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 md:w-32 h-px bg-[#39FF14]/10" />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-24 md:h-32 bg-[#39FF14]/10" />
                  </motion.div>
                </motion.div>
              </div>
              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[#39FF14]/40">
                {lang === 'EN' ? (
                  <>SCANNING_ECOSYSTEM...<br/>VISIBILITY_MAXIMIZED</>
                ) : (
                  <>生態系統掃描中...<br/>能見度已最大化</>
                )}
              </div>
            </div>
          </div>
          
          <MapsOptimizationShowcase lang={lang} />
          <ServicePricing lang={lang} serviceType="google" />
          <ProjectStartSection lang={lang} />
        </motion.div>
      </div>
    </div>
  );
};

export default GoogleOptimization;
