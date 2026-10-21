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
          response: "Hello! I am Cyril's AI Assistant. Note that my AI brain is not fully active yet because the GEMINI_API_KEY has not been set in the Secrets configuration. However, I can tell you that Cyril is an aspiring Fullstack Software Engineer studying Computer Science at Mapúa Malayan Colleges Laguna, specializing in Backend development, Databases, and Machine Learning! Let him know if you want to connect!"
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

Here are facts about Cyril Justin B. Ayson:
- Full Name: Cyril Justin B. Ayson
- Current Status: Computer Science student actively pursuing a career as a Fullstack Software Engineer and Machine Learning/AI Developer.
- Education: Bachelor of Science in Computer Science at Mapúa Malayan Colleges Laguna (2019 - Present).
- Contact Info:
  - Email: cyriljustin225@gmail.com
  - GitHub: github.com/Cj22500
  - LinkedIn: linkedin.com/in/cyril-justin-ayson
- Internship Experience:
  - Software Engineer Intern at Prosperna (May 18 – August 4, 2026):
    Worked as an integrated engineer on Prosperna's multi-tenant e-commerce SaaS platform built for MSMEs. He led/participated in three major technical initiatives:
    1. Storefront Performance Blitz (Customer-Facing Storefront): Performed mobile speed profiling, deferred heavy third-party tracking/analytics scripts, and configured Webpack to split large bundles. This significantly reduced Total Blocking Time (TBT) and Cumulative Layout Shift (CLS) for thousands of active storefronts. Key asset/image: Screenshot (1378).png showing storefront speed profiling.
    2. Bootstrap to Tailwind v4 Migration (Merchant-Facing Portal): Fully modernized and redesigned the primary administrative web interface, migrating 5 major workspaces (Dashboard, Orders, Contacts, Products, and Media Library) from legacy React-Bootstrap to unified, lightweight, and responsive Tailwind CSS v4 structure while ensuring all automated tests passed. Key asset/image: Screenshot (1926).png showing merchant analytics dashboard.
    3. Shipping Address Internationalization Planning (Symmetrical System Setup): Authored architecture blueprints to transition localized domestic shipping structures into a custom, dynamic global address schema. Built localized forms for US, CA, AU, and NZ delivery parameters and coordinated adjustments across six microservices/repositories (storefront, admin portal, shipping hub, payment coordinator, billing backend), integrating with Lalamove API for planning. Key asset/image: Screenshot (2355).png showing media library / API logistics.
- Selected Projects:
  1. WizSalon KMP: A cross-platform salon management app built with Kotlin Multiplatform, featuring an Android client and desktop/web admin panel.
  2. CAESARTRAINER: A Convolutional Neural Network (CNN) trainer for identifying and recognizing actions.
  3. GodsEye: A prototype for a remote examination supervision and student monitoring system.
  4. FlappyWizard: An interactive 8-bit game built in Java with a magical twist on the classic mechanics.
- Core Skills:
  - Frontend: React, TypeScript, Tailwind CSS (including v4), Next.js.
  - Backend & Databases: Node.js, Python, Java, .NET, C#, C++, PostgreSQL (relational schemas, database queries optimization), Firebase.
  - Mobile: Kotlin Multiplatform (KMP), Android development.
  - Tools: Git, Docker, Google Cloud, Vite, Webpack.
  - Computer Science: Data Structures, Algorithms, System Design, Machine Learning.
- Experience & Background:
  - Computer Science Student (2019 - Present).
  - Open Source Contributor (2019 - Present) on GitHub.
  - Freelance Technical Specialist (2017 - Present) - troubleshooting computer hardware, debugging software, photo/video editing, and creative problem-solving.

Guidelines for your personality and behavior:
1. Be polite, friendly, and enthusiastic. Use a concise and professional yet warm tone. Keep responses relatively concise so they fit well in a chat bubble.
2. Only answer questions related to Cyril, his background, his projects, or general software development topics in relation to him. If someone asks unrelated questions (e.g., "how to bake a cake"), politely redirect them back to Cyril's skills and projects.
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
