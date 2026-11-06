import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, Volume2, Sparkles, Square } from 'lucide-react';
import { Language } from '../App';

interface VoiceAssistantProps {
  lang: Language;
}

interface MessageHistory {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

// Helper: Play acoustic chime to unlock Web Audio context and signal state changes
const playAcousticChime = (freq1 = 587.33, freq2 = 880, duration = 0.25) => {
  try {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtxClass) return;
    const ctx = new AudioCtxClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(freq1, now);
    osc1.frequency.exponentialRampToValueAtTime(freq2, now + duration * 0.7);

    osc2.frequency.setValueAtTime(freq1 * 0.5, now);
    osc2.frequency.exponentialRampToValueAtTime(freq2 * 0.5, now + duration * 0.7);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.08, now + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  } catch (e) {
    // audio context error ignored
  }
};

// Intelligent Local Semantic Responder fallback
const generateLocalResponse = (query: string, currentLang: Language): string => {
  const q = query.toLowerCase();
  const isZh = /[\u4e00-\u9fa5]/.test(query) || currentLang === 'ZH';

  if (isZh) {
    if (q.includes('價格') || q.includes('費用') || q.includes('多少錢') || q.includes('報價') || q.includes('預算')) {
      return 'Nove 提供清晰的專案方案。單頁形象網站只要 115 英鎊，購物體驗網站 180 英鎊起，AI 語音助理方案由 250 英鎊起。歡迎在頁面底部填表，我們即刻為您規劃！';
    }
    if (q.includes('網站') || q.includes('設計') || q.includes('ui') || q.includes('網頁')) {
      return '我們專精於高階雙語網站設計與 3D 動態視覺，兼具極簡美學與繁體中文排版韻律，帶來頂級的跨國品牌體驗！';
    }
    if (q.includes('語音') || q.includes('ai') || q.includes('機器人') || q.includes('bot') || q.includes('voice')) {
      return 'Nove 打造次世代雙語 AI 語音助理，支援英繁雙語即時切換與智慧語音對話，為品牌帶來極具溫度的數位互動！';
    }
    if (q.includes('seo') || q.includes('google') || q.includes('地圖') || q.includes('商家') || q.includes('優化')) {
      return '我們的 Google AI 與在地搜尋優化服務，由 80 英鎊起，大幅提升您的 Google 商家排名，精準吸引高含金量客戶！';
    }
    if (q.includes('廣告') || q.includes('素材') || q.includes('視覺') || q.includes('creative') || q.includes('ad')) {
      return '我們為全球品牌量身打造高轉換率的動態廣告素材，方案由 40 英鎊起，完美融合西方設計張力與在地文化細節！';
    }
    if (q.includes('語言') || q.includes('翻譯') || q.includes('在地化') || q.includes('localization')) {
      return 'Nove 提供深度的在地化與雙語文案顧問，由 45 英鎊起，確保您的品牌語氣在繁體中文市場精準共鳴！';
    }
    if (q.includes('app') || q.includes('開發') || q.includes('軟體') || q.includes('系統') || q.includes('saas')) {
      return '我們建構跨平台的 iOS、Android 與現代 Web 雲端應用系統，原型開發 850 英鎊起，助您快速開拓全球市場！';
    }
    if (q.includes('工具') || q.includes('novetools') || q.includes('tool') || q.includes('免費')) {
      return '推薦您體驗 novetools.com！這是我們推出的純客戶端隱私工具箱，提供極速影像處理、影片轉檔與跨時區同步功能！';
    }
    if (q.includes('你是誰') || q.includes('介紹') || q.includes('nove') || q.includes('公司')) {
      return '我是 Nove，Nove International 的全球數位架構顧問。我們以頂級設計、AI 語音與跨國架構協助品牌走向全球！';
    }
    if (q.includes('聯絡') || q.includes('合作') || q.includes('信箱') || q.includes('email') || q.includes('諮詢')) {
      return '歡迎隨時填寫本頁下方的啟動專案表單，或寄信至 hello@noveint.com，我們會迅速與您聯繫！';
    }
    return '很高興與您對話！Nove 提供網站設計、AI 語音、廣告素材與 Google 在地優化等全方位數位服務，請問您想了解哪一項呢？';
  } else {
    if (q.includes('price') || q.includes('cost') || q.includes('quote') || q.includes('budget') || q.includes('how much') || q.includes('pricing')) {
      return 'Our design packages start from £115 for one-page websites, £180 for shopping platforms, and £250 for custom AI Voice assistants. Feel free to initiate a project below!';
    }
    if (q.includes('web') || q.includes('design') || q.includes('ui') || q.includes('ux') || q.includes('site')) {
      return 'We specialize in high-end bilingual web architecture, pairing British creative direction with Taiwanese market elegance, fluid 3D interactions, and responsive typography.';
    }
    if (q.includes('voice') || q.includes('ai') || q.includes('bot') || q.includes('assistant') || q.includes('conversational')) {
      return 'Nove crafts natural bilingual AI voice assistants and real-time conversational agents, engineered for seamless luxury commerce and cross-border digital experiences.';
    }
    if (q.includes('seo') || q.includes('google') || q.includes('maps') || q.includes('optimization') || q.includes('ranking')) {
      return 'Our Google Optimization and Local AI framework starts at £80, elevating your Google Business Profile and Knowledge Graph presence.';
    }
    if (q.includes('creative') || q.includes('ad') || q.includes('asset') || q.includes('visual')) {
      return 'We engineer high-converting digital advertising assets starting at £40 that bridge Western aesthetics with nuanced Asian cultural depth.';
    }
    if (q.includes('language') || q.includes('localization') || q.includes('translation') || q.includes('chinese')) {
      return 'Our language consulting starts at £45, providing native Traditional Chinese localization to ensure your global brand connects authentically.';
    }
    if (q.includes('app') || q.includes('development') || q.includes('software') || q.includes('saas') || q.includes('mobile')) {
      return 'We engineer cross-platform iOS, Android, and scalable cloud SaaS products, with MVP prototypes starting at £850.';
    }
    if (q.includes('tool') || q.includes('novetools') || q.includes('utility') || q.includes('free')) {
      return 'Check out novetools.com, our privacy-first suite of client-side browser utilities for video, image processing, PDF manipulation, and global timezone sync.';
    }
    if (q.includes('who are you') || q.includes('who is nove') || q.includes('about') || q.includes('company')) {
      return 'I am Nove, your global digital architect and concierge. We bridge UK creative ambition with East Asian digital excellence to build world-class digital platforms.';
    }
    if (q.includes('contact') || q.includes('hire') || q.includes('reach') || q.includes('email') || q.includes('start') || q.includes('hello')) {
      return 'You can start anytime by submitting the Initiate Project form at the bottom of this page, or write directly to hello@noveint.com.';
    }
    return 'Thank you for connecting with Nove International! We deliver bespoke web design, AI conversational agents, creative ad assets, and cross-platform software. How can I tailor our capabilities to your vision today?';
  }
};

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ lang }) => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [audioLevel, setAudioLevel] = useState(0);

  const statusRef = useRef<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const isStartingRef = useRef(false);
  const conversationHistoryRef = useRef<MessageHistory[]>([]);
  const recognitionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const silenceTimerRef = useRef<any>(null);
  const cooldownTimerRef = useRef<any>(null);
  const accumulatedSpeechRef = useRef<string>('');
  const isRunningRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const updateStatus = useCallback((newStatus: 'idle' | 'listening' | 'thinking' | 'speaking') => {
    statusRef.current = newStatus;
    setStatus(newStatus);
  }, []);

  // References for cross-referencing callbacks
  const handleUserMessageRef = useRef<(userSpeech: string) => void>(() => {});
  const startListeningLoopRef = useRef<() => void>(() => {});
  const playHumanAudioRef = useRef<(text: string, onEnd?: () => void) => void>(() => {});

  // Preload speech synthesis voices on startup
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const handleVoicesChanged = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log('[VoiceAssistant] SpeechSynthesis voices loaded, count:', voices.length);
      };

      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
      handleVoicesChanged();

      return () => {
        if (window.speechSynthesis) {
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
    }
  }, []);

  // Clean teardown function
  const stopAll = useCallback(() => {
    console.log('[VoiceAssistant] stopAll invoked');
    isRunningRef.current = false;
    isSpeakingRef.current = false;
    isStartingRef.current = false;
    accumulatedSpeechRef.current = '';
    conversationHistoryRef.current = [];

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    if (cooldownTimerRef.current) {
      clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = null;
    }

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        if (activeUtteranceRef.current) {
          activeUtteranceRef.current.onend = null;
          activeUtteranceRef.current.onerror = null;
          activeUtteranceRef.current = null;
        }
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    }

    if (mediaStreamRef.current) {
      try {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      } catch (e) {
        // ignore
      }
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        audioContextRef.current.close();
      } catch (e) {
        // ignore
      }
      audioContextRef.current = null;
    }

    setIsActive(false);
    updateStatus('idle');
    setAudioLevel(0);
  }, [updateStatus]);

  // Native Web Speech API with strict Female Voice Selection
  const playHumanAudio = useCallback((text: string, onEndCallback?: () => void) => {
    if (!isRunningRef.current || !text) return;

    console.log('[VoiceAssistant] playHumanAudio called with text:', text);

    // Strict echo shield: clear speech recognition while assistant is speaking
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    accumulatedSpeechRef.current = '';

    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    }

    if (!('speechSynthesis' in window)) {
      console.warn('[VoiceAssistant] window.speechSynthesis not supported');
      if (onEndCallback) onEndCallback();
      else if (isRunningRef.current) startListeningLoopRef.current();
      return;
    }

    isSpeakingRef.current = true;
    updateStatus('speaking');

    // Cancel any ongoing speech and detach old utterance callbacks
    if (activeUtteranceRef.current) {
      activeUtteranceRef.current.onend = null;
      activeUtteranceRef.current.onerror = null;
      activeUtteranceRef.current = null;
    }
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    // Play pleasant entry acoustic chime
    playAcousticChime(659.25, 880, 0.2);

    const spokenText = text
      .replace(/Nove\s*International/gi, 'Novay International')
      .replace(/\bNove\b/gi, 'Novay');

    const utterance = new SpeechSynthesisUtterance(spokenText);
    activeUtteranceRef.current = utterance;
    
    // Set voice language
    utterance.lang = lang === 'ZH' ? 'zh-TW' : 'en-GB';
    
    // Adjust pitch & speed for a natural, upbeat tone
    utterance.pitch = 1.15;
    utterance.rate = 1.05;

    // Strict female voice selection
    const voices = window.speechSynthesis.getVoices();
    console.log('[VoiceAssistant] Available voice options:', voices.map(v => `${v.name} (${v.lang})`));

    const femaleKeywords = [
      'female',
      'samantha',
      'sonia',
      'zira',
      'victoria',
      'yating',
      'hsiao-chen',
      'google uk english female',
      'natural',
      'online',
      'karen',
      'moira',
      'tessa',
      'fiona',
      'tingting',
      'ting-ting',
      'hanhan',
      'meijia',
      'mei-jia'
    ];

    let preferredVoice: SpeechSynthesisVoice | undefined;

    if (lang === 'ZH') {
      const zhVoices = voices.filter(v => v.lang.toLowerCase().includes('zh') || v.lang.toLowerCase().includes('cmn'));
      preferredVoice = zhVoices.find(v => {
        const name = v.name.toLowerCase();
        return femaleKeywords.some(k => name.includes(k));
      }) || zhVoices.find(v => v.lang.toLowerCase().includes('tw') || v.lang.toLowerCase().includes('hant')) || zhVoices[0];
    } else {
      const enVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
      preferredVoice = enVoices.find(v => {
        const name = v.name.toLowerCase();
        const isGb = v.lang.toLowerCase().includes('gb') || v.lang.toLowerCase().includes('uk') || name.includes('uk');
        return isGb && femaleKeywords.some(k => name.includes(k));
      }) || enVoices.find(v => {
        const name = v.name.toLowerCase();
        return femaleKeywords.some(k => name.includes(k));
      }) || enVoices.find(v => v.lang.toLowerCase().includes('gb') || v.lang.toLowerCase().includes('uk')) || enVoices[0];
    }

    if (preferredVoice) {
      console.log('[VoiceAssistant] Enforcing selected female voice:', preferredVoice.name, preferredVoice.lang);
      utterance.voice = preferredVoice;
    } else {
      console.log('[VoiceAssistant] No specific female voice matched, applying enhanced pitch synthesis');
    }

    utterance.onend = () => {
      console.log('[VoiceAssistant] Speech synthesis ended');
      activeUtteranceRef.current = null;
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
      // 400ms buffer before re-enabling listening loop
      cooldownTimerRef.current = setTimeout(() => {
        isSpeakingRef.current = false;
        accumulatedSpeechRef.current = '';
        if (isRunningRef.current && statusRef.current !== 'thinking') {
          console.log('[VoiceAssistant] Returning to listening state');
          updateStatus('listening');
          if (onEndCallback) {
            onEndCallback();
          } else {
            startListeningLoopRef.current();
          }
        }
      }, 400);
    };

    utterance.onerror = (e: any) => {
      activeUtteranceRef.current = null;
      const errType = e?.error;
      if (errType === 'canceled' || errType === 'interrupted') {
        // Benign cancellation on speech stop or interruption
        return;
      }

      console.warn('[VoiceAssistant] Speech synthesis notification:', errType || 'unknown');
      isSpeakingRef.current = false;
      accumulatedSpeechRef.current = '';
      if (isRunningRef.current && statusRef.current !== 'thinking') {
        updateStatus('listening');
        if (onEndCallback) {
          onEndCallback();
        } else {
          startListeningLoopRef.current();
        }
      }
    };

    window.speechSynthesis.speak(utterance);
  }, [lang, updateStatus]);

  playHumanAudioRef.current = playHumanAudio;

  // Process user speech via Server Gemini Voice Pipeline
  const handleUserMessage = useCallback(async (userSpeech: string) => {
    if (!isRunningRef.current || !userSpeech.trim()) return;

    console.log('[VoiceAssistant] handleUserMessage triggered with input:', userSpeech);

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    accumulatedSpeechRef.current = '';

    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    }

    updateStatus('thinking');

    conversationHistoryRef.current.push({
      role: 'user',
      parts: [{ text: userSpeech }]
    });

    try {
      console.log('[VoiceAssistant] Sending query to /api/voice/chat:', {
        message: userSpeech,
        lang,
        historyLength: conversationHistoryRef.current.length,
      });

      const response = await fetch('/api/voice/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userSpeech,
          history: conversationHistoryRef.current,
          lang,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('[VoiceAssistant] API chat response:', data);
        const reply = data.text;

        if (reply && isRunningRef.current) {
          console.log('[VoiceAssistant] Assistant reply:', reply);
          conversationHistoryRef.current.push({
            role: 'model',
            parts: [{ text: reply }]
          });

          if (conversationHistoryRef.current.length > 12) {
            conversationHistoryRef.current = conversationHistoryRef.current.slice(-10);
          }

          playHumanAudioRef.current(reply);
          return;
        }
      } else {
        console.warn('[VoiceAssistant] API chat responded with status:', response.status);
      }
    } catch (err) {
      console.warn('[VoiceAssistant] API chat error:', err);
    }

    // Fallback local responder if network error
    const tailoredReply = generateLocalResponse(userSpeech, lang);
    console.log('[VoiceAssistant] Fallback local response generated:', tailoredReply);
    conversationHistoryRef.current.push({
      role: 'model',
      parts: [{ text: tailoredReply }]
    });

    playHumanAudioRef.current(tailoredReply);
  }, [lang, updateStatus]);

  handleUserMessageRef.current = handleUserMessage;

  // Single-turn Speech Recognition Loop with Echo Shielding & Diagnostics
  const startListeningLoop = useCallback(() => {
    if (!isRunningRef.current || isSpeakingRef.current || isStartingRef.current || statusRef.current === 'thinking') {
      console.log(`[VoiceAssistant] startListeningLoop skipped (isRunning=${isRunningRef.current}, isSpeaking=${isSpeakingRef.current}, isStarting=${isStartingRef.current}, status=${statusRef.current})`);
      return;
    }

    isStartingRef.current = true;
    isSpeakingRef.current = false;
    accumulatedSpeechRef.current = '';
    updateStatus('listening');
    console.log('[VoiceAssistant] startListeningLoop active, status=listening, isSpeaking=false');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      isStartingRef.current = false;
      console.warn('[VoiceAssistant] SpeechRecognition API not available in browser');
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onsoundstart = null;
        recognitionRef.current.onspeechstart = null;
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false; // Single-turn for reliable browser event dispatching
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.lang = lang === 'ZH' ? 'zh-TW' : 'en-GB';

      recognition.onsoundstart = () => {
        console.log('[VoiceAssistant] Audio sound detected from microphone');
      };

      recognition.onspeechstart = () => {
        console.log('[VoiceAssistant] Audio sound detected from microphone');
      };

      recognition.onstart = () => {
        isStartingRef.current = false;
        console.log('[VoiceAssistant] Speech recognition active and listening');
        if (isRunningRef.current && !isSpeakingRef.current && statusRef.current !== 'thinking') {
          updateStatus('listening');
        }
      };

      recognition.onresult = (event: any) => {
        if (isSpeakingRef.current || statusRef.current === 'thinking') {
          console.log('[VoiceAssistant] onresult discarded because assistant is currently speaking or thinking');
          return;
        }

        if (event.results && event.results[0] && event.results[0][0]) {
          console.log('[VoiceAssistant] Speech recognized:', event.results[0][0].transcript);
        }

        let interimStr = '';
        let finalStr = '';

        for (let i = 0; i < event.results.length; ++i) {
          const trans = event.results[i][0]?.transcript || '';
          if (event.results[i].isFinal) {
            finalStr += trans;
          } else {
            interimStr += trans;
          }
        }

        const candidateText = (finalStr || interimStr || '').trim();

        if (finalStr.trim()) {
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
          }
          const textToSend = finalStr.trim();
          console.log('[VoiceAssistant] Final transcript captured:', textToSend);
          
          // Clean stopping before API call with 300ms explicit delay
          if (recognitionRef.current) {
            try {
              recognitionRef.current.onresult = null;
              recognitionRef.current.onend = null;
              recognitionRef.current.onerror = null;
              recognitionRef.current.onsoundstart = null;
              recognitionRef.current.onspeechstart = null;
              recognitionRef.current.stop();
            } catch (e) {
              // ignore
            }
            recognitionRef.current = null;
          }

          setTimeout(() => {
            if (isRunningRef.current && !isSpeakingRef.current && statusRef.current !== 'thinking') {
              handleUserMessageRef.current(textToSend);
            }
          }, 300);
        } else if (candidateText) {
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
          }
          // Debounce fallback if final flag is delayed
          silenceTimerRef.current = setTimeout(() => {
            if (isRunningRef.current && !isSpeakingRef.current && statusRef.current !== 'thinking' && candidateText) {
              console.log('[VoiceAssistant] Silence timeout elapsed, submitting interim transcript:', candidateText);
              if (recognitionRef.current) {
                try {
                  recognitionRef.current.onresult = null;
                  recognitionRef.current.onend = null;
                  recognitionRef.current.onerror = null;
                  recognitionRef.current.onsoundstart = null;
                  recognitionRef.current.onspeechstart = null;
                  recognitionRef.current.stop();
                } catch (e) {
                  // ignore
                }
                recognitionRef.current = null;
              }

              setTimeout(() => {
                if (isRunningRef.current && !isSpeakingRef.current && statusRef.current !== 'thinking') {
                  handleUserMessageRef.current(candidateText);
                }
              }, 300);
            }
          }, 1000);
        }
      };

      recognition.onerror = (event: any) => {
        isStartingRef.current = false;
        const errType = event?.error || 'unknown';

        if (errType === 'aborted') {
          // Benign cancellation / transition event
          return;
        }

        if (errType === 'no-speech') {
          if (isRunningRef.current && !isSpeakingRef.current && statusRef.current !== 'thinking') {
            setTimeout(() => {
              if (isRunningRef.current && !isSpeakingRef.current && statusRef.current !== 'thinking') {
                startListeningLoopRef.current();
              }
            }, 200);
          }
          return;
        }

        console.warn('[VoiceAssistant] Speech recognition notification:', errType);
        if (isRunningRef.current && !isSpeakingRef.current && statusRef.current !== 'thinking') {
          setTimeout(() => {
            if (isRunningRef.current && !isSpeakingRef.current && statusRef.current !== 'thinking') {
              startListeningLoopRef.current();
            }
          }, 300);
        }
      };

      recognition.onend = () => {
        isStartingRef.current = false;
        console.log('[VoiceAssistant] Speech recognition onend');
        if (isRunningRef.current && !isSpeakingRef.current && statusRef.current !== 'thinking') {
          setTimeout(() => {
            if (isRunningRef.current && !isSpeakingRef.current && statusRef.current !== 'thinking') {
              startListeningLoopRef.current();
            }
          }, 200);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      isStartingRef.current = false;
      console.warn('[VoiceAssistant] Speech recognition start exception:', e);
    }
  }, [lang, updateStatus]);

  startListeningLoopRef.current = startListeningLoop;

  // Main start sequence
  const startAssistant = async () => {
    console.log('[VoiceAssistant] Starting voice assistant session');
    isRunningRef.current = true;
    isSpeakingRef.current = false;
    isStartingRef.current = false;
    accumulatedSpeechRef.current = '';
    setIsActive(true);
    updateStatus('thinking');
    conversationHistoryRef.current = [];

    // Play activation chime
    playAcousticChime(523.25, 783.99, 0.3);

    // Setup visualizer analyzer
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtxClass) {
      try {
        const audioCtx = new AudioCtxClass({ sampleRate: 24000 });
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        audioContextRef.current = audioCtx;

        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;

        // Visualizer volume animation loop
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const updateVolume = () => {
          if (analyserRef.current && isRunningRef.current) {
            analyserRef.current.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const avg = sum / dataArray.length;
            setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
            animFrameRef.current = requestAnimationFrame(updateVolume);
          }
        };
        updateVolume();

        // Connect mic stream for listening visualizer
        if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;
            const source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);
          } catch (e) {
            // Mic permission denied or silent
          }
        }
      } catch (err) {
        setAudioLevel(0);
      }
    }

    const greeting = lang === 'ZH'
      ? '您好！我是 Nove，您的全球數位架構顧問。請問今天有什麼我可以為您的品牌協助的呢？'
      : 'Hello! I am Nove, your global digital architect. How can I assist your brand today?';

    conversationHistoryRef.current.push({
      role: 'model',
      parts: [{ text: greeting }]
    });

    playHumanAudio(greeting);
  };

  const toggleAssistant = () => {
    if (isActive) {
      stopAll();
    } else {
      startAssistant();
    }
  };

  useEffect(() => {
    return () => {
      stopAll();
    };
  }, [stopAll]);

  // Clean status label
  const getStatusLabel = () => {
    if (!isActive) {
      return lang === 'ZH' ? '點擊啟動語音' : 'Click to speak';
    }
    switch (status) {
      case 'speaking':
        return lang === 'ZH' ? 'Nove 正在說話...' : 'Nove is speaking...';
      case 'thinking':
        return lang === 'ZH' ? '思考中...' : 'Thinking...';
      case 'listening':
      default:
        return lang === 'ZH' ? '正在聆聽...' : 'Listening...';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[160] flex flex-col items-end pointer-events-auto select-none">
      {/* Floating Status Pill */}
      <div 
        onClick={toggleAssistant}
        className={`mb-2.5 px-3 py-1.5 rounded-full border backdrop-blur-md transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-lg ${
          isActive 
            ? 'bg-black/90 border-[#39FF14]/50 shadow-[0_0_20px_rgba(57,255,20,0.25)]' 
            : 'bg-black/80 border-white/15 hover:border-[#39FF14]/40 hover:bg-black/95 opacity-85 hover:opacity-100'
        }`}
      >
        {/* Visual indicator dot / icon */}
        <div className="flex items-center justify-center">
          {status === 'speaking' ? (
            <Volume2 className="w-3.5 h-3.5 text-[#39FF14] animate-pulse" />
          ) : status === 'listening' ? (
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#39FF14]" />
            </span>
          ) : status === 'thinking' ? (
            <Sparkles className="w-3.5 h-3.5 text-[#39FF14] animate-spin" />
          ) : (
            <Mic className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#39FF14]" />
          )}
        </div>

        {/* Status text */}
        <span className={`text-[11px] font-mono tracking-wider uppercase font-semibold ${
          isActive ? 'text-[#39FF14]' : 'text-zinc-300'
        }`}>
          {getStatusLabel()}
        </span>

        {/* Active mini visualizer waves */}
        {isActive && (
          <div className="flex items-center gap-0.5 h-3 px-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-0.5 bg-[#39FF14] rounded-full transition-all duration-100"
                style={{
                  height: status === 'listening'
                    ? (audioLevel > 5 ? `${Math.max(3, Math.min(12, (audioLevel / 100) * 12 * (1 + i * 0.3)))}px` : `${[4, 8, 6, 10][i]}px`)
                    : status === 'speaking'
                    ? `${[10, 5, 12, 7][i]}px`
                    : '2px',
                  opacity: status === 'idle' ? 0.3 : 1
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Central Floating Voice Orb / Button */}
      <button
        onClick={toggleAssistant}
        aria-label={isActive ? 'Stop AI Voice Assistant' : 'Start AI Voice Assistant'}
        className={`relative group w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 focus:outline-none cursor-pointer ${
          isActive
            ? 'bg-black border-2 border-[#39FF14] shadow-[0_0_35px_#39FF14,inset_0_0_15px_#39FF14]'
            : 'bg-black/90 hover:bg-black border-2 border-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.6)] hover:shadow-[0_0_35px_#39FF14] hover:scale-105'
        }`}
      >
        {/* Pulsing Green Aura Rings */}
        <div 
          className={`absolute inset-0 rounded-full bg-[#39FF14]/20 transition-opacity duration-500 ${
            isActive ? 'animate-ping opacity-60' : 'opacity-0 group-hover:opacity-40'
          }`} 
        />

        {/* Audio-reactive wave ring when speaking or listening */}
        {isActive && (
          <div 
            className="absolute -inset-1.5 rounded-full border border-[#39FF14]/40 animate-pulse pointer-events-none"
            style={{
              transform: `scale(${1 + (audioLevel / 200)})`
            }}
          />
        )}

        {/* Center Icon: Mic with reactive glow when listening/active, Square to stop when active */}
        {isActive ? (
          <div className="flex items-center justify-center">
            {status === 'speaking' ? (
              <Volume2 className="w-6 h-6 text-[#39FF14] animate-pulse" />
            ) : status === 'listening' ? (
              <Mic className="w-6 h-6 text-[#39FF14] animate-bounce" />
            ) : (
              <Square className="w-5 h-5 text-[#39FF14] fill-[#39FF14] transition-transform duration-200 group-hover:scale-90" />
            )}
          </div>
        ) : (
          <Mic className="w-6 h-6 md:w-7 md:h-7 text-[#39FF14] transition-transform duration-200 group-hover:scale-110" />
        )}
      </button>
    </div>
  );
};

export default VoiceAssistant;
