import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Language } from '../App';
import ScrambledText from './ScrambledText';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  // Parallax layer transformations
  const titleY = useTransform(smoothProgress, [0, 1], ['0%', '-30%']);
  const titleOpacity = useTransform(smoothProgress, [0, 0.7], [1, 0.1]);
  const textY = useTransform(smoothProgress, [0, 1], ['0%', '-45%']);
  const textOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);
  const ctaY = useTransform(smoothProgress, [0, 1], ['0%', '-60%']);
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.2], [0.4, 0]);

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 pb-48 overflow-hidden bg-black"
    >
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center animate-hero-entry group w-full max-w-7xl">
        {/* Title Section with Parallax */}
        <motion.div 
          ref={titleRef} 
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative mb-10 px-4 flex flex-col items-center will-change-transform"
        >
          {lang === 'EN' ? (
            <>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.5rem] font-black tracking-tighter leading-[0.85] uppercase select-none text-white block">
                UK CREATIVE
              </h1>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.5rem] font-black tracking-tighter leading-[0.85] uppercase select-none text-[#39FF14] block mt-1">
                TAIWAN SOUL
              </h1>
            </>
          ) : (
            <>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.5rem] font-black tracking-tighter leading-[0.85] uppercase select-none text-white block">
                英倫創意
              </h1>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.5rem] font-black tracking-tighter leading-[0.85] uppercase select-none text-[#39FF14] block mt-1">
                台灣靈魂
              </h1>
            </>
          )}
        </motion.div>

        {/* Subtitle with distinct parallax */}
        <motion.div 
          style={{ y: textY, opacity: textOpacity }}
          className="flex flex-col items-center mb-12 will-change-transform"
        >
          <ScrambledText 
            className="max-w-4xl text-gray-400 text-lg md:text-xl mb-2 font-light tracking-wide leading-relaxed transition-all duration-500 group-hover:text-gray-200"
            radius={120}
            duration={0.8}
            speed={0.4}
            scrambleChars=".:/\"
          >
            {lang === 'EN' 
              ? "High-performance website development and immersive media design."
              : "高效能網站開發與沉浸式媒體設計。"}
          </ScrambledText>
          <ScrambledText 
            className="max-w-4xl text-gray-400 text-lg md:text-xl font-light tracking-wide leading-relaxed transition-all duration-500 group-hover:text-gray-200"
            radius={120}
            duration={0.8}
            speed={0.4}
            scrambleChars=".:/\"
          >
            {lang === 'EN' 
              ? "We build the infrastructure for brands that operate without borders."
              : "我們為跨國品牌打造無邊界的數位基礎設施。"}
          </ScrambledText>
        </motion.div>

        {/* CTA with Parallax */}
        <motion.div 
          style={{ y: ctaY }}
          className="relative z-20 w-full sm:w-auto px-4 sm:px-0 will-change-transform"
        >
          <a 
            href="#contact" 
            onClick={handleScrollToContact}
            className="neon-button block sm:inline-block w-full sm:w-auto px-6 sm:px-16 py-5 sm:py-6 text-xs sm:text-sm font-black tracking-[0.2em] sm:tracking-[0.4em] uppercase rounded-none text-center"
          >
            {lang === 'EN' ? 'Initiate Project' : '啟動合作'}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator with smooth fade out */}
      <motion.div 
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-10 animate-bounce transition-opacity pointer-events-none"
      >
        <svg className="w-8 h-8 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </div>
  );
};

export default Hero;