import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Language } from '../App';
import Capabilities from '../components/Capabilities';
import ProjectStartSection from '../components/ProjectStartSection';
import NoveToolsFeature from '../components/NoveToolsFeature';
import VariableProximity from '../components/VariableProximity';

interface ServicesProps {
  lang: Language;
}

const Services: React.FC<ServicesProps> = ({ lang }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 100 });
  const titleY = useTransform(smoothProgress, [0, 0.4], ['0px', '-40px']);

  // Spring config for smooth "slow" following
  const springConfig = { damping: 50, stiffness: 100 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;

    const updatePosition = (clientX: number, clientY: number) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mouseX.set(clientX - rect.left);
      mouseY.set(clientY - rect.top);
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      updatePosition(lastX, lastY);
    };

    const handleScroll = () => {
      updatePosition(lastX, lastY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={sectionRef}
      id="services"
      className="pt-32 pb-20 min-h-screen bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />
      
      {/* Interactive Mouse-Following Glow */}
      <motion.div 
        className="absolute w-[600px] h-[600px] bg-[#39FF14]/10 blur-[140px] rounded-full pointer-events-none z-0"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#39FF14]/5 blur-[120px] rounded-full -z-10" />
      <div className="max-w-7xl mx-auto relative z-10 px-6 md:px-12">
        <motion.h1 
          style={{ y: titleY }}
          ref={titleRef} 
          className="text-6xl md:text-8xl font-black tracking-tighter mb-16 uppercase flex flex-col md:flex-row items-baseline gap-x-4 will-change-transform"
        >
          <VariableProximity
            label={lang === 'EN' ? 'OUR' : '我們的'}
            className="text-white/40"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={titleRef}
            radius={200}
            falloff="linear"
          />
          <VariableProximity
            label="SERVICES"
            className="text-[#39FF14]"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={titleRef}
            radius={200}
            falloff="linear"
          />
        </motion.h1>
        
        <div className="mb-24">
          <Capabilities lang={lang} />
        </div>
      </div>
      
      <ProjectStartSection lang={lang} />
      <NoveToolsFeature lang={lang} />
    </div>
  );
};

export default Services;
