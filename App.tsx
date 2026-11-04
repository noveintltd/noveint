import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import WebDesign from './pages/services/WebDesign';
import CreativeAssets from './pages/services/CreativeAssets';
import LanguageServices from './pages/services/LanguageServices';
import GoogleOptimization from './pages/services/GoogleOptimization';
import AIVoice from './pages/services/AIVoice';
import AppDevelopment from './pages/services/AppDevelopment';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ChatBot from './components/ChatBot';
import SEOHead from './components/SEOHead';

export type Language = 'EN' | 'ZH';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<Language>('EN');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const detectLanguage = async () => {
      // Check if we've already detected or set a preference in this session
      const hasSetLang = sessionStorage.getItem('lang_detected');
      if (hasSetLang) return;

      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        // Continent code for Asia is 'AS'
        if (data.continent_code === 'AS') {
          setLang('ZH');
        } else {
          setLang('EN');
        }
        
        // Mark as detected for this session so we don't keep resetting it
        sessionStorage.setItem('lang_detected', 'true');
      } catch (error) {
        console.error('Language detection failed, defaulting to EN:', error);
        // Fallback is already EN, but we mark it as "attempted"
        sessionStorage.setItem('lang_detected', 'true');
      }
    };

    detectLanguage();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    setLang(prev => prev === 'EN' ? 'ZH' : 'EN');
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#39FF14] selection:text-black">
      <SEOHead lang={lang} />
      <ScrollToTop />
      
      {/* Vertical Progress Bar */}
      <div className="progress-bar-vertical hidden md:block">
        <div
          className="progress-fill"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      <Navbar scrolled={scrolled} lang={lang} toggleLang={toggleLang} />

      <Routes>
        <Route path="/" element={<Home lang={lang} />} />
        <Route path="/about" element={<About lang={lang} />} />
        <Route path="/services" element={<Services lang={lang} />} />
        <Route path="/services/web-design" element={<WebDesign lang={lang} />} />
        <Route path="/services/creative-assets" element={<CreativeAssets lang={lang} />} />
        <Route path="/services/language-services" element={<LanguageServices lang={lang} />} />
        <Route path="/services/google-optimization" element={<GoogleOptimization lang={lang} />} />
        <Route path="/services/ai-voice" element={<AIVoice lang={lang} />} />
        <Route path="/services/app-development" element={<AppDevelopment lang={lang} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy lang={lang} />} />
        <Route path="/terms-and-conditions" element={<TermsConditions lang={lang} />} />
      </Routes>

      <Footer lang={lang} />
      <ChatBot lang={lang} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;