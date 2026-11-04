import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Language } from '../../App';
import { VoiceBotShowcase } from '../../components/VoiceBotShowcase';
import ProjectStartSection from '../../components/ProjectStartSection';
import ServicePricing from '../../components/ServicePricing';
import VariableProximity from '../../components/VariableProximity';

interface ServicePageProps {
  lang: Language;
}

const AIVoice: React.FC<ServicePageProps> = ({ lang }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <div className="pt-64 pb-20 px-6 md:px-12 min-h-screen bg-black relative overflow-hidden">
      {/* Voice Wave Animation Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="flex items-center gap-2 h-64">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 bg-[#39FF14] rounded-full"
              animate={{ 
                height: [
                  `${Math.random() * 40 + 20}%`, 
                  `${Math.random() * 80 + 20}%`, 
                  `${Math.random() * 40 + 20}%`
                ]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            {lang === 'EN' ? 'Back to Services' : '返回服務項目'}
          </Link>

          <h1 ref={titleRef} className="text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-16 uppercase leading-[0.85]">
            {lang === 'EN' ? (
              <>
                <VariableProximity
                  label="AI VOICE &"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={titleRef}
                  radius={150}
                  falloff="linear"
                />
                <br className="hidden md:block" />
                <VariableProximity
                  label="CONVERSATION"
                  className="text-[#39FF14]"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={titleRef}
                  radius={150}
                  falloff="linear"
                />
                <br />
                <VariableProximity
                  label="UI"
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
                  label="AI 語音與"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={titleRef}
                  radius={150}
                  falloff="linear"
                />
                <br />
                <VariableProximity
                  label="對話式介面"
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
                  ? "Bilingual AI voice chat and real-time interaction designed for hospitality and global brands. We bridge the gap between human intent and machine response with natural, culturally-aware dialogue."
                  : "為餐旅業與全球品牌設計的雙語 AI 語音對話與即時互動。我們透過自然且具備文化意識的對話，縮短人類意圖與機器回應之間的距離。"}
              </p>
              <p>
                {lang === 'EN'
                  ? "Our conversational interfaces are built to handle complex queries in both English and Traditional Chinese, providing a seamless experience for international guests and customers."
                  : "我們的對話式介面旨在處理英文與繁體中文的複雜查詢，為國際旅客與客戶提供無縫的體驗。"}
              </p>
              
              <div className="pt-8 grid grid-cols-1 gap-4">
                {[
                  lang === 'EN' ? 'Bilingual Voice Synthesis' : '雙語語音合成',
                  lang === 'EN' ? 'Real-time NLP Processing' : '即時自然語言處理',
                  lang === 'EN' ? 'Hospitality-Specific Training' : '餐旅業專屬訓練',
                  lang === 'EN' ? 'Cross-Cultural Dialogue Flow' : '跨文化對話流程'
                ].map(item => (
                  <div key={item} className="flex items-center gap-4 p-4 border border-white/5 bg-white/5 hover:bg-[#39FF14]/5 transition-colors">
                    <div className="w-1 h-1 bg-[#39FF14]" />
                    <span className="text-xs font-black tracking-widest uppercase">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative border border-white/10 overflow-hidden h-[300px] md:h-[500px] flex items-center justify-center bg-white/5 backdrop-blur-sm">
              <div className="flex items-end gap-1 h-32">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 bg-[#39FF14] shadow-[0_0_15px_#39FF14]"
                    animate={{ 
                      height: [
                        `${Math.random() * 30 + 10}%`, 
                        `${Math.random() * 90 + 10}%`, 
                        `${Math.random() * 30 + 10}%`
                      ]
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.05,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[#39FF14]/40">
                {lang === 'EN' ? (
                  <>VOICE_ENGINE_ACTIVE<br/>BILINGUAL_SYNC_OK</>
                ) : (
                  <>語音引擎已啟動<br/>雙語同步正常</>
                )}
              </div>
            </div>
          </div>
          
          <div className="w-full flex items-center justify-center overflow-hidden my-24 opacity-60">
            <div className="h-px bg-gradient-to-r from-transparent to-white/30 flex-1" />
            <div className="w-1.5 h-1.5 bg-[#39FF14] rounded-full shadow-[0_0_15px_#39FF14] mx-4" />
            <div className="h-px bg-gradient-to-l from-transparent to-white/30 flex-1" />
          </div>

          <VoiceBotShowcase lang={lang} />
          <ServicePricing lang={lang} serviceType="voice" />
          <ProjectStartSection lang={lang} />
        </motion.div>
      </div>
    </div>
  );
};

export default AIVoice;
