import React from 'react';
import { motion } from 'motion/react';
import JournalLogbook from './JournalLogbook';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Briefcase, 
  Code2, 
  Globe, 
  ExternalLink,
  Layers,
  Cpu,
  FileText,
  CheckCircle,
  ArrowUpRight,
  Database,
  Terminal,
  ChevronRight
} from 'lucide-react';

interface InternshipPageProps {
  onBack: () => void;
}

interface BrowserMockupProps {
  src: string;
  alt: string;
  url: string;
}

function InternationalizationShowcase() {
  const [activeTab, setActiveTab] = React.useState<number>(0);

  const slides = [
    {
      id: 0,
      title: "1. DB & Schema",
      subtitle: "Database & API Contract Planning",
      desc: "Comprehensive database design and architectural blueprints showing how we mapped local tables to global parameters for multi-tenant checkouts.",
      src: "/images/Screenshot (2602).png",
      url: "db-schema.prosperna.ph"
    },
    {
      id: 1,
      title: "2. Code Execution",
      subtitle: "Backend Validation & Routing Logic",
      desc: "Our logic layer checking international formats and dynamically filtering out localized couriers (e.g., Lalamove) to prevent shipping errors.",
      src: "/images/Screenshot (2603).png",
      url: "github.com/prosperna/shipping-service"
    },
    {
      id: 2,
      title: "3. Settings UI",
      subtitle: "Merchant Settings Panel",
      desc: "The completed settings dashboard enabling merchants to toggle global destinations and configure localized shipping rules.",
      src: "/images/Screenshot (2604).png",
      url: "prodev.prosperna.ph/settings/shipping"
    },
    {
      id: 3,
      title: "4. Checkout Schema",
      subtitle: "Checkout Dynamic Fields Layout",
      desc: "Completed customer checkout fields and schema displaying adaptive input structures according to country selected.",
      src: "/images/Screenshot (2605).png",
      url: "store.prosperna.ph/checkout"
    }
  ];

  const currentSlide = slides[activeTab];

  return (
    <div className="space-y-4">
      {/* Interactive Tabs */}
      <div className="flex flex-wrap gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
        {slides.map((slide) => (
          <button
            key={slide.id}
            onClick={() => setActiveTab(slide.id)}
            className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === slide.id
                ? "bg-accent text-white shadow-xs"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
            }`}
          >
            {slide.title}
          </button>
        ))}
      </div>

      {/* Browser Mockup */}
      <BrowserMockup 
        src={currentSlide.src}
        alt={currentSlide.subtitle}
        url={currentSlide.url}
      />

      {/* Slide Meta Details Card */}
      <div className="bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800/60 rounded-2xl p-4 space-y-1 shadow-xs">
        <div className="flex items-center justify-between">
          <strong className="text-neutral-800 dark:text-neutral-200 text-xs font-display font-bold">
            {currentSlide.subtitle}
          </strong>
          <span className="text-[9px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-full uppercase font-bold">
            Real Artifact
          </span>
        </div>
        <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {currentSlide.desc}
        </p>
      </div>
    </div>
  );
}

function BrowserMockup({ src, alt, url }: BrowserMockupProps) {
  return (
    <div className="relative bg-neutral-100 dark:bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Browser Bar */}
      <div className="bg-neutral-200/60 dark:bg-neutral-800/60 px-4 py-2.5 flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-700 select-none">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400 dark:bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 dark:bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 dark:bg-green-500/80" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900/60 px-3 py-0.5 rounded border border-neutral-200/50 dark:border-neutral-700/50 select-all truncate max-w-[200px] sm:max-w-xs text-center">
            {url}
          </div>
        </div>
      </div>
      {/* Browser Body */}
      <div className="aspect-[16/10] relative bg-neutral-50 dark:bg-neutral-900 overflow-hidden flex flex-col">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover object-top select-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

export default function InternshipPage({ onBack }: InternshipPageProps) {
  // Auto-scroll to top when page mounts to ensure a clean transition
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white pt-32 pb-24 font-sans transition-colors duration-300 selection:bg-accent selection:text-white relative overflow-hidden"
    >
      {/* Background animated elements matching the original Hero page design */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden text-neutral-200 dark:text-neutral-800 flex items-center justify-center -z-10">
        <motion.div 
          className="absolute top-[10%] left-[10%] text-accent/10 dark:text-accent/20"
          animate={{ y: [0, -15, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Code2 size={100} strokeWidth={1} />
        </motion.div>
        
        <motion.div 
          className="absolute top-[45%] left-[5%]"
          animate={{ y: [0, -25, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Database size={70} strokeWidth={1} />
        </motion.div>
        
        <motion.div 
          className="absolute top-[25%] right-[10%]"
          animate={{ y: [0, 15, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Terminal size={90} strokeWidth={1} />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-[20%] right-[12%] text-accent/10 dark:text-accent/20"
          animate={{ y: [0, 20, 0], rotate: [0, -4, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Cpu size={80} strokeWidth={1} />
        </motion.div>
        
        {/* Same subtle grid pattern overlay as the original page */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNjdXJyZW50Q29sb3IiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      </div>

      {/* Decorative Radial Gradient Blurs */}
      <div className="absolute top-[10%] left-[5%] -z-10 opacity-30 pointer-events-none">
        <div className="w-[300px] h-[300px] rounded-full bg-radial from-accent/20 to-transparent blur-3xl"></div>
      </div>
      <div className="absolute top-[40%] right-[5%] -z-10 opacity-30 pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full bg-radial from-accent/15 to-transparent blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Navigation Action Area */}
        <div className="mb-16">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-accent dark:text-neutral-400 dark:hover:text-accent transition-colors cursor-pointer group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1.5 transition-transform duration-300" />
            Back to main portfolio
          </button>
        </div>

        {/* Hero Header Block */}
        <header className="max-w-4xl space-y-6 mb-16">
          <div className="flex items-center gap-3">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest">
              Prosperna SaaS Ecosystem
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 font-mono">
              Summer 2026
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white font-display leading-[1.1]">
            Engineering for <br />
            <span className="text-neutral-400 dark:text-neutral-500">MSME E-commerce Growth</span>
          </h1>
          
          <p className="text-xl text-neutral-600 dark:text-neutral-300 font-light leading-relaxed max-w-3xl">
            A comprehensive, high-fidelity case study of my systems and frontend engineering internship at Prosperna. Discover how I optimized client-side payloads, migrated mission-critical workspaces to modern Tailwind stacks, and mapped international logistics structures.
          </p>
        </header>

        {/* Spec Metadata Dashboard Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-neutral-200 dark:border-neutral-800 mb-20 bg-white/40 dark:bg-neutral-900/10 backdrop-blur-sm rounded-3xl px-8">
          <div>
            <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block mb-1">My Role</span>
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 font-display">Systems & Frontend Intern</span>
          </div>
          
          <div>
            <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block mb-1">Organization</span>
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 font-display">Prosperna SaaS</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block mb-1">Timeframe</span>
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 font-display">May 18 – July 15, 2026</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block mb-1">Primary Tools</span>
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 font-mono">Next.js 15, Vite, Vitest</span>
          </div>
        </div>

        {/* Narrative introduction Section */}
        <section className="grid lg:grid-cols-3 gap-12 lg:gap-16 mb-24 items-start">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white font-display sticky top-32">
              Platform <br />Context
            </h2>
            <div className="h-1 w-12 bg-accent mt-4"></div>
          </div>
          <div className="lg:col-span-2 space-y-6 text-neutral-600 dark:text-neutral-300 leading-relaxed text-base">
            <p>
              Prosperna operates as a highly specialized Software-as-a-Service (SaaS) multi-tenant e-commerce platform built to solve digital retail challenges for micro, small, and medium enterprises (MSMEs) in developing markets. Built upon a federated architecture of multiple frontend and backend repositories, it provides merchant dashboards, custom store creators, lightning-fast storefronts, localized payment gateways, and delivery channels.
            </p>
            <p>
              During my internship term, I worked as an integrated engineer on both the customer-facing storefront applications and the principal administrative merchant-facing portals. My duties balanced intense mobile speed profiling, complex codebase refactorings, validation writing, and team architecture planning sessions to advance platform performance and prepare for global market expansion.
            </p>
          </div>
        </section>

        {/* Internship Timeline & Chronological Milestones */}
        <section className="mb-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono block mb-2">Chronology</span>
              <h2 className="text-4xl font-bold text-neutral-900 dark:text-white font-display">Internship Milestones</h2>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-sm text-sm">
              An overview of key sprint deliveries and specialized focus areas during the 3-month internship program.
            </p>
          </div>

          {/* Timeline Components matching the Main Page experience styling */}
          <div className="relative pl-8 border-l border-neutral-200 dark:border-neutral-800 space-y-16 py-2">
            {[
              {
                time: "May 18 – May 29, 2026",
                title: "Onboarding, Setup & Checkout Performance Blitz",
                scope: "Customer-Facing Storefront",
                badge: "Performance & DX",
                desc: "Cloned the core repositories, resolved local Node.js version conflicts with nvm, and analyzed mobile payload speeds. Restructured Webpack SplitChunks configurations inside next.config.js to defer heavy telemetry libraries (Grafana Faro, OpenTelemetry) and lazily load payment gateway and Google Map utilities, reclaiming major main-thread idle time and slashing mobile Total Blocking Time (TBT)."
              },
              {
                time: "June 1 – June 12, 2026",
                title: "Admin UI Architecture & Styling Tokens",
                scope: "Merchant-Facing Dashboard",
                badge: "Systems & Design",
                desc: "Transitioned to the administrative dashboard repository to design modular React-based layouts and navigation wrappers. Overhauled design documentation (DESIGN.md), standardized primary color palettes into a YAML-based format, initialized Tailwind CSS v4, and expanded inventory, media library, and analytics modules."
              },
              {
                time: "June 15 – June 26, 2026",
                title: "Legacy React-Bootstrap to Tailwind v4 Migration",
                scope: "Core Dashboard Portals",
                badge: "Modernization & Testing",
                desc: "Executed a comprehensive UI modernization, migrating legacy React-Bootstrap buttons, select fields, and modals to modern utility-first Tailwind CSS. Solved rendering and functional alignment issues, refined micro-interactions (hover states, focus outlines), resolved linting warnings, and aligned Jest test suites with the updated Tailwind DOM structures."
              },
              {
                time: "June 29 – July 15, 2026",
                title: "Profiling, Accessibility & Production Release",
                scope: "Platform-wide Core Codebases",
                badge: "Stability & Compliance",
                desc: "Profiled admin dashboard rendering with React DevTools and optimized performance via table-row memoization. Conducted thorough keyboard navigation and ARIA accessibility audits, formulated End-to-End (E2E) testing strategies for critical flows, set up production monitoring alert rules, and completed code handoffs for final release."
              }
            ].map((milestone, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative group"
              >
                {/* Glowing Circle Icon like Main Page */}
                <div className="absolute top-1.5 left-[-37px] w-[10px] h-[10px] rounded-full bg-accent shadow-[0_0_10px_rgba(59,130,246,0.6)] group-hover:scale-125 transition-transform duration-300"></div>
                
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-accent font-mono uppercase bg-accent/10 px-3 py-1 rounded-full">
                    {milestone.time}
                  </span>
                  <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 font-mono">
                    {milestone.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mt-1 group-hover:text-accent transition-colors duration-300 font-display">
                  {milestone.title}
                </h3>
                
                <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-1">
                  Scope: <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-xs text-neutral-600 dark:text-neutral-300 font-mono">{milestone.scope}</code>
                </p>

                <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mt-3 max-w-4xl">
                  {milestone.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Dynamic Interactive Daily Journal Logbook Facsimile Viewer */}
        <JournalLogbook />

        {/* Detailed Projects Case Studies (Bento/Card Layout matching Portfolio Cards) */}
        <section className="space-y-20">
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-16">
            <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono block mb-2">Deep Dive</span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white font-display">Technical Accomplishments</h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mt-4 text-base">
              A comprehensive technical breakdown of engineering problems, methodology, and performance outcomes achieved across platform codebases.
            </p>
          </div>

          <div className="grid gap-12">
            
            {/* Project Card 1: Storefront Optimization */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/60 dark:bg-neutral-900/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-neutral-200/60 dark:border-neutral-800/60 shadow-xs hover:shadow-md transition-all duration-300 space-y-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-neutral-150 dark:border-neutral-800 pb-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-md">Customer-Facing Storefront</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-md">Performance Optimization</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-md">Production Approved</span>
                  </div>
                  <h3 className="text-3xl font-bold font-display text-neutral-900 dark:text-white">
                    01 / Storefront Performance Blitz
                  </h3>
                </div>
                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 space-y-1">
                  <div>TBT Reduction: <strong className="text-emerald-500 dark:text-emerald-400">~240ms (mobile)</strong></div>
                  <div>First Load Save: <strong className="text-emerald-500 dark:text-emerald-400">~140 KB JS</strong></div>
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7 space-y-6 text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm">
                  <p>
                    <strong>Context & Architectural Impact:</strong> Customer-facing storefront load speed is the single most critical funnel metric in Prosperna's multi-tenant ecosystem. Since the majority of domestic MSME shoppers browse on low-tier mobile devices with variable cellular connections, heavy upfront JavaScript bundle sizes directly lead to bounce-rate spikes. By auditing the network payloads and execution charts of the customer-facing storefront application, I diagnosed several critical performance bottlenecks—such as synchronous third-party scripts blocking the main thread and untyped global modules causing major layout shifts. I designed and executed a multi-faceted performance optimization strategy to reclaim mobile viewport responsiveness.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent h-fit shrink-0 mt-0.5">
                          <Cpu size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">SDK Lazy-Loading & Dynamic Script</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            During mobile profiling, I found that the heavy Xendit payment gateway script (<code className="text-xs font-mono">xendit.min.js</code>) was loaded synchronously. I refactored the checkout flow to dynamically inject the payment SDK script via Next.js <code className="text-xs font-mono">next/script</code> on payment selection. I similarly lazy-loaded Google Maps components inside shipping locators, recovering substantial Main-Thread Idle time.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent h-fit shrink-0 mt-0.5">
                          <Terminal size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">Webpack & Next.js Chunk Optimization</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            I analyzed the compilation graph in <code className="text-xs font-mono">next.config.js</code> and restructured Webpack’s SplitChunksPlugin configuration. By modifying default vendor cache groups to compile under <code className="text-xs font-mono">chunks: 'initial'</code>, I isolated dynamic imports from hydration resources, significantly accelerating first-paint metrics on high-latency mobile networks.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent h-fit shrink-0 mt-0.5">
                          <Layers size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">Telemetry Split-Bundling</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            Grafana Faro and OpenTelemetry static imports were adding ~140 KB of uncompressed JS. I shifted telemetry initializers into dynamic, asynchronous <code className="text-xs font-mono">import()</code> functions triggered during the React <code className="text-xs font-mono">useEffect</code> post-hydration hook, eliminating rendering blocks.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent h-fit shrink-0 mt-0.5">
                          <CheckCircle size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">CLS Mitigation & Image Skeletor</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            We observed Cumulative Layout Shifts on product lists during image loading. I implemented strict aspect-ratio constraints on wrapper grid elements and replaced raw tags with responsive CSS skeleton containers, reducing CLS to near-zero.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 bg-neutral-100 dark:bg-neutral-950/60 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-900">
                    <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-wider block mb-2">Component Spotlight</span>
                    <h5 className="font-bold text-neutral-900 dark:text-white text-sm">ProductListItem Integration</h5>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                      I rewrote the core responsive <code className="text-xs font-mono text-accent">ProductListItem</code> component. By replacing variable flex layouts with static-height CSS grids and using container queries, I ensured catalogs render consistently on all devices, backed by extensive Vitest unit tests.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-4">
                  <BrowserMockup 
                    src="/images/Screenshot (1378).png"
                    alt="Storefront Performance Showcase - Mobile Speed Profiling"
                    url="customer.prosperna.com"
                  />
                  <div className="bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200/50 dark:border-neutral-800/50 rounded-2xl p-4 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans shadow-xs">
                    <strong className="text-neutral-700 dark:text-neutral-300">Showcase Details:</strong> Illustrating mobile speed metrics and load speed graphs showing ~240ms Total Blocking Time (TBT) reduction and perfect Web Vitals scores after telemetry dynamic chunking.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project Card 2: Bootstrap to Tailwind */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/60 dark:bg-neutral-900/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-neutral-200/60 dark:border-neutral-800/60 shadow-xs hover:shadow-md transition-all duration-300 space-y-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-neutral-150 dark:border-neutral-800 pb-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-md">Merchant-Facing Portal</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-md">Tailwind Migration Branch</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-md">Unit Tests Passed</span>
                  </div>
                  <h3 className="text-3xl font-bold font-display text-neutral-900 dark:text-white">
                    02 / React-Bootstrap to Tailwind v4 Migration
                  </h3>
                </div>
                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 space-y-1">
                  <div>Vitest Suites: <strong className="text-emerald-500 dark:text-emerald-400">685 Pass / 0 Fail</strong></div>
                  <div>Methodology: <strong className="text-accent">Custom tw: Prefix Standard</strong></div>
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7 space-y-6 text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm">
                  <p>
                    <strong>Context & Systems Modernization:</strong> The legacy merchant panel (Merchant-Facing Portal) was built using React-Bootstrap, which introduced substantial CSS bloat and restricted custom theme generation. To improve visual performance and standardize the user experience, our team launched a systemic migration to Tailwind CSS v4. My primary challenge was refactoring mission-critical administrative workspaces—including product inventory, banking details, and the media library—without introducing styling regressions or breaking legacy global page resets.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-4">
                      <h4 className="font-bold text-neutral-900 dark:text-white text-base">Structural Co-Authorship & Isolation Standards</h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        To guide team development and prevent visual style collisions between legacy bootstrap scripts and new tailwind builds, I co-authored the centralized <code className="text-xs font-mono text-accent">BOOTSTRAP_MIGRATION.md</code> standards manual. We established a rigorous mapping strategy for converting nested Bootstrap grid components (<code className="text-xs font-mono">Row</code>, <code className="text-xs font-mono">Col</code>, <code className="text-xs font-mono">Container</code>) into pure Tailwind CSS Grids and Flexboxes.
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        We enforced visual isolation by compiling the Tailwind engine with a unique custom class prefix (<code className="text-xs font-mono text-accent">tw:</code>) and disabling default CSS base resets. This approach allowed the new utility classes to coexist cleanly with Bootstrap’s styling in legacy parts of the app during the incremental refactoring process.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-neutral-900 dark:text-white text-base">Administrative Workspace & Core Page Refactoring</h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        I executed a comprehensive utility-first redesign and JSX refactoring of five essential admin panels, standardizing responsive behaviors and streamlining merchant data presentation:
                      </p>
                      <ul className="text-xs text-neutral-500 dark:text-neutral-400 space-y-3 list-none pl-0">
                        <li className="border-l-2 border-accent pl-3 py-0.5">
                          <strong className="text-neutral-900 dark:text-white">1. Analytics Dashboard Rework:</strong> 
                          <span className="block mt-0.5">Reworked the main merchant overview screen, creating a responsive multi-column grid with dynamic, high-contrast analytics cards. Improved data density and loading transitions for sales trends and conversion funnel charts.</span>
                        </li>
                        <li className="border-l-2 border-accent pl-3 py-0.5">
                          <strong className="text-neutral-900 dark:text-white">2. Orders Management Page:</strong> 
                          <span className="block mt-0.5">Ported the bulk order tracker and details layout. Crafted horizontal-scrollable datatables with static-height cells, custom checkout status badges, and interactive multi-select checkboxes for batch actions.</span>
                        </li>
                        <li className="border-l-2 border-accent pl-3 py-0.5">
                          <strong className="text-neutral-900 dark:text-white">3. Contacts & Customer Directory:</strong> 
                          <span className="block mt-0.5">Re-coded the subscriber listings, user roles, and customer detail screens. Unified interactive filter bars, search forms, and user communication preferences settings to align with tailwind's styling.</span>
                        </li>
                        <li className="border-l-2 border-accent pl-3 py-0.5">
                          <strong className="text-neutral-900 dark:text-white">4. Products & Inventory Workspace:</strong> 
                          <span className="block mt-0.5">Refactored complex, multi-step creation panels, settings forms, SEO metadata blocks, and minimum order quantity (MOQ) configurations. Wrapped forms with accessible input states and validation triggers.</span>
                        </li>
                        <li className="border-l-2 border-accent pl-3 py-0.5">
                          <strong className="text-neutral-900 dark:text-white">5. Media Library Component:</strong> 
                          <span className="block mt-0.5">Reworked the centralized asset library UI to support dense, multi-file grids. Added custom skeleton loaders and optimized viewport-based image constraints to completely resolve vertical layout-stretching.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 bg-neutral-100 dark:bg-neutral-950/60 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-900">
                    <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-wider block mb-2">Vitest Alignment & Conflict Patching</span>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      Refactoring core UI markup often breaks existing snapshot and DOM-based tests. I audited and adapted the Vitest assertions for all modified views, replacing old Bootstrap selectors with robust, accessible queries (such as ARIA roles and labels). I also identified and resolved a critical regression in the checkout coupon submission tests, aligning state update timing to secure a perfect <strong>685 passing tests with zero failures</strong> across the suite.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-4">
                  <BrowserMockup 
                    src="/images/Screenshot (1926).png"
                    alt="Tailwind UI Showcase - Merchant Analytics Dashboard"
                    url="prodev.prosperna.ph/dashboard/analytics"
                  />
                  <div className="bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200/50 dark:border-neutral-800/50 rounded-2xl p-4 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans shadow-xs">
                    <strong className="text-neutral-700 dark:text-neutral-300">Showcase Details:</strong> Displays the migrated merchant admin dashboard, illustrating the clean, high-contrast, responsive grids built using Tailwind CSS v4 to replace bulky legacy React-Bootstrap styles.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project Card 3: Internationalization */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/60 dark:bg-neutral-900/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-neutral-200/60 dark:border-neutral-800/60 shadow-xs hover:shadow-md transition-all duration-300 space-y-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-neutral-150 dark:border-neutral-800 pb-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-md">Multi-Service</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-md">Global Shipping Branch</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-md">Design Verified</span>
                  </div>
                  <h3 className="text-3xl font-bold font-display text-neutral-900 dark:text-white">
                    03 / Shipping Address Internationalization Planning
                  </h3>
                </div>
                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 space-y-1">
                  <div>Target Regions: <strong className="text-accent">US, CA, AU, NZ</strong></div>
                  <div>Branches Cut: <strong className="text-accent">6 Symmetrical Repositories</strong></div>
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7 space-y-6 text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm">
                  <p>
                    <strong>Context & Global Vision:</strong> Historically, Prosperna’s checkout modules and delivery calculations were hardcoded for the Philippine domestic market, strictly expecting local regions, provinces, cities, and barangays. To support merchants expanding into international markets, we needed to re-architect our logistics schemas to handle countries like the United States, Canada, Australia, and New Zealand. I led the technical planning and schema design for this multi-service transition.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent h-fit shrink-0 mt-0.5">
                          <Layers size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">Multi-Repository Branching Infrastructure</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            Because Prosperna's software operates across a federated architecture, updating the address format required coordinating modifications across six distinct repositories—including the storefront, merchant portal, shipping hub, payment coordinator, and central billing backend. I set up the localized global address and shipping branches across all six microservices, verifying API-contract compatibility and ensuring clean, conflict-free build states against upstream master branches.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent h-fit shrink-0 mt-0.5">
                          <Globe size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">Dynamic Input Validation & Schema Adaptation</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            I designed dynamic field validators that adjust UI inputs based on the selected destination country. The interface seamlessly swaps PH-specific municipal fields for US State codes or CA provinces, validates alphanumeric ZIP and postal codes with custom regex patterns, and automatically disables domestic features (like manual map pin placement) when international checkouts are requested.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent h-fit shrink-0 mt-0.5">
                          <Database size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">Logistics & Courier Filtering</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            To protect merchants from logistical shipping errors, I designed backend validation logic that automatically filters out local, domestic-only carriers (such as J&T Express or Lalamove) whenever international address attributes are present. This prevents checkout errors and safely funnels international orders into global shipping carriers or merchant-specified flat-rate rules.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent h-fit shrink-0 mt-0.5">
                          <FileText size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">Architectural Presentation & Delivery</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            I consolidated our schema designs, API models, dynamic validators, and deployment maps into a detailed technical document (<code className="text-xs font-mono">standup_deck.js</code>). I then delivered a comprehensive presentation to our engineering leads (<code className="text-xs font-mono">Address-Country-Field-Standup-Detailed.pptx</code>) to outline the project's milestones, paving the way for the development of our global shipping modules.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 lg:sticky lg:top-36">
                  <InternationalizationShowcase />
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Unified Bottom Navigation CTA Area */}
        <div className="mt-28 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-accent dark:text-neutral-400 dark:hover:text-accent transition-colors cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to main portfolio
          </button>

          <a
            href="https://www.prosperna.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white border-b border-neutral-900 dark:border-white pb-0.5 hover:opacity-85 transition-opacity duration-300"
          >
            Visit Prosperna Philippines
            <ArrowUpRight size={14} />
          </a>
        </div>

      </div>
    </motion.div>
  );
}
