import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Language } from '../App';
import ProjectStartSection from '../components/ProjectStartSection';
import VariableProximity from '../components/VariableProximity';

interface AboutProps {
  lang: Language;
}

const About: React.FC<AboutProps> = ({ lang }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [videoTilt, setVideoTilt] = useState({ x: 0, y: 0 });
  const missionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLHeadingElement>(null);
  const missionTitleRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 100 });
  const titleY = useTransform(smoothProgress, [0, 0.5], ['0px', '-40px']);
  const textColY = useTransform(smoothProgress, [0, 0.5], ['0px', '-20px']);
  const videoColY = useTransform(smoothProgress, [0, 0.5], ['0px', '40px']);
  const gridY = useTransform(smoothProgress, [0, 1], ['0px', '60px']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!missionRef.current) return;
    const { left, top, width, height } = missionRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: x * 10, y: y * -10 });
  };

  const handleVideoMouseMove = (e: React.MouseEvent) => {
    if (!videoContainerRef.current) return;
    const { left, top, width, height } = videoContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setVideoTilt({ x: x * 20, y: y * -20 });
  };

  const handleVideoMouseLeave = () => {
    setVideoTilt({ x: 0, y: 0 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div ref={pageRef} className="pt-32 pb-20 px-6 md:px-12 min-h-screen bg-black relative overflow-hidden">
      <motion.div style={{ y: gridY }} className="perspective-grid opacity-20 will-change-transform" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h1 
          style={{ y: titleY }}
          ref={titleContainerRef} 
          className="text-6xl md:text-8xl font-black tracking-tighter mb-12 uppercase flex flex-col md:flex-row items-start gap-x-4 will-change-transform"
        >
          <VariableProximity
            label={lang === 'EN' ? 'ABOUT' : '關於'}
            className="text-white/40"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={titleContainerRef}
            radius={200}
            falloff="linear"
          />
          <VariableProximity
            label="NOVE"
            className="text-[#39FF14]"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={titleContainerRef}
            radius={200}
            falloff="linear"
          />
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div style={{ y: textColY }} className="space-y-8 will-change-transform">
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
              {lang === 'EN' 
                ? "Nove International is a premier digital agency specializing in high-performance web development and immersive media design. As digital architects, we build the technical and visual infrastructure that allows brands to thrive in a borderless global market."
                : "「Nove International 是一家頂尖的數位代理商，專精於高效能網站開發與沉浸式媒體設計。作為數位架構師，我們致力於打造穩健的技術與視覺基礎設施，助力品牌在全球無邊界的市場中蓬勃發展。"}
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              {lang === 'EN'
                ? "Our approach combines precision engineering with creative storytelling. From bilingual interfaces and AI voice integration to large-scale media production, we provide the tools necessary for modern enterprises to inform, engage, and grow across international territories. We don't just build websites; we craft future-proof digital footprints."
                : "我們的核心理念結合了精密工程與創意敘事。從雙語介面與 AI 語音導入，到大規模的媒體製作，我們為現代企業提供所需的工具，使其能在國際領域中精準傳達訊息、建立互動並持續成長。我們不只是架設網站；我們更為您建構具備前瞻性的數位足跡。」"}
            </p>
            <div className="pt-8">
              <motion.div 
                ref={missionRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ 
                  transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                  transition: 'transform 0.1s ease-out'
                }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(57, 255, 20, 0.03)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className="inline-block border border-[#39FF14] p-8 relative group cursor-default"
              >
                <h2 ref={missionTitleRef} className="text-[#39FF14] text-sm font-black tracking-[0.3em] uppercase mb-4">
                  <VariableProximity
                    label={lang === 'EN' ? 'Our Mission' : '我們的使命'}
                    fromFontVariationSettings="'wght' 400, 'opsz' 9"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    containerRef={missionTitleRef}
                    radius={60}
                    falloff="linear"
                  />
                </h2>
                <p className="text-white text-lg font-bold italic">
                  {lang === 'EN' ? '"Bridges of tomorrow, built today."' : '「今日打造，明日之橋。」'}
                </p>
                
                {/* Subtle scanning line effect on hover */}
                <motion.div 
                  initial={{ top: '-100%' }}
                  whileHover={{ top: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-px bg-[#39FF14]/20 pointer-events-none"
                />
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div style={{ y: videoColY }} className="relative flex items-center justify-center group will-change-transform">
            <div 
              ref={videoContainerRef}
              onMouseMove={handleVideoMouseMove}
              onMouseLeave={handleVideoMouseLeave}
              className="relative p-12 transition-all duration-1000 ease-out"
              style={{ 
                transform: `perspective(1000px) rotateX(${videoTilt.y}deg) rotateY(${videoTilt.x}deg)`,
              }}
            >
              {/* HUD Brackets */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-[#39FF14]/40 transition-all duration-1000 group-hover:scale-125 group-hover:-translate-x-4 group-hover:-translate-y-4" />
              <div className="absolute -top-4 -right-4 w-8 h-8 border-t border-r border-[#39FF14]/40 transition-all duration-1000 group-hover:scale-125 group-hover:translate-x-4 group-hover:-translate-y-4" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b border-l border-[#39FF14]/40 transition-all duration-1000 group-hover:scale-125 group-hover:-translate-x-4 group-hover:translate-y-4" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-[#39FF14]/40 transition-all duration-1000 group-hover:scale-125 group-hover:translate-x-4 group-hover:translate-y-4" />

              <img 
                src="/assets/images/noveint_logo.webp" 
                alt={lang === 'EN' ? 'Nove International Symbol' : '英商了解文化標誌'}
                className="w-full max-w-[400px] h-auto object-contain transition-all duration-1000 group-hover:scale-110 relative z-10 select-none pointer-events-none"
              />
            </div>
          </motion.div>
        </div>
        <ProjectStartSection lang={lang} />
      </div>
    </div>
  );
};

export default About;
