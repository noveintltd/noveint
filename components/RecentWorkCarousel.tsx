import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Language } from '../App';
import VariableProximity from './VariableProximity';

export interface FeaturedProject {
  id: string;
  name: string;
  nameZh: string;
  url: string;
  category: string;
  categoryZh: string;
  stack: string[];
  description: string;
  descriptionZh: string;
  image: string;
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'liaoliao-music',
    name: 'liaoliaomusic.com',
    nameZh: 'liaoliaomusic.com',
    url: 'https://www.liaoliaomusic.com/',
    category: '// 01 ELECTRONIC MUSIC PUBLICATION',
    categoryZh: '// 01 電子音樂出版與音訊檔案庫',
    stack: ['Next.js', 'Headless WordPress', 'Audio Engine', 'Bilingual'],
    description: 'Bilingual underground electronic music editorial and curated sound archive connecting East Asian and Western subcultures.',
    descriptionZh: '雙語地下電子音樂專刊與聲音檔案庫，串聯東亞與西方次文化。',
    image: '/images/liaoliaomusic.webp',
  },
  {
    id: 'hunky-dory-fitness',
    name: 'hunkydoryfitness.com',
    nameZh: 'hunkydoryfitness.com',
    url: 'https://www.hunkydoryfitness.com/',
    category: '// 02 WELLNESS & ON-DEMAND VAULT',
    categoryZh: '// 02 身心健康與隨選串流片庫',
    stack: ['Next.js', 'Supabase', 'Stripe Auth', 'Vimeo Vault'],
    description: 'Digital platform featuring subscription video on demand, automated booking plumbing, and boutique studio branding.',
    descriptionZh: '整合訂閱制影片隨選串流、自動化課程預約系統與精品運動品牌架構。',
    image: '/images/hunnkydoryfitness.webp',
  },
  {
    id: 'barefoot-publishing',
    name: 'barefootpublishing.uk',
    nameZh: 'barefootpublishing.uk',
    url: 'https://barefootpublishing.uk/',
    category: '// 03 INDEPENDENT PUBLISHING HOUSE',
    categoryZh: '// 03 獨立出版社與典藏書籍',
    stack: ['Next.js', 'Editorial CMS', 'Amazon KDP', 'Typography'],
    description: 'Bespoke publishing press specializing in Eastern philosophy, mindful lifestyle volumes, and modern typography.',
    descriptionZh: '專注於東方哲學、正念生活哲學書籍出版與現代字體排版工程之獨立出版社。',
    image: '/images/barefootpublishing.webp',
  },
  {
    id: 'annina-wooding',
    name: 'anninawooding.com',
    nameZh: 'anninawooding.com',
    url: 'https://anninawooding.com/',
    category: '// 04 CONTEMPORARY ARTIST PORTFOLIO',
    categoryZh: '// 04 當代藝術家數位展覽回顧',
    stack: ['React', 'Minimalist UI', 'High-Res Archive', 'Gallery'],
    description: 'Clean, high-fidelity fine art exhibition catalog and personal retrospective for contemporary abstract works.',
    descriptionZh: '極簡高解析當代抽象藝術典藏展覽目錄與個人創作回顧數位策展。',
    image: '/images/anninawooding.webp',
  },
];

interface ProjectCardProps {
  project: FeaturedProject;
  index: number;
  lang: Language;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, lang }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const title = lang === 'EN' ? project.name : project.nameZh;
  const category = lang === 'EN' ? project.category : project.categoryZh;
  const description = lang === 'EN' ? project.description : project.descriptionZh;

  return (
    <div
      ref={cardRef}
      className="w-[85vw] max-w-[380px] sm:w-[420px] md:w-[460px] shrink-0 bg-zinc-950/90 border border-white/10 hover:border-[#39FF14]/40 transition-all duration-500 rounded-none p-6 relative group overflow-hidden flex flex-col justify-between"
    >
      {/* Ambient hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        {/* Preview Frame 16:10 */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block w-full aspect-[16/10] overflow-hidden rounded-sm bg-black/60 border border-white/10 mb-6 group/frame cursor-pointer"
        >
          <img
            src={project.image}
            alt={`${project.name} Web Platform`}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Subtle Scanline Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
        </a>

        {/* Category Header */}
        <div className="flex items-center justify-between w-full mb-3">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#39FF14]/80 uppercase">
            {category}
          </span>
          <span className="font-mono text-[10px] tracking-widest text-white/30 group-hover:text-[#39FF14]/60 transition-colors">
            {String(index + 1).padStart(2, '0')} / 04
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight group-hover:text-[#39FF14] transition-colors">
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
        <p className="text-xs md:text-sm text-gray-400 group-hover:text-gray-200 transition-colors leading-relaxed mb-5">
          {description}
        </p>

        {/* Technology Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-mono tracking-wider bg-white/[0.03] border border-white/10 text-white/60 group-hover:border-[#39FF14]/30 group-hover:text-[#39FF14]/80 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Action: VISIT PRODUCTION ↗ */}
      <div className="relative z-10 pt-4 border-t border-white/10 w-full flex items-center justify-between">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#39FF14]/70 group-hover:text-[#39FF14] group-hover:drop-shadow-[0_0_8px_#39FF14] transition-all"
        >
          <span>{lang === 'EN' ? 'VISIT PRODUCTION' : '造訪正式網站'}</span>
          <span className="text-sm">↗</span>
        </a>

        <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
          CLIENT BUILD
        </span>
      </div>
    </div>
  );
};

interface RecentWorkCarouselProps {
  lang: Language;
}

const RecentWorkCarousel: React.FC<RecentWorkCarouselProps> = ({ lang }) => {
  const sectionContainerRef = useRef<HTMLElement>(null);
  const sectionHeaderRef = useRef<HTMLDivElement>(null);

  // Triplicate array for seamless continuous carousel
  const scrollItems = [...FEATURED_PROJECTS, ...FEATURED_PROJECTS, ...FEATURED_PROJECTS];

  const { scrollYProgress } = useScroll({
    target: sectionContainerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 100 });
  const gridY = useTransform(smoothProgress, [0, 1], ['-20px', '20px']);
  const headerY = useTransform(smoothProgress, [0, 1], ['25px', '-25px']);
  const carouselY = useTransform(smoothProgress, [0, 1], ['30px', '-15px']);

  const [index, setIndex] = useState(FEATURED_PROJECTS.length);
  const [isPaused, setIsPaused] = useState(false);
  const [centeringOffset, setCenteringOffset] = useState(0);

  // Calculate card width dynamically for centering
  const getCardWidth = () => {
    if (typeof window === 'undefined') return 460;
    if (window.innerWidth < 640) return Math.min(window.innerWidth * 0.85, 380);
    if (window.innerWidth < 768) return 420;
    return 460;
  };

  const gap = 32;

  useEffect(() => {
    const updateCentering = () => {
      const cardW = getCardWidth();
      const viewportWidth = window.innerWidth;
      // Center active card in viewport
      const offset = (viewportWidth - cardW) / 2;
      setCenteringOffset(offset);
    };

    updateCentering();
    window.addEventListener('resize', updateCentering);
    return () => window.removeEventListener('resize', updateCentering);
  }, []);

  // Auto slide when not paused
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        // Wrap gracefully around triplicate array
        if (next >= FEATURED_PROJECTS.length * 2) {
          return FEATURED_PROJECTS.length;
        }
        return next;
      });
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const cardW = getCardWidth();
  const step = cardW + gap;

  const handlePrev = () => {
    setIsPaused(true);
    setIndex((prev) => (prev <= 0 ? FEATURED_PROJECTS.length : prev - 1));
    setTimeout(() => setIsPaused(false), 8000);
  };

  const handleNext = () => {
    setIsPaused(true);
    setIndex((prev) => {
      if (prev >= FEATURED_PROJECTS.length * 2 - 1) {
        return FEATURED_PROJECTS.length;
      }
      return prev + 1;
    });
    setTimeout(() => setIsPaused(false), 8000);
  };

  return (
    <section
      id="showcase"
      ref={sectionContainerRef}
      className="py-24 bg-black relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Background Grid Accent with Parallax */}
      <motion.div
        style={{ y: gridY }}
        className="grid-bg absolute inset-0 opacity-10 pointer-events-none will-change-transform"
      />

      {/* Ambient Radial Cyber Glow Behind Carousel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-[#39FF14]/[0.025] blur-[140px] pointer-events-none" />

      {/* Section Header Block */}
      <motion.div
        style={{ y: headerY }}
        className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-16 will-change-transform"
      >
        <div ref={sectionHeaderRef} className="flex flex-col items-center text-center">
          {/* Wireframe Emblem & Headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center w-full"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter drop-shadow-[0_0_20px_rgba(57,255,20,0.2)] uppercase flex flex-col sm:flex-row items-center justify-center gap-x-3">
              {lang === 'EN' ? (
                <>
                  <VariableProximity
                    label="RECENT"
                    className="text-white"
                    fromFontVariationSettings="'wght' 400, 'opsz' 9"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    containerRef={sectionHeaderRef}
                    radius={150}
                    falloff="linear"
                  />
                  {' '}
                  <VariableProximity
                    label="DEPLOYMENTS"
                    className="text-[#39FF14]"
                    fromFontVariationSettings="'wght' 400, 'opsz' 9"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    containerRef={sectionHeaderRef}
                    radius={150}
                    falloff="linear"
                  />
                </>
              ) : (
                <>
                  <VariableProximity
                    label="近期"
                    className="text-white"
                    fromFontVariationSettings="'wght' 400, 'opsz' 9"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    containerRef={sectionHeaderRef}
                    radius={150}
                    falloff="linear"
                  />
                  {' '}
                  <VariableProximity
                    label="部署專案"
                    className="text-[#39FF14]"
                    fromFontVariationSettings="'wght' 400, 'opsz' 9"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    containerRef={sectionHeaderRef}
                    radius={150}
                    falloff="linear"
                  />
                </>
              )}
            </h2>
          </motion.div>

          {/* Subtitle Paragraph */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-3xl text-gray-400 text-base md:text-lg font-light tracking-wide leading-relaxed"
          >
            {lang === 'EN'
              ? 'A selection of bespoke web architectures, publishing engines, and digital ecosystems engineered by Nove.'
              : '精選由英商了解文化所打造的高效能網站架構、出版引擎與數位生態系。'}
          </motion.p>
        </div>
      </motion.div>

      {/* Infinite Carousel Reel */}
      <motion.div
        style={{ y: carouselY }}
        className="relative w-full overflow-hidden py-10 will-change-transform"
      >
        {/* Soft edge masking for smooth fade */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex gap-8"
          animate={{ x: centeringOffset - index * step }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            mass: 1,
          }}
          style={{ width: 'fit-content' }}
        >
          {scrollItems.map((project, idx) => (
            <ProjectCard
              key={`${project.id}-${idx}`}
              project={project}
              index={idx % FEATURED_PROJECTS.length}
              lang={lang}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Navigation Controls */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 relative z-10">
        <div className="flex items-center gap-6">
          {/* Previous Arrow */}
          <motion.button
            whileHover={{ scale: 1.1, color: '#39FF14' }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            className="w-12 h-12 flex items-center justify-center border border-white/10 text-white/50 hover:border-[#39FF14] hover:text-[#39FF14] hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all bg-black/40"
            aria-label="Previous project"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Project Indicator */}
          <div className="font-mono text-xs text-white/40 tracking-[0.2em]">
            <span className="text-[#39FF14]">
              {String((index % FEATURED_PROJECTS.length) + 1).padStart(2, '0')}
            </span>{' '}
            / {String(FEATURED_PROJECTS.length).padStart(2, '0')}
          </div>

          {/* Next Arrow */}
          <motion.button
            whileHover={{ scale: 1.1, color: '#39FF14' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="w-12 h-12 flex items-center justify-center border border-white/10 text-white/50 hover:border-[#39FF14] hover:text-[#39FF14] hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all bg-black/40"
            aria-label="Next project"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default RecentWorkCarousel;
