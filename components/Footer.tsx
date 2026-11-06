import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../App';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="py-12 border-t border-white/10 bg-black px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <div className="text-xl font-black tracking-tighter flex items-center justify-center md:justify-start gap-2">
              <span>
                <span className="text-[#39FF14]">NOVE</span>INT
              </span>
              <img 
                src="/nove_trans_300.webp" 
                alt={lang === 'EN' ? 'Nove International Limited Logo' : '英商了解文化股份有限公司標誌'} 
                className="h-[1.25em] w-auto inline-block object-contain opacity-90"
              />
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
              {lang === 'EN' ? 'GLOBAL DIGITAL ARCHITECTURE' : '全球數位架構'} &copy; {new Date().getFullYear()}
            </p>
          </div>

          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              {lang === 'EN' ? 'Privacy Policy' : '隱私政策'}
            </Link>
            <Link to="/terms-and-conditions" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              {lang === 'EN' ? 'Terms & Conditions' : '服務條款'}
            </Link>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[10px] text-[#39FF14]/60 uppercase tracking-[0.4em] font-black">
              {lang === 'EN' ? 'UK / GLOBAL' : '英國 / 全球'}
            </p>
            <p className="text-[10px] text-white font-bold uppercase tracking-[0.3em] mt-1">GMT / UTC</p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5">
          <p className="text-[9px] text-gray-600 leading-relaxed text-center md:text-left max-w-4xl">
            {lang === 'EN' 
              ? '© 2026 Nove International Limited. noveint.com is a trading name of Nove International Limited, a company registered in England and Wales. Company Number: 16222266 | Registered Office: 274 Northdown Road, Margate, Kent, CT9 2PT'
              : '© 2026 Nove International Limited。noveint.com 為 Nove International Limited 之交易名稱。本公司於英格蘭及威爾斯註冊。公司編號：16222266 | 註冊地址：274 Northdown Road, Margate, Kent, CT9 2PT'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;