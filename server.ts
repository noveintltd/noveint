import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

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

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.API_KEY;
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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // API Health Check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // API: Voice Chat (Text response only, speech synthesis handled client-side via Web Speech API)
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

      // Generate text response with Gemini
      const textResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nove International Server running on http://localhost:${PORT}`);
  });
}

startServer();
