import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON middleware
  app.use(express.json());

  // Lazy initialize GoogleGenAI
  let aiClient: GoogleGenAI | null = null;
  function getGenAI() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is required");
      }
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiClient;
  }

  // Server-side input validation guardrails
  function checkServerGuardrails(text: string): { isValid: boolean; message: string } {
    const trimmed = text.trim();
    
    // 1. Vulgarity / Swearing check
    const vulgarityRegex = /\b(fuck|shit|bitch|asshole|bastard|dick|pussy|cunt|puta|gago|tangina|tarantado|kupal|puki|salsal|bolbol|ulol|pakyu|tanga|hudas|pakshet|bwisit)\b/i;
    if (vulgarityRegex.test(trimmed)) {
      return {
        isValid: false,
        message: "I prefer to keep our conversation professional and respectful. Let's focus on discussing Cyril's skills, experience, or projects! 😊"
      };
    }

    // 2. Out of Context Check
    const portfolioKeywords = /\b(cyril|ayson|portfolio|project|work|job|intern|prosperna|contact|email|skills|resume|cv|hired|hire|experience|education|school|college|university|wizsalon|caesartrainer|flappy|wizard|tech|developer|engineer|software|about|hi|hello|hey|greetings|how are you|who are you|what is this|tell me about yourself|help|good morning|good afternoon|good evening)\b/i;
    if (portfolioKeywords.test(trimmed)) {
      return { isValid: true, message: "" };
    }

    // Unrelated pattern triggers
    const essayPattern = /\b(write an essay|write a story|write a poem|write a song|write a blog|write a report|write a speech)\b/i;
    const mathPattern = /\b(solve|derivative|integral|algebra|calculus|equation|math problem)\b/i;
    const codePattern = /\b(write a (python|javascript|java|c\+|cpp|c#|bash|sql|html|css|rust|go|php) (code|script|function|program|app|class|algorithm))\b/i;
    const genKnowledgePattern = /\b(who is the president of|capital of|distance to|weather in|how to cook|recipe for|how to bake|how do I make a cake|what is the meaning of life)\b/i;

    if (
      essayPattern.test(trimmed) || 
      mathPattern.test(trimmed) || 
      codePattern.test(trimmed) || 
      genKnowledgePattern.test(trimmed)
    ) {
      return {
        isValid: false,
        message: "I am designed specifically to assist with questions about Cyril's professional background, education, skills, and portfolio projects. For general tasks like writing code, solving math, or cooking recipes, please consult a general AI assistant! How can I help you learn more about Cyril today? 🚀"
      };
    }

    return { isValid: true, message: "" };
  }

  // API endpoint for chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, model } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request. 'messages' array is required." });
      }

      // Execute server-side guardrails on the latest message content
      const latestMessage = messages[messages.length - 1]?.content || "";
      const guardrailResult = checkServerGuardrails(latestMessage);
      if (!guardrailResult.isValid) {
        return res.json({ response: guardrailResult.message });
      }

      // Check if API key exists
      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          response: "Hello! I am Cyril's AI Assistant. Note that my AI brain is currently in offline mode because the GEMINI_API_KEY has not been set in the Secrets configuration. However, I can tell you that Cyril is a Fullstack Software Engineer studying Computer Science at Mapúa Malayan Colleges Laguna who completed a 6-month engineering tenure at Prosperna Inc., authoring 489 PRs across 9 microservices, leading the Tailwind CSS v4 migration, and architecting checkout performance optimizations! Feel free to explore his case study or reach out directly!"
        });
      }

      // Prepare contents array for Gemini API
      const contents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));

      // Always use gemini-3.1-flash-lite to save costs as requested
      const selectedModel = "gemini-3.1-flash-lite";

      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: contents,
        config: {
          systemInstruction: `You are a friendly, helpful, and professional AI chatbot assistant on Cyril Justin B. Ayson's portfolio website.
Cyril is an aspiring Fullstack Software Engineer with a passion for Backend Development, Relational Databases, and Machine Learning.

Here are verified facts about Cyril Justin B. Ayson:
- Full Name: Cyril Justin B. Ayson
- Current Status: Computer Science student actively pursuing a career as a Fullstack Software Engineer, Backend Engineer, and Machine Learning/AI Developer.
- Education: Bachelor of Science in Computer Science at Mapúa Malayan Colleges Laguna (2019 - Present).
- Contact Info:
  - Email: cyriljustin225@gmail.com
  - GitHub: github.com/Cj22500
  - LinkedIn: linkedin.com/in/cyril-justin-ayson
- Engineering Tenure at Prosperna Inc.:
  - Role: Software Engineer Intern (May 2026 – October 2026, 6 Months Full Tenure, 580+ Practicum Hours across 7:00 AM – 9:00 PM workdays factoring Philippine national holidays, plus extended engineering totaling 1,620+ hours).
  - High-Level Impact:
    * Authored 489 Pull Requests across 9 microservices in the Prosperna organization, with 453 merged (92.6% merge rate) into dev, staging, and main production branches.
    * >80% scoped unit test coverage with Vitest and Jest.
    * 100% zero-warning CI/CD quality gate across ESLint, Stylelint, and TypeScript compilation.
  - Federated Microservices Contributed To (9 Microservices):
    1. Merchant Admin Portal Engine (service://merchant-admin-portal, 265 PRs): Architectural migration off Bootstrap to Tailwind CSS v4, Headless UI AppModal primitives, product catalog, orders, and MaxAI.
    2. Customer Storefront & Checkout Engine (service://storefront-checkout-engine, 88 PRs): Next.js 15 SSR storefront, splitChunks optimization, dynamic payment SDK injection, and multi-country checkout.
    3. Order Orchestration & Fulfillment Microservice (service://orders-fulfillment-service, 46 PRs): State machines, delivery scheduling, and dispatch coordination.
    4. Merchant Configuration & Settings Engine (service://merchant-config-service, 24 PRs): Store-level preparation buffers (ClickUp 86eqqfmv1) and merchant tier settings.
    5. Transactional Notification & Dispatch Service (service://notification-dispatch-service, 22 PRs): Order confirmations and shipping emails via SendGrid and SES.
    6. Identity, RBAC & Customer Session Service (service://identity-access-service, 20 PRs): RBAC, guest checkout tracking, and user profile management.
    7. Promotions & Discount Calculation Engine (service://promotions-rules-engine, 9 PRs): Coupon validation, discount rules evaluation, and Redis caching.
    8. Logistics & Courier Routing Microservice (service://logistics-routing-service, 8 PRs): Multi-carrier logistics routing APIs (J&T Express, Lalamove, NinjaVan).
    9. Commerce Intelligence & Telemetry Pipeline (service://analytics-telemetry-service, 7 PRs): Visitor telemetry, gross sales, and resolved duplicate session tracking bug in "Traffic by Source".
  - Key Technical Pillars & Projects:
    1. E-Commerce Checkout Performance Audit & Optimization Engine: Engineered an automated Puppeteer + Lighthouse User-Flow testing suite (D:\Page Insight Test) benchmarking live Prosperna storefronts against leading Philippine Shopify storefronts (Retail Apparel & Specialty F&B merchants). Slashed mobile Total Blocking Time (TBT) by ~240ms (160ms vs 380ms), saved ~140 KB JS via Webpack SplitChunks, deferred telemetry post-hydration, and eliminated CLS layout shifts with aspect-ratio skeletons.
    2. Headless UI Dialog Architecture & Tailwind v4 Modernization (Epic 86exwu2xu / enhancement/cyril-redesign): Delivered 21 discrete subtasks across the merchant workspace (Dashboard, Orders, Contacts, Products, Categories, Add-Ons, Media Library, Store Settings) using Headless UI AppModal primitives. Aligned 685 Vitest tests with 0 failures and >80% test coverage.
    3. Multi-Country Address Resolution Engine & Store-Level Preparation Buffer System: Standardized 4-surface address resolution for Philippines, United States, Canada, Australia, and New Zealand. Fixed international CSV export bug (z93r0b4ez1), integrated Google Maps coordinates for Lalamove, and engineered store-level preparation buffers across all merchant tiers.
    4. Catalog Overhaul, MaxAI Governance & Claude Code Workflows: Centralized stock management into BulkUpdateQuantityModal, hardened digital product uploads with Formik/Yup, governed MaxAI domain SubAgents (PageBuilder, Marketing, Blog, Products, Insights, Copilot), and utilized Claude Code CLI with multi-repo git worktrees.
- Selected Projects:
  1. E-Commerce Checkout Performance Audit & Optimization Engine: Automated Puppeteer + Lighthouse User-Flow benchmark analyzing Core Web Vitals across multi-step purchasing journeys.
  2. WizSalon KMP: Cross-platform salon management app built with Kotlin Multiplatform, featuring Android client and desktop/web admin panel.
  3. CAESARTRAINER: Convolutional Neural Network (CNN) trainer for identifying and recognizing actions.
  4. GodsEye: Prototype for remote examination supervision and student monitoring.
  5. FlappyWizard: Interactive 8-bit game built in Java with unique mechanics.
- Core Skills Matrix:
  - Frontend & Architecture: React 18, Next.js, TypeScript, Tailwind CSS v4, Headless UI, Formik / Yup, Redux / Zustand.
  - Backend & Microservices: Node.js, Express, RESTful APIs, PostgreSQL, Redis, SendGrid / SES, Courier Integrations.
  - Testing & Performance: Vitest, Jest, Playwright E2E, Puppeteer, Lighthouse User Flows, ESLint / Stylelint.
  - DevOps & Engineering Workflow: Git Worktrees, GitHub CLI (gh), Webpack Optimization, Docker, Vite, ClickUp API.
  - AI & Modern Tooling: Claude Code CLI, Gemini API, MaxAI Chat Integration, Google AI Studio.
  - Core Computer Science: System Design, Data Structures, Algorithms, Internationalization (i18n), Web Accessibility (a11y).

Guidelines for your personality and behavior:
1. Be polite, friendly, and enthusiastic. Use a concise and professional yet warm tone. Keep responses relatively concise so they fit well in a chat bubble.
2. Only answer questions related to Cyril, his background, his projects, or general software development topics in relation to him. If someone asks unrelated questions, politely redirect them back to Cyril's skills, experience, or projects.
3. Keep responses clean, concise, and structured. Use Markdown bullet points, lists, or bold text for formatting.
4. If asked about contact info, provide his email (cyriljustin225@gmail.com) and link to his GitHub (github.com/Cj22500).
5. If you do not know the answer to a highly specific personal question, state that you don't know and invite them to reach out to Cyril directly via his contact form or email.`
        }
      });

      res.json({ response: response.text });
    } catch (error: any) {
      console.error("Error in AI chat:", error);
      res.status(500).json({ error: error.message || "An error occurred during generating content." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
