import React, { useState, useEffect } from 'react';
import ASCIIText from './ASCIIText';
import { Language } from '../App';

const BACKGROUND_VIDEOS = [
  "https://noveint.com/resonance/wp-content/uploads/2026/07/Contact%20BG.mp4",
  "https://noveint.com/resonance/wp-content/uploads/2026/07/Contact%20BG%202.mp4",
  "https://noveint.com/resonance/wp-content/uploads/2026/07/Contact%20BG%203.mp4",
  "https://noveint.com/resonance/wp-content/uploads/2026/07/Contact%20BG%204.mp4"
];

const PHRASES_EN = [
  "RESONANCE",
  "LIAOLIAO MUSIC",
  "EXPLORE ARCHIVE",
  "UNDERGROUND SOUNDS",
  "ANALOG VIBES",
  "CYBER FREQUENCIES"
];

const PHRASES_TC = [
  "數位共鳴 RESONANCE",
  "聊聊音樂 LIAOLIAO",
  "探索檔案 ARCHIVE",
  "地下聲響 SOUNDS",
  "類比律動 ANALOG",
  "賽博頻率 CYBER"
];

export interface AsciiGlitchSectionProps {
  lang?: Language;
  targetUrl?: string;
}

export function AsciiGlitchSection({
  lang = 'EN',
  targetUrl = "https://resonance-two-neon.vercel.app/"
}: AsciiGlitchSectionProps) {
  const [bgVideoIndex, setBgVideoIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const activePhrases = lang === 'ZH' ? PHRASES_TC : PHRASES_EN;
  const currentPhrase = activePhrases[phraseIndex % activePhrases.length] || activePhrases[0];

  useEffect(() => {
    setBgVideoIndex(Math.floor(Math.random() * BACKGROUND_VIDEOS.length));
    setPhraseIndex(Math.floor(Math.random() * activePhrases.length));
  }, [lang]);

  return (
    <section
      id="ascii-text-section"
      className="relative z-[40] w-full h-[60vh] min-h-[420px] max-h-[580px] my-16 flex items-center justify-center overflow-hidden bg-transparent select-none"
    >
      {/* Ambient Background Video with Radial Mask */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 15%, rgba(0, 0, 0, 0.4) 55%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 15%, rgba(0, 0, 0, 0.4) 55%, transparent 85%)'
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30 select-none pointer-events-none"
          src={BACKGROUND_VIDEOS[bgVideoIndex]}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#000000_90%)] pointer-events-none opacity-80" />
      </div>

      {/* Clickable 3D ASCII Wave Text Link */}
      <a 
        href={targetUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="relative w-full max-w-4xl h-full flex items-center justify-center cursor-pointer group z-[10]"
      >
        <ASCIIText 
          key={`${lang}-${currentPhrase}`}
          text={currentPhrase} 
          asciiFontSize={6} 
          textFontSize={120} 
          textColor="#ffffff" 
          enableWaves={true} 
          planeBaseHeight={8}
        />
      </a>
    </section>
  );
}

export default AsciiGlitchSection;
