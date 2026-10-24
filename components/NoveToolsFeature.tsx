import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Language } from '../App';
import VariableProximity from './VariableProximity';

interface NoveToolsFeatureProps {
  lang: Language;
}

interface ToolCard {
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
}

const toolsData = {
  EN: [
    {
      title: 'QR Code Generator',
      description: 'High-resolution, brand-ready digital assets.',
      url: 'https://novetools.com/qr-code-generator/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      )
    },
    {
      title: 'Video Processor',
      description: 'Securely trim and crop videos locally in your browser.',
      url: 'https://novetools.com/video-processor/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Image Processor',
      description: 'Convert & compress entire batches into ZIP archives.',
      url: 'https://novetools.com/image-processor/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'PDF Processor',
      description: 'Merge, split, and convert documents locally in your browser.',
      url: 'https://novetools.com/pdf-processor/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Unit Converter',
      description: 'Fast, private, and precise conversions for everyday units.',
      url: 'https://novetools.com/unit-converter/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    {
      title: 'Global Sync Max',
      description: 'Ultimate timezone coordination for distributed teams.',
      url: 'https://novetools.com/global-sync-max/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Time Span Max',
      description: 'Professional date calculation and interval planning.',
      url: 'https://novetools.com/time-span-max/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Palette Generator',
      description: 'Instant color harmony for modern design.',
      url: 'https://novetools.com/palette-generator/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: 'Favicon Generator',
      description: 'Create professional browser icons for any website.',
      url: 'https://novetools.com/favicon-generator/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Signature Generator',
      description: 'Create and download elegant digital signatures.',
      url: 'https://novetools.com/signature-generator/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    }
  ],
  ZH: [
    {
      title: 'QR Code 產生器',
      description: '高解析度、品牌專屬數位資產。',
      url: 'https://novetools.com/qr-code-generator/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      )
    },
    {
      title: '影片處理器',
      description: '在瀏覽器中安全地進行本地影片修剪與裁切。',
      url: 'https://novetools.com/video-processor/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: '圖片處理器',
      description: '批次轉換與壓縮圖片並打包為 ZIP 壓縮檔。',
      url: 'https://novetools.com/image-processor/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'PDF 處理器',
      description: '在瀏覽器中安全地進行本地 PDF 合併、分割與轉換。',
      url: 'https://novetools.com/pdf-processor/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: '單位轉換器',
      description: '快速、私密且精確的日常單位轉換。',
      url: 'https://novetools.com/unit-converter/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    {
      title: '全球同步 Max',
      description: '為遠端團隊打造的終極時區協調工具。',
      url: 'https://novetools.com/global-sync-max/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: '時間跨度 Max',
      description: '專業的日期計算與區間規劃工具。',
      url: 'https://novetools.com/time-span-max/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: '調色盤產生器',
      description: '為現代設計打造的即時色彩配色工具。',
      url: 'https://novetools.com/palette-generator/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: 'Favicon 產生器',
      description: '為網站建立專業的瀏覽器圖示 (Favicon)。',
      url: 'https://novetools.com/favicon-generator/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: '簽名產生器',
      description: '建立並下載優雅的數位簽名。',
      url: 'https://novetools.com/signature-generator/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    }
  ]
};

interface ToolCardProps extends ToolCard {
  lang: Language;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, url, icon, lang }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  
  return (
    <a
      ref={cardRef}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-[320px] p-10 border border-white/10 bg-black/40 backdrop-blur-md rounded-3xl group hover:border-[#39FF14] transition-all duration-500 relative overflow-hidden flex flex-col items-center text-center"
    >
      {/* Card glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-14 h-14 flex items-center justify-center border border-white/10 rounded-2xl mb-6 text-white/40 group-hover:text-[#39FF14] group-hover:border-[#39FF14]/30 group-hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all duration-500">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight group-hover:text-[#39FF14] transition-colors">
          <VariableProximity
            label={title}
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={cardRef}
            radius={80}
            falloff="linear"
          />
        </h3>
        <p className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors leading-relaxed mb-8">
          {description}
        </p>
        
        <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-[#39FF14]/40 group-hover:text-[#39FF14] transition-colors">
          <span>{lang === 'EN' ? 'Launch Utility' : '啟動工具'}</span>
          <svg className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </a>
  );
};

const NoveToolsFeature: React.FC<NoveToolsFeatureProps> = ({ lang }) => {
  const tools = toolsData[lang];
  const sectionContainerRef = useRef<HTMLElement>(null);
  const sectionHeaderRef = useRef<HTMLDivElement>(null);
  // Duplicate tools for seamless infinite scroll
  const scrollItems = [...tools, ...tools, ...tools];
  
  const { scrollYProgress } = useScroll({
    target: sectionContainerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 100 });
  const gridY = useTransform(smoothProgress, [0, 1], ['-30px', '30px']);
  const headerY = useTransform(smoothProgress, [0, 1], ['30px', '-30px']);
  const carouselY = useTransform(smoothProgress, [0, 1], ['40px', '-20px']);

  const [index, setIndex] = React.useState(tools.length);
  const [isPaused, setIsPaused] = React.useState(false);
  const [centeringOffset, setCenteringOffset] = React.useState(0);
  const cardWidth = 320;
  const gap = 32;
  const step = cardWidth + gap;

  // Calculate offset to center the current card
  React.useEffect(() => {
    const updateOffset = () => {
      setCenteringOffset((window.innerWidth - cardWidth) / 2);
    };
    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  // Auto-scroll logic
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex(prev => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Wrap around logic for infinite feel
  React.useEffect(() => {
    if (index >= tools.length * 2) {
      const timer = setTimeout(() => {
        setIndex(tools.length);
      }, 500); // Wait for animation to finish
      return () => clearTimeout(timer);
    }
    if (index < tools.length) {
      const timer = setTimeout(() => {
        setIndex(tools.length * 2 - 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [index, tools.length]);

  const handlePrev = () => {
    setIsPaused(true);
    setIndex(prev => prev - 1);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000);
  };

  const handleNext = () => {
    setIsPaused(true);
    setIndex(prev => prev + 1);
    setTimeout(() => setIsPaused(false), 10000);
  };

  return (
    <section id="novetools" ref={sectionContainerRef} className="py-24 bg-black relative overflow-hidden">
      {/* Futuristic Grid Background with Parallax */}
      <motion.div 
        style={{ y: gridY }}
        className="grid-bg absolute inset-0 opacity-10 pointer-events-none will-change-transform" 
      />
      
      {/* Perspective Grid Floor */}
      <div className="perspective-grid" />

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#39FF14]/2 blur-[120px] pointer-events-none" />
      
      <motion.div 
        style={{ y: headerY }}
        className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-16 will-change-transform"
      >
        <div ref={sectionHeaderRef} className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 md:gap-6 w-full"
          >
            <img 
              src="https://novetools.com/wp-content/uploads/2026/03/NOVE_LOGO_TRANSPARENT_1024.png" 
              alt="Nove Logo" 
              className="h-10 md:h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(57,255,20,0.2)]"
              referrerPolicy="no-referrer"
            />
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white drop-shadow-[0_0_20px_rgba(57,255,20,0.2)]">
              <VariableProximity
                label="novetools.com"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={sectionHeaderRef}
                radius={150}
                falloff="linear"
              />
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-blue-100/40 max-w-2xl text-sm md:text-base leading-relaxed font-medium uppercase tracking-tight"
          >
            {lang === 'EN' 
              ? 'OUR High-performance, privacy-first digital utilities suite designed to streamline creative workflow.'
              : '我們的高效能、隱私優先數位工具套裝，旨在簡化創意工作流程。'}
          </motion.p>
        </div>
      </motion.div>

      {/* Infinite Carousel with Parallax */}
      <motion.div 
        style={{ y: carouselY }}
        className="relative w-full overflow-hidden py-12 will-change-transform"
      >
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
        
        <motion.div 
          className="flex gap-8"
          animate={{ x: centeringOffset - index * step }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 1
          }}
          style={{ width: 'fit-content' }}
        >
          {scrollItems.map((tool, idx) => (
            <ToolCard key={`${tool.title}-${idx}`} {...tool} lang={lang} />
          ))}
        </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 flex items-center justify-center gap-8 md:gap-12">
        {/* Left Arrow */}
        <motion.button
          whileHover={{ scale: 1.2, color: '#39FF14', textShadow: '0 0 10px #39FF14' }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrev}
          className="text-white/20 transition-colors"
          aria-label="Previous tool"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <motion.a 
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 30px rgba(57, 255, 20, 0.5)',
            backgroundColor: '#39FF14',
            color: '#000'
          }}
          whileTap={{ scale: 0.95 }}
          href="https://novetools.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-10 py-4 border border-[#39FF14] text-[#39FF14] text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">{lang === 'EN' ? 'Explore Tools' : '探索工具'}</span>
          <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-500" />
        </motion.a>

        {/* Right Arrow */}
        <motion.button
          whileHover={{ scale: 1.2, color: '#39FF14', textShadow: '0 0 10px #39FF14' }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className="text-white/20 transition-colors"
          aria-label="Next tool"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </section>
  );
};

export default NoveToolsFeature;
