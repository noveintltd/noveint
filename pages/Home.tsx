import React from 'react';
import Hero from '../components/Hero';
import Capabilities from '../components/Capabilities';
import ScrollytellingSection from '../components/ScrollytellingSection';
import NoveToolsFeature from '../components/NoveToolsFeature';
import TaiwanBridge from '../components/TaiwanBridge';
import ProjectStartSection from '../components/ProjectStartSection';
import RecentWorkCarousel from '../components/RecentWorkCarousel';
import { Language } from '../App';

interface HomeProps {
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ lang }) => {

  return (
    <main className="relative transition-opacity duration-300">
      <section id="home" className="relative">
        <Hero lang={lang} />
      </section>

      {/* Scroll-driven 3D Depth Carousel for Capabilities */}
      <Capabilities lang={lang} />

      <section id="bridge" className="py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <TaiwanBridge lang={lang} />
        </div>
      </section>

      <RecentWorkCarousel lang={lang} />

      {/* Cinematic Horizontal Scrollytelling Showcase */}
      <ScrollytellingSection lang={lang} />

      <ProjectStartSection lang={lang} />

      <NoveToolsFeature lang={lang} />
    </main>
  );
};

export default Home;
