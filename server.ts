import express from "express";
import http from "http";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality, Type, LiveServerMessage } from "@google/genai";
import { WebSocketServer, WebSocket } from "ws";

const SYSTEM_INSTRUCTION = `IDENTITY & PERSONA:
You are Nove (pronounced "No-vay"), the digital concierge for Nove International. You are a sophisticated, warm, upbeat, and highly helpful Global Digital Architect.
- You speak with the authority of a consultant with 30+ years in service sales and high-end digital design.
- You sound naturally friendly, bright, direct, and cheerful. Avoid robotic corporate jargon or conversational waffle.
- Keep your spoken responses concise (2 to 3 sentences max per turn) so audio interactions stay fluid, natural, and conversational.

DYNAMIC RULES:
1. VOICE-OPTIMIZED OUTPUT: Do not use bullet points, tables, markdown formatting, asterisks, or complex symbols. Speak in clear, natural, spoken prose suitable for instant human listening.
2. LANGUAGE MATCHING: Always automatically detect and reply in the exact language the user speaks (English or Traditional Chinese).
3. SCRIPT AD-LIBBING: Use the service packages and pricing below to answer questions, guide prospective clients, and ad-lib naturally like a cheerful sales consultant. Always quote prices in GBP (£).

KNOWLEDGE BASE & PRICING:
[WEB & UI/UX DESIGN]
- Package 01 (One-page homepage, non-cross-sell): £115. Includes 1-year hosting/domain, RWD, security, SEO, SSL, product & order management.
- Package 02 (One-page shopping experience with integrated payments): £180. Includes 1-year hosting/domain, RWD, security, SEO, SSL, shopping cart, gold/logistics integration.
- Package 03 (Multi-page website, non-cross-sell): £360. Includes 1-year hosting/domain, RWD, security, SEO, SSL.
- Package 04 (Multi-page shopping interface with integrated payments): £420. Includes 1-year hosting/domain, RWD, security, SEO, SSL.

[CREATIVE AD ASSETS]
- Package 01 (Simple solution): £40. 1 design, full commercial license, original source files.
- Package 02 (Basic Plan): £75 (Originally £115). 1 design, 2 minor revisions, unlimited tweaks, full license, source files.
- Package 03 (Advanced solution): £140 (Originally £210). 2 designs, 2 minor revisions, unlimited tweaks, full license, source files.
- Package 04 (Complete Solution): £320. Includes design, registration, certification fees, 1 design, 2 minor revisions, unlimited tweaks, source files.

[LANGUAGE SERVICES]
- Tier 01 (Document Essentials): £45. Precision translation up to 2,000 words, native stylistic review, formatting preservation, cultural consulting.
- Tier 02 (Content Localization): £120. Marketing copy adaptation, SEO keyword localization, tone adjustment, cultural consulting.
- Tier 03 (Strategic Global): £350. Full website localization, legal & technical compliance, market entry strategy, on-call cultural advisor.

[GOOGLE AI & MAPS OPTIMIZATION]
- Tier 01 (Local Visibility): £80. GMB profile optimization, keyword categorization, local citation building, AI review responses.
- Tier 02 (Growth Accelerator): £180. Proactive review management, AI content posts, competitor map analysis, multi-location sync.
- Tier 03 (Global Domination): £450. Custom Maps API integration, global SEO architecture, real-time data dashboard, personal account manager.

[AI VOICE & CONVERSATION UI]
- Tier 01 (Smart Assistant): £250. Custom knowledge base, basic flow, standard English/Chinese voice, CRM integration.
- Tier 02 (Enterprise Voice): £650. Multi-step reasoning, high-fidelity cloned voice, CRM integration, real-time emotion detection.
- Tier 03 (Neural Network Concierge): £1,500. Full avatar integration, multilingual real-time translation, predictive analytics, unlimited scaling.

[CROSS-PLATFORM APP DEVELOPMENT]
- Tier 01 (MVP Prototype): £850. Core functional workflow, primary UI/UX design, cross-platform compatibility, backend hosting.
- Tier 02 (Scalable SaaS): £2,200. Advanced user management, 3rd-party API ecosystem, performance optimization, cloud architecture.
- Tier 03 (Enterprise Platform): £5,500. Microservices, military-grade security, predictive AI integration, 24/7 priority maintenance.

PRODUCT & CONTACT:
- novetools.com: Client-side privacy-first browser utilities (video/image processing, PDF, timezone synchronization).
- Contact: Use the Start a Project form on page or email hello@noveint.com.`;

const LIVE_BASE_INSTRUCTION = `
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
- Focus: Bilingual typography (harmonizing Latin and Traditional Chinese), Next.js / Tailwind CSS / Framer Motion engineering, interactive Figma prototypes, and responsive digital architectures.
- Portfolio showcase: 'Zenith' interactive architecture portfolio, Lusso Residences, Talon Studio.
- Guide baseline estimate: £115 to £420 (e.g., £115 single-page homepage, £180 one-page shopping, £360 multi-page website, £420 custom portal).
2. Creative Ad Assets (Route: '/services/creative-assets'):
- Focus: High-impact visual storytelling, motion graphics, Out-Of-Home (OOH) displays, and bilingual brand identities merging Western minimalist flair with Eastern aesthetic depths.
- Portfolio showcase: Chronos, Raw Food Lab, Tokyo Underground, Lumina, Kntc.
- Guide baseline estimate: £40 to £320 (e.g., £40 Simple solution, £75 Basic Plan, £140 Advanced, £320 Complete brand identity solution).
3. Language Services (Route: '/services/language-services'):
- Focus: Nuanced Traditional Chinese localization, creative copywriting, verbatim & interpretive field services, and cultural consulting for cross-border market entry.
- Guide baseline estimate: £45 to £350 (e.g., £45 Document Essentials, £120 Content Localization, £350 Strategic Global market entry).
4. Google AI & Maps Optimization (Route: '/services/google-optimization'):
- Focus: Generative Engine Optimization (GEO/AEO) for AI search discovery, Google Maps dominance, Google Business Profile ecosystem, Knowledge Graph authority, and geo-spatial analytics.
- Portfolio showcase: 'The Foundry' spatial metrics engine, Mirai Bistro, Lantern Workspace, Crossroads Logistics.
- Guide baseline estimate: £80 to £450.
5. AI Voice & Conversational UI (Route: '/services/ai-voice'):
- Focus: Realtime low-latency bilingual conversational voice agents, luxury hospitality concierges, custom conversational logic, and Gemini Live integrations.
- Portfolio showcase: 'Live Chatbot Simulation Matrix' (Kinetic-AI Web3 support, Lyra Voice luxury hospitality, E-Com Companion, Bilingual Hub).
- Guide baseline estimate: £250 to £1,500.
6. Cross-Platform App Development (Route: '/services/app-development'):
- Focus: Scalable cloud SaaS architectures, native and hybrid iOS & Android apps, robust microservices backends, and API security.
- Portfolio showcase: Mobile fitness & activity tracker (AlphaSync, Boba English).
- Guide baseline estimate: £850 to £5,500.

NOVETOOLS SUITE (novetools.com):
- High-performance, 100% client-side, privacy-first browser utilities where all processing runs locally inside the user's browser without uploading files to remote servers.
- Utility Suite: Video Processor (trim & crop), Image Processor (batch compression & ZIP packaging), PDF Processor (merge/split/convert), Unit Converter, Global Sync Max (distributed team timezones), Time Span Max.
- Creative Tools: Palette Generator, Favicon Generator, QR Code Generator, Signature Generator.
- Whenever users ask about tools, privacy, or utilities, invoke scrollToSection({ sectionId: 'novetools' }) or offer to open 'https://novetools.com' via openExternalLink({ url: 'https://novetools.com' }).

PROACTIVE CO-BROWSING BEHAVIOR:
- You have client tools to guide the user in real time:
  1. scrollToSection({ sectionId }): Smoothly scroll to 'novetools', 'services', 'contact', 'pricing', or 'portfolio'.
  2. navigateToPage({ path }): Navigate to any page or service route. Supported paths include: '/about', '/', '/services', '/services/web-design', '/services/creative-assets', '/services/language-services', '/services/google-optimization', '/services/ai-voice', '/services/app-development'.
  3. openExternalLink({ url }): Open external URLs in a new browser tab (e.g., 'https://novetools.com').
- Whenever discussing a service, portfolio demo, pricing table, the company story/about page, or NoveTools, proactively trigger the relevant tool (scrollToSection, navigateToPage, or openExternalLink) and verbally announce the action in natural British English (RP) or Traditional Chinese depending on the user's selected language.
`;

const LIVE_TOOLS = [
  {
    functionDeclarations: [
      {
        name: 'scrollToSection',
        description:
          'Smoothly scrolls the browser viewport to a specific target section by element ID (e.g., scrollytelling, novetools, services, contact, pricing, portfolio).',
        parameters: {
          type: Type.OBJECT,
          properties: {
            sectionId: {
              type: Type.STRING,
              description:
                "Target element ID (e.g., 'scrollytelling', 'novetools', 'services', 'contact', 'pricing', 'portfolio').",
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
          'Navigates to a specific service view, page, or showcase route (e.g., /about, /services/web-design, /services/creative-assets, /services/language-services, /services/google-optimization, /services/ai-voice, /services/app-development, /services, /).',
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
];

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function generateWithRetry(ai: GoogleGenAI, params: any, maxRetries = 2) {
  let lastError: any;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await ai.models.generateContent(params);
    } catch (err: any) {
      lastError = err;
      const isTransient = err?.message?.includes("503") || err?.message?.includes("429") || err?.status === 503 || err?.status === 429;
      if (isTransient && attempt < maxRetries) {
        await new Promise(res => setTimeout(res, 800 * (attempt + 1)));
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // API Health Check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // API: Voice Chat (Text response, Speech handled client-side via Web Speech API)
  app.post("/api/voice/chat", async (req, res) => {
    try {
      const { message, history = [], lang = "EN" } = req.body;
      const ai = getAiClient();

      if (!ai) {
        return res.status(503).json({
          error: "API key not configured",
          fallbackText: lang === "ZH"
            ? "歡迎來到 Nove International！我們提供高階雙語網站、AI 語音與跨平台系統開發。歡迎隨時諮詢！"
            : "Welcome to Nove International! We deliver bespoke web design, AI conversational agents, and cross-platform software. How can I assist you today?"
        });
      }

      // Format conversation contents for Gemini
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const item of history.slice(-8)) {
          if (item.role && item.parts?.[0]?.text) {
            contents.push({
              role: item.role === "user" ? "user" : "model",
              parts: [{ text: item.parts[0].text }],
            });
          }
        }
      }

      contents.push({
        role: "user",
        parts: [{ text: message || "Hello" }],
      });

      let textResponse;
      try {
        textResponse = await generateWithRetry(ai, {
          model: "gemini-3.8-flash",
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          },
        });
      } catch (err: any) {
        console.warn("Retrying with gemini-flash-latest after:", err.message);
        textResponse = await generateWithRetry(ai, {
          model: "gemini-flash-latest",
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          },
        });
      }

      const replyText = textResponse.text?.trim() || "";

      if (!replyText) {
        return res.status(500).json({ error: "No response generated" });
      }

      return res.json({
        text: replyText,
      });
    } catch (err: any) {
      console.error("Error in /api/voice/chat:", err);
      res.status(500).json({ error: err.message || "Failed to process voice request" });
    }
  });

  // API: Generic Gemini text generation
  app.post("/api/gemini/generate", async (req, res) => {
    try {
      const { prompt, systemInstruction } = req.body;
      const ai = getAiClient();
      if (!ai) return res.status(503).json({ error: "API key not configured" });

      let response;
      try {
        response = await generateWithRetry(ai, {
          model: "gemini-3.8-flash",
          contents: prompt,
          config: systemInstruction ? { systemInstruction } : undefined,
        });
      } catch (err: any) {
        response = await generateWithRetry(ai, {
          model: "gemini-flash-latest",
          contents: prompt,
          config: systemInstruction ? { systemInstruction } : undefined,
        });
      }

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Error in /api/gemini/generate:", err);
      res.status(500).json({ error: err.message || "Generation failed" });
    }
  });

  // API: Streaming Gemini text generation
  app.post("/api/gemini/stream", async (req, res) => {
    try {
      const { prompt, systemInstruction } = req.body;
      const ai = getAiClient();
      if (!ai) return res.status(503).json({ error: "API key not configured" });

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      let streamResponse;
      try {
        streamResponse = await ai.models.generateContentStream({
          model: "gemini-3.8-flash",
          contents: prompt,
          config: systemInstruction ? { systemInstruction } : undefined,
        });
      } catch (err) {
        streamResponse = await ai.models.generateContentStream({
          model: "gemini-flash-latest",
          contents: prompt,
          config: systemInstruction ? { systemInstruction } : undefined,
        });
      }

      for await (const chunk of streamResponse) {
        if (chunk.text) {
          res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
        }
      }
      res.write("data: [DONE]\n\n");
      res.end();
    } catch (err: any) {
      console.error("Error in /api/gemini/stream:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: err.message || "Streaming failed" });
      } else {
        res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
        res.end();
      }
    }
  });

  // WebSocket Server for Live API Voice & Co-Browsing
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    try {
      const host = request.headers.host || "localhost:3000";
      const url = new URL(request.url || "", `http://${host}`);
      if (url.pathname === "/live") {
        wss.handleUpgrade(request, socket, head, (ws) => {
          wss.emit("connection", ws, request);
        });
      }
    } catch (e) {
      console.error("Upgrade error:", e);
      socket.destroy();
    }
  });

  wss.on("connection", async (clientWs, req) => {
    const host = req.headers.host || "localhost:3000";
    const url = new URL(req.url || "", `http://${host}`);
    const lang = url.searchParams.get("lang") || "EN";

    const ai = getAiClient();
    if (!ai) {
      console.warn("Client connected to /live but API key is not configured");
      clientWs.send(JSON.stringify({
        type: "error",
        message: "API key not configured",
      }));
      clientWs.close();
      return;
    }

    let session: any = null;
    let isClosed = false;

    const systemInstruction = lang === 'ZH'
      ? LIVE_BASE_INSTRUCTION + '\n\nLanguage & Tone: Respond exclusively in Traditional Chinese (Taiwan, 繁體中文). Use polished, professional Taiwanese phrasing (例如：專案, 在地化, 響應式, 介面, 估價). When triggering co-browsing actions (如滑動至區塊或開啟新頁面), announce them politely in natural Traditional Chinese.'
      : LIVE_BASE_INSTRUCTION + '\n\nLanguage & Tone: Speak in natural British English (Received Pronunciation) with British phrasing, vocabulary, and spelling (e.g., bespoke, whilst, colour, portfolio, enquire). Announce co-browsing actions politely in charming British cadence.';

    try {
      const sessionPromise = ai.live.connect({
        model: "gemini-3.8-live",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } },
          },
          tools: LIVE_TOOLS,
          systemInstruction,
        },
        callbacks: {
          onopen: () => {
            sessionPromise.then((s: any) => {
              if (isClosed || clientWs.readyState !== WebSocket.OPEN) return;
              clientWs.send(JSON.stringify({ type: "open" }));
              // Send initial greeting prompt so the model greets the user warmly
              s.sendRealtimeInput({
                text: lang === 'ZH'
                  ? '你好 Nove，請簡短地問候我。'
                  : 'Hello Nove, please greet me briefly.',
              });
            }).catch((err) => {
              console.error("Error triggering initial greeting:", err);
            });
          },
          onmessage: (message: LiveServerMessage) => {
            if (isClosed || clientWs.readyState !== WebSocket.OPEN) return;

            // 1. Audio parts
            const parts = message.serverContent?.modelTurn?.parts ?? [];
            for (const part of parts) {
              if (part.inlineData?.data) {
                clientWs.send(JSON.stringify({
                  type: "audio",
                  audio: part.inlineData.data,
                }));
              }
            }

            // 2. Interruption event
            if (message.serverContent?.interrupted) {
              clientWs.send(JSON.stringify({ type: "interrupted" }));
            }

            // 3. Tool Calls (Co-Browsing)
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
              clientWs.send(JSON.stringify({
                type: "toolCall",
                calls: functionCalls.map(c => ({
                  id: c.id,
                  name: c.name,
                  args: c.args,
                })),
              }));
            }
          },
          onerror: (err: any) => {
            console.error("Gemini Live session error:", err);
            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({
                type: "error",
                message: err?.message || "Live session error",
              }));
            }
          },
          onclose: () => {
            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({ type: "close" }));
              clientWs.close();
            }
          },
        },
      });

      session = await sessionPromise;
    } catch (err: any) {
      console.error("Failed to connect to Gemini Live:", err);
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify({
          type: "error",
          message: err?.message || "Failed to establish Live session",
        }));
        clientWs.close();
      }
      return;
    }

    clientWs.on("message", (raw) => {
      if (!session || isClosed) return;
      try {
        const msg = JSON.parse(raw.toString());
        if (msg.type === "audio" || msg.audio) {
          const audioBase64 = msg.audio || msg.data;
          if (audioBase64) {
            session.sendRealtimeInput({
              audio: {
                data: audioBase64,
                mimeType: "audio/pcm;rate=16000",
              },
            });
          }
        } else if (msg.type === "text" && msg.text) {
          session.sendRealtimeInput({
            text: msg.text,
          });
        } else if (msg.type === "toolResponse" && msg.functionResponses) {
          session.sendToolResponse({
            functionResponses: msg.functionResponses,
          });
        }
      } catch (e) {
        console.error("Error processing client ws message:", e);
      }
    });

    clientWs.on("close", () => {
      isClosed = true;
      if (session) {
        try {
          session.close();
        } catch (e) {}
        session = null;
      }
    });

    clientWs.on("error", (err) => {
      console.error("Client WS connection error:", err);
      isClosed = true;
      if (session) {
        try {
          session.close();
        } catch (e) {}
        session = null;
      }
    });
  });

  // Vite middleware in dev, static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Nove International Server running on http://localhost:${PORT}`);
  });
}

startServer();
