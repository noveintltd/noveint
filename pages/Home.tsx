import React, { useRef } from 'react';
import Hero from '../components/Hero';
import Capabilities from '../components/Capabilities';
import NoveToolsFeature from '../components/NoveToolsFeature';
import TaiwanBridge from '../components/TaiwanBridge';
import VariableProximity from '../components/VariableProximity';
import ProjectStartSection from '../components/ProjectStartSection';
import RecentWorkCarousel from '../components/RecentWorkCarousel';
import { Language } from '../App';

interface HomeProps {
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <main className="relative transition-opacity duration-300">
      <section id="home" className="relative">
        <Hero lang={lang} />
      </section>

      <section 
        id="services" 
        ref={sectionRef}
        className="py-20 md:py-32 px-6 md:px-12 bg-black relative overflow-hidden"
      >
        <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-16 md:text-center tracking-tighter uppercase flex flex-col md:flex-row md:justify-center items-center gap-x-3">
            <VariableProximity
              label={lang === 'EN' ? 'OUR' : '我們的'}
              className="text-white/40"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={sectionRef}
              radius={100}
              falloff="linear"
            />
            <VariableProximity
              label={lang === 'EN' ? 'CAPABILITIES' : '專業能力'}
              className="text-[#39FF14]"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={sectionRef}
              radius={100}
              falloff="linear"
            />
          </h2>
          <Capabilities lang={lang} />
        </div>
      </section>

      <section id="bridge" className="py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <TaiwanBridge lang={lang} />
        </div>
      </section>

      <RecentWorkCarousel lang={lang} />

      <ProjectStartSection lang={lang} />

      <NoveToolsFeature lang={lang} />
    </main>
  );
};

export default Home;
