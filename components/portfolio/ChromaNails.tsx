import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';

interface Props {
  lang: Language;
}

export const ChromaNails: React.FC<Props> = ({ lang }) => {

  return (
    <div className="w-full bg-[#FFF5F8] text-[#1a1a1a] font-sans flex flex-col relative overflow-y-auto overflow-x-hidden" style={{ minHeight: '100%' }}>
      
      {/* Navigation */}
      <nav className="w-full px-8 py-6 flex justify-between items-center z-20 border-b border-[#F7E1E8]">
        <div className="text-2xl font-black tracking-tighter text-[#D11E73]">
          sculpt.
        </div>
        <div className="hidden md:flex gap-8 text-xs font-semibold uppercase tracking-wider items-center text-[#555]">
          <span className="text-[#D11E73] border-b-2 border-[#D11E73] pb-1 flex items-center gap-1 cursor-pointer">
            {lang === 'ZH' ? '首選' : 'the edit'} <span className="text-[8px]">✦</span>
          </span>
          <span className="hover:text-[#D11E73] cursor-pointer transition-colors">{lang === 'ZH' ? '藝術家' : 'artists'}</span>
          <span className="hover:text-[#D11E73] cursor-pointer transition-colors">{lang === 'ZH' ? '日誌' : 'the journal'}</span>
          <span className="hover:text-[#D11E73] cursor-pointer transition-colors">{lang === 'ZH' ? '預約座位' : 'book a chair'}</span>
        </div>
        <div>
          <button className="px-6 py-2.5 bg-[#FFE3ED] rounded-full text-[#D11E73] text-xs font-bold tracking-widest hover:bg-[#FFD1E3] transition-colors uppercase">
            {lang === 'ZH' ? '預約位置' : 'SECURE A SPOT'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="w-full flex-shrink-0 flex flex-col md:flex-row px-8 md:px-16 py-12 md:py-20 items-center justify-between z-10 gap-12">
        {/* Left text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-6">
              {lang === 'ZH' ? '藝術' : 'ART'} <br/>
              <span className="text-[#D11E73] italic font-serif tracking-normal">
                {lang === 'ZH' ? '點綴於' : 'ON YOUR'}
              </span> <br/>
              {lang === 'ZH' ? '指尖上' : 'FINGERS'}
            </h1>
            <p className="max-w-md text-sm md:text-base text-gray-600 font-medium leading-relaxed mb-10">
              {lang === 'ZH' 
                ? '步入高光澤的神聖領域。從多維度漸變凝膠到客製化雕塑 3D 飾品，我們將您的指尖轉化為前衛的時尚宣言。' 
                : 'Step into a realm of high-gloss divinity. From iridescent multidimensional gels to custom-sculpted 3D charms, we transform your fingertips into an avant-garde editorial statement.'}
            </p>

            <div className="flex flex-wrap gap-3">
              {['3D ART', 'CHROME', 'GEL-X'].map((tag, i) => (
                <span key={i} className="px-4 py-2 bg-[#CFF2F8] text-[#1a1a1a] text-xs font-bold tracking-widest rounded-full uppercase flex items-center gap-2">
                  <span className="text-[10px]">✦</span> {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 relative flex justify-center items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-lg aspect-[4/3] md:aspect-square relative rounded-[40px] overflow-hidden shadow-2xl shadow-pink-200/50"
          >
            <img 
              src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=1000" 
              alt="Holographic 3D Nails" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Subtle glow overlay representing the pearl pink look */}
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-300/30 to-teal-200/30 mix-blend-overlay pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <div className="w-full bg-[#FDECF2] py-4 overflow-hidden border-y border-[#F7E1E8] mb-16">
        <div className="whitespace-nowrap animate-marquee flex gap-4 text-[#D11E73] text-sm md:text-base font-bold tracking-widest uppercase">
          {Array(4).fill('• 3D GEL CHARMS • IRIDESCENT FINISHES • HOLOGRAPHIC NAIL ART • CUTE BUT HIGH-TECH ').map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </div>

      {/* 3 Columns Section */}
      <div className="w-full px-8 md:px-16 mb-24 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
        {/* Col 1 */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col">
          <div className="w-full aspect-[4/5] rounded-[999px] rounded-b-[40px] overflow-hidden mb-6 shadow-xl shadow-pink-100">
            <img src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=800" alt="Holographic Dreams" className="w-full h-full object-cover saturate-150" referrerPolicy="no-referrer" />
          </div>
          <h3 className="text-[#D11E73] text-xl font-bold uppercase tracking-widest mb-3">01 / <br/> HOLOGRAPHIC <br/> DREAMS</h3>
          <p className="text-sm text-gray-500 font-medium">Light-refracting pigments that shift with every movement.</p>
        </motion.div>

        {/* Col 2 */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-col mt-0 md:mt-12">
          <div className="w-full aspect-[1/2] md:aspect-[3/5] rounded-[999px] rounded-b-[40px] overflow-hidden mb-6 shadow-xl shadow-pink-100 relative">
             <img src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=800" alt="3D Droplets" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
             <div className="absolute inset-0 bg-[#e0b0ff]/20 mix-blend-color" />
          </div>
          <div className="text-center px-4">
            <h3 className="text-[#D11E73] text-xl font-bold uppercase tracking-widest mb-3">02 / 3D <br/> DROPLETS</h3>
            <p className="text-sm text-gray-500 font-medium">Sculptural depth meets playful fluid dynamics.</p>
          </div>
        </motion.div>

        {/* Col 3 */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col">
          <div className="w-full aspect-square rounded-[999px] rounded-b-[40px] overflow-hidden mb-6 shadow-xl shadow-pink-100">
            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" alt="Cyber-Cute" className="w-full h-full object-cover saturate-150" referrerPolicy="no-referrer" />
          </div>
          <h3 className="text-[#D11E73] text-xl font-bold uppercase tracking-widest mb-3">03 / CYBER-CUTE</h3>
          <p className="text-sm text-gray-500 font-medium mb-6">Where digital aesthetics meet soft tactile beauty.</p>
          
          <div className="bg-[#FFE3ED] p-6 rounded-3xl relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#D11E73] text-lg">✦</span>
              <span className="text-[#D11E73] text-[10px] font-bold tracking-widest uppercase">ARTIST SPOTLIGHT</span>
            </div>
            <p className="text-xs text-gray-600 italic leading-relaxed">
              "Pushing the boundaries of what a manicure can represent—it's a sculpture, a mood, a code."
            </p>
          </div>
        </motion.div>
      </div>

      {/* Artists Section */}
      <div className="w-full bg-[#FDF8FA] py-24 px-8 md:px-16 flex flex-col items-center border-t border-[#F7E1E8]">
        <div className="text-center mb-16">
          <h4 className="text-[10px] md:text-xs text-[#D11E73] font-bold tracking-[0.3em] uppercase mb-4">CREATIVE COLLECTIVE</h4>
          <h2 className="text-3xl md:text-5xl font-black text-[#501c31] tracking-tighter uppercase">OUR ARTISTS</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-20 max-w-5xl mx-auto items-end">
          {/* Artist 1 */}
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl shadow-pink-200 mb-6 bg-pink-100 p-1">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=500" alt="Momo" className="w-full h-full rounded-full object-cover grayscale" referrerPolicy="no-referrer" />
            </div>
            <h3 className="text-2xl font-black text-[#D11E73] mb-2 uppercase tracking-tighter">Momo</h3>
            <p className="text-xs text-gray-500 font-medium italic text-center max-w-[200px]">"Sculpting digital dreams into physical reality."</p>
          </div>

          {/* Artist 2 */}
          <div className="flex flex-col items-center relative md:mb-12">
            <div className="absolute -left-6 top-1/2 w-4 h-4 bg-[#FFC5D9] rounded-full hidden md:block" />
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl shadow-purple-200 mb-6 bg-purple-100 p-1">
              <img src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=500" alt="Yuki" className="w-full h-full rounded-full object-cover saturate-50" referrerPolicy="no-referrer" />
            </div>
            <h3 className="text-3xl font-black text-[#D11E73] mb-2 uppercase tracking-tighter">Yuki</h3>
            <p className="text-xs text-gray-500 font-medium italic text-center max-w-[200px]">"3D textures for the high-tech romantic."</p>
          </div>

          {/* Artist 3 */}
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl shadow-blue-100 mb-6 bg-blue-50 p-1">
               <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500" alt="Hana" className="w-full h-full rounded-full object-cover saturate-50" referrerPolicy="no-referrer" />
            </div>
            <h3 className="text-2xl font-black text-[#D11E73] mb-2 uppercase tracking-tighter">Hana</h3>
            <p className="text-xs text-gray-500 font-medium italic text-center max-w-[200px]">"Holographic gradients for a brighter soul."</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#FFF5F8] px-8 md:px-16 py-16 flex flex-col md:flex-row justify-between border-t border-[#F7E1E8]">
        <div className="mb-12 md:mb-0">
          <div className="text-3xl md:text-4xl font-black tracking-tighter text-[#D11E73] mb-4">
            sculpt.
          </div>
          <p className="text-xs text-gray-600 font-medium max-w-xs mb-8 leading-relaxed">
            High-gloss, 3D sculptural nail art for the modern romantic.
          </p>
          <div className="flex gap-4 text-[10px] font-bold tracking-widest text-[#D11E73] uppercase">
            <a href="#" className="hover:opacity-70 transition-opacity">INSTAGRAM</a>
            <a href="#" className="hover:opacity-70 transition-opacity">TIKTOK</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="flex flex-col gap-3 text-xs text-gray-500 font-medium w-32">
             <span className="text-[10px] font-bold tracking-widest text-[#1a1a1a] uppercase mb-2">NAVIGATE</span>
             <a href="#" className="hover:text-[#D11E73] transition-colors">The Edit</a>
             <a href="#" className="hover:text-[#D11E73] transition-colors">Artists</a>
             <a href="#" className="hover:text-[#D11E73] transition-colors">Journal</a>
             <a href="#" className="hover:text-[#D11E73] transition-colors">Location</a>
          </div>

          <div className="flex flex-col gap-3 text-xs text-gray-500 font-medium w-48">
             <span className="text-[10px] font-bold tracking-widest text-[#1a1a1a] uppercase mb-2">VISIT</span>
             <span>122 NEON BLVD</span>
             <span>SOFT FOCUS DISTRICT</span>
             <span>MON-SAT: 10AM-8PM</span>
             <span>SUN: 11AM-6PM</span>
          </div>

          <div className="flex flex-col gap-3">
             <span className="text-[10px] font-bold tracking-widest text-[#1a1a1a] uppercase mb-2">JOIN WAITLIST</span>
             <input type="email" placeholder="YOUR EMAIL" className="bg-white border border-[#F7E1E8] rounded-full px-6 py-3 text-xs text-center focus:outline-none focus:border-[#D11E73]" />
             <button className="bg-gradient-to-r from-[#FFF0F5] to-[#FFD1E3] text-[#D11E73] text-[10px] font-bold tracking-widest uppercase rounded-full px-6 py-3 hover:opacity-80 transition-opacity">
               SUBSCRIBE
             </button>
          </div>
        </div>

        <div className="w-full flex-col md:flex-row flex justify-between items-center mt-20 pt-8 border-t border-[#F7E1E8] text-[9px] font-bold tracking-widest text-gray-400 uppercase">
          <span>© 2026 sculpt. ALL RIGHTS RESERVED.</span>
          <span className="flex items-center gap-1 mt-4 md:mt-0 text-[#D11E73]/50">
            ✦ SCULPTED IN THE DIGITAL ETHEREUM
          </span>
        </div>
      </footer>
    </div>
  );
};

