import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../App';
import VariableProximity from './VariableProximity';

interface ServiceItem {
  title: string;
  description: string;
  tags: string[];
  index: number;
  path: string;
  id: string;
  lang: Language;
}

interface CapabilitiesProps {
  lang: Language;
}

const servicesContent = {
  EN: [
    {
      id: "web",
      title: "Web & UI/UX Design",
      description: "Crafting digital experiences that resonate across borders. We specialize in bilingual interfaces that maintain aesthetic integrity in both Latin and Chinese typography.",
      tags: ["Figma", "React", "Bilingual Typography", "UX Strategy"],
      path: "/services/web-design"
    },
    {
      id: "creative",
      title: "Creative Ad Assets",
      description: "Visual storytelling for the global market. High-impact graphic design, motion assets, and brand identities that bridge Western flair with Eastern nuances.",
      tags: ["Branding", "Motion Graphics", "Art Direction", "OOH Design"],
      path: "/services/creative-assets"
    },
    {
      id: "language",
      title: "Language Services",
      description: "More than just translation. We provide nuanced Traditional Chinese localization, verbal interpretation, and cultural consulting for a seamless market entry.",
      tags: ["Translation", "Interpretation", "Copywriting", "Localization"],
      path: "/services/language-services"
    },
    {
      id: "google",
      title: "Google AI & Maps Optimization",
      description: "Transform how your brand appears across the Google ecosystem. We optimize your digital presence for AI search results and Google Maps, ensuring maximum visibility.",
      tags: ["Local SEO", "Google Business Profile", "AI Search", "Knowledge Graph"],
      path: "/services/google-optimization"
    },
    {
      id: "voice",
      title: "AI Voice & Conversational UI",
      description: "Bilingual AI voice chat, real-time interaction for hospitality and global brands. We bridge the gap between human intent and machine response.",
      tags: ["AI Voice", "Conversational UI", "Hospitality Tech", "Bilingual Chat"],
      path: "/services/ai-voice"
    },
    {
      id: "app",
      title: "Cross-Platform App Development",
      description: "SaaS solutions, mobile apps (iOS/Android), and scalable business tech. We build robust applications that grow with your business needs.",
      tags: ["SaaS", "iOS/Android", "Scalable Tech", "Business Solutions"],
      path: "/services/app-development"
    }
  ],
  ZH: [
    {
      id: "web",
      title: "網頁與 UI/UX 設計",
      description: "打造跨越國界的數位體驗。我們專注於雙語介面，確保拉丁字母與中文字體呈現同樣的美感。",
      tags: ["Figma", "React", "雙語字體學", "UX 策略"],
      path: "/services/web-design"
    },
    {
      id: "creative",
      title: "廣告創意素材",
      description: "為全球市場打造視覺故事。具備西方創意與東方內涵的高質感平面設計、動態素材與品牌識別。",
      tags: ["品牌識別", "動態圖像", "藝術指導", "戶外廣告"],
      path: "/services/creative-assets"
    },
    {
      id: "language",
      title: "語言服務",
      description: "不僅僅是翻譯。我們提供細膩的繁體中文在地化、口譯及文化顧問服務，助力品牌順利進軍市場。",
      tags: ["專業翻譯", "現場口譯", "廣告文案", "在地化策略"],
      path: "/services/language-services"
    },
    {
      id: "google",
      title: "Google AI 與地圖優化",
      description: "全面提升品牌在 Google 生態系統中的能見度。針對 AI 搜尋結果與 Google 地圖進行深度優化，確保最高信任度。",
      tags: ["在地化搜尋", "商家檔案優化", "AI 搜尋優化", "知識圖譜"],
      path: "/services/google-optimization"
    },
    {
      id: "voice",
      title: "AI 語音與對話式介面",
      description: "雙語 AI 語音對話，為餐旅業與全球品牌提供即時互動。我們縮短了人類意圖與機器回應之間的距離。",
      tags: ["AI 語音", "對話式介面", "餐旅科技", "雙語對話"],
      path: "/services/ai-voice"
    },
    {
      id: "app",
      title: "跨平台應用程式開發",
      description: "SaaS 解決方案、行動應用程式 (iOS/Android) 以及具擴展性的商業技術。我們打造能隨企業需求成長的穩健應用程式。",
      tags: ["SaaS", "iOS/Android", "擴展性技術", "商業解決方案"],
      path: "/services/app-development"
    }
  ]
};

const ServiceCard: React.FC<ServiceItem> = ({ title, description, tags, index, path, lang }) => {
  const displayNumber = (index + 1).toString().padStart(2, '0');
  const cardRef = useRef<HTMLAnchorElement>(null);
  
  return (
    <Link 
      to={path}
      ref={cardRef}
      className="reveal-card relative overflow-hidden border border-white/10 p-8 bg-black flex flex-col justify-between group hover:border-[#39FF14] transition-all duration-500 block h-full"
    >
      {/* Large Background Number */}
      <div className="absolute -top-4 -right-2 text-8xl md:text-9xl font-black text-white/5 select-none transition-all duration-700 group-hover:text-[#39FF14]/10 group-hover:-translate-y-2 group-hover:translate-x-2 pointer-events-none">
        {displayNumber}
      </div>

      <div className="relative z-10">
        <h3 className="text-xl md:text-2xl font-black pt-12 mb-6 uppercase tracking-tight text-white group-hover:text-[#39FF14] transition-colors duration-300">
          <VariableProximity
            label={title}
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={cardRef}
            radius={80}
            falloff="linear"
          />
        </h3>
        <p className="text-gray-400 leading-relaxed mb-8 group-hover:text-gray-300 transition-colors text-sm md:text-base min-h-[4rem]">
          {description}
        </p>

        {/* Action Button */}
        <div className="mb-10 w-full py-3 border border-white/10 bg-transparent group-hover:bg-[#39FF14] group-hover:text-black group-hover:border-[#39FF14] text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 text-center">
          {lang === 'EN' ? 'EXAMPLES & PRICES' : '案例與價格'}
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
        {tags.map(tag => (
          <span 
            key={tag} 
            className="text-[9px] md:text-[10px] border border-white/10 px-2 py-1 text-white/40 font-bold tracking-widest uppercase transition-colors group-hover:border-[#39FF14]/20 group-hover:text-white/70"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
};

const Capabilities: React.FC<CapabilitiesProps> = ({ lang }) => {
  const currentServices = servicesContent[lang];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {currentServices.map((service, index) => (
        <ServiceCard key={`${lang}-${index}`} {...service} index={index} lang={lang} />
      ))}
    </div>
  );
};

export default Capabilities;
