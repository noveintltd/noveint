import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../../App';

interface Props {
  lang: Language;
}

export const LuminaChat: React.FC<Props> = ({ lang }) => {
  return (
    <div className="w-full h-full bg-[#050507] text-[#E0E0E0] p-5 font-sans flex flex-col overflow-y-auto relative custom-scrollbar">
      {/* Background glow */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse" />

      {/* Header */}
      <div className="flex justify-between items-center z-10 pt-4 pb-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center p-[2px]">
            <div className="w-full h-full bg-[#050507] rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full blur-[2px]" />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-base tracking-tight text-white">Lumina AI</h2>
            <p className="text-xs text-purple-400 font-medium">{lang === 'ZH' ? '在線' : 'Online'}</p>
          </div>
        </div>
        <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-5 pt-6 z-10 relative custom-scrollbar pr-1">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="self-end max-w-[80%] bg-blue-600 text-white p-3.5 rounded-2xl rounded-tr-sm text-sm shadow-md"
        >
          {lang === 'ZH' ? '你能幫我總結一下今天的會議嗎？' : 'Can you help me summarize today\'s meeting?'}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="self-start max-w-[85%] bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl rounded-tl-sm text-sm text-zinc-300 leading-relaxed shadow-lg"
        >
          <p className="mb-2">
            {lang === 'ZH' ? '當然。以下是三個要點：' : 'Of course. Here are the three key takeaways:'}
          </p>
          <ul className="space-y-1.5 list-disc pl-4 text-white/90">
            <li>{lang === 'ZH' ? '專案 X 延遲' : 'Project X delayed'}</li>
            <li>{lang === 'ZH' ? '設計審查已獲准' : 'Design review approved'}</li>
            <li>{lang === 'ZH' ? '明天下午的客戶演示' : 'Client demo tomorrow PM'}</li>
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
          className="self-start max-w-[80%] bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center"
        >
          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </motion.div>
      </div>

      {/* Voice Control Interface */}
      <div className="mt-4 pt-4 z-10 relative">
        <div className="bg-white/5 border border-white/10 rounded-full p-2.5 px-4 flex items-center justify-between shadow-lg backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
            <span className="text-xs text-purple-300 font-medium">
              {lang === 'ZH' ? '語音對話中 (請說話)...' : 'Voice mode active (Speak now)...'}
            </span>
          </div>
          <button className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-md text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
