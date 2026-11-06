import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../App';

interface PackageFeature {
  text: string;
  included: boolean;
}

interface Package {
  title: string;
  description: string;
  price: string;
  currency: string;
  features: PackageFeature[];
}

interface ServicePricingProps {
  lang: Language;
  serviceType: 'language' | 'google' | 'voice' | 'apps';
}

const ServicePricing: React.FC<ServicePricingProps> = ({ lang, serviceType }) => {
  const getPackages = (): Package[] => {
    switch (serviceType) {
      case 'language':
        return [
          {
            title: lang === 'EN' ? 'Document Essentials' : '文件精選',
            description: lang === 'EN' ? 'Precision translation for standard documents.' : '標準文件的精準翻譯。',
            price: lang === 'EN' ? '45' : '1,800',
            currency: lang === 'EN' ? '£' : 'NT$',
            features: [
              { text: lang === 'EN' ? 'Up to 2000 words' : '最多 2000 字', included: true },
              { text: lang === 'EN' ? 'Native stylistic review' : '母語風格校對', included: true },
              { text: lang === 'EN' ? 'Formatting preservation' : '格式完整保留', included: true },
              { text: lang === 'EN' ? 'Cultural consulting' : '文化諮詢', included: false },
            ]
          },
          {
            title: lang === 'EN' ? 'Content Localization' : '內容在地化',
            description: lang === 'EN' ? 'Adapt your marketing message for Eastern markets.' : '為東方市場調整您的行銷訊息。',
            price: lang === 'EN' ? '120' : '4,800',
            currency: lang === 'EN' ? '£' : 'NT$',
            features: [
              { text: lang === 'EN' ? 'Marketing & Creative copy' : '行銷與創意文案', included: true },
              { text: lang === 'EN' ? 'SEO keyword localization' : 'SEO 關鍵字在地化', included: true },
              { text: lang === 'EN' ? 'Tone & Voice adjustment' : '語氣與音調調整', included: true },
              { text: lang === 'EN' ? 'Cultural consulting' : '文化諮詢', included: true },
            ]
          },
          {
            title: lang === 'EN' ? 'Strategic Global' : '全球戰略',
            description: lang === 'EN' ? 'Full scale cultural and linguistic adaptation.' : '全面的文化與語言調整。',
            price: lang === 'EN' ? '350' : '14,000',
            currency: lang === 'EN' ? '£' : 'NT$',
            features: [
              { text: lang === 'EN' ? 'Full website localization' : '全站在地化', included: true },
              { text: lang === 'EN' ? 'Legal & Technical compliance' : '法律與技術合規', included: true },
              { text: lang === 'EN' ? 'Market entry strategy' : '市場進入策略', included: true },
              { text: lang === 'EN' ? 'On-call cultural advisor' : '即時文化顧問', included: true },
            ]
          }
        ];
      case 'google':
        return [
          {
            title: lang === 'EN' ? 'Local Visibility' : '在地曝光',
            description: lang === 'EN' ? 'Optimize your Google Maps presence.' : '優化您的 Google 地圖呈現。',
            price: lang === 'EN' ? '80' : '3,200',
            currency: lang === 'EN' ? '£' : 'NT$',
            features: [
              { text: lang === 'EN' ? 'GMB Profile Optimization' : 'GMB 檔案優化', included: true },
              { text: lang === 'EN' ? 'Keyword categorization' : '關鍵字分類', included: true },
              { text: lang === 'EN' ? 'Local citation building' : '在地引用建立', included: true },
              { text: lang === 'EN' ? 'AI Review responses' : 'AI 評論回覆', included: false },
            ]
          },
          {
            title: lang === 'EN' ? 'Growth Accelerator' : '增長加速器',
            description: lang === 'EN' ? 'Dominate local search results.' : '主導在地搜索結果。',
            price: lang === 'EN' ? '180' : '7,200',
            currency: lang === 'EN' ? '£' : 'NT$',
            features: [
              { text: lang === 'EN' ? 'Proactive review management' : '主動評論管理', included: true },
              { text: lang === 'EN' ? 'AI-powered content posts' : 'AI 驅動內容貼文', included: true },
              { text: lang === 'EN' ? 'Competitor map analysis' : '競爭對手地圖分析', included: true },
              { text: lang === 'EN' ? 'Multi-location sync' : '多地點同步', included: true },
            ]
          },
          {
            title: lang === 'EN' ? 'Global Domination' : '全球主導',
            description: lang === 'EN' ? 'Enterprise-level maps and SEO strategy.' : '企業級地圖與 SEO 策略。',
            price: lang === 'EN' ? '450' : '18,000',
            currency: lang === 'EN' ? '£' : 'NT$',
            features: [
              { text: lang === 'EN' ? 'Custom Maps API integration' : '自定義 Maps API 整合', included: true },
              { text: lang === 'EN' ? 'Global SEO architecture' : '全球 SEO 架構', included: true },
              { text: lang === 'EN' ? 'Real-time data dashboard' : '實時數據儀表板', included: true },
              { text: lang === 'EN' ? 'Personal account manager' : '專屬帳戶經理', included: true },
            ]
          }
        ];
      case 'voice':
        return [
          {
            title: lang === 'EN' ? 'Smart Assistant' : '智能助手',
            description: lang === 'EN' ? 'Custom AI voice agent for your business.' : '為您的企業量身打造的 AI 語音代理。',
            price: lang === 'EN' ? '250' : '10,000',
            currency: lang === 'EN' ? '£' : 'NT$',
            features: [
              { text: lang === 'EN' ? 'Custom knowledge base' : '自定義知識庫', included: true },
              { text: lang === 'EN' ? 'Basic conversational flow' : '基本對話流程', included: true },
              { text: lang === 'EN' ? 'Standard English/Chinese voice' : '標準英/中語音', included: true },
              { text: lang === 'EN' ? 'CRM Integration' : 'CRM 整合', included: false },
            ]
          },
          {
            title: lang === 'EN' ? 'Enterprise Voice' : '企業語音',
            description: lang === 'EN' ? 'Advanced conversational AI with intent detection.' : '具備意圖偵測的高級對話 AI。',
            price: lang === 'EN' ? '650' : '26,000',
            currency: lang === 'EN' ? '£' : 'NT$',
            features: [
              { text: lang === 'EN' ? 'Multi-step complex reasoning' : '多步複雜推理', included: true },
              { text: lang === 'EN' ? 'High-fidelity cloned voice' : '高保真克隆語音', included: true },
              { text: lang === 'EN' ? 'Seamless CRM integration' : '無縫 CRM 整合', included: true },
              { text: lang === 'EN' ? 'Real-time emotion detection' : '實時情緒偵測', included: true },
            ]
          },
          {
            title: lang === 'EN' ? 'Neural Network Concierge' : '神經網路管家',
            description: lang === 'EN' ? 'Cutting-edge bilingual digital human.' : '尖端的雙語數位人。',
            price: lang === 'EN' ? '1500' : '60,000',
            currency: lang === 'EN' ? '£' : 'NT$',
            features: [
              { text: lang === 'EN' ? 'Full avatar integration' : '完整虛擬形象整合', included: true },
              { text: lang === 'EN' ? 'Multilingual real-time translation' : '多語言實時翻譯', included: true },
              { text: lang === 'EN' ? 'Predictive customer analytics' : '預測性客戶分析', included: true },
              { text: lang === 'EN' ? 'Unlimited API scaling' : '無限 API 擴展', included: true },
            ]
          }
        ];
      case 'apps':
        return [
          {
            title: lang === 'EN' ? 'MVP Prototype' : 'MVP 原型',
            description: lang === 'EN' ? 'Rapid development of core features.' : '核心功能的快速開發。',
            price: lang === 'EN' ? '850' : '34,000',
            currency: lang === 'EN' ? '£' : 'NT$',
            features: [
              { text: lang === 'EN' ? 'Core functional workflow' : '核心功能工作流', included: true },
              { text: lang === 'EN' ? 'Primary UI/UX design' : '主要 UI/UX 設計', included: true },
              { text: lang === 'EN' ? 'Cross-platform compatibility' : '跨平台相容性', included: true },
              { text: lang === 'EN' ? 'Backend service hosting' : '後端服務託管', included: false },
            ]
          },
          {
            title: lang === 'EN' ? 'Scalable SaaS' : '可擴展 SaaS',
            description: lang === 'EN' ? 'Complete product for market launch.' : '用於市場發布的完整產品。',
            price: lang === 'EN' ? '2200' : '88,000',
            currency: lang === 'EN' ? '£' : 'NT$',
            features: [
              { text: lang === 'EN' ? 'Advanced user management' : '進階用戶管理', included: true },
              { text: lang === 'EN' ? 'Third-party API ecosystem' : '第三方 API 生態系統', included: true },
              { text: lang === 'EN' ? 'Performance optimization' : '性能優化', included: true },
              { text: lang === 'EN' ? 'Scalable Cloud architecture' : '可擴展雲端架構', included: true },
            ]
          },
          {
            title: lang === 'EN' ? 'Enterprise Platform' : '企業平台',
            description: lang === 'EN' ? 'Robust infrastructure for massive growth.' : '支撐巨大增長的強大基礎設施。',
            price: lang === 'EN' ? '5500' : '220,000',
            currency: lang === 'EN' ? '£' : 'NT$',
            features: [
              { text: lang === 'EN' ? 'Microservices architecture' : '微服務架構', included: true },
              { text: lang === 'EN' ? 'Military-grade security' : '軍事級安全性', included: true },
              { text: lang === 'EN' ? 'Predictive AI integration' : '預測性 AI 整合', included: true },
              { text: lang === 'EN' ? '24/7 Priority maintenance' : '24/7 優先維護', included: true },
            ]
          }
        ];
      default:
        return [];
    }
  };

  const packages = getPackages();

  return (
    <section id="pricing" className="mt-32 relative">
      <div className="flex flex-col items-center mb-16">
        <div className="w-12 h-1 bg-[#39FF14] mb-6" />
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-center">
          {lang === 'EN' ? (
            <>Service <span className="text-[#39FF14]">Pricing</span></>
          ) : (
            <>服務項目 <span className="text-[#39FF14]">價格列表</span></>
          )}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {packages.map((pkg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex flex-col h-full overflow-hidden"
          >
            {/* Corners */}
            <div className="absolute -top-px -left-px w-4 h-4 border-t border-l border-[#39FF14] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-[#39FF14] opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="mb-10 pb-8 border-b border-white/5">
              <div className="text-[10px] text-[#39FF14] font-black tracking-[0.3em] uppercase mb-4 opacity-50">Tier 0{idx + 1}</div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white group-hover:text-[#39FF14] transition-colors leading-tight">
                {pkg.title}
              </h3>
              <p className="text-[11px] text-gray-500 font-light tracking-wide leading-relaxed min-h-[3rem]">
                {pkg.description}
              </p>
            </div>

            <div className="mb-10 flex items-baseline gap-2">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{pkg.currency}</span>
              <span className="text-5xl font-black tracking-tighter text-white group-hover:text-[#39FF14] transition-colors">{pkg.price}</span>
            </div>

            <div className="flex-grow">
              <ul className="divide-y divide-white/5">
                {pkg.features.map((feature, fIdx) => (
                  <li key={fIdx} className={`py-4 flex items-start gap-4 text-[10px] uppercase tracking-[0.15em] ${feature.included ? 'text-gray-300' : 'text-gray-600'}`}>
                    <div className="mt-0.5 shrink-0">
                      {feature.included ? (
                        <svg className="w-3.5 h-3.5 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" className="opacity-20" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l4-4m-4 0l4 4" />
                        </svg>
                      )}
                    </div>
                    <span className={feature.included ? 'font-medium' : 'font-light line-through decoration-white/5 opacity-40'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <a 
              href="#contact" 
              className="mt-10 w-full py-4 border border-white/10 bg-transparent hover:bg-[#39FF14] hover:text-black hover:border-[#39FF14] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 text-center block"
            >
              {lang === 'EN' ? 'START PROJECT' : '啟動專案'}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicePricing;
