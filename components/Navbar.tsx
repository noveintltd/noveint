import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Language } from '../App';

interface NavbarProps {
  scrolled: boolean;
  lang: Language;
  toggleLang: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, lang, toggleLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        setIsOpen(false);
      }
    } else {
      // If not on home page, navigate to home first then scroll (or just navigate)
      setIsOpen(false);
    }
  };

  const handleToggleLang = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLang();
    setIsOpen(false);
  };

  const navLinks = [
    { path: '/', label: lang === 'EN' ? 'Home' : '首頁', id: 'home' },
    { path: '/about', label: lang === 'EN' ? 'About' : '關於我們' },
    { path: '/services', label: lang === 'EN' ? 'Services' : '服務項目' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[140] border-0 border-transparent outline-none shadow-none transition-all duration-300 ${
          scrolled || isOpen ? "is-scrolled py-3 md:py-4" : "bg-transparent py-6 md:py-8"
        }`}
        style={{ borderBottom: 'none', borderBottomWidth: 0, boxShadow: 'none' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-10 md:h-12 border-0 border-transparent shadow-none">
          {/* Logo */}
          <Link 
            to="/"
            className="text-2xl font-black tracking-tighter flex items-center gap-2 shrink-0 cursor-pointer relative z-[150] group"
            onClick={() => setIsOpen(false)}
          >
            <span>
              <span className="text-[#39FF14]">NOVE</span>INT
            </span>
            <img 
              src="/nove_trans_300.webp" 
              alt={lang === 'EN' ? 'Nove International Limited Logo' : '英商了解文化股份有限公司標誌'} 
              className="h-[1.25em] w-auto inline-block object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-widest uppercase">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path}
                onClick={(e) => link.id && handleScrollTo(e, link.id)}
                className={`relative py-2 transition-colors ${location.pathname === link.path ? 'text-[#39FF14]' : 'text-white hover:text-[#39FF14]'}`}
              >
                <motion.span whileHover="hover" initial="initial" className="relative">
                  {link.label}
                  <motion.div 
                    variants={{
                      hover: { scaleX: 1, opacity: 1 },
                      initial: { scaleX: location.pathname === link.path ? 1 : 0, opacity: location.pathname === link.path ? 1 : 0 }
                    }}
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#39FF14] shadow-[0_0_10px_#39FF14]"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ originX: 0 }}
                  />
                </motion.span>
              </Link>
            ))}
            
            <button 
              onClick={toggleLang}
              aria-label={lang === 'EN' ? 'Switch language to Traditional Chinese' : 'Switch language to English'}
              className="ml-4 relative py-1.5 px-4 border border-[#39FF14] text-xs text-[#39FF14] hover:bg-[#39FF14] hover:text-black transition-all duration-200 font-black tracking-[0.1em] whitespace-nowrap"
            >
              <motion.span whileHover="hover" initial="initial" className="relative">
                {lang === 'EN' ? '繁體中文' : 'English'}
                <motion.div 
                  variants={{
                    hover: { scaleX: 1, opacity: 1 },
                    initial: { scaleX: 0, opacity: 0 }
                  }}
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#39FF14] shadow-[0_0_10px_#39FF14]"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ originX: 0 }}
                />
              </motion.span>
            </button>
          </div>

          {/* Mobile UI Buttons */}
          <div className="md:hidden flex items-center gap-4 relative z-[150]">
            <button 
              onClick={handleToggleLang}
              aria-label={lang === 'EN' ? 'Switch language to Traditional Chinese' : 'Switch language to English'}
              className={`border border-[#39FF14] px-3 py-1 text-[10px] text-[#39FF14] font-bold transition-all duration-300 ${
                isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              {lang === 'EN' ? '繁體中文' : 'English'}
            </button>
            
            <button 
              className="w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={lang === 'EN' ? (isOpen ? 'Close navigation menu' : 'Open navigation menu') : (isOpen ? '關閉導航選單' : '開啟導航選單')}
            >
              <div className={`w-7 h-0.5 bg-[#39FF14] transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-0.5' : 'mb-1.5'}`} />
              <div className={`w-7 h-0.5 bg-[#39FF14] transition-opacity duration-200 ${isOpen ? 'opacity-0' : 'mb-1.5'}`} />
              <div className={`w-7 h-0.5 bg-[#39FF14] transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-0.5' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[130] bg-black transition-transform duration-500 ease-in-out md:hidden ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full px-10 gap-10">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={(e) => {
                setIsOpen(false);
                link.id && handleScrollTo(e, link.id);
              }}
              className={`text-4xl font-black uppercase tracking-tighter hover:text-[#39FF14] transition-all duration-500 transform ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}

          <button 
            onClick={handleToggleLang}
            className="neon-button w-full max-w-xs py-5 text-sm font-black tracking-widest uppercase"
          >
            {lang === 'EN' ? '繁體中文' : 'English'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;