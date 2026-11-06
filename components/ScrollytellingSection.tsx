import React, { useRef, useEffect } from 'react';
import { Language } from '../App';

interface ScrollytellingSectionProps {
  lang: Language;
  className?: string;
}

export const ScrollytellingSection: React.FC<ScrollytellingSectionProps> = ({ lang, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const targetXRef = useRef(0);
  const currentXRef = useRef(0);

  const panels = [
    {
      id: 'panel-1',
      heading: lang === 'ZH' ? (
        <>
          我們打造具有動態生命力的 <br />
          <span className="text-[#00FF00]">數位敘事空間。</span>
        </>
      ) : (
        <>
          WE CRAFT DIGITAL <br />
          <span className="text-[#00FF00]">NARRATIVES THAT MOVE.</span>
        </>
      ),
    },
    {
      id: 'panel-2',
      heading: lang === 'ZH' ? (
        <>
          靜態排版令人遺忘。 <br />
          <span className="text-[#00FF00]">流暢動態創造意圖。</span>
        </>
      ) : (
        <>
          STATIC LAYOUTS ARE FORGETTABLE. <br />
          <span className="text-[#00FF00]">MOTION CREATES INTENT.</span>
        </>
      ),
    },
    {
      id: 'panel-3',
      heading: lang === 'ZH' ? (
        <>
          電影感視口與 <br />
          <span className="text-[#00FF00]">滾動敘事架構。</span>
        </>
      ) : (
        <>
          CINEMATIC & <br />
          <span className="text-[#00FF00]">SCROLLYTELLING EXPERIENCES.</span>
        </>
      ),
    },
    {
      id: 'panel-4',
      heading: lang === 'ZH' ? (
        <>
          準備好升級您的 <br />
          <span className="text-[#00FF00]">數位品牌境界？</span>
        </>
      ) : (
        <>
          READY TO ELEVATE YOUR <br />
          <span className="text-[#00FF00]">DIGITAL PRESENCE?</span>
        </>
      ),
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !stickyRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const stickyHeight = stickyRef.current.offsetHeight;
      const totalScrollable = containerRef.current.offsetHeight - stickyHeight;

      if (totalScrollable <= 0) return;

      // Resolved pin target from computed CSS top
      const computedTop = parseFloat(window.getComputedStyle(stickyRef.current).top) || 0;
      const currentScroll = computedTop - rect.top;
      
      // Calculate clamped progress from 0.0 to 1.0
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);

      // Max travel: exactly (panels.length - 1) * window.innerWidth
      // This stops translation the exact moment the final slide reaches dead-center
      const maxTranslate = Math.max(0, (panels.length - 1) * window.innerWidth);
      targetXRef.current = Math.min(Math.max(progress * maxTranslate, 0), maxTranslate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    const renderLoop = () => {
      const maxTranslate = Math.max(0, (panels.length - 1) * window.innerWidth);
      const diff = targetXRef.current - currentXRef.current;
      if (Math.abs(diff) < 0.1) {
        currentXRef.current = targetXRef.current;
      } else {
        currentXRef.current += diff * 0.25;
      }

      // Clamp strictly between 0 and maxTranslate so:
      // 1. Initial slide never has negative offset or left clipping (starts at exactly x: 0)
      // 2. Final slide never over-translates into empty space
      const currentClampedX = Math.min(Math.max(currentXRef.current, 0), maxTranslate);

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(-${currentClampedX.toFixed(2)}px, 0, 0)`;
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [panels.length]);

  return (
    <div
      id="scrolly-container"
      ref={containerRef}
      className={`relative z-10 h-[120vh] sm:h-[130vh] md:h-[140vh] bg-black text-white overflow-clip p-0 pb-0 border-0 ${className || ''}`}
    >
      {/* 
        Compact Transition Band:
        - Positioned with sticky top centered vertically (50vh - half height)
        - Height tightly wraps text (h-[22vh]-h-[26vh]) with zero bottom padding
        - Anchored strictly at left: 0
      */}
      <div
        ref={stickyRef}
        className="sticky top-[39vh] sm:top-[38vh] md:top-[37vh] h-[22vh] sm:h-[24vh] md:h-[26vh] min-h-[130px] max-h-[200px] w-full overflow-hidden bg-black m-0 p-0 pb-0 border-0"
      >
        {/* Horizontal Track: Starts strictly aligned at left: 0 */}
        <div
          ref={trackRef}
          className="flex flex-row flex-nowrap w-max h-full will-change-transform bg-transparent"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          {panels.map((panel) => (
            <section
              key={panel.id}
              className="w-screen min-w-[100vw] max-w-[100vw] h-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 flex-shrink-0 select-none bg-transparent m-0 p-0 pb-0"
            >
              <div className="max-w-6xl w-full mx-auto text-center flex flex-col items-center justify-center m-0 p-0">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-center tracking-tight leading-[1.05] md:leading-[1.0] text-white break-normal m-0 p-0">
                  {panel.heading}
                </h2>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollytellingSection;