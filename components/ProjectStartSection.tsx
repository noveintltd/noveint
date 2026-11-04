import React, { useRef, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Language } from '../App';

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
  const titleY = useTransform(smoothProgress, [0, 1], ['0px', '-12px']);
  const formY = useTransform(smoothProgress, [0, 1], ['0px', '-12px']);

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="relative z-20 mt-6 sm:mt-8 md:mt-10 pt-0 pb-16 md:pb-24 px-6 md:px-12 bg-black overflow-hidden border-0 border-transparent"
    >
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        <motion.h2 
          style={{ y: titleY }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center tracking-tight leading-[1.1] md:leading-[1.0] uppercase mb-5 sm:mb-6 text-white break-normal will-change-transform"
        >
          {lang === 'EN' ? (
            <>
              START A <span className="text-[#00FF00]">PROJECT.</span>
            </>
          ) : (
            <>
              啟動 <span className="text-[#00FF00]">合作專案。</span>
            </>
          )}
        </motion.h2>

        <motion.div style={{ y: formY }} className="w-full will-change-transform">
          <Suspense fallback={<div className="h-96 w-full bg-white/5 animate-pulse" />}>
            <ContactForm lang={lang} />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectStartSection;
