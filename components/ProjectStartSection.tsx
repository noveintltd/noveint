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
  const titleY = useTransform(smoothProgress, [0, 1], ['30px', '-30px']);
  const formY = useTransform(smoothProgress, [0, 1], ['50px', '-20px']);
  const watermarkY = useTransform(smoothProgress, [0, 1], ['-60px', '60px']);

  const titleLines = lang === 'ZH' ? (
    <>
      啟動 <br />
      <span className="text-[#00FF00]">合作</span>
    </>
  ) : (
    <>
      START A <br />
      <span className="text-[#00FF00]">PROJECT</span>
    </>
  );

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="pt-32 pb-32 px-6 md:px-12 bg-black relative overflow-hidden border-t border-white/5"
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
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-16 text-center tracking-tight leading-[1.05] md:leading-[1.0] text-white break-normal will-change-transform"
        >
          {titleLines}
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