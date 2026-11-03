import React, { useRef, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Language } from '../App';
import VariableProximity from './VariableProximity';

const ContactForm = lazy(() => import('./ContactForm'));

interface ProjectStartSectionProps {
  lang: Language;
}

const ProjectStartSection: React.FC<ProjectStartSectionProps> = ({ lang }) => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 100 });
  const titleY = useTransform(smoothProgress, [0, 1], ['30px', '-30px']);
  const formY = useTransform(smoothProgress, [0, 1], ['50px', '-20px']);
  const watermarkY = useTransform(smoothProgress, [0, 1], ['-60px', '60px']);

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="pt-48 pb-32 px-6 md:px-12 bg-black relative overflow-hidden mt-24 border-t border-white/5"
    >
      {/* Parallax Background Architectural Mark */}
      <motion.div 
        style={{ y: watermarkY }}
        className="hidden md:block absolute top-12 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.4em] text-white/5 uppercase select-none pointer-events-none whitespace-nowrap"
      >
        // ARCHITECTURE INITIATIVE // DIRECT INTAKE PROTOCOL
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2 
          style={{ y: titleY }}
          className="text-4xl md:text-6xl font-black mb-16 text-center tracking-tighter uppercase flex flex-col md:flex-row justify-center items-center gap-x-3 will-change-transform"
        >
          <VariableProximity
            label={lang === 'EN' ? 'START A' : '啟動'}
            className="text-white"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={100}
            falloff="linear"
          />
          <VariableProximity
            label={lang === 'EN' ? 'PROJECT' : '合作專案'}
            className="text-[#39FF14]"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={100}
            falloff="linear"
          />
        </motion.h2>
        <motion.div style={{ y: formY }} className="will-change-transform">
          <Suspense fallback={<div className="h-96 w-full bg-white/5 animate-pulse" />}>
            <ContactForm lang={lang} />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectStartSection;
