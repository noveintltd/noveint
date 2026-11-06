import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../App';
import CyberneticRadarBackground from './CyberneticRadarBackground';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  path: string;
}

interface CapabilitiesProps {
  lang: Language;
  variant?: 'carousel' | 'grid';
}

export const servicesContent: Record<Language, ServiceItem[]> = {
  EN: [
    {
      id: "web",
      title: "Web & UI/UX Design",
      description: "Crafting digital experiences that resonate across borders. We specialize in bilingual interfaces that maintain aesthetic integrity in both Latin and Chinese typography.",
      tags: ["Figma", "React", "Bilingual Typography", "UX Strategy"],
      path: "/services/web-design"
    },
    {
      id: "creative",
      title: "Creative Ad Assets",
      description: "Visual storytelling for the global market. High-impact graphic design, motion assets, and brand identities that bridge Western flair with Eastern nuances.",
      tags: ["Branding", "Motion Graphics", "Art Direction", "OOH Design"],
      path: "/services/creative-assets"
    },
    {
      id: "language",
      title: "Language Services",
      description: "More than just translation. We provide nuanced Traditional Chinese localization, verbal interpretation, and cultural consulting for a seamless market entry.",
      tags: ["Translation", "Interpretation", "Copywriting", "Localization"],
      path: "/services/language-services"
    },
    {
      id: "google",
      title: "Google AI & Maps Optimization",
      description: "Transform how your brand appears across the Google ecosystem. We optimize your digital presence for AI search results and Google Maps, ensuring maximum visibility.",
      tags: ["Local SEO", "Google Business Profile", "AI Search", "Knowledge Graph"],
      path: "/services/google-optimization"
    },
    {
      id: "voice",
      title: "AI Voice & Conversational UI",
      description: "Bilingual AI voice chat, real-time interaction for hospitality and global brands. We bridge the gap between human intent and machine response.",
      tags: ["AI Voice", "Conversational UI", "Hospitality Tech", "Bilingual Chat"],
      path: "/services/ai-voice"
    },
    {
      id: "app",
      title: "Cross-Platform App Development",
      description: "SaaS solutions, mobile apps (iOS/Android), and scalable business tech. We build robust applications that grow with your business needs.",
      tags: ["SaaS", "iOS/Android", "Scalable Tech", "Business Solutions"],
      path: "/services/app-development"
    }
  ],
  ZH: [
    {
      id: "web",
      title: "網頁與 UI/UX 設計",
      description: "打造跨越國界的數位體驗。我們專注於雙語介面，確保拉丁字母與中文字體呈現同樣的美感。",
      tags: ["Figma", "React", "雙語字體學", "UX 策略"],
      path: "/services/web-design"
    },
    {
      id: "creative",
      title: "廣告創意素材",
      description: "為全球市場打造視覺故事。具備西方創意與東方內涵的高質感平面設計、動態素材與品牌識別。",
      tags: ["品牌識別", "動態圖像", "藝術指導", "戶外廣告"],
      path: "/services/creative-assets"
    },
    {
      id: "language",
      title: "語言服務",
      description: "不僅僅是翻譯。我們提供細膩的繁體中文在地化、口譯及文化顧問服務，助力品牌順利進軍市場。",
      tags: ["專業翻譯", "現場口譯", "廣告文案", "在地化策略"],
      path: "/services/language-services"
    },
    {
      id: "google",
      title: "Google AI 與地圖優化",
      description: "全面提升品牌在 Google 生態系統中的能見度。針對 AI 搜尋結果與 Google 地圖進行深度優化，確保最高信任度。",
      tags: ["在地化搜尋", "商家檔案優化", "AI 搜尋優化", "知識圖譜"],
      path: "/services/google-optimization"
    },
    {
      id: "voice",
      title: "AI 語音與對話式介面",
      description: "雙語 AI 語音對話，為餐旅業與全球品牌提供即時互動。我們縮短了人類意圖與機器回應之間的距離。",
      tags: ["AI 語音", "對話式介面", "餐旅科技", "雙語對話"],
      path: "/services/ai-voice"
    },
    {
      id: "app",
      title: "跨平台應用程式開發",
      description: "SaaS 解決方案、行動應用程式 (iOS/Android) 以及具擴展性的商業技術。我們打造能隨企業需求成長的穩健應用程式。",
      tags: ["SaaS", "iOS/Android", "擴展性技術", "商業解決方案"],
      path: "/services/app-development"
    }
  ]
};

const Capabilities: React.FC<CapabilitiesProps> = ({ lang, variant = 'carousel' }) => {
  const currentServices = servicesContent[lang];

  // If grid variant is requested (e.g. for /services catalog page)
  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentServices.map((service, index) => {
          const displayNumber = (index + 1).toString().padStart(2, '0');
          return (
            <Link
              key={service.id}
              to={service.path}
              className="reveal-card relative overflow-hidden border border-neutral-800 p-8 bg-black flex flex-col justify-between group hover:border-[#00FF00] hover:shadow-[0_0_20px_rgba(0,255,0,0.2)] transition-all duration-500 block h-full"
            >
              <div className="absolute -top-4 -right-2 text-8xl md:text-9xl font-black text-white/5 select-none transition-all duration-700 group-hover:text-[#00FF00]/10 pointer-events-none">
                {displayNumber}
              </div>
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-black pt-12 mb-6 uppercase tracking-tight text-white group-hover:text-[#00FF00] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-8 group-hover:text-gray-300 transition-colors text-sm md:text-base min-h-[4rem]">
                  {service.description}
                </p>
                <div className="mb-10 w-full py-3.5 px-6 neon-button text-xs font-black tracking-[0.2em] uppercase rounded-none text-center transition-all duration-300">
                  {lang === 'EN' ? 'EXAMPLES & PRICES' : '案例與價格'}
                </div>
              </div>
              <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                {service.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[9px] md:text-[10px] border border-white/10 px-2 py-1 text-white/40 font-bold tracking-widest uppercase transition-colors group-hover:border-[#00FF00]/20 group-hover:text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  // Carousel 3D Depth Viewport setup
  const runwayRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const targetProgress = useRef<number>(0);
  const currentProgress = useRef<number>(0);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  // Smooth scroll to a target card index
  const scrollToCard = useCallback((index: number) => {
    if (!runwayRef.current) return;
    const rect = runwayRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalScroll = rect.height - window.innerHeight;
    if (totalScroll <= 0) return;
    // Map card index 0..5 proportionally across active scroll zone (0.0 to 0.82)
    const targetScroll = containerTop + (index / 5.0) * 0.82 * totalScroll;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }, []);

  // Update target progress on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!runwayRef.current) return;
      const rect = runwayRef.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      if (totalScroll <= 0) return;
      const currentScroll = -rect.top;
      const clamped = Math.min(Math.max(currentScroll / totalScroll, 0), 1);
      
      // Progression: 0.0 to 0.82 maps to cards 0 through 5 (0.0 to 5.0).
      // 0.82 to 1.0 (final 18% of scroll track) is dedicated as a resting dwell zone for Card 6.
      const ACTIVE_RUNWAY_FRACTION = 0.82;
      const normalizedScroll = Math.min(clamped / ACTIVE_RUNWAY_FRACTION, 1.0);
      targetProgress.current = normalizedScroll * 5.0; // 0.0 to 5.0 across 6 cards
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let animationFrameId: number;
    let lastRoundedIndex = -1;

    const animateLoop = () => {
      // Smooth linear interpolation (lerp) with 0.08 factor for silky, soft momentum
      const diff = targetProgress.current - currentProgress.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgress.current += diff * 0.08;
      } else {
        currentProgress.current = targetProgress.current;
      }

      const progress = currentProgress.current;
      const rounded = Math.min(Math.max(Math.round(progress), 0), 5);
      if (rounded !== lastRoundedIndex) {
        lastRoundedIndex = rounded;
        setActiveCardIndex(rounded);
      }

      const isMobile = window.innerWidth < 768;
      const lateralSpread = isMobile ? 38 : 80;

      for (let i = 0; i < currentServices.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        // p = currentScrollProgress - cardIndex:
        // p < 0: queued in background stack
        // p ≈ 0: active center card
        // p > 0: exiting smoothly to the left
        const p = progress - i;
        const absP = Math.abs(p);

        // 1. Z-Depth (translateZ):
        // Queued (p < 0): smoothly recedes back into screen (p * 180px)
        // Active (p ≈ 0): 0px
        // Exiting (p > 0): subtly steps forward before exit (p * 60px)
        const translateZ = p < 0 ? p * 180 : p * 60;

        // 2. Lateral Shift (translateX):
        // Queued (p < 0): neatly fanned out to right
        // Active: smoothly curves to 0px (centered)
        // Exiting (p > 0): glides cleanly off to the left
        const translateX = p < 0
          ? absP * lateralSpread
          : -p * (isMobile ? 220 : 280);

        // 3. Y-Rotation (rotateY - Soft Continuous Curve):
        // Levels out smoothly to 0deg entering center, lingers flat while active, gently tilts as it exits
        let rotateY = 0;
        if (absP > 0.18) {
          const rotP = (absP - 0.18) / 0.82;
          rotateY = Math.sign(-p) * Math.min(20, Math.pow(rotP, 1.4) * 20);
        }

        // 4. Scale & Blur:
        // Active: scale(1.0), blur(0px)
        // Queued: scales down smoothly, blur ramps up gently
        const scale = p < 0
          ? Math.max(0.75, 1 - absP * 0.08)
          : Math.max(0.75, 1 - absP * 0.06);

        const blur = absP > 0.25
          ? Math.min(6, (absP - 0.25) * 3.5)
          : 0;

        // 5. Opacity & Bleed Prevention:
        // Active card (absP <= 0.4): 100% opacity
        // Background stack (queued, p < -0.4): Math.max(0, 1 - (offset * 0.45)) where offset = -p
        // Exiting card (p > 0.4): fades out off screen
        let opacity = 1.0;
        if (absP <= 0.4) {
          opacity = 1.0;
        } else if (p < -0.4) {
          const offset = -p;
          opacity = Math.max(0, 1 - (offset * 0.45));
        } else {
          opacity = Math.max(0, 1 - (p * 1.5));
        }

        // 6. Stacking Order (zIndex):
        // Strict DOM depth to prevent background card text bleeding through
        let zIndex = 100;
        if (absP <= 0.4) {
          zIndex = 110;
        } else if (p > 0) {
          zIndex = 120 + Math.round(p * 5);
        } else {
          zIndex = 100 - Math.round(absP * 20);
        }

        const pointerEvents = (opacity > 0.15 && p < 0.8) ? 'auto' : 'none';

        // Apply hardware-accelerated 3D transforms with scale
        el.style.transform = `translate3d(${translateX.toFixed(2)}px, 0px, ${translateZ.toFixed(2)}px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none';
        el.style.zIndex = `${zIndex}`;
        el.style.pointerEvents = pointerEvents;

        // Toggle active status attribute
        const isActive = absP <= 0.35;
        if (isActive) {
          el.setAttribute('data-active', 'true');
        } else {
          el.removeAttribute('data-active');
        }
      }

      animationFrameId = requestAnimationFrame(animateLoop);
    };

    animationFrameId = requestAnimationFrame(animateLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentServices.length]);

  return (
    <div
      id="services"
      ref={runwayRef}
      className="relative h-[600vh] bg-black m-0 p-0 border-0"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black m-0 p-0 border-0 select-none">

        {/* Deep Cybernetic Background Grid & Radar FX Layer */}
        <CyberneticRadarBackground />

        {/* Center 3D Stage Container */}
        <div 
          className="relative z-20 flex-1 w-full flex items-center justify-center pointer-events-auto"
          style={{
            perspective: '1400px',
            perspectiveOrigin: '50% 50%'
          }}
        >
          {/* Inner 3D Card Rail Wrapper */}
          <div 
            className="relative w-[90vw] max-w-[430px] md:max-w-[480px] h-[480px] md:h-[500px]"
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform'
            }}
          >
            {currentServices.map((service, index) => {
              const displayNumber = (index + 1).toString().padStart(2, '0');
              const isActive = activeCardIndex === index;

              return (
                <div
                  key={service.id}
                  ref={(el) => { cardRefs.current[index] = el; }}
                  onClick={() => {
                    if (!isActive) {
                      scrollToCard(index);
                    }
                  }}
                  className={`group/card absolute inset-0 rounded-none p-7 md:p-9 flex flex-col justify-between transition-[border-color,box-shadow,background-color] duration-300 select-none cursor-pointer ${
                    isActive
                      ? 'border-2 border-[#00FF00] shadow-[0_0_25px_rgba(0,255,0,0.25)] bg-black'
                      : 'border border-neutral-900 bg-[#060608]'
                  }`}
                  style={{
                    transformOrigin: 'center center',
                    willChange: 'transform, opacity, filter'
                  }}
                >
                  {/* Large Background Watermark Number */}
                  <div 
                    className={`absolute -top-4 -right-2 text-8xl md:text-9xl font-black select-none pointer-events-none transition-colors duration-300 ${
                      isActive ? 'text-[#00FF00]/10' : 'text-neutral-900/30'
                    }`}
                  >
                    {displayNumber}
                  </div>

                  {/* Card Header Coordinate & Status */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span 
                      className={`font-mono text-xs font-bold tracking-widest ${
                        isActive ? 'text-[#00FF00]' : 'text-neutral-600'
                      }`}
                    >
                      [ {displayNumber} // 06 ]
                    </span>
                    <span 
                      className={`font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 border ${
                        isActive
                          ? 'border-[#00FF00]/40 text-[#00FF00]'
                          : 'border-neutral-900 text-neutral-600'
                      }`}
                    >
                      {isActive ? 'ACTIVE' : 'IN STACK'}
                    </span>
                  </div>

                  {/* Card Title & Description */}
                  <div className="relative z-10 my-auto py-2">
                    <h3 
                      className={`text-2xl md:text-3xl font-black mb-4 uppercase tracking-tight transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-neutral-500'
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p 
                      className={`leading-relaxed text-sm md:text-base transition-colors duration-300 line-clamp-3 md:line-clamp-none ${
                        isActive ? 'text-neutral-300' : 'text-neutral-600'
                      }`}
                    >
                      {service.description}
                    </p>

                    {/* Action Button */}
                    <div className="mt-6">
                      <Link
                        to={service.path}
                        onClick={(e) => {
                          if (!isActive) {
                            e.preventDefault();
                            scrollToCard(index);
                          }
                        }}
                        className={`w-full py-3.5 px-6 text-center text-xs font-black tracking-[0.2em] uppercase rounded-none block transition-all duration-300 ${
                          isActive
                            ? 'neon-button'
                            : 'border border-neutral-900 bg-neutral-950/80 text-neutral-600 hover:border-neutral-800'
                        }`}
                      >
                        {lang === 'EN' ? 'EXAMPLES & PRICES' : '案例與價格'}
                      </Link>
                    </div>
                  </div>

                  {/* Card Tags */}
                  <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-4 border-t border-neutral-900">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] md:text-[11px] font-mono border px-2.5 py-1 uppercase tracking-widest transition-colors duration-300 ${
                          isActive
                            ? 'border-[#00FF00]/40 text-[#00FF00]/90 bg-[#00FF00]/5'
                            : 'border-neutral-900 text-neutral-600'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Capabilities;