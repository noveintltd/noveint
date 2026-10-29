import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Language } from '../App';
import VariableProximity from './VariableProximity';

export interface NoveToolLink {
  id: string;
  name: string;
  nameZh: string;
  url: string;
  description: string;
  descriptionZh: string;
  category: 'media' | 'data' | 'document';
}

export const NOVE_TOOLS_LIST: NoveToolLink[] = [
  {
    id: 'video-processor',
    name: 'Video Processor',
    nameZh: '影片處理器',
    url: 'https://www.novetools.com/video-processor',
    description: 'Trim, crop, and convert video clips directly in your browser.',
    descriptionZh: '在瀏覽器中直接剪輯、裁切與轉檔影片。',
    category: 'media',
  },
  {
    id: 'image-processor',
    name: 'Image Processor',
    nameZh: '圖片批次處理器',
    url: 'https://www.novetools.com/image-processor',
    description: 'Batch resize, compress, and convert images into ZIP archives.',
    descriptionZh: '批次調整大小、壓縮圖片並匯出為 ZIP 壓縮檔。',
    category: 'media',
  },
  {
    id: 'pdf-processor',
    name: 'PDF Processor',
    nameZh: 'PDF 編輯引擎',
    url: 'https://www.novetools.com/pdf-processor',
    description: 'Merge, split, and organize PDF documents privately.',
    descriptionZh: '安全且私密地合併、分割並整理 PDF 文件。',
    category: 'document',
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    nameZh: 'QR Code 產生器',
    url: 'https://www.novetools.com/qr-generator',
    description: 'Generate custom, high-resolution QR codes instantly.',
    descriptionZh: '即時建立高解析度且具備自訂樣式的 QR Code。',
    category: 'data',
  },
  {
    id: 'palette-generator',
    name: 'Palette Generator',
    nameZh: '調色盤與配色工具',
    url: 'https://www.novetools.com/palette-generator',
    description: 'Create harmonious color schemes with contrast checkers.',
    descriptionZh: '建立調和色彩配置並提供即時對比度檢查。',
    category: 'data',
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    nameZh: '高精度單位轉換器',
    url: 'https://www.novetools.com/unit-converter',
    description: 'Convert data storage, network speeds, and everyday measurements.',
    descriptionZh: '精準轉換數位容量、網路速率及日常度量衡單位。',
    category: 'data',
  },
  {
    id: 'global-sync-max',
    name: 'Global Sync Max',
    nameZh: '世界時區同步器',
    url: 'https://www.novetools.com/global-sync-max',
    description: 'Coordinate meetings and working hours across global timezones.',
    descriptionZh: '跨越全球時區協調會議與工作時段。',
    category: 'data',
  },
  {
    id: 'time-span-max',
    name: 'Time Span Max',
    nameZh: '工時與日程計算機',
    url: 'https://www.novetools.com/time-span-max',
    description: 'Calculate working days, billable project hours, and date intervals.',
    descriptionZh: '精確計算工作天數、專案計費工時與日期跨度。',
    category: 'data',
  },
  {
    id: 'favicon-generator',
    name: 'Favicon Generator',
    nameZh: 'Favicon 圖示產生器',
    url: 'https://www.novetools.com/favicon-generator',
    description: 'Generate crisp browser icons and manifest assets.',
    descriptionZh: '一鍵產生清晰的瀏覽器圖示與 manifest 網頁資產。',
    category: 'media',
  },
  {
    id: 'signature-generator',
    name: 'Signature Pad',
    nameZh: '數位簽名繪製板',
    url: 'https://www.novetools.com/signature-generator',
    description: 'Draw, style, and export clean digital signatures for contracts.',
    descriptionZh: '繪製、客製並匯出適用於各類合約的清晰數位簽名。',
    category: 'document',
  },
];

interface NoveToolsFeatureProps {
  lang: Language;
}

const getToolIcon = (id: string) => {
  switch (id) {
    case 'video-processor':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    case 'image-processor':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'pdf-processor':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    case 'qr-generator':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      );
    case 'palette-generator':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      );
    case 'unit-converter':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      );
    case 'global-sync-max':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'time-span-max':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'favicon-generator':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'signature-generator':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
};

interface ToolCardProps {
  tool: NoveToolLink;
  index: number;
  lang: Language;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, index, lang }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const title = lang === 'EN' ? tool.name : tool.nameZh;
  const description = lang === 'EN' ? tool.description : tool.descriptionZh;
  const categoryLabel = lang === 'EN' 
    ? tool.category.toUpperCase() 
    : tool.category === 'media' ? '影音處理' : tool.category === 'data' ? '數據計算' : '文件編輯';

  return (
    <a
      ref={cardRef}
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-[320px] md:w-[340px] p-8 rounded-none border border-white/10 bg-black/60 backdrop-blur-md group hover:border-[#39FF14]/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
    >
      {/* Cyber Glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10">
        {/* Category Header */}
        <div className="flex items-center justify-between w-full mb-6">
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase px-2 py-0.5 border border-white/10 bg-white/[0.02] text-[#39FF14]/70 group-hover:border-[#39FF14]/50 group-hover:text-[#39FF14] transition-colors">
            // {categoryLabel}
          </span>
          <span className="font-mono text-[9px] tracking-widest text-white/30 group-hover:text-[#39FF14]/60 transition-colors">
            {String(index + 1).padStart(2, '0')} / 10
          </span>
        </div>

        {/* Icon Box */}
        <div className="w-12 h-12 flex items-center justify-center border border-white/10 bg-white/[0.02] mb-6 text-white/50 group-hover:text-[#39FF14] group-hover:border-[#39FF14]/50 group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all duration-300">
          {getToolIcon(tool.id)}
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-black text-white mb-3 uppercase tracking-tight group-hover:text-[#39FF14] transition-colors">
          <VariableProximity
            label={title}
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={cardRef}
            radius={80}
            falloff="linear"
          />
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors leading-relaxed min-h-[44px]">
          {description}
        </p>
      </div>

      {/* Card Action footer */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/10 w-full flex items-center justify-between text-[10px] font-black tracking-[0.2em] uppercase text-[#39FF14]/60 group-hover:text-[#39FF14] transition-colors">
        <span>{lang === 'EN' ? 'Launch Utility' : '啟動工具'}</span>
        <svg className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </a>
  );
};

const NoveToolsFeature: React.FC<NoveToolsFeatureProps> = ({ lang }) => {
  const sectionContainerRef = useRef<HTMLElement>(null);
  const sectionHeaderRef = useRef<HTMLDivElement>(null);
  
  // Triplicate array for seamless infinite carousel
  const scrollItems = [...NOVE_TOOLS_LIST, ...NOVE_TOOLS_LIST, ...NOVE_TOOLS_LIST];
  
  const { scrollYProgress } = useScroll({
    target: sectionContainerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 100 });
  const gridY = useTransform(smoothProgress, [0, 1], ['-30px', '30px']);
  const headerY = useTransform(smoothProgress, [0, 1], ['30px', '-30px']);
  const carouselY = useTransform(smoothProgress, [0, 1], ['40px', '-20px']);

  const [index, setIndex] = useState(NOVE_TOOLS_LIST.length);
  const [isPaused, setIsPaused] = useState(false);
  const [centeringOffset, setCenteringOffset] = useState(0);

  const cardWidth = 340;
  const gap = 32;
  const step = cardWidth + gap;

  // Calculate offset to center the active card in viewport
  useEffect(() => {
    const updateOffset = () => {
      setCenteringOffset((window.innerWidth - cardWidth) / 2);
    };
    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, [cardWidth]);

  // Auto-scroll ticker
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex(prev => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Wrap around logic for smooth infinite reel
  useEffect(() => {
    if (index >= NOVE_TOOLS_LIST.length * 2) {
      const timer = setTimeout(() => {
        setIndex(NOVE_TOOLS_LIST.length);
      }, 500);
      return () => clearTimeout(timer);
    }
    if (index < NOVE_TOOLS_LIST.length) {
      const timer = setTimeout(() => {
        setIndex(NOVE_TOOLS_LIST.length * 2 - 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [index]);

  const handlePrev = () => {
    setIsPaused(true);
    setIndex(prev => prev - 1);
    setTimeout(() => setIsPaused(false), 10000);
  };

  const handleNext = () => {
    setIsPaused(true);
    setIndex(prev => prev + 1);
    setTimeout(() => setIsPaused(false), 10000);
  };

  return (
    <section 
      id="novetools" 
      ref={sectionContainerRef} 
      className="py-24 bg-black relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
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
          <div className="inline-block border border-[#39FF14] px-4 py-1 mb-6 text-[#39FF14] text-xs font-mono font-bold tracking-[0.3em] uppercase">
            {lang === 'EN' ? 'Proprietary Utilities Suite' : '自主研發數位工具套裝'}
          </div>

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
            className="mt-6 text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed font-mono uppercase tracking-tight"
          >
            {lang === 'EN' 
              ? 'High-performance, privacy-first digital utilities designed to streamline creative & engineering workflows.'
              : '高效能、隱私優先的數位工具套裝，專為簡化創作者與工程團隊的工作流程而打造。'}
          </motion.p>
        </div>
      </motion.div>

      {/* Infinite Carousel Reel */}
      <motion.div 
        style={{ y: carouselY }}
        className="relative w-full overflow-hidden py-10 will-change-transform"
      >
        <div className="absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />
        
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
            <ToolCard 
              key={`${tool.id}-${idx}`} 
              tool={tool} 
              index={idx % NOVE_TOOLS_LIST.length} 
              lang={lang} 
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Navigation Controls and Master Suite Link */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
        <div className="flex items-center gap-6">
          {/* Left Arrow */}
          <motion.button
            whileHover={{ scale: 1.1, color: '#39FF14' }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            className="w-12 h-12 flex items-center justify-center border border-white/10 text-white/50 hover:border-[#39FF14] hover:text-[#39FF14] hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all"
            aria-label="Previous tool"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Indicator */}
          <div className="font-mono text-xs text-white/40 tracking-[0.2em]">
            <span className="text-[#39FF14]">{String((index % NOVE_TOOLS_LIST.length) + 1).padStart(2, '0')}</span> / {String(NOVE_TOOLS_LIST.length).padStart(2, '0')}
          </div>

          {/* Right Arrow */}
          <motion.button
            whileHover={{ scale: 1.1, color: '#39FF14' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="w-12 h-12 flex items-center justify-center border border-white/10 text-white/50 hover:border-[#39FF14] hover:text-[#39FF14] hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all"
            aria-label="Next tool"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Master CTA to novetools.com */}
        <motion.a 
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 0 30px rgba(57, 255, 20, 0.5)',
            backgroundColor: '#39FF14',
            color: '#000'
          }}
          whileTap={{ scale: 0.98 }}
          href="https://www.novetools.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-10 py-4 border border-[#39FF14] text-[#39FF14] text-xs font-black tracking-[0.25em] uppercase transition-all duration-300 relative overflow-hidden group font-mono"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span>{lang === 'EN' ? 'Launch Complete Suite' : '探索完整工具箱'}</span>
            <span>↗</span>
          </span>
          <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-500" />
        </motion.a>
      </div>
    </section>
  );
};

export default NoveToolsFeature;
