import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';

interface Props {
  lang: Language;
}

export const SolaceLiving: React.FC<Props> = ({ lang }) => {
  return (
    <div className="w-full bg-[#fdfaf6] text-[#4a4238] font-serif relative">
      <div className="p-8 md:p-12 min-h-[600px] flex flex-col">
        <nav className="flex justify-between items-center mb-16 border-b border-[#ebdxc1] pb-6">
          <span className="text-2xl font-light tracking-widest text-[#6b5b4c]">SOLACE</span>
          <div className="flex gap-8 text-sm font-sans tracking-widest text-[#8a7f72] uppercase">
            <span className="hover:text-[#4a4238] transition-colors cursor-pointer">{lang === 'ZH' ? '工作室' : 'Studio'}</span>
            <span className="hover:text-[#4a4238] transition-colors cursor-pointer">{lang === 'ZH' ? '日誌' : 'Journal'}</span>
            <span className="hover:text-[#4a4238] transition-colors cursor-pointer">{lang === 'ZH' ? '聯絡' : 'Connect'}</span>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center flex-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 relative z-10"
          >
            <h1 className="text-5xl md:text-6xl font-light leading-tight text-[#3b332b]">
              {lang === 'ZH' ? '為正念生活' : 'Designing spaces for'} <br />
              <span className="italic text-[#8c7861]">{lang === 'ZH' ? '設計空間。' : 'mindful living.'}</span>
            </h1>
            <p className="font-sans text-[#7a6f63] max-w-md leading-relaxed text-sm">
              {lang === 'ZH' ? '我們規劃溫暖的極簡室內空間，培養寧靜與踏實感。大地色系、自然紋理以及對光線的深刻尊重。' : 'We curate warm, minimalist interiors that foster tranquility and grounding. Earth tones, natural textures, and a profound respect for light.'}
            </p>
            <button className="font-sans text-xs uppercase tracking-[0.2em] border-b border-[#8c7861] pb-2 text-[#6b5b4c] hover:text-[#3b332b] hover:border-[#3b332b] transition-all">
              {lang === 'ZH' ? '探索流程' : 'Explore the Process'}
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[450px]"
          >
            <div className="absolute inset-0 bg-[#e8e0d5] rounded-t-full overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800" alt="Warm minimal interior" className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute -bottom-6 -left-12 w-48 h-64 bg-[#d0c4b5] shadow-xl overflow-hidden rounded-sm hidden md:block">
              <img src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=400" alt="Ceramic details" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Philosophy Section */}
      <section className="py-24 px-8 md:px-24 bg-[#f8f3ed]">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex items-center gap-4 text-[#8c7861]">
            <div className="w-12 h-[1px] bg-current" />
            <span className="font-sans text-xs uppercase tracking-[0.3em]">{lang === 'ZH' ? '我們的哲學' : 'Our Philosophy'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-[#3b332b] leading-[1.4]">
            {lang === 'ZH' 
              ? '設計不僅是裝飾，更是與環境建立深刻的和諧，從日常儀式中尋找美。'
              : 'Design is not just decoration, but finding a profound harmony with one\'s surroundings and beauty in the daily ritual.'}
          </h2>
          <p className="font-sans text-[#7a6f63] text-lg leading-relaxed max-w-2xl">
            {lang === 'ZH'
              ? '我們深信「少即是多」的力量。透過自然光線的佈局與有機素材的運用，我們為快節奏的當代生活提供一處心靈的避風港。'
              : 'We believe in the power of restraint. Through the intentional use of natural light and organic materials, we create sanctuaries for the modern soul in a fast-paced world.'}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-8 md:px-24">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl font-light text-[#3b332b]">{lang === 'ZH' ? ' 精選作品' : 'Selected Works'}</h2>
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#8a7f72] border-b border-[#8a7f72] pb-1 cursor-pointer hover:text-[#3b332b] hover:border-[#3b332b] transition-all">
            {lang === 'ZH' ? '查看所有' : 'View All'}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            {
              title: lang === 'ZH' ? '柔光住宅' : 'The Soft House',
              location: 'Taipei',
              image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=800'
            },
            {
              title: lang === 'ZH' ? '侘寂公寓' : 'Wabi Sabi Apartment',
              location: 'Tokyo',
              image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800'
            }
          ].map((project, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden mb-6">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-xl font-light text-[#3b332b]">{project.title}</h3>
              <p className="font-sans text-xs uppercase tracking-widest text-[#8a7f72] mt-2">{project.location}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Journal Section */}
      <section className="py-24 px-8 md:px-24 bg-[#3b332b] text-[#fdfaf6]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#8c7861]">{lang === 'ZH' ? '最新日誌' : 'Latest Journal'}</span>
            <h2 className="text-4xl font-light leading-tight">
              {lang === 'ZH' ? '探索晨光與影的對話' : 'Conversations on Light & Shadow'}
            </h2>
            <p className="font-sans text-[#cec2b5] text-sm leading-relaxed opacity-80">
              {lang === 'ZH' ? '我們探討環境如何重塑心智狀態，從北歐極簡到東方禪意。' : 'An exploration of how space shapes our state of mind, from Scandinavian minimalism to Eastern Zen philosophy.'}
            </p>
            <button className="font-sans text-xs uppercase tracking-[0.2em] border-b border-[#fdfaf6]/30 pb-2 hover:border-[#fdfaf6] transition-all">
              {lang === 'ZH' ? '閱讀原文' : 'Read Article'}
            </button>
          </div>
          <div className="flex-1 w-full aspect-video bg-[#4a4238]">
             <img src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800" alt="Journal" className="w-full h-full object-cover grayscale opacity-70" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 md:px-24 border-t border-[#ebdxc1]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <span className="text-2xl font-light tracking-widest text-[#6b5b4c]">SOLACE</span>
            <p className="font-sans text-[10px] uppercase tracking-widest text-[#8a7f72] mt-2">© 2026 SOLACE Studio</p>
          </div>
          <div className="flex gap-12 text-xs font-sans tracking-[0.2em] uppercase text-[#8a7f72]">
            <span className="hover:text-[#3b332b] cursor-pointer">Instagram</span>
            <span className="hover:text-[#3b332b] cursor-pointer">Pinterest</span>
            <span className="hover:text-[#3b332b] cursor-pointer">LinkedIn</span>
          </div>
          <div className="text-right">
             <p className="font-sans text-xs uppercase tracking-widest text-[#8a7f72]">{lang === 'ZH' ? '預約洽談' : 'Work with us'}</p>
             <p className="text-sm border-b border-[#8a7f72] inline-block mt-1">hello@solace.studio</p>
          </div>
        </div>
      </footer>

      {/* Decorative organic shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f5efe6] rounded-full mix-blend-multiply blur-3xl opacity-60 -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#eee8df] rounded-full mix-blend-multiply blur-3xl opacity-60 -z-10 pointer-events-none" />
    </div>
  );
};
