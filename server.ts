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
    const portfolioKeywords = /\b(cyril|ayson|portfolio|project|projects|work|job|intern|internship|prosperna|audit|shopify|checkout|tailwind|pr|prs|metrics|contact|email|skills|resume|cv|hired|hire|experience|education|school|college|university|mmcl|mapua|wizsalon|wizaloon|kmp|docuchain|ocr|trocr|makitest|godseye|mediapipe|ar test lab|unity|arcore|devpulse|aura|caesartrainer|flappy|wizard|ibm|comptia|coursera|certificate|certification|certifications|capstone|capstones|churn|pca|tech|developer|engineer|software|about|hi|hello|hey|greetings|how are you|who are you|what is this|tell me about yourself|help|good morning|good afternoon|good evening)\b/i;
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
          response: "Hello! I am Cyril's AI Assistant. Note that my AI brain is currently in offline mode because the GEMINI_API_KEY has not been set in the Secrets configuration. However, I can tell you that Cyril is an AI-Native Full-Stack Software Engineer who completed 100% of his B.S. Computer Science coursework, thesis (MakiTest), and 480-hour practicum at Mapúa Malayan Colleges Laguna, and authored 503 Pull Requests (468 merged — 93.0% merge rate) across 9 microservices during his 6-month tenure at Prosperna Inc.! Feel free to explore his projects (DocuChain, MakiTest, AR Test Lab, Wizaloon) or reach out directly!"
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
Cyril is an AI-Native Full-Stack Software Engineer and Applied Systems Researcher specializing in React 18/19, Next.js, TypeScript, Node.js, Python, C#, distributed microservices, and quantized computer vision pipelines.

Here are verified facts about Cyril Justin B. Ayson:
- Full Name: Cyril Justin B. Ayson
- Current Status: AI-Native Full-Stack Software Engineer. Completed 100% of his B.S. Computer Science academic coursework, undergraduate thesis (MakiTest), and 480-hour Software Engineering Practicum at Mapúa Malayan Colleges Laguna in November 2026 (awaiting 2027 commencement ceremony; available for immediate full-time work).
- Contact Info:
  - Location: San Pedro / Biñan City, Laguna, Philippines
  - Email: cyriljustin225@gmail.com
  - GitHub: github.com/Cj22500 (538+ PRs authored / 499 merged across all GitHub repositories)
  - LinkedIn: linkedin.com/in/cyrilayson
- Engineering Tenure at Prosperna Inc.:
  - Role: Software Engineer Intern (May 2026 – November 2026, Completed 6-Month Tenure, 480 Verified Practicum Hours).
  - High-Level Impact:
    * Authored 503 Pull Requests across 9 microservice repositories in the Prosperna organization, with 468 merged (93.0% merge rate) into dev, staging, and main production branches.
    * >80% scoped unit test coverage with Vitest and Jest (685+ passing unit tests).
    * 100% zero-warning CI/CD quality gate across ESLint, Stylelint, and TypeScript compilation.
  - Federated Microservices Contributed To (9 Microservices — 503 Total PRs):
    1. Merchant Admin Portal Engine (service://merchant-admin-portal, 279 PRs): Spearheaded the 21-module migration off React-Bootstrap to Tailwind CSS v4 across 336+ files and 455+ call sites (AppButton, AppModal, Grid, InputGroup, Spinner, TooltipIcon), product catalog overhaul, and MaxAI chat component integration.
    2. Customer Storefront & Checkout Engine (service://storefront-checkout-engine, 88 PRs): Next.js 15 SSR storefront, Webpack splitChunks optimization (43% initial JS reduction / ~140 KB saved), 58% lower mobile Total Blocking Time (160ms vs. 380ms), dynamic payment SDK injection, and multi-country checkout.
    3. Order Orchestration & Fulfillment Microservice (service://orders-fulfillment-service, 37 PRs): Atomic notification state-claim locking (findOneAndUpdate) with retry recovery, store-timezone UTC offset serialization (scheduled_at), and country-aware CSV export sanitization.
    4. Merchant Configuration & Settings Engine (service://merchant-config-service, 28 PRs): Store-level Order Processing Time buffers (ClickUp 86eqqfmv1) across all merchant tiers and ISO 3166-2 international subdivision validation (PH, US, CA, AU, NZ).
    5. Transactional Notification & Dispatch Service (service://notification-dispatch-service, 22 PRs): Idempotent event-driven email dispatch via Amazon SES and SendGrid with localized multi-currency templates.
    6. Identity, RBAC & Customer Session Service (service://identity-access-service, 17 PRs): Authentication middleware, merchant RBAC permissions, guest checkout identity tracking, and MongoDB ObjectId createdAt timestamp fallbacks for cumulative analytics.
    7. Promotions & Discount Calculation Engine (service://promotions-rules-engine, 15 PRs): Guest-checkout country validation, lead-to-customer address synchronization, and discount rule evaluation.
    8. Logistics & Courier Routing Microservice (service://logistics-routing-service, 11 PRs): Lalamove and J&T Express webhooks, dynamic delivery fee matrices, and Google Maps pin-coordinate geocoding.
    9. Commerce Intelligence & Telemetry Pipeline (service://analytics-telemetry-service, 6 PRs): Eliminated duplicate session tracking bugs in "Traffic by Source" attribution reporting.
  - Key Technical Pillars at Prosperna:
    1. E-Commerce Checkout Performance Audit & Optimization Engine: Automated Puppeteer + Lighthouse User-Flow testing suite benchmarking live Prosperna storefronts against leading Philippine Shopify storefronts across Home → PDP → Cart → Checkout, proving 58% lower mobile Total Blocking Time (160ms vs. 380ms) and saving ~140 KB JS.
    2. Headless UI Dialog Architecture & Tailwind v4 Modernization (Epic 86exwu2xu / enhancement/cyril-redesign): Delivered 21 discrete subtasks and re-engineered shared UI primitives across 336+ files and 455+ call sites with 685 passing Vitest tests (0 failures).
    3. Distributed Backend Concurrency, Multi-Country Address Resolution & Preparation Buffers: Atomic state-claim locking (findOneAndUpdate), store-timezone UTC offset serialization (scheduled_at), 5-country address resolution (PH, US, CA, AU, NZ), country-aware CSV export sanitization, and store-level Order Processing Time buffers.
    4. Catalog Overhaul & MaxAI Integration: Consolidated stock management into BulkUpdateQuantityModal, hardened digital product uploads with Formik/Yup, and contributed to MaxAI chat components (ChatHistoryDropdown, useMaxAI streaming hook) and domain sub-agents (PageBuilder, Marketing, Blog, Products, Insights, Copilot).
- Selected Software Engineering Projects:
  1. DocuChain — Customer-Facing AI & PreP-OCR Document Digitization Platform (github.com/Cj22500/docuchain-revamp-investigation): Python, Flask, React, INT8-quantized Microsoft TrOCR, Tesseract, EasyOCR, OpenCV. 3-engine OCR ensemble + ML arbitrator + React Human-in-the-Loop (HITL) dual-pane verification workspace for DepEd Form 137 (1983–2015 templates); +104% contrast on aged paper, ~55% RAM reduction eliminating 512MB OOM crashes, 85%+ faster processing (<2 mins vs 15–20 mins).
  2. MakiTest (GodsEye) — Cloud-Native AI Exam Supervision & Assessment Ecosystem (github.com/Cj22500/New-MAKITEST-Web-App-Analytics-test & github.com/Cj22500/Makitest-Test-Environment): Undergraduate CS thesis. Real-time AI exam proctoring using MediaPipe 3D facial/pose landmarks, CNNs, Python/Django, WebSockets on Google Cloud Run with HTTP 206 Partial Content video streaming + companion React 19 & Gemini AI Exam Generator.
  3. AR Test Lab — 3D Spatial Computing & Mobile AR Simulator (github.com/Cj22500/AR-Test-Lab): C# (.NET), Unity 3D, AR Foundation (ARCore/ARKit), XR Interaction Toolkit, Firebase Auth & Firestore. Projects 2D touch inputs into 3D world space via ARRaycastManager with rigid-body collision merging and cloud persistence.
  4. Wizaloon (WizSalon KMP) — Cross-Platform Salon Management Platform (github.com/Cj22500/Wizaloon): Kotlin Multiplatform (KMP), Compose Multiplatform, Node.js, Django REST Framework, Firebase across Android, iOS, Web, and Desktop.
  5. DevPulse & Aura (github.com/Cj22500/DevPulse & github.com/Cj22500/Aura): Full-stack React 19, TypeScript, Tailwind CSS v4, Express, WebSockets suites (Agile Sprint Kanban boards with RBAC & velocity charts + real-time WebSocket e-commerce storefront with Developer API Inspector).
  6. MMCL Seminar Explorer (github.com/Cj22500/MMCL-Seminar-Explorer): React 19, TypeScript, Express, Google Gemini API academic discovery tool.
  7. E-Commerce Checkout Performance Audit & Optimization Engine, CAESARTRAINER (CNN action recognition), and FlappyWizard (Java 8-bit game).
- Machine Learning Capstones (IBM Specialization):
  1. Supervised ML: Customer Churn Classification (Logistic Regression, Random Forests, Gradient Boosting, SMOTE, ROC-AUC).
  2. Unsupervised ML: Customer Segmentation & Dimensionality Reduction (K-Means Clustering, PCA preserving >85% variance, Hierarchical Dendrograms).
  3. Deep Learning: Medical Imaging Pneumonia Detection CNN & Hybrid Course Recommender System (Transfer Learning, Collaborative Filtering, SVD Matrix Factorization).
- Verified Professional Certifications:
  1. IBM AI Developer Professional Certificate (IBM / Coursera — ID: 5BJMANEHPJIG)
  2. IBM Machine Learning Professional Certificate (IBM / Coursera — 6-Course Program — ID: WJ5YVULQONYC)
  3. Developing AI Applications with Python and Flask (IBM / Coursera)
  4. Building Generative AI-Powered Applications with Python (IBM / Coursera)
  5. Introduction to Cloud Computing & Google Cloud Foundational Skills (IBM & Google Cloud)
  6. CompTIA Tech+ Certification (CompTIA — ID: 1d7051cce2a74591aec023e85dcf560a)

Guidelines for your personality and behavior:
1. Be polite, friendly, and enthusiastic. Use a concise and professional yet warm tone. Keep responses relatively concise so they fit well in a chat bubble.
2. Only answer questions related to Cyril, his background, his projects, his certifications, or general software development topics in relation to him. If someone asks unrelated questions, politely redirect them back to Cyril's skills, experience, or projects.
3. Keep responses clean, concise, and structured. Use Markdown bullet points, lists, or bold text for formatting.
4. If asked about contact info, provide his email (cyriljustin225@gmail.com), LinkedIn (linkedin.com/in/cyrilayson), and GitHub (github.com/Cj22500).
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
