import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI, Modality, LiveServerMessage, Blob, Type } from '@google/genai';
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

  const sessionRef = useRef<any>(null);
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

  const createBlob = (data: Float32Array): Blob => {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      const s = Math.max(-1, Math.min(1, data[i]));
      int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
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

    if (sessionRef.current) {
      try {
        sessionRef.current.close();
      } catch (e) {}
      sessionRef.current = null;
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
      const apiKey =
        import.meta.env.VITE_GEMINI_API_KEY ||
        (typeof process !== 'undefined' ? (process.env as any)?.GEMINI_API_KEY : undefined);

      if (!apiKey) {
        console.warn('VITE_GEMINI_API_KEY is not configured. Please set VITE_GEMINI_API_KEY in your environment variables.');
        setStatus(lang === 'EN' ? 'API KEY REQUIRED' : '未設定 API 金鑰');
        setIsConnecting(false);
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        apiVersion: 'v1alpha',
        apiOptions: { apiVersion: 'v1alpha' },
        httpOptions: { apiVersion: 'v1alpha' },
      } as any);

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

      const baseInstruction = `
You are Nove (pronounced No-vay), a sophisticated, articulate consultant for Nove International.

CORE PERSONA & PRICING STANCE:
- You represent Nove International, a cross-cultural creative engineering studio uniting UK creative heritage with Taiwan soul.
- Transparent prices shown on our website are baseline starting guide estimates only. Every project is bespoke, scoping is tailored, and rates are negotiable based on specific client requirements and technical milestones.
- NEVER give rigid final quotes or binding prices. Always clarify that rates are baseline guides, and direct prospects to discuss their brief with our team and complete the 'START A PROJECT' form at the bottom of the page.
- Do not rush the user to the form. First answer questions thoroughly, demonstrate domain mastery across our tracks, provide insightful suggestions, and build rapport.

ABOUT PAGE & COMPANY STORY (Route: '/about'):
- Nove International is a premier digital agency and cross-cultural creative engineering studio uniting UK creative heritage with Taiwan soul.
- Digital architects crafting future-proof digital footprints, combining precision engineering with creative storytelling.
- Ethos & Mission: "Bridges of tomorrow, built today." (「今日打造，明日之橋。」)
- Bridges Western and Eastern digital markets with bilingual design systems, cutting-edge AI integrations, and high-performance web architecture.
- Whenever the user inquires about our studio, company story, ethos, team, or asks to see the 'About' page, invoke navigateToPage({ path: '/about' }) and warmly introduce our vision.

6 SERVICE TRACKS & PORTFOLIO EXHIBITS:
1. Web & UI/UX Design (Route: '/services/web-design'):
- Focus: Bilingual typography (harmonizing Latin and Traditional Chinese), Next.js / Tailwind CSS / Framer Motion engineering, interactive Figma prototypes, and responsive digital architectures[cite: 2, 3].
- Portfolio showcase: 'Zenith' interactive architecture portfolio, Lusso Residences, Talon Studio[cite: 3].
- Guide baseline estimate: £115 to £420 (e.g., £115 single-page homepage, £180 one-page shopping, £360 multi-page website, £420 custom portal)[cite: 3].
2. Creative Ad Assets (Route: '/services/creative-assets'):
- Focus: High-impact visual storytelling, motion graphics, Out-Of-Home (OOH) displays, and bilingual brand identities merging Western minimalist flair with Eastern aesthetic depths[cite: 2, 4].
- Portfolio showcase: Chronos, Raw Food Lab, Tokyo Underground, Lumina, Kntc[cite: 4, 5].
- Guide baseline estimate: £40 to £320 (e.g., £40 Simple solution, £75 Basic Plan, £140 Advanced, £320 Complete brand identity solution)[cite: 5].
3. Language Services (Route: '/services/language-services'):
- Focus: Nuanced Traditional Chinese localization, creative copywriting, verbatim & interpretive field services, and cultural consulting for cross-border market entry[cite: 2, 6].
- Guide baseline estimate: £45 to £350 (e.g., £45 Document Essentials, £120 Content Localization, £350 Strategic Global market entry)[cite: 6].
4. Google AI & Maps Optimization (Route: '/services/google-optimization'):
- Focus: Generative Engine Optimization (GEO/AEO) for AI search discovery, Google Maps dominance, Google Business Profile ecosystem, Knowledge Graph authority, and geo-spatial analytics[cite: 2, 7].
- Portfolio showcase: 'The Foundry' spatial metrics engine, Mirai Bistro, Lantern Workspace, Crossroads Logistics[cite: 7].
- Guide baseline estimate: £80 to £450[cite: 7].
5. AI Voice & Conversational UI (Route: '/services/ai-voice'):
- Focus: Realtime low-latency bilingual conversational voice agents, luxury hospitality concierges, custom conversational logic, and Gemini Live integrations[cite: 2, 8].
- Portfolio showcase: 'Live Chatbot Simulation Matrix' (Kinetic-AI Web3 support, Lyra Voice luxury hospitality, E-Com Companion, Bilingual Hub)[cite: 8].
- Guide baseline estimate: £250 to £1,500[cite: 8].
6. Cross-Platform App Development (Route: '/services/app-development'):
- Focus: Scalable cloud SaaS architectures, native and hybrid iOS & Android apps, robust microservices backends, and API security[cite: 2, 9].
- Portfolio showcase: Mobile fitness & activity tracker (AlphaSync, Boba English)[cite: 9].
- Guide baseline estimate: £850 to £5,500[cite: 9].

NOVETOOLS SUITE (novetools.com):
- High-performance, 100% client-side, privacy-first browser utilities where all processing runs locally inside the user's browser without uploading files to remote servers[cite: 10, 12].
- Utility Suite: Video Processor (trim & crop), Image Processor (batch compression & ZIP packaging), PDF Processor (merge/split/convert), Unit Converter, Global Sync Max (distributed team timezones), Time Span Max[cite: 10, 11, 12].
- Creative Tools: Palette Generator, Favicon Generator, QR Code Generator, Signature Generator[cite: 10, 11, 12].
- Whenever users ask about tools, privacy, or utilities, invoke scrollToSection('novetools') or offer to open 'https://novetools.com' via openExternalLink[cite: 10, 11, 12].

PROACTIVE CO-BROWSING BEHAVIOR:
- You have client tools to guide the user in real time:
  1. scrollToSection({ sectionId }): Smoothly scroll to 'novetools', 'services', 'contact', 'pricing', or 'portfolio'[cite: 2, 3, 5, 6, 7, 8, 9, 10].
  2. navigateToPage({ path }): Navigate to any page or service route. Supported paths include: '/about', '/', '/services', '/services/web-design', '/services/creative-assets', '/services/language-services', '/services/google-optimization', '/services/ai-voice', '/services/app-development'[cite: 2].
  3. openExternalLink({ url }): Open external URLs in a new browser tab (e.g., 'https://novetools.com')[cite: 10, 11, 12].
- Whenever discussing a service, portfolio demo, pricing table, the company story/about page, or NoveTools, proactively trigger the relevant tool (scrollToSection, navigateToPage, or openExternalLink) and verbally announce the action in natural British English (RP) or Traditional Chinese depending on the user's selected language[cite: 2, 10, 11, 12].
`;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-latest',
        apiOptions: { apiVersion: 'v1alpha' },
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            sessionActiveRef.current = true;
            setStatus(lang === 'EN' ? 'ONLINE' : '在線顧問');

            const source =
              audioContextInRef.current!.createMediaStreamSource(stream);
            const scriptProcessor =
              audioContextInRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (e) => {
              if (!sessionActiveRef.current) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise
                .then((session: any) => {
                  if (sessionActiveRef.current) {
                    session.sendRealtimeInput({ media: pcmBlob });
                  }
                })
                .catch(() => {});
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextInRef.current!.destination);

            sessionPromise.then((session: any) => {
              if (sessionActiveRef.current) {
                session.sendRealtimeInput({
                  text:
                    lang === 'ZH'
                      ? '你好 Nove，請簡短地問候我。'
                      : 'Hello Nove, please greet me briefly.',
                });
              }
            });
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio =
              message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
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
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach((s) => {
                try {
                  s.stop();
                } catch (e) {}
              });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }

            // Level B "Co-Browsing" Action Execution (Live Tool Calling)
            const functionCalls: any[] = [];
            if (message.toolCall?.functionCalls) {
              functionCalls.push(...message.toolCall.functionCalls);
            }
            if ((message as any).serverContent?.modelTurn?.parts) {
              for (const part of (message as any).serverContent.modelTurn.parts) {
                if (part.functionCall) {
                  functionCalls.push(part.functionCall);
                }
              }
            }

            if (functionCalls.length > 0) {
              for (const call of functionCalls) {
                const callName = call.name;
                const args = (call.args || {}) as any;

                if (callName === 'scrollToSection') {
                  if (args.sectionId) handleScrollToSection(args.sectionId);
                } else if (callName === 'navigateToPage' || callName === 'navigateToService') {
                  if (args.path) handleNavigateToPage(args.path);
                } else if (callName === 'openExternalLink') {
                  if (args.url) handleOpenExternalLink(args.url);
                }

                // Send toolResponse promptly so voice dialogue loop proceeds without interruption
                const responsePayload = {
                  functionResponses: [
                    {
                      id: call.id,
                      name: callName,
                      response: { output: { status: 'success' } },
                    },
                  ],
                };

                sessionPromise
                  .then((session: any) => {
                    if (!sessionActiveRef.current) return;
                    try {
                      if (typeof session.sendRealtimeInput === 'function') {
                        session.sendRealtimeInput({
                          toolResponse: responsePayload,
                        } as any);
                      }
                    } catch (e) {}

                    try {
                      if (typeof session.sendToolResponse === 'function') {
                        session.sendToolResponse(responsePayload);
                      }
                    } catch (e) {}
                  })
                  .catch((err) => {
                    console.error('Failed to send toolResponse:', err);
                  });
              }
            }
          },
          onerror: (e: any) => {
            console.error('Session Error:', e);
            setStatus(lang === 'EN' ? 'NETWORK ERROR' : '連線失敗');
            setTimeout(() => {
              if (sessionActiveRef.current) stopSession();
            }, 4000);
          },
          onclose: (e: any) => {
            console.error('Session closed! Code:', e?.code, 'Reason:', e?.reason);
            stopSession();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          tools: [
            {
              functionDeclarations: [
                {
                  name: 'scrollToSection',
                  description:
                    'Smoothly scrolls the browser viewport to a specific target section by element ID (e.g., novetools, services, contact, pricing, portfolio).',
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      sectionId: {
                        type: Type.STRING,
                        description:
                          "Target element ID (e.g., 'novetools', 'services', 'contact', 'pricing', 'portfolio').",
                      },
                    },
                    required: ['sectionId'],
                  },
                },
                {
                  name: 'navigateToPage',
                  description:
                    'Navigates to a specific page or service view across the website. Supported paths include: /about (About Nove International, UK creative heritage & Taiwan soul studio story, mission), /services (Services overview), / (Home), and individual service showcases: /services/web-design, /services/creative-assets, /services/language-services, /services/google-optimization, /services/ai-voice, /services/app-development.',
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      path: {
                        type: Type.STRING,
                        description:
                          'The target route path (e.g., /about, /, /services, /services/web-design, /services/creative-assets, /services/language-services, /services/google-optimization, /services/ai-voice, /services/app-development).',
                      },
                    },
                    required: ['path'],
                  },
                },
                {
                  name: 'navigateToService',
                  description:
                    'Navigates to a specific service view, page, or showcase route (e.g., /about, /services, /services/web-design, /services/creative-assets, /services/language-services, /services/google-optimization, /services/ai-voice, /services/app-development, /).',
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      path: {
                        type: Type.STRING,
                        description:
                          'The target route path (e.g., /about, /services/web-design, /services/creative-assets, /services/language-services, /services/google-optimization, /services/ai-voice, /services/app-development, /services, /).',
                      },
                    },
                    required: ['path'],
                  },
                },
                {
                  name: 'openExternalLink',
                  description:
                    "Opens external URLs such as 'https://novetools.com' in a new browser tab.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      url: {
                        type: Type.STRING,
                        description:
                          "The complete URL to open (e.g., 'https://novetools.com').",
                      },
                    },
                    required: ['url'],
                  },
                },
              ],
            },
          ],
          systemInstruction:
            lang === 'ZH'
              ? baseInstruction +
                '\n\nLanguage & Tone: Respond exclusively in Traditional Chinese (Taiwan, 繁體中文). Use polished, professional Taiwanese phrasing (例如：專案, 在地化, 響應式, 介面, 估價). When triggering co-browsing actions (如滑動至區塊或開啟新頁面), announce them politely in natural Traditional Chinese.'
              : baseInstruction +
                '\n\nLanguage & Tone: Speak in natural British English (Received Pronunciation) with British phrasing, vocabulary, and spelling (e.g., bespoke, whilst, colour, portfolio, enquire). Announce co-browsing actions politely in charming British cadence.',
        },
      } as any);

      sessionRef.current = await sessionPromise;
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
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] pointer-events-auto group relative ${
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