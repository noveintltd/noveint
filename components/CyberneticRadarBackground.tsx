import React from 'react';

interface CyberneticRadarBackgroundProps {
  activeCardIndex?: number;
  totalCards?: number;
}

export const CyberneticRadarBackground: React.FC<CyberneticRadarBackgroundProps> = () => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      {/* 1. PERSPECTIVE FLOOR / TUNNEL GRID */}
      {/* Receding floor wireframe grid */}
      <div
        className="absolute -bottom-[20%] left-[-50%] w-[200%] h-[110%] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(57, 255, 20, 0.14) 1px, transparent 1px),
            linear-gradient(90deg, rgba(57, 255, 20, 0.14) 1px, transparent 1px)
          `,
          backgroundSize: '55px 55px',
          transform: 'perspective(550px) rotateX(68deg)',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 80%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 80%)',
        }}
      />

      {/* Receding ceiling wireframe grid for 3D tunnel immersion */}
      <div
        className="absolute -top-[20%] left-[-50%] w-[200%] h-[80%] pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(57, 255, 20, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(57, 255, 20, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '75px 75px',
          transform: 'perspective(550px) rotateX(-68deg)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0) 75%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0) 75%)',
        }}
      />

      {/* 2. AMBIENT RADAR SWEEP & RADIAL CORE GLOW */}
      {/* Soft ambient green radial blur glow centered behind the active card */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[750px] h-[500px] md:h-[750px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(57, 255, 20, 0.16) 0%, rgba(57, 255, 20, 0.05) 40%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Centered Radar Reticle & Rotating Sweep */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] md:w-[680px] h-[340px] sm:h-[500px] md:h-[680px] rounded-full pointer-events-none flex items-center justify-center opacity-80">
        {/* Concentric radar rings */}
        <div className="absolute inset-0 rounded-full border border-[#39FF14]/15" />
        <div className="absolute inset-12 sm:inset-16 md:inset-24 rounded-full border border-dashed border-[#39FF14]/20 animate-[spin_60s_linear_infinite]" />
        <div className="absolute inset-24 sm:inset-32 md:inset-48 rounded-full border border-[#39FF14]/10" />

        {/* Center cardinal crosshairs */}
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#39FF14]/20 to-transparent" />
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-[#39FF14]/20 to-transparent" />

        {/* 360-degree Rotating Radar Beam */}
        <div
          className="absolute inset-0 rounded-full animate-[spin_10s_linear_infinite]"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, transparent 280deg, rgba(57, 255, 20, 0.04) 315deg, rgba(57, 255, 20, 0.22) 360deg)',
            maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 25%, rgba(0,0,0,0.6) 60%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 25%, rgba(0,0,0,0.6) 60%, transparent 72%)',
          }}
        />
      </div>
    </div>
  );
};

export default CyberneticRadarBackground;
