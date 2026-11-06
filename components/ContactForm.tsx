import React, { useState, useRef } from 'react';
import { Language } from '../App';
import VariableProximity from './VariableProximity';

interface ContactFormProps {
  lang: Language;
}

const ContactForm: React.FC<ContactFormProps> = ({ lang }) => {
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const successTitleRef = useRef<HTMLHeadingElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('SUBMITTING');
    
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/mojjqprw', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('SUCCESS');
        form.reset();
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      setStatus('ERROR');
    }
  };

  if (status === 'SUCCESS') {
    return (
      <div className="text-center py-20 border border-[#39FF14]/30 bg-[#39FF14]/5 animate-hero-entry">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#39FF14] mb-6">
          <svg className="w-8 h-8 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 ref={successTitleRef} className="text-[#39FF14] text-3xl font-black uppercase tracking-tighter mb-4 animate-neon-pulse">
          <VariableProximity
            label={lang === 'EN' ? 'Thank you!' : '謝謝！'}
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={successTitleRef}
            radius={80}
            falloff="linear"
          />
        </h3>
        <p className="text-white text-lg font-light tracking-wide max-w-sm mx-auto opacity-80">
          {lang === 'EN' 
            ? 'Your message has been sent. We will get back to you shortly.' 
            : '您的訊息已送出。我們將盡快與您聯繫。'}
        </p>
        <button 
          onClick={() => setStatus('IDLE')}
          className="mt-8 text-[10px] font-bold tracking-[0.3em] uppercase text-[#39FF14] hover:text-white transition-colors"
        >
          {lang === 'EN' ? 'Send another message' : '再次發送訊息'}
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-bold tracking-widest text-[#39FF14] uppercase ml-1">
            {lang === 'EN' ? 'Name' : '姓名'}
          </label>
          <input 
            required
            name="name"
            type="text" 
            placeholder={lang === 'EN' ? "John Doe" : "王小明"}
            className="w-full bg-black border border-white/20 p-4 outline-none focus:border-[#39FF14] transition-colors text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold tracking-widest text-[#39FF14] uppercase ml-1">
            {lang === 'EN' ? 'Email' : '電子郵件'}
          </label>
          <input 
            required
            name="email"
            type="email" 
            placeholder="john@example.com"
            className="w-full bg-black border border-white/20 p-4 outline-none focus:border-[#39FF14] transition-colors text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold tracking-widest text-[#39FF14] uppercase ml-1">
          {lang === 'EN' ? 'Message' : '訊息內容'}
        </label>
        <textarea 
          required
          name="message"
          rows={6}
          placeholder={lang === 'EN' ? "Tell us about your project goals..." : "請描述您的專案目標..."}
          className="w-full bg-black border border-white/20 p-4 outline-none focus:border-[#39FF14] transition-colors text-white resize-none"
        />
      </div>

      <button 
        disabled={status === 'SUBMITTING'}
        className={`neon-button w-full py-5 font-black uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-3 ${status === 'SUBMITTING' ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {status === 'SUBMITTING' ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            {lang === 'EN' ? 'Sending...' : '傳送中...'}
          </>
        ) : (
          lang === 'EN' ? 'Send Inquiry' : '送出諮詢'
        )}
      </button>

      {status === 'ERROR' && (
        <p className="text-red-500 text-xs text-center font-bold uppercase tracking-widest">
          {lang === 'EN' ? 'Something went wrong. Please try again.' : '發生錯誤。請稍後再試。'}
        </p>
      )}

      <p className="text-center text-xs text-gray-500 uppercase tracking-widest pt-4">
        {lang === 'EN' ? 'Or reach us directly at ' : '或直接聯繫我們：'}
        <a 
          href="mailto:hello@noveint.com" 
          className="text-[#39FF14] hover:text-[#39FF14] neon-text-glow hover:underline transition-all duration-300 ml-1 lowercase font-bold"
        >
          hello@noveint.com
        </a>
      </p>
    </form>
  );
};

export default ContactForm;