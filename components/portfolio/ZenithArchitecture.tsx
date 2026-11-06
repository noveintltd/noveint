import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';

interface Props {
  lang: Language;
}

export const ZenithArchitecture: React.FC<Props> = ({ lang }) => {
  const [activeProject, setActiveProject] = useState(0);
  
  const projects = [
    { title: 'OBLIVION H.Q.', year: '2027', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200' },
    { title: 'SILICA TOWER', year: '2026', image: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&q=80&w=1200' },
    { title: 'THE MONOLITH', year: '2025', image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1200' },
  ];

  return (
    <div className="w-full bg-[#E5E3DC] text-[#1c1c1c] font-sans flex flex-col relative">
      <div className="h-screen md:h-[90vh] flex flex-col relative overflow-hidden">
        {/* Navigation */}
        <nav className="absolute top-0 w-full p-8 md:p-12 flex justify-between items-center z-20 mix-blend-difference text-white">
          <div className="text-xl md:text-2xl font-bold tracking-tighter uppercase">Z E N I T H</div>
          <div className="flex gap-8 text-xs font-semibold tracking-widest">
            <span className="hover:text-gray-400 cursor-pointer transition-colors hidden md:block">WORKS</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors hidden md:block">STUDIO</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">CONTACT</span>
          </div>
        </nav>

        {/* Main Display Area */}
        <div className="flex-1 w-full relative overflow-hidden group">
          {projects.map((project, idx) => (
            <img
              key={idx}
              src={project.image}
              alt={project.title}
              className={`absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${activeProject === idx ? 'opacity-100 scale-100 blur-[0px] z-10' : 'opacity-0 scale-110 blur-[10px] z-0'}`}
              referrerPolicy="no-referrer"
            />
          ))}
          
          {/* Interactive Title */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference text-white z-10">
            <motion.h1 
              key={`title-${activeProject}`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="text-5xl md:text-[8rem] font-black tracking-tighter uppercase text-center leading-none"
            >
              {projects[activeProject].title}
            </motion.h1>
          </div>
        </div>

        {/* Interactive Project List (Compact in Hero) */}
        <div className="bg-[#1c1c1c] text-[#E5E3DC] p-6 z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-t border-[#E5E3DC]/20 pt-4">
            {projects.map((project, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => setActiveProject(idx)}
                onClick={() => setActiveProject(idx)}
                className={`flex justify-between items-center py-2 px-6 cursor-pointer border ${activeProject === idx ? 'border-[#E5E3DC]' : 'border-transparent'} hover:border-[#E5E3DC]/50 transition-colors`}
              >
                <span className="text-[10px] font-bold tracking-widest uppercase">{project.title}</span>
                <span className="text-[10px] opacity-50 font-mono">{project.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <section className="py-32 px-8 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="space-y-12">
          <span className="text-xs font-bold tracking-[0.4em] text-[#1c1c1c]/40 uppercase">01 / Philosophy</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
            {lang === 'ZH' ? '結構即語言。' : 'Structure is language.'}
          </h2>
          <p className="text-lg font-medium opacity-70 leading-relaxed max-w-md">
            {lang === 'ZH'
              ? '我們相信建築不僅是為了居住，更是為了對話。對話存在於光線、影子與永恆的材料之間。'
              : 'We believe architecture is more than shelter. It is a dialogue between light, shadow, and the permanence of material.'}
          </p>
        </div>
        <div className="relative aspect-square bg-[#d4d1c9] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" alt="Detail" className="w-full h-full object-cover mix-blend-multiply grayscale opacity-80" referrerPolicy="no-referrer" />
        </div>
      </section>

      {/* Details Section */}
      <section className="py-32 px-8 md:px-24 bg-[#1c1c1c] text-[#E5E3DC]">
        <div className="mb-24">
          <span className="text-xs font-bold tracking-[0.4em] opacity-40 uppercase">02 / Details</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mt-6">{lang === 'ZH' ? '精選空間' : 'Selected Details'}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { tag: '01', title: 'LIGHT VOID', desc: 'Capturing the sun at zenith.' },
            { tag: '02', title: 'RAW CONCRETE', desc: 'The beauty of weight.' },
            { tag: '03', title: 'VOID SCALE', desc: 'Defining the human condition.' }
          ].map((item, idx) => (
            <div key={idx} className="space-y-6 group cursor-pointer">
              <div className="h-[1px] w-full bg-[#E5E3DC]/20 group-hover:bg-white transition-colors" />
              <span className="text-xs font-mono opacity-40">{item.tag}</span>
              <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
              <p className="text-sm opacity-60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 md:px-24 border-t border-black/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
             <div className="text-2xl font-bold tracking-tighter uppercase mb-6">Z E N I T H</div>
             <p className="text-sm opacity-60 max-w-xs uppercase leading-relaxed font-bold tracking-widest">
               Design office for monumental architecture. <br/> B-05, The Monolith, NYC.
             </p>
          </div>
          <div className="space-y-4">
             <span className="text-[10px] font-bold tracking-widest opacity-40 uppercase">SOCIAL</span>
             <ul className="text-xs font-bold tracking-widest space-y-2 uppercase">
               <li className="hover:opacity-100 opacity-60 transition-opacity cursor-pointer">Instagram</li>
               <li className="hover:opacity-100 opacity-60 transition-opacity cursor-pointer">Behance</li>
             </ul>
          </div>
          <div className="space-y-4">
             <span className="text-[10px] font-bold tracking-widest opacity-40 uppercase">INQUIRIES</span>
             <p className="text-xs font-bold tracking-widest border-b border-black/20 pb-1 inline-block">office@zenith.arch</p>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-black/5 flex justify-between text-[10px] font-bold tracking-widest opacity-30 uppercase">
          <span>© 2026 ZENITH ARCHITECTURE</span>
          <span>EST. 2021 / GLOBAL</span>
        </div>
      </footer>
    </div>
  );
};
