import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Send, 
  X, 
  Sparkles, 
  Bot, 
  User, 
  CornerDownLeft,
  AlertCircle
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function checkGuardrails(text: string): { isValid: boolean; reason: 'vulgarity' | 'out_of_context' | null; message?: string } {
  const trimmed = text.trim();
  
  // 1. Vulgarity / Swearing check (English and common Tagalog curse words)
  const vulgarityRegex = /\b(fuck|shit|bitch|asshole|bastard|dick|pussy|cunt|puta|gago|tangina|tarantado|kupal|puki|salsal|bolbol|ulol|pakyu|tanga|hudas|pakshet|bwisit)\b/i;
  if (vulgarityRegex.test(trimmed)) {
    return {
      isValid: false,
      reason: 'vulgarity',
      message: "I prefer to keep our conversation professional and respectful. Let's focus on discussing Cyril's skills, experience, or projects! 😊"
    };
  }

  // 2. Out of Context Check
  // Allow greetings, friendly small talk, and direct inquiries about Cyril's portfolio/background
  const portfolioKeywords = /\b(cyril|ayson|portfolio|project|work|job|intern|internship|prosperna|audit|shopify|checkout|tailwind|pr|prs|metrics|contact|email|skills|resume|cv|hired|hire|experience|education|school|college|university|wizsalon|caesartrainer|flappy|wizard|tech|developer|engineer|software|about|hi|hello|hey|greetings|how are you|who are you|what is this|tell me about yourself|help|good morning|good afternoon|good evening)\b/i;
  
  if (portfolioKeywords.test(trimmed)) {
    return { isValid: true, reason: null };
  }

  // Identify highly out-of-context pattern triggers
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
      reason: 'out_of_context',
      message: "I am designed specifically to assist with questions about Cyril's professional background, education, skills, and portfolio projects. For general tasks like writing code, solving math, or cooking recipes, please consult a general AI assistant! How can I help you learn more about Cyril today? 🚀"
    };
  }

  return { isValid: true, reason: null };
}

const QUICK_QUESTIONS = [
  "What were your key accomplishments at Prosperna?",
  "How did you audit Shopify vs Prosperna checkout?",
  "Tell me about the Tailwind CSS v4 migration",
  "What is your full engineering tech stack?"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const selectedModel = 'gemini-3.1-flash-lite';
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! 👋 I am Cyril's portfolio AI assistant. Ask me anything about Cyril's education, projects, technical skills, or professional experience!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmedText = textToSend.trim();
    if (!trimmedText) return;

    const newUserMessage: ChatMessage = { role: 'user', content: trimmedText };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    // Guardrail Check
    const guardrail = checkGuardrails(trimmedText);
    if (!guardrail.isValid) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: guardrail.message || "I can only help with questions regarding Cyril's professional background."
        }]);
        setIsLoading(false);
      }, 600);
      return;
    }

    try {
      const chatHistory = [...messages, newUserMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: chatHistory,
          model: selectedModel
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from AI Assistant.');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response || "I'm sorry, I couldn't generate a response."
      }]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred. Please try again.');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "⚠️ I encountered an error communicating with my server. Please make sure the backend is active or try resending your message."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Trigger Button */}
      <motion.button
        id="ai-chatbot-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:bg-accent dark:hover:bg-accent dark:hover:text-white transition-all group relative border border-neutral-200 dark:border-neutral-800"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center relative"
            >
              <MessageSquare size={24} className="group-hover:rotate-6 transition-transform" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-neutral-900 dark:border-white animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-chatbot-window"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-20 right-0 w-[380px] sm:w-[420px] h-[550px] bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-3xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-neutral-900 text-white dark:bg-neutral-900 flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <Bot size={22} className="animate-bounce" />
                </div>
                <div>
                  <h3 className="font-bold text-sm flex items-center gap-1.5 leading-none">
                    Cyril's Portfolio AI <Sparkles size={14} className="text-accent" />
                  </h3>
                  <span className="text-neutral-400 text-xs flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Online & Ready
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-neutral-800 rounded-lg transition-colors text-neutral-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-neutral-50 dark:bg-neutral-950 scrollbar-thin">
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role !== 'user' && (
                    <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 flex-shrink-0">
                      <Bot size={16} />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-tr-none shadow-sm'
                      : 'bg-white text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 rounded-tl-none border border-neutral-100 dark:border-neutral-800/60 shadow-sm'
                  }`}>
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <div className="markdown-body prose dark:prose-invert prose-sm">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                      <User size={16} />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 flex-shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800/60 rounded-2xl rounded-tl-none px-4 py-3.5 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Suggestions list at the bottom of message history (only if we've just greeted or user completed a message) */}
              {!isLoading && messages.length <= 2 && (
                <div className="pt-2">
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2.5 ml-1 flex items-center gap-1">
                    <Sparkles size={12} className="text-accent" /> Try asking:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_QUESTIONS.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(q)}
                        className="text-xs bg-white hover:bg-accent hover:text-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-xl px-3.5 py-2 cursor-pointer transition-all hover:scale-[1.02] shadow-xs"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Error Indicator */}
            {error && (
              <div className="px-6 py-2 bg-red-500/10 text-red-500 text-xs flex items-center gap-2 border-t border-red-500/20">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            {/* Footer Input Form */}
            <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Ask about Cyril's skills, projects..."
                className="flex-1 px-4 py-3 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-xl border-none outline-none focus:ring-1.5 focus:ring-accent text-sm placeholder-neutral-400 dark:placeholder-neutral-500 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl hover:bg-accent dark:hover:bg-accent dark:hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm flex items-center justify-center"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
