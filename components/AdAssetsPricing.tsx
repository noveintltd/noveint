import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../App';

interface AdAssetsPricingProps {
  lang: Language;
}

interface PackageFeature {
  text: string;
  included: boolean;
}

interface Package {
  title: string;
  description: string;
  price: string;
  currency: string;
  badge?: string;
  features: PackageFeature[];
}

const AdAssetsPricing: React.FC<AdAssetsPricingProps> = ({ lang }) => {
  const packages: Package[] = [
    {
      title: lang === 'EN' ? 'Simple solution' : '小資方案',
      description: lang === 'EN' ? 'Limited time and quantity' : '限時限量',
      price: lang === 'EN' ? '40' : '1,980',
      currency: lang === 'EN' ? '£' : 'NT$',
      features: [
        { text: lang === 'EN' ? 'A design' : '一款設計', included: true },
        { text: lang === 'EN' ? 'Licensed for any purpose' : '授權任何用途使用', included: true },
        { text: lang === 'EN' ? 'Provide original design files' : '提供設計原檔', included: true },
      ]
    },
    {
      title: lang === 'EN' ? 'Basic Plan' : '基本方案',
      description: lang === 'EN' ? 'Original price £115' : '原價 $5000',
      price: lang === 'EN' ? '75' : '3,500',
      currency: lang === 'EN' ? '£' : 'NT$',
      features: [
        { text: lang === 'EN' ? 'One design, two minor revisions, and countless tweaks' : '一款設計，兩次小改，無限次微調', included: true },
        { text: lang === 'EN' ? 'Licensed for any purpose' : '授權任何用途使用', included: true },
        { text: lang === 'EN' ? 'Provide original design files' : '提供設計原檔', included: true },
      ]
    },
    {
      title: lang === 'EN' ? 'Advanced solution' : '進階方案',
      description: lang === 'EN' ? 'Original price £210' : '原價 $10,000',
      price: lang === 'EN' ? '140' : '6,000',
      currency: lang === 'EN' ? '£' : 'NT$',
      features: [
        { text: lang === 'EN' ? 'Two designs, two minor revisions, and no limit on tweaks' : '兩款設計，兩次小改，無限次微調', included: true },
        { text: lang === 'EN' ? 'Licensed for any purpose' : '授權任何用途使用', included: true },
        { text: lang === 'EN' ? 'Provide original design files' : '提供設計原檔', included: true },
      ]
    },
    {
      title: lang === 'EN' ? 'Complete Solution' : '商標方案',
      description: lang === 'EN' ? 'Includes design, registration, and certification fees.' : '包含設計、註冊及規費。',
      price: lang === 'EN' ? '320' : '15,000',
      currency: lang === 'EN' ? '£' : 'NT$',
      features: [
        { text: lang === 'EN' ? 'One design, two minor revisions, and countless tweaks' : '一款設計，兩次小改，無限次微調', included: true },
        { text: lang === 'EN' ? 'Licensed for any purpose' : '授權任何用途使用', included: true },
        { text: lang === 'EN' ? 'Provide original design files' : '提供設計原檔', included: true },
      ]
    }
  ];

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {packages.map((pkg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex flex-col h-full overflow-hidden"
          >
            {pkg.badge && (
              <div className="absolute top-4 -right-12 bg-[#39FF14] text-black text-[8px] font-black tracking-widest uppercase py-1 px-12 rotate-45 z-20 shadow-xl">
                {pkg.badge}
              </div>
            )}

            {/* Corners */}
            <div className="absolute -top-px -left-px w-4 h-4 border-t border-l border-[#39FF14] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-[#39FF14] opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="mb-10 pb-8 border-b border-white/5">
              <div className="text-[10px] text-[#39FF14] font-black tracking-[0.3em] uppercase mb-4 opacity-50">Package 0{idx + 1}</div>
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
                        <svg className="w-3.5 h-3.5 text-white/5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default AdAssetsPricing;
