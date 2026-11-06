import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Language } from '../App';

interface SEOHeadProps {
  lang: Language;
}

interface RouteMeta {
  titleEn: string;
  titleZh: string;
  descEn: string;
  descZh: string;
}

const BASE_URL = 'https://www.noveint.com';

const ROUTE_METADATA: Record<string, RouteMeta> = {
  '/': {
    titleEn: 'Nove International | Digital Agency, Headless Web & AI Voice Solutions',
    titleZh: '英商了解文化 Nove International | 數位代理商・頂級網站建置・AI 語音互動系統',
    descEn: 'Nove International is a cross-border digital agency engineering high-performance headless websites, AI voice agents, and immersive global brand architectures.',
    descZh: '英商了解文化（Nove International）專注於跨國數位架構：高效能無頭網站建置、AI 語音即時互動系統及多語系品牌工程，助品牌無邊界躍升。'
  },
  '/about': {
    titleEn: 'About Us | Nove International – Cross-Border Digital Engineering',
    titleZh: '關於我們 | 英商了解文化 Nove International – 跨國數位工藝與品牌工程',
    descEn: 'Discover Nove International (英商了解文化), bridging UK creative direction with Taiwan premier digital engineering to craft future-proof digital footprints.',
    descZh: '深入了解英商了解文化股份有限公司：融合英倫前瞻創意與台灣頂尖數位研發實力，打造引領未來的跨國網站、AI 語音系統與數位足跡。'
  },
  '/services': {
    titleEn: 'Digital & AI Services | Nove International',
    titleZh: '專業數位與 AI 服務方案 | 英商了解文化 Nove International',
    descEn: 'Explore our end-to-end digital solutions: bespoke UI/UX web design, AI voice interfaces, creative ad assets, app development, and multilingual localization.',
    descZh: '探索英商了解文化的完整數位服務：極速網站設計、AI 即時語音互動、廣告創意資產、跨平台 App 開發與多國語系在地化整合方案。'
  },
  '/services/web-design': {
    titleEn: 'Web & UI/UX Design | Nove International',
    titleZh: '網頁與 UI/UX 設計 | 英商了解文化 Nove International',
    descEn: 'Bespoke, high-performance website design and headless architecture built for maximum conversion, ultra-low latency, and seamless global brand identity.',
    descZh: '專為跨國品牌量身打造的高效能無頭網站與 UI/UX 體驗，結合前衛互動動態與極速載入技術，打造無可比擬的轉換率與品牌高度。'
  },
  '/services/creative-assets': {
    titleEn: 'Creative Ad Assets & 3D Media | Nove International',
    titleZh: '廣告創意資產與 3D 視覺 | 英商了解文化 Nove International',
    descEn: 'Cinematic 3D animation, generative visuals, and high-impact digital advertising assets crafted to elevate brand authority across global markets.',
    descZh: '頂級 3D 動態影像、生成式數位藝術與跨渠道廣告資產製作，為現代企業建立具備強大穿透力與記憶點的跨國品牌視覺識別。'
  },
  '/services/language-services': {
    titleEn: 'Multilingual Localization & Copywriting | Nove International',
    titleZh: '專業多語在地化與品牌文案 | 英商了解文化 Nove International',
    descEn: 'Nuanced bilingual English & Traditional Chinese copywriting, cross-cultural brand adaptation, and global communication architecture.',
    descZh: '深諳跨文化語境的英中雙語品牌文案與在地化轉譯服務，消除語言隔閡，協助跨國企業精準打入英語系與華語主流市場。'
  },
  '/services/google-optimization': {
    titleEn: 'Google AI & Maps Optimization | Nove International',
    titleZh: 'Google AI 搜尋與商家地圖最佳化 | 英商了解文化 Nove International',
    descEn: 'Enterprise Google Search and AI optimization, Google Business Profile scaling, and local SEO engineering to dominate organic search results.',
    descZh: '結合 Google AI 搜尋演算法、結構化資料標記與 Google 商家地圖全面優化，協助企業在國際與本地關鍵字搜尋中搶佔第一曝光位。'
  },
  '/services/ai-voice': {
    titleEn: 'AI Voice & Conversational UI | Nove International',
    titleZh: 'AI 語音互動系統與對話式 UI | 英商了解文化 Nove International',
    descEn: 'Deploy ultra-low-latency, bidirectional AI voice assistants and conversational UI powered by Gemini Live for human-like customer interaction.',
    descZh: '導入極低延遲、具備情感共鳴的雙向 AI 語音智能助理，結合 Gemini 即時模型與語音串流技術，重塑未來的智慧客服與品牌互動體驗。'
  },
  '/services/app-development': {
    titleEn: 'Cross-Platform App Development | Nove International',
    titleZh: '跨平台 App 應用程式開發 | 英商了解文化 Nove International',
    descEn: 'Scalable React Native, iOS, Android, and PWA applications engineered for exceptional responsiveness, fluid animations, and robust reliability.',
    descZh: '打造兼具極致流暢度與高擴展性的 React Native、iOS、Android 及 PWA 應用程式，賦予品牌穩定無縫的跨裝置行動體驗。'
  },
  '/privacy-policy': {
    titleEn: 'Privacy Policy | Nove International',
    titleZh: '隱私權政策 | 英商了解文化 Nove International',
    descEn: 'Read the privacy policy of Nove International Limited regarding data protection, user privacy, and cross-border digital compliance.',
    descZh: '查閱英商了解文化股份有限公司的隱私權政策，瞭解我們如何嚴格保護您的個人資料、數位隱私與跨國合規規範。'
  },
  '/terms-and-conditions': {
    titleEn: 'Terms & Conditions | Nove International',
    titleZh: '服務條款 | 英商了解文化 Nove International',
    descEn: 'Review the terms and conditions of Nove International Limited governing use of our website, digital platforms, and client services.',
    descZh: '查閱英商了解文化股份有限公司的服務條款，詳細了解使用我們網站平台與各項專業數位服務之權利與義務規範。'
  }
};

const DEFAULT_META: RouteMeta = {
  titleEn: 'Nove International | Digital Agency, Headless Web & AI Voice Solutions',
  titleZh: '英商了解文化 Nove International | 數位代理商・頂級網站建置・AI 語音互動系統',
  descEn: 'Nove International is a cross-border digital agency engineering high-performance headless websites, AI voice agents, and immersive global brand architectures.',
  descZh: '英商了解文化（Nove International）專注於跨國數位架構：高效能無頭網站建置、AI 語音即時互動系統及多語系品牌工程，助品牌無邊界躍升。'
};

const setOrCreateMeta = (selector: string, attribute: string, attrValue: string, content: string) => {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const setOrCreateLink = (rel: string, href: string, hreflang?: string) => {
  let selector = `link[rel="${rel}"]`;
  if (hreflang) {
    selector += `[hreflang="${hreflang}"]`;
  }
  let element = document.querySelector(selector) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    if (hreflang) {
      element.hreflang = hreflang;
    }
    document.head.appendChild(element);
  }
  element.href = href;
};

export const SEOHead: React.FC<SEOHeadProps> = ({ lang }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Resolve localized metadata
    const cleanPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
    const meta = ROUTE_METADATA[cleanPath] || DEFAULT_META;

    const isZh = lang === 'ZH';
    const activeLangCode = isZh ? 'zh-TW' : 'en';
    const activeLocale = isZh ? 'zh_TW' : 'en_US';
    const activeTitle = isZh ? meta.titleZh : meta.titleEn;
    const activeDesc = isZh ? meta.descZh : meta.descEn;

    const currentUrl = cleanPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${cleanPath}`;
    const defaultImageUrl = `${BASE_URL}/nove_og_image.png`;

    // 2. Update dynamic document title & lang attribute
    document.title = activeTitle;
    document.documentElement.lang = activeLangCode;

    // 3. Update Standard Meta Description & Keywords
    setOrCreateMeta('meta[name="description"]', 'name', 'description', activeDesc);
    const keywords = isZh
      ? '英商了解文化, Nove International, 數位代理商, 跨國網站建置, 無頭電商, AI 語音互動, 網站設計, 台灣英國數位工程, NoveTools'
      : 'Nove International, Digital Agency, Global Digital Architect, Headless Web Development, AI Voice Integration, SaaS App Development, Multilingual UI/UX, NoveTools';
    setOrCreateMeta('meta[name="keywords"]', 'name', 'keywords', keywords);

    // 4. Update Canonical Link
    setOrCreateLink('canonical', currentUrl);

    // 5. Update Multilingual Hreflang Alternates
    setOrCreateLink('alternate', currentUrl, 'en');
    setOrCreateLink('alternate', currentUrl, 'zh-TW');
    setOrCreateLink('alternate', currentUrl, 'x-default');

    // 6. Update Open Graph Meta Tags
    setOrCreateMeta('meta[property="og:title"]', 'property', 'og:title', activeTitle);
    setOrCreateMeta('meta[property="og:description"]', 'property', 'og:description', activeDesc);
    setOrCreateMeta('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    setOrCreateMeta('meta[property="og:image"]', 'property', 'og:image', defaultImageUrl);
    setOrCreateMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    setOrCreateMeta('meta[property="og:locale"]', 'property', 'og:locale', activeLocale);
    setOrCreateMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Nove International');

    // 7. Update Twitter Card Meta Tags
    setOrCreateMeta('meta[property="twitter:card"], meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setOrCreateMeta('meta[property="twitter:title"], meta[name="twitter:title"]', 'name', 'twitter:title', activeTitle);
    setOrCreateMeta('meta[property="twitter:description"], meta[name="twitter:description"]', 'name', 'twitter:description', activeDesc);
    setOrCreateMeta('meta[property="twitter:image"], meta[name="twitter:image"]', 'name', 'twitter:image', defaultImageUrl);
    setOrCreateMeta('meta[property="twitter:url"], meta[name="twitter:url"]', 'name', 'twitter:url', currentUrl);

    // 8. Inject / Update JSON-LD Structured Data (ProfessionalService / Organization)
    let jsonLdScript = document.getElementById('nove-seo-jsonld') as HTMLScriptElement | null;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = 'nove-seo-jsonld';
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['ProfessionalService', 'Organization'],
          '@id': `${BASE_URL}/#organization`,
          'name': 'Nove International Limited (英商了解文化股份有限公司)',
          'alternateName': ['Nove International', '英商了解文化', 'Nove'],
          'url': BASE_URL,
          'logo': {
            '@type': 'ImageObject',
            'url': `${BASE_URL}/nove_int_favicon-180.png`,
            'width': 180,
            'height': 180
          },
          'image': defaultImageUrl,
          'description': isZh
            ? '英商了解文化（Nove International）為頂級跨國數位代理商，專精於高效能無頭網站建置、即時雙向 AI 語音系統、高轉換率 3D 視覺及多語系跨文化品牌架構。'
            : 'Nove International is a premier cross-border digital agency engineering headless websites, bidirectional AI voice systems, high-converting 3D assets, and global brand architectures.',
          'knowsLanguage': ['en', 'zh-TW'],
          'areaServed': [
            { '@type': 'Country', 'name': 'United Kingdom' },
            { '@type': 'Country', 'name': 'Taiwan' },
            { '@type': 'Country', 'name': 'United States' },
            'Worldwide'
          ],
          'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': 'Nove Digital & AI Services',
            'itemListElement': [
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': isZh ? '網頁與 UI/UX 設計' : 'Web & UI/UX Design',
                  'url': `${BASE_URL}/services/web-design`,
                  'description': isZh ? '專為跨國品牌量身打造的高效能無頭網站與 UI/UX 體驗。' : 'High-performance website design and headless architecture built for maximum conversion.'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': isZh ? 'AI 語音互動系統與對話式 UI' : 'AI Voice & Conversational UI',
                  'url': `${BASE_URL}/services/ai-voice`,
                  'description': isZh ? '極低延遲、具備情感共鳴的雙向 AI 語音智能助理。' : 'Bidirectional AI voice assistants powered by Gemini Live for human-like customer interaction.'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': isZh ? '廣告創意資產與 3D 視覺' : 'Creative Ad Assets & 3D Media',
                  'url': `${BASE_URL}/services/creative-assets`,
                  'description': isZh ? '頂級 3D 動態影像與生成式視覺資產製作。' : 'Cinematic 3D animation, generative visuals, and digital advertising assets.'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': isZh ? '專業多語在地化與品牌文案' : 'Multilingual Localization & Copywriting',
                  'url': `${BASE_URL}/services/language-services`,
                  'description': isZh ? '深諳跨文化語境的英中雙語品牌文案與在地化轉譯服務。' : 'Nuanced bilingual English & Traditional Chinese copywriting and cross-cultural brand adaptation.'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': isZh ? 'Google AI 搜尋與商家地圖最佳化' : 'Google AI & Maps Optimization',
                  'url': `${BASE_URL}/services/google-optimization`,
                  'description': isZh ? '結合 Google AI 搜尋演算法、結構化資料標記與 Google 商家地圖優化。' : 'Enterprise Google Search and AI optimization and local SEO engineering.'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': isZh ? '跨平台 App 應用程式開發' : 'Cross-Platform App Development',
                  'url': `${BASE_URL}/services/app-development`,
                  'description': isZh ? '打造兼具極致流暢度與高擴展性的 React Native、iOS、Android 及 PWA 應用程式。' : 'Scalable React Native, iOS, Android, and PWA applications.'
                }
              }
            ]
          },
          'sameAs': [
            'https://novetools.com'
          ]
        },
        {
          '@type': 'WebSite',
          '@id': `${BASE_URL}/#website`,
          'url': `${BASE_URL}/`,
          'name': 'Nove International',
          'publisher': {
            '@id': `${BASE_URL}/#organization`
          },
          'inLanguage': ['en', 'zh-TW']
        },
        {
          '@type': 'WebPage',
          '@id': `${currentUrl}#webpage`,
          'url': currentUrl,
          'name': activeTitle,
          'description': activeDesc,
          'isPartOf': {
            '@id': `${BASE_URL}/#website`
          },
          'inLanguage': activeLangCode
        }
      ]
    };

    jsonLdScript.textContent = JSON.stringify(structuredData);
  }, [pathname, lang]);

  return null;
};

export default SEOHead;
