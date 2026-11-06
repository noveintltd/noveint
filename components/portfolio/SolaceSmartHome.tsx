import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';

interface Props {
  lang: Language;
}

export const SolaceSmartHome: React.FC<Props> = ({ lang }) => {
  const [isOn, setIsOn] = useState([true, false, true]);

  return (
    <div className="w-full h-full bg-[#fdfaf6] text-[#4a4238] p-6 font-serif flex flex-col overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#f5efe6] rounded-full mix-blend-multiply blur-3xl opacity-80 pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-end relative z-10">
        <div>
          <h1 className="text-3xl font-light tracking-wide text-[#3b332b]">
            {lang === 'ZH' ? '客廳' : 'Living Room'}
          </h1>
          <p className="text-sm font-sans tracking-widest text-[#8a7f72] uppercase mt-1">
            {lang === 'ZH' ? '24°C · 微風' : '72°F · Light Breeze'}
          </p>
        </div>
        <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-[#ebdxc1] flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b5b4c" strokeWidth="1.5">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </div>
      </div>

      {/* Thermostat */}
      <div className="mt-12 flex items-center justify-center relative z-10">
        <motion.div 
          className="w-48 h-48 rounded-full bg-white shadow-[0_10px_40px_rgba(138,127,114,0.15)] flex flex-col items-center justify-center border-4 border-[#fdfaf6] relative cursor-pointer"
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-[#e8e0d5] m-2 pointer-events-none" />
          <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none" viewBox="0 0 100 100">
            <motion.circle cx="50" cy="50" r="44" fill="none" stroke="#8c7861" strokeWidth="2" strokeLinecap="round" strokeDasharray="276" strokeDashoffset="60" />
          </svg>
          <span className="text-5xl font-light text-[#3b332b]">72°</span>
          <span className="text-xs font-sans tracking-widest text-[#8a7f72] uppercase mt-1">{lang === 'ZH' ? '冷氣' : 'Cooling'}</span>
        </motion.div>
      </div>

      {/* Devices controls */}
      <div className="mt-12 flex-1 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-sans tracking-widest text-[#8a7f72] uppercase">{lang === 'ZH' ? '設備' : 'Devices'}</h3>
        </div>
        <div className="space-y-4">
          {[
            { name: lang === 'ZH' ? '主燈' : 'Main Light', icon: 'M' },
            { name: lang === 'ZH' ? '氛圍燈' : 'Ambient Light', icon: 'A' },
            { name: lang === 'ZH' ? '百葉窗' : 'Blinds', icon: 'B' },
          ].map((device, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-[#e8e0d5] flex justify-between items-center cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded border ${isOn[i] ? 'bg-[#8c7861] border-[#8c7861] text-white' : 'bg-transparent border-[#d0c4b5] text-[#8a7f72]'} flex items-center justify-center font-sans font-bold text-xs transition-colors`}>
                  {device.icon}
                </div>
                <span className="font-sans text-sm font-medium text-[#4a4238]">{device.name}</span>
              </div>
              <div 
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${isOn[i] ? 'bg-[#8c7861]' : 'bg-[#e8e0d5]'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  const newIsOn = [...isOn];
                  newIsOn[i] = !newIsOn[i];
                  setIsOn(newIsOn);
                }}
              >
                <motion.div 
                  className="w-4 h-4 bg-white rounded-full shadow-sm"
                  animate={{ x: isOn[i] ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
