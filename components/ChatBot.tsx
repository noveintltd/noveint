import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Language } from '../App';

interface ChatBotProps {
  lang: Language;
}

const ChatBot: React.FC<ChatBotProps> = ({ lang }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [status, setStatus] = useState<string>(
    lang === 'EN' ? 'SAY HELLO' : '打個招呼'
  );

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextInRef = useRef<AudioContext | null>(null);
  const audioContextOutRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const streamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const sessionActiveRef = useRef<boolean>(false);

  const [popupFallback, setPopupFallback] = useState<{ url: string; label: string } | null>(null);
  const popupTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dynamically update the idle badge text when switching site language
  useEffect(() => {
    if (!isActive && !isConnecting) {
      setStatus(lang === 'EN' ? 'SAY HELLO' : '打個招呼');
    }
  }, [lang, isActive, isConnecting]);

  useEffect(() => {
    return () => {
      stopSession();
      if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);
    };
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const cleanId = sectionId.replace(/^#/, '').trim();
    const el = document.getElementById(cleanId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    // If target section is on another page, navigate first then scroll
    if (cleanId === 'novetools' || cleanId === 'contact') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(cleanId)?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    } else if (cleanId === 'services') {
      navigate('/services');
      setTimeout(() => {
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    } else if (cleanId === 'pricing' || cleanId === 'portfolio') {
      setTimeout(() => {
        document.getElementById(cleanId)?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  };

  const handleNavigateToPage = (path: string) => {
    let target = path.trim();
    const lower = target.toLowerCase().replace(/^\/+/, '');

    if (lower === 'about') {
      navigate('/about');
      return;
    }
    if (lower === '' || lower === 'home') {
      navigate('/');
      return;
    }
    if (lower === 'services') {
      navigate('/services');
      return;
    }

    if (!target.startsWith('/')) {
      target = target.startsWith('services/') ? `/${target}` : `/services/${target}`;
    }
    navigate(target);
  };

  const handleOpenExternalLink = (url: string) => {
    let fullUrl = url.trim();
    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
      fullUrl = `https://${fullUrl}`;
    }

    const isNoveTools = fullUrl.toLowerCase().includes('novetools');
    const buttonLabel = isNoveTools
      ? (lang === 'ZH' ? '啟動 novetools.com ↗' : 'Launch novetools.com ↗')
      : (lang === 'ZH' ? `開啟 ${fullUrl.replace(/^https?:\/\//, '')} ↗` : `Open ${fullUrl.replace(/^https?:\/\//, '')} ↗`);

    try {
      const newWindow = window.open(fullUrl, '_blank', 'noopener,noreferrer');
      if (newWindow === null || typeof newWindow === 'undefined' || newWindow.closed) {
        // Pop-up blocked: fallback interactive button will handle it
      }
    } catch (e) {
      // Ignored: fallback button remains available
    }

    // Always display the interactive direct-action banner for 5 seconds as fallback / instant confirmation
    if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);
    setPopupFallback({ url: fullUrl, label: buttonLabel });
    popupTimeoutRef.current = setTimeout(() => {
      setPopupFallback(null);
    }, 5000);
  };

  function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  function encode(bytes: Uint8Array) {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  const createPcmBase64 = (data: Float32Array): string => {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      const s = Math.max(-1, Math.min(1, data[i]));
      int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return encode(new Uint8Array(int16.buffer));
  };

  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const stopSession = () => {
    sessionActiveRef.current = false;

    if (wsRef.current) {
      try {
        wsRef.current.close();
      } catch (e) {}
      wsRef.current = null;
    }

    if (scriptProcessorRef.current) {
      try {
        scriptProcessorRef.current.disconnect();
      } catch (e) {}
      scriptProcessorRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    sourcesRef.current.forEach((s) => {
      try {
        s.stop();
        s.disconnect();
      } catch (e) {}
    });
    sourcesRef.current.clear();

    setIsActive(false);
    setIsConnecting(false);
    setStatus(lang === 'EN' ? 'SAY HELLO' : '打個招呼');
    nextStartTimeRef.current = 0;
  };

  const startSession = async () => {
    if (isConnecting || isActive) return;

    if (!window.isSecureContext && window.location.hostname !== 'localhost') {
      setStatus('HTTPS REQUIRED');
      return;
    }

    setIsConnecting(true);
    setStatus(lang === 'EN' ? 'CONNECTING...' : '正在連線...');

    try {
      if (!audioContextOutRef.current) {
        audioContextOutRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      if (!audioContextInRef.current) {
        audioContextInRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)({ sampleRate: 16000 });
      }

      await audioContextOutRef.current.resume();
      await audioContextInRef.current.resume();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/live?lang=${lang}`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        // Connection established with server proxy
      };

      ws.onmessage = async (event) => {
        try {
          const msg = JSON.parse(event.data);

          if (msg.type === 'open') {
            setIsConnecting(false);
            setIsActive(true);
            sessionActiveRef.current = true;
            setStatus(lang === 'EN' ? 'ONLINE' : '在線顧問');

            // Set up mic processing
            const source = audioContextInRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextInRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (e) => {
              if (!sessionActiveRef.current || ws.readyState !== WebSocket.OPEN) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBase64 = createPcmBase64(inputData);
              ws.send(JSON.stringify({ type: 'audio', audio: pcmBase64 }));
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextInRef.current!.destination);
          } else if ((msg.type === 'audio' || msg.audio) && (msg.audio || msg.data)) {
            const base64Audio = msg.audio || msg.data;
            const ctx = audioContextOutRef.current!;
            nextStartTimeRef.current = Math.max(
              nextStartTimeRef.current,
              ctx.currentTime + 0.05,
            );

            const buffer = await decodeAudioData(
              decode(base64Audio),
              ctx,
              24000,
              1,
            );
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);

            source.onended = () => {
              sourcesRef.current.delete(source);
              if (sourcesRef.current.size === 0 && sessionActiveRef.current) {
                setStatus(lang === 'EN' ? 'LISTENING' : '正在聆聽');
              }
            };

            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += buffer.duration;
            sourcesRef.current.add(source);
            setStatus(lang === 'EN' ? 'SPEAKING' : '正在回應');
          } else if (msg.type === 'interrupted') {
            sourcesRef.current.forEach((s) => {
              try {
                s.stop();
              } catch (e) {}
            });
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
          } else if (msg.type === 'toolCall' && Array.isArray(msg.calls)) {
            // Level B "Co-Browsing" Action Execution (Live Tool Calling)
            for (const call of msg.calls) {
              const callName = call.name;
              const args = (call.args || {}) as any;

              if (callName === 'scrollToSection') {
                if (args.sectionId) handleScrollToSection(args.sectionId);
              } else if (callName === 'navigateToPage' || callName === 'navigateToService') {
                if (args.path) handleNavigateToPage(args.path);
              } else if (callName === 'openExternalLink') {
                if (args.url) handleOpenExternalLink(args.url);
              }
            }

            // Send toolResponse promptly so voice dialogue loop proceeds without interruption
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({
                type: 'toolResponse',
                functionResponses: msg.calls.map((call: any) => ({
                  id: call.id,
                  name: call.name,
                  response: { output: { status: 'success' } },
                })),
              }));
            }
          } else if (msg.type === 'error') {
            console.error('Server Live session error:', msg.message);
            setStatus(lang === 'EN' ? 'UNAVAILABLE' : '暫時無法連線');
            setTimeout(() => {
              if (sessionActiveRef.current) stopSession();
            }, 3000);
          } else if (msg.type === 'close') {
            stopSession();
          }
        } catch (err) {
          console.error('Error handling websocket message:', err);
        }
      };

      ws.onerror = (e) => {
        console.error('Session Error:', e);
        setStatus(lang === 'EN' ? 'NETWORK ERROR' : '連線失敗');
        setTimeout(() => {
          if (sessionActiveRef.current) stopSession();
        }, 4000);
      };

      ws.onclose = () => {
        if (sessionActiveRef.current) {
          stopSession();
        }
      };
    } catch (error: any) {
      console.error('Nove start error:', error);
      setStatus(lang === 'EN' ? 'UNAVAILABLE' : '暫時無法連線');
      setTimeout(stopSession, 3000);
    }
  };

  return (
    <>
      {popupFallback && (
        <div className="fixed bottom-28 right-8 z-[350] pointer-events-auto animate-bounce max-w-[calc(100vw-4rem)]">
          <a
            href={popupFallback.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setPopupFallback(null)}
            className="flex items-center gap-2.5 bg-[#39FF14] text-black font-black uppercase text-xs tracking-wider px-5 py-3 rounded-full shadow-[0_0_30px_rgba(57,255,20,0.8)] border border-black hover:bg-white hover:text-black transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>{popupFallback.label}</span>
            <span className="text-sm font-black">↗</span>
          </a>
        </div>
      )}

      <div className="fixed bottom-8 right-8 z-[300] pointer-events-none">
        <div className="flex flex-col items-end gap-3">
          <div className="bg-black/90 border border-white/10 px-4 py-1.5 rounded-sm flex items-center gap-2.5 shadow-2xl backdrop-blur-md animate-hero-entry">
            <span
              className={`w-2 h-2 rounded-full bg-[#39FF14] ${
                isActive ? 'animate-pulse' : 'opacity-40'
              } shadow-[0_0_8px_rgba(57,255,20,0.5)]`}
            />
            <span className="text-[10px] font-black tracking-[0.2em] text-white uppercase opacity-90">
              {status}
            </span>
          </div>

          <button
            onClick={() =>
              isActive || isConnecting ? stopSession() : startSession()
            }
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] pointer-events-auto group relative cursor-pointer ${
              isActive
                ? 'bg-[#39FF14] text-black scale-110 shadow-[0_0_40px_rgba(57,255,20,0.4)]'
                : 'bg-black border border-[#39FF14]/40 text-[#39FF14] hover:border-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.1)]'
            }`}
            aria-label={isActive ? 'End Call' : 'Call Nove'}
          >
            {isConnecting ? (
              <svg
                className="w-12 h-12 animate-spin text-[#39FF14]"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : isActive ? (
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="6" width="12" height="12" rx="1" />
                </svg>
              </div>
            ) : (
              <svg
                className="w-7 h-7 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            )}

            {isActive && (
              <div className="absolute inset-0 rounded-full border-2 border-[#39FF14]/30 animate-[ping_2s_ease-in-out_infinite]" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;