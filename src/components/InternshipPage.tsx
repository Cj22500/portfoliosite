import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ChevronRight,
  TrendingUp,
  BarChart3,
  GitPullRequest,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Boxes,
  Server,
  Sparkles,
  Smartphone,
  Gauge,
  ChevronLeft,
  Flame,
  Activity,
  Info
} from 'lucide-react';

interface InternshipPageProps {
  onBack: () => void;
}

interface BrowserMockupProps {
  src: string;
  alt: string;
  url: string;
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

function InternationalizationShowcase() {
  const [activeTab, setActiveTab] = React.useState<number>(0);

  const slides = [
    {
      id: 0,
      title: "1. DB & Schema",
      subtitle: "Database & API Contract Planning",
      desc: "Comprehensive database design and architectural blueprints showing how we mapped local tables to global parameters for multi-tenant checkouts.",
      src: "/images/Screenshot (2602).png",
      url: "docs.prosperna.com/architecture/orders-schema"
    },
    {
      id: 1,
      title: "2. Code Execution",
      subtitle: "Backend Validation & Routing Logic",
      desc: "Our logic layer checking international formats and dynamically filtering out localized couriers (e.g., Lalamove) to prevent shipping errors.",
      src: "/images/Screenshot (2603).png",
      url: "enterprise-architecture/logistics-routing-service"
    },
    {
      id: 2,
      title: "3. Settings UI",
      subtitle: "Merchant Settings Panel",
      desc: "The completed settings dashboard enabling merchants to toggle global destinations and configure localized shipping rules.",
      src: "/images/Screenshot (2604).png",
      url: "admin.prosperna.com/settings/shipping"
    },
    {
      id: 3,
      title: "4. Checkout Schema",
      subtitle: "Checkout Dynamic Fields Layout",
      desc: "Completed customer checkout fields and schema displaying adaptive input structures according to country selected.",
      src: "/images/Screenshot (2605).png",
      url: "storefront.prosperna.com/checkout"
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

// --- Interactive Pull Request Trajectory Component ---

function PrTrajectoryChart() {
  const [chartMode, setChartMode] = useState<'monthly' | 'cumulative' | 'merged'>('monthly');
  const [selectedMonth, setSelectedMonth] = useState<number>(3); // Default to August (peak)
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const monthlyData = [
    {
      month: "May",
      shortMonth: "May",
      phase: "Phase 1: Kickoff & Telemetry",
      prs: 4,
      cumulative: 4,
      merged: 4,
      mergeRate: "100%",
      share: "0.8%",
      pace: "2.0 PRs/wk",
      gradient: "from-sky-500 to-blue-600",
      glowColor: "rgba(14, 165, 233, 0.4)",
      theme: "Practicum Onboarding & Environment Setup",
      repos: ["storefront-checkout-engine", "merchant-admin-portal"],
      tech: ["Node.js", "Docker", "Git Flow", "Webpack"],
      highlights: "Cloned monorepos, solved Node.js runtime mismatches with nvm/fnm, analyzed initial SSR bundle footprints, and mapped telemetry render-blocking scripts."
    },
    {
      month: "June",
      shortMonth: "Jun",
      phase: "Phase 2: Modernization Foundation",
      prs: 39,
      cumulative: 43,
      merged: 36,
      mergeRate: "92.3%",
      share: "8.0%",
      pace: "9.8 PRs/wk",
      gradient: "from-blue-600 to-indigo-600",
      glowColor: "rgba(59, 130, 246, 0.4)",
      theme: "Storefront Components & Styling Tokens Setup",
      repos: ["storefront-checkout-engine", "merchant-admin-portal", "orders-fulfillment-service"],
      tech: ["Tailwind CSS v4", "Next.js", "Design Tokens"],
      highlights: "Co-authored DESIGN.md, configured initial Tailwind v4 setup with custom tw: prefix, refactored responsive ProductListItem grids, and drafted Bootstrap migration specs."
    },
    {
      month: "July",
      shortMonth: "Jul",
      phase: "Phase 3: Migration Architecture",
      prs: 50,
      cumulative: 93,
      merged: 47,
      mergeRate: "94.0%",
      share: "10.2%",
      pace: "11.1 PRs/wk",
      gradient: "from-indigo-600 to-violet-600",
      glowColor: "rgba(99, 102, 241, 0.4)",
      theme: "Tailwind Migration Branch & Headless Primitives",
      repos: ["merchant-admin-portal", "orders-fulfillment-service", "identity-access-service"],
      tech: ["Headless UI Dialog", "React 18", "Redux Toolkit"],
      highlights: "Created AppModal using Headless UI Dialog primitives, began migrating admin dashboard modals, and overhauled order status badges and datatable layouts."
    },
    {
      month: "August",
      shortMonth: "Aug",
      phase: "Phase 4: Peak Velocity & Performance",
      prs: 202,
      cumulative: 295,
      merged: 191,
      mergeRate: "94.6%",
      share: "41.3%",
      pace: "44.9 PRs/wk",
      isPeak: true,
      gradient: "from-violet-600 via-indigo-600 to-fuchsia-500",
      glowColor: "rgba(168, 85, 247, 0.5)",
      theme: "Peak Sprint: Admin UI Migration & Checkout Performance Audit",
      repos: ["merchant-admin-portal", "storefront-checkout-engine", "orders-fulfillment-service", "merchant-config-service"],
      tech: ["Puppeteer", "Lighthouse CI", "React 18", "Tailwind v4"],
      highlights: "Major milestone: Migrated 5 critical merchant admin panels (Analytics, Orders, Contacts, Products, Media Library) off React-Bootstrap. Built Puppeteer + Lighthouse audit benchmarking Prosperna vs. Shopify PH checkouts. Slashed mobile TBT by ~240ms."
    },
    {
      month: "September",
      shortMonth: "Sep",
      phase: "Phase 5: Cross-Border Localization",
      prs: 127,
      cumulative: 422,
      merged: 118,
      mergeRate: "92.9%",
      share: "26.0%",
      pace: "28.2 PRs/wk",
      gradient: "from-violet-600 to-teal-500",
      glowColor: "rgba(20, 184, 166, 0.4)",
      theme: "Cross-Border Address Localization & Order Processing Buffers",
      repos: ["storefront-checkout-engine", "logistics-routing-service", "merchant-config-service", "orders-fulfillment-service", "notification-dispatch-service"],
      tech: ["Google Maps API", "Express APIs", "PostgreSQL"],
      highlights: "Shipped dynamic multi-country address resolvers (PH, CA, AU, NZ) across 6 microservices. Added Google Maps coordinate pinning for Lalamove. Implemented store-level preparation buffers (ClickUp 86eqqfmv1)."
    },
    {
      month: "October",
      shortMonth: "Oct",
      phase: "Phase 6: Governance & Production Handoff",
      prs: 67,
      cumulative: 489,
      merged: 57,
      mergeRate: "85.1%",
      share: "13.7%",
      pace: "14.9 PRs/wk",
      gradient: "from-teal-600 to-amber-500",
      glowColor: "rgba(245, 158, 11, 0.4)",
      theme: "Catalog Bulk Editor, MaxAI Governance & Production Handoff",
      repos: ["merchant-admin-portal", "promotions-rules-engine", "analytics-telemetry-service", "identity-access-service"],
      tech: ["Formik/Yup", "Subagent LLM governance", "Vitest"],
      highlights: "Centralized stock editing into BulkUpdateQuantityModal, hardened digital product upload retry error recovery with Formik/Yup, governed MaxAI subagents, and finalized complete codebase handoff."
    }
  ];

  const maxVal = chartMode === 'cumulative' ? 500 : 220;
  const cur = monthlyData[selectedMonth];
  const activeTooltipMonth = hoveredMonth !== null ? monthlyData[hoveredMonth] : null;

  return (
    <div className="bg-white/80 dark:bg-neutral-900/60 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-neutral-200/70 dark:border-neutral-800/70 shadow-xs space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/70 dark:border-neutral-800/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-accent/10 text-accent">
              Telemetry Record
            </span>
            <span className="text-xs font-mono text-neutral-400">
              GitHub @Cj22500 Live Audit
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-neutral-900 dark:text-white mt-1">
            Pull Request Velocity Trajectory (May – Oct 2026)
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            489 authored PRs with 453 merged (92.6% merge rate) across 6 months of agile bi-weekly sprints.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl self-start sm:self-auto border border-neutral-200 dark:border-neutral-700">
          <button
            onClick={() => setChartMode('monthly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              chartMode === 'monthly'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            Monthly Velocity
          </button>
          <button
            onClick={() => setChartMode('cumulative')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              chartMode === 'cumulative'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            Cumulative (4 → 489)
          </button>
          <button
            onClick={() => setChartMode('merged')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              chartMode === 'merged'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            Merge Rate %
          </button>
        </div>
      </div>

      {/* Distribution Summary Telemetry Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-50/70 dark:bg-neutral-950/40 p-3 sm:p-4 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
            <Flame size={16} />
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Peak Sprint</span>
            <strong className="text-neutral-900 dark:text-white font-bold">August (202 PRs)</strong>
            <span className="text-[10px] text-purple-500 block">41.3% tenure volume</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
            <CheckCircle2 size={16} />
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Merge Efficiency</span>
            <strong className="text-neutral-900 dark:text-white font-bold">92.6% (453 / 489)</strong>
            <span className="text-[10px] text-emerald-500 block">High reliability</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-accent/10 text-accent shrink-0">
            <TrendingUp size={16} />
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Velocity Ramp</span>
            <strong className="text-neutral-900 dark:text-white font-bold">4 → 202 PRs</strong>
            <span className="text-[10px] text-accent block">50.5× expansion</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
            <Activity size={16} />
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Sprint Velocity</span>
            <strong className="text-neutral-900 dark:text-white font-bold">~18.8 PRs / wk</strong>
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block">81.5 PRs / mo avg</span>
          </div>
        </div>
      </div>

      {/* Visual Chart Bars Area */}
      <div className="pt-8 pb-4 relative">
        {/* Floating Tooltip Anchor */}
        <AnimatePresence>
          {activeTooltipMonth && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className={`absolute top-0 z-30 pointer-events-none transition-all duration-200 ${
                hoveredMonth === 0 
                  ? 'left-2 sm:left-4' 
                  : hoveredMonth === 5 
                  ? 'right-2 sm:right-4' 
                  : 'left-1/2 -translate-x-1/2'
              }`}
            >
              <div className="bg-neutral-900/95 dark:bg-neutral-950/95 backdrop-blur-md text-white border border-neutral-700/80 rounded-2xl p-3 sm:p-4 shadow-xl text-xs space-y-2 max-w-[280px] sm:max-w-xs">
                <div className="flex items-center justify-between gap-2 border-b border-neutral-800 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm font-display text-white">{activeTooltipMonth.month} 2026</span>
                    {activeTooltipMonth.isPeak && (
                      <span className="text-[9px] font-mono font-bold bg-fuchsia-500/30 text-fuchsia-300 px-1.5 py-0.2 rounded">PEAK</span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">{activeTooltipMonth.phase.split(':')[0]}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div>
                    <span className="text-neutral-400 block text-[10px]">Authored:</span>
                    <strong className="text-white text-xs">{activeTooltipMonth.prs} PRs</strong>
                    <span className="text-[10px] text-neutral-400 block">({activeTooltipMonth.share} share)</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px]">Merged:</span>
                    <strong className="text-emerald-400 text-xs">{activeTooltipMonth.merged} PRs</strong>
                    <span className="text-[10px] text-emerald-300 block">({activeTooltipMonth.mergeRate})</span>
                  </div>
                </div>
                <div className="text-[10px] text-neutral-300 border-t border-neutral-800/80 pt-1.5 flex items-center justify-between font-mono">
                  <span>Pace: {activeTooltipMonth.pace}</span>
                  <span className="text-accent">{activeTooltipMonth.repos.length} services</span>
                </div>
                <div className="text-[10px] text-neutral-400 italic">
                  Tap to lock sprint breakdown below
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Chart Container with Explicit Height */}
        <div className="h-64 sm:h-76 md:h-84 flex items-end justify-between gap-2 sm:gap-6 px-2 sm:px-6 border-b border-neutral-200 dark:border-neutral-800 relative select-none">
          {/* Subtle horizontal grid lines with reference scale benchmarks */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-14 pt-4 px-1 sm:px-2">
            {[
              { val: chartMode === 'cumulative' ? '500 PRs' : '200+ PRs (Peak)', level: 'top' },
              { val: chartMode === 'cumulative' ? '375 PRs' : '150 PRs', level: 'mid-high' },
              { val: chartMode === 'cumulative' ? '250 PRs' : '100 PRs', level: 'mid' },
              { val: chartMode === 'cumulative' ? '125 PRs' : '50 PRs', level: 'mid-low' },
              { val: '0', level: 'base' }
            ].map((benchmark, bIdx) => (
              <div key={bIdx} className="w-full flex items-center justify-between border-b border-dashed border-neutral-200/80 dark:border-neutral-800/80">
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 dark:text-neutral-500 bg-white/80 dark:bg-neutral-900/80 px-1 rounded-sm">
                  {benchmark.val}
                </span>
              </div>
            ))}
          </div>

          {/* Render 6 Bar Tracks */}
          {monthlyData.map((item, idx) => {
            const rawValue = chartMode === 'monthly' ? item.prs : chartMode === 'cumulative' ? item.cumulative : item.prs;
            
            // Calibrated visual distribution:
            // Minimum baseline height (14%) ensures early onboarding months (May with 4 PRs) remain tangible and interactive,
            // while peak month August with 202 PRs reaches 94% height without overflowing.
            const heightPercent = chartMode === 'cumulative'
              ? Math.min(100, Math.max(12, Math.round((item.cumulative / 500) * 100)))
              : Math.min(100, Math.max(14, Math.round((item.prs / maxVal) * 100)));

            const isSelected = selectedMonth === idx;
            const isHovered = hoveredMonth === idx;

            return (
              <div 
                key={idx}
                onClick={() => setSelectedMonth(idx)}
                onMouseEnter={() => setHoveredMonth(idx)}
                onMouseLeave={() => setHoveredMonth(null)}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative z-10 px-0.5 sm:px-1.5 focus:outline-none"
              >
                {/* PR Value Tag & Rate Badge */}
                <div className="mb-2 transition-all duration-200 flex flex-col items-center gap-0.5">
                  {chartMode === 'merged' ? (
                    <span className={`text-[10px] sm:text-xs font-mono font-bold px-1.5 py-0.5 rounded-md transition-all ${
                      isSelected
                        ? 'bg-emerald-500 text-white shadow-xs scale-105'
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {item.mergeRate}
                    </span>
                  ) : (
                    <span className={`text-[11px] sm:text-xs font-mono font-bold transition-all ${
                      isSelected 
                        ? 'text-accent scale-110 drop-shadow-sm font-extrabold' 
                        : isHovered
                        ? 'text-neutral-900 dark:text-white scale-105'
                        : 'text-neutral-500 dark:text-neutral-400'
                    }`}>
                      {rawValue}
                    </span>
                  )}

                  {item.isPeak && chartMode !== 'merged' && (
                    <span className="text-[8px] font-mono font-bold text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-tighter">
                      ⚡Peak
                    </span>
                  )}
                </div>

                {/* Animated Bar Track */}
                <div className={`w-full max-w-[34px] xs:max-w-[42px] sm:max-w-[54px] md:max-w-[62px] h-40 sm:h-48 md:h-54 bg-neutral-100/90 dark:bg-neutral-800/40 rounded-t-xl sm:rounded-t-2xl flex items-end justify-center relative overflow-hidden border transition-all duration-300 p-0.5 ${
                  isSelected 
                    ? 'border-accent dark:border-accent ring-2 ring-accent/30 dark:ring-accent/40 shadow-md' 
                    : isHovered
                    ? 'border-neutral-400 dark:border-neutral-600 shadow-sm'
                    : 'border-neutral-200/70 dark:border-neutral-800/80'
                }`}>
                  <motion.div 
                    key={`${chartMode}-${idx}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.04, ease: "easeOut" }}
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-lg sm:rounded-t-xl transition-all duration-300 relative flex flex-col justify-start items-center ${
                      isSelected 
                        ? `bg-gradient-to-t ${item.gradient} shadow-[0_0_24px_rgba(99,102,241,0.5)]` 
                        : isHovered
                        ? `bg-gradient-to-t ${item.gradient} opacity-95`
                        : `bg-gradient-to-t ${item.gradient} opacity-80 group-hover:opacity-100`
                    }`}
                  >
                    {/* Top glossy cap highlight */}
                    <div className="w-full h-1.5 bg-white/40 dark:bg-white/30 rounded-t-lg shrink-0" />

                    {/* Merged proportion marker when in Merged mode */}
                    {chartMode === 'merged' && (
                      <div 
                        style={{ height: `${(item.merged / item.prs) * 100}%` }}
                        className="w-full bg-emerald-500/40 mt-auto border-t border-emerald-300/40 rounded-b-md"
                      />
                    )}
                  </motion.div>
                </div>

                {/* Month Label & Active Indicator */}
                <div className="flex flex-col items-center mt-3 gap-1">
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors ${
                    isSelected 
                      ? 'text-accent font-extrabold' 
                      : 'text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100'
                  }`}>
                    <span className="hidden sm:inline">{item.month}</span>
                    <span className="sm:hidden">{item.shortMonth}</span>
                  </span>
                  <span className={`w-1.5 h-1.5 rounded-full transition-all ${
                    isSelected ? 'bg-accent scale-100' : 'bg-transparent scale-0'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Month Detail Card */}
      <motion.div 
        key={selectedMonth}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-widest px-2 py-0.5 rounded-full bg-accent/10">
                {cur.phase}
              </span>
              {cur.isPeak && (
                <span className="text-[10px] font-mono font-bold text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-500/10 px-2 py-0.5 rounded-full">
                  ⚡ Maximum Sprint Velocity
                </span>
              )}
            </div>
            <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white font-display">
              {cur.month} 2026 Focus: {cur.theme}
            </h4>
          </div>

          {/* Month Pagination Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setSelectedMonth(prev => Math.max(0, prev - 1))}
              disabled={selectedMonth === 0}
              className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              title="Previous Month"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-mono text-neutral-500">
              Month {selectedMonth + 1} of 6
            </span>
            <button
              onClick={() => setSelectedMonth(prev => Math.min(monthlyData.length - 1, prev + 1))}
              disabled={selectedMonth === monthlyData.length - 1}
              className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              title="Next Month"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* 4-Stat Metric Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono bg-white dark:bg-neutral-900/60 p-3 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60">
          <div>
            <span className="text-neutral-400 text-[10px] uppercase tracking-wider block">Authored:</span>
            <strong className="text-accent text-sm font-bold">{cur.prs} PRs</strong>
            <span className="text-[10px] text-neutral-400 block">{cur.share} of total</span>
          </div>
          <div>
            <span className="text-neutral-400 text-[10px] uppercase tracking-wider block">Merged:</span>
            <strong className="text-emerald-500 text-sm font-bold">{cur.merged} PRs</strong>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">{cur.mergeRate} merge rate</span>
          </div>
          <div>
            <span className="text-neutral-400 text-[10px] uppercase tracking-wider block">Cumulative:</span>
            <strong className="text-neutral-700 dark:text-neutral-300 text-sm font-bold">{cur.cumulative} PRs</strong>
            <span className="text-[10px] text-neutral-400 block">Trajectory to 489</span>
          </div>
          <div>
            <span className="text-neutral-400 text-[10px] uppercase tracking-wider block">Sprint Pace:</span>
            <strong className="text-neutral-900 dark:text-white text-sm font-bold">{cur.pace}</strong>
            <span className="text-[10px] text-neutral-400 block">Bi-weekly sprints</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {cur.highlights}
        </p>

        {/* Public-Safe Architectural Microservices Touched */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-neutral-200/60 dark:border-neutral-800/60">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-bold">
            Architectural Microservices Touched:
          </span>
          {cur.repos.map((repo, i) => (
            <span 
              key={i} 
              className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-neutral-200/70 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-300/40 dark:border-neutral-700/50"
            >
              service://{repo}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// --- Multi-Repository Ecosystem Breakdown Component ---

function MicroservicesEcosystem() {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'backend' | 'services'>('all');

  const repositories = [
    {
      name: "Merchant Admin Portal Engine",
      serviceId: "service://merchant-admin-portal",
      domain: "frontend",
      prs: 265,
      role: "Merchant Administration Core",
      tech: ["React 18", "Tailwind CSS v4", "Bootstrap Migration", "Redux", "Vitest"],
      desc: "Flagship merchant administrative portal. Spearheaded the full migration off legacy React-Bootstrap to Tailwind CSS v4, built Headless UI AppModal primitives, modernized the product catalog wizard, and integrated MaxAI domain subagents."
    },
    {
      name: "Customer Storefront & Checkout Engine",
      serviceId: "service://storefront-checkout-engine",
      domain: "frontend",
      prs: 88,
      role: "Consumer Commerce & Checkout Core",
      tech: ["Next.js 15", "React", "Tailwind CSS", "Jest", "Playwright"],
      desc: "High-conversion consumer storefront and checkout engine. Restructured Next.js 15 SplitChunks to eliminate render-blocking scripts, integrated dynamic payment SDK injection, built multi-country address resolvers, and eliminated CLS layout shifts."
    },
    {
      name: "Order Orchestration & Fulfillment Microservice",
      serviceId: "service://orders-fulfillment-service",
      domain: "backend",
      prs: 46,
      role: "Orders & Fulfillment Backend",
      tech: ["Node.js", "Express", "PostgreSQL", "Jest", "State Machines"],
      desc: "Backend order orchestration engine. Coordinated order state transitions, delivery time slot scheduling, dispatch triggers, and automated invoice PDF compilation."
    },
    {
      name: "Merchant Configuration & Settings Engine",
      serviceId: "service://merchant-config-service",
      domain: "backend",
      prs: 24,
      role: "Merchant Configuration Engine",
      tech: ["Node.js", "RESTful API", "PostgreSQL"],
      desc: "Core business configuration engine. Designed store-level preparation buffers (ClickUp 86eqqfmv1) to intelligently schedule delivery dates across all merchant tiers."
    },
    {
      name: "Transactional Notification & Dispatch Service",
      serviceId: "service://notification-dispatch-service",
      domain: "services",
      prs: 22,
      role: "Transactional Notification Service",
      tech: ["Node.js", "Microservices", "SendGrid", "Amazon SES"],
      desc: "High-throughput messaging service. Designed transactional order receipts, dispatch updates, and multi-currency localized email invoice templates."
    },
    {
      name: "Identity, RBAC & Customer Session Service",
      serviceId: "service://identity-access-service",
      domain: "backend",
      prs: 20,
      role: "Identity, RBAC & Customer Accounts",
      tech: ["Node.js", "JWT", "Auth0", "PostgreSQL"],
      desc: "Authentication and role management service. Hardened guest checkout identity resolution and passed full localized phone and international address metadata into CRM pipelines."
    },
    {
      name: "Promotions & Discount Calculation Engine",
      serviceId: "service://promotions-rules-engine",
      domain: "services",
      prs: 9,
      role: "Promotions & Discounts Engine",
      tech: ["Node.js", "Redis", "PostgreSQL"],
      desc: "High-speed promotional rule evaluator. Handled coupon validation, flash discount rules, and caching layer optimizations using Redis."
    },
    {
      name: "Logistics & Courier Routing Microservice",
      serviceId: "service://logistics-routing-service",
      domain: "services",
      prs: 8,
      role: "Logistics & Courier Orchestrator",
      tech: ["Node.js", "Third-Party Courier APIs", "Lalamove", "J&T Express"],
      desc: "Logistics integration service. Integrated live dispatch tracking, shipping quote calculators, and automated courier filtering for domestic and international destinations."
    },
    {
      name: "Commerce Intelligence & Telemetry Pipeline",
      serviceId: "service://analytics-telemetry-service",
      domain: "backend",
      prs: 7,
      role: "Merchant Intelligence & Attribution",
      tech: ["Node.js", "PostgreSQL", "Data Pipelines"],
      desc: "E-commerce visitor telemetry pipeline. Diagnosed and fixed the duplicate session tracking bug in 'Traffic by Source', restoring accurate merchant analytics data."
    }
  ];

  const filtered = repositories.filter(repo => {
    if (filter === 'all') return true;
    if (filter === 'frontend') return repo.domain === 'frontend';
    if (filter === 'backend') return repo.domain === 'backend';
    if (filter === 'services') return repo.domain === 'services';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <div>
          <h3 className="text-2xl font-bold font-display text-neutral-900 dark:text-white">
            Federated 9-Microservice Architecture
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Cyril authored and contributed pull requests across the entire enterprise stack.
          </p>
        </div>

        <div className="flex flex-wrap gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-accent text-white shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
            }`}
          >
            All Repositories (9)
          </button>
          <button
            onClick={() => setFilter('frontend')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filter === 'frontend'
                ? 'bg-accent text-white shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
            }`}
          >
            Frontend & Portals (2)
          </button>
          <button
            onClick={() => setFilter('backend')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filter === 'backend'
                ? 'bg-accent text-white shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
            }`}
          >
            Core Backend APIs (4)
          </button>
          <button
            onClick={() => setFilter('services')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filter === 'services'
                ? 'bg-accent text-white shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
            }`}
          >
            Services & Integrations (3)
          </button>
        </div>
      </div>

      {/* Grid of Microservices */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((repo, idx) => (
          <motion.div
            key={repo.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.04 }}
            className="bg-white/80 dark:bg-neutral-900/60 border border-neutral-200/70 dark:border-neutral-800/70 rounded-2xl p-5 hover:border-accent/40 dark:hover:border-accent/40 transition-all shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-widest block">
                    {repo.role}
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white font-display mt-0.5">
                    {repo.name}
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 block mt-0.5">
                    {repo.serviceId}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-accent/10 text-accent shrink-0">
                  {repo.prs} PRs
                </span>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {repo.desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-4 mt-3 border-t border-neutral-100 dark:border-neutral-800">
              {repo.tech.map((t, i) => (
                <span key={i} className="text-[10px] font-mono px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- Main InternshipPage Component ---

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
        
        {/* Subtle grid pattern overlay */}
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
        <div className="mb-12">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-accent dark:text-neutral-400 dark:hover:text-accent transition-colors cursor-pointer group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1.5 transition-transform duration-300" />
            Back to main portfolio
          </button>
        </div>

        {/* Hero Header Block */}
        <header className="max-w-4xl space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest">
              Prosperna Inc. — Enterprise Engineering
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 font-mono">
              May 2026 – October 2026 (6 Months)
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full">
              489 Authored PRs
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white font-display leading-[1.08]">
            Engineering for <br />
            <span className="text-neutral-400 dark:text-neutral-500">Philippine MSME E-Commerce</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 font-light leading-relaxed max-w-3xl">
            A comprehensive, high-fidelity engineering dossier of my 6-month software engineering tenure at Prosperna Inc. Discover how I authored 489 Pull Requests across 9 enterprise repositories, migrated mission-critical admin workspaces to Tailwind CSS v4, benchmarked checkout funnels against Shopify, and mapped cross-border logistics.
          </p>
        </header>

        {/* High-Level Impact Metrics Dashboard Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-6 border-y border-neutral-200 dark:border-neutral-800 mb-16 bg-white/50 dark:bg-neutral-900/20 backdrop-blur-sm rounded-3xl px-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block">Total PRs</span>
            <span className="text-2xl font-bold text-neutral-900 dark:text-white font-mono">489</span>
            <span className="text-[11px] text-emerald-500 font-mono block">453 Merged (92.6%)</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block">Microservices</span>
            <span className="text-2xl font-bold text-neutral-900 dark:text-white font-mono">9</span>
            <span className="text-[11px] text-neutral-400 font-mono block">Frontend & Backend</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block">Tenure</span>
            <span className="text-2xl font-bold text-neutral-900 dark:text-white font-mono">6 Mos</span>
            <span className="text-[11px] text-accent font-mono block font-semibold" title="Computed at 7:00 AM - 9:00 PM workdays, factoring Philippine national holidays (580+ Practicum / 1,620+ Total Tenure)">
              580+ Practicum Hrs
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block">Test Coverage</span>
            <span className="text-2xl font-bold text-neutral-900 dark:text-white font-mono">&gt;80%</span>
            <span className="text-[11px] text-neutral-400 font-mono block">Vitest & Jest Suites</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block">CI/CD Gate</span>
            <span className="text-2xl font-bold text-neutral-900 dark:text-white font-mono">100%</span>
            <span className="text-[11px] text-emerald-500 font-mono block">Zero-Warning Policy</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block">TBT Reduction</span>
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">~240ms</span>
            <span className="text-[11px] text-neutral-400 font-mono block">Mobile 4G Networks</span>
          </div>
        </div>

        {/* Interactive PR Monthly Trajectory Chart */}
        <section className="mb-24">
          <PrTrajectoryChart />
        </section>

        {/* Narrative introduction Section */}
        <section className="grid lg:grid-cols-3 gap-12 lg:gap-16 mb-24 items-start">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white font-display sticky top-32">
              Platform & <br />Engineering Context
            </h2>
            <div className="h-1 w-12 bg-accent mt-4"></div>
          </div>
          <div className="lg:col-span-2 space-y-6 text-neutral-600 dark:text-neutral-300 leading-relaxed text-base">
            <p>
              Prosperna operates as a highly specialized Software-as-a-Service (SaaS) multi-tenant e-commerce platform built to solve digital retail challenges for micro, small, and medium enterprises (MSMEs) in developing markets. Built upon a federated architecture of multiple frontend and backend repositories, it provides merchant dashboards, custom store creators, lightning-fast storefronts, localized payment gateways, and delivery channels.
            </p>
            <p>
              During my 6-month engineering tenure (May to October 2026), I authored and merged 489 Pull Requests across both consumer-facing Next.js storefronts and core merchant administrative portals. My responsibilities included mobile Web Vitals profiling, architecting the system-wide migration off React-Bootstrap to Tailwind CSS v4, coordinating cross-border address schemas, and implementing store-level order preparation buffers.
            </p>
          </div>
        </section>

        {/* Multi-Repository Microservices Ecosystem Breakdown */}
        <section className="mb-28">
          <MicroservicesEcosystem />
        </section>

        {/* Internship Timeline & Chronological Milestones (Full 6 Months) */}
        <section className="mb-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono block mb-2">Chronology</span>
              <h2 className="text-4xl font-bold text-neutral-900 dark:text-white font-display">6-Month Engineering Milestones</h2>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-sm text-sm">
              An overview of key sprint deliveries, migrations, and specialized focus areas across the full tenure.
            </p>
          </div>

          {/* Timeline Components */}
          <div className="relative pl-8 border-l border-neutral-200 dark:border-neutral-800 space-y-16 py-2">
            {[
              {
                time: "May 2026 (4 PRs)",
                title: "Practicum Onboarding, Environment Setup & Next.js Profiling",
                scope: "Storefront & Admin Core Systems",
                badge: "Setup & DX",
                desc: "Cloned monorepos, resolved local Node.js version conflicts with nvm/fnm, and analyzed initial mobile payload speeds. Restructured Webpack SplitChunks configurations inside next.config.js to defer heavy telemetry libraries and lazily load payment gateway and Google Map utilities."
              },
              {
                time: "June 2026 (39 PRs)",
                title: "Admin UI Architecture, Styling Tokens & Design System Overhaul",
                scope: "Admin Dashboard & Consumer Storefront",
                badge: "Systems & Design",
                desc: "Overhauled design documentation (DESIGN.md), standardized primary color palettes into a YAML-based format, initialized Tailwind CSS v4 with custom tw: prefix, and built responsive ProductListItem grids."
              },
              {
                time: "July 2026 (50 PRs)",
                title: "Legacy React-Bootstrap to Tailwind v4 Core Migration Branch",
                scope: "Merchant Administration Core",
                badge: "Modernization & Testing",
                desc: "Created AppModal using Headless UI Dialog primitives as the official replacement for legacy Bootstrap modals. Migrated bulk order tracker tables, and aligned Jest and Vitest test suites with the updated Tailwind DOM structures."
              },
              {
                time: "August 2026 (202 PRs)",
                title: "Peak Engineering Sprint: 5 Admin Workspaces & Checkout Performance Audit",
                scope: "Admin Portal & Checkout Core",
                badge: "Peak Delivery & Performance",
                desc: "Peak productivity sprint: Refactored 5 essential admin panels (Analytics Dashboard, Orders Management, Contacts Directory, Products & Inventory Workspace, Media Library). Built automated Puppeteer + Lighthouse audit benchmarking Prosperna vs. Shopify PH checkouts, reclaiming ~240ms of mobile Total Blocking Time."
              },
              {
                time: "September 2026 (127 PRs)",
                title: "Cross-Border Address Localization & Order Processing Time Buffers",
                scope: "6 Federated Microservices (Storefront, Logistics, Config, Orders, Dispatch, Identity)",
                badge: "Logistics & Cross-Border",
                desc: "Architected dynamic multi-country address resolvers (US, CA, AU, NZ) across 6 microservices while preserving Philippine Barangay selectors. Integrated Google Maps pin coordinates for Lalamove. Delivered store-level Order Processing Time buffers (ClickUp 86eqqfmv1)."
              },
              {
                time: "October 2026 (67 PRs)",
                title: "Catalog Overhaul, MaxAI Subagent Governance & Production Release",
                scope: "Platform-wide Core Repositories",
                badge: "AI & Production Release",
                desc: "Deprecated StockEditDrawer and centralized inventory into BulkUpdateQuantityModal. Hardened digital asset upload error recovery with Formik and Yup. Governed MaxAI domain subagents and completed comprehensive multi-repo engineering handoffs."
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

        {/* Detailed Projects Case Studies */}
        <section className="space-y-20">
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-16">
            <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono block mb-2">Deep Dive</span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white font-display">Key Technical Accomplishments</h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mt-4 text-base">
              A comprehensive technical breakdown of engineering problems, methodology, and performance outcomes achieved across platform codebases.
            </p>
          </div>

          <div className="grid gap-12">
            
            {/* Case Study 1: Storefront Optimization & Shopify Benchmark */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/60 dark:bg-neutral-900/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-neutral-200/60 dark:border-neutral-800/60 shadow-xs hover:shadow-md transition-all duration-300 space-y-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-neutral-150 dark:border-neutral-800 pb-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-md">Customer Storefront Engine</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-md">Performance Optimization</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-md">Shopify Benchmark</span>
                  </div>
                  <h3 className="text-3xl font-bold font-display text-neutral-900 dark:text-white">
                    01 / Storefront Web Performance & Shopify Benchmark Audit
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
                    <strong>Context & Architectural Impact:</strong> Customer-facing storefront load speed is the single most critical funnel metric in Prosperna's multi-tenant ecosystem. Since the majority of domestic MSME shoppers browse on low-tier mobile devices with variable cellular connections, heavy upfront JavaScript bundle sizes directly lead to bounce-rate spikes. By auditing the network payloads and execution charts of the customer-facing storefront application, I diagnosed several critical performance bottlenecks—such as synchronous third-party scripts blocking the main thread and untyped global modules causing major layout shifts.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent h-fit shrink-0 mt-0.5">
                          <Cpu size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">SDK Lazy-Loading & Dynamic Injection</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            Refactored the checkout flow to dynamically inject the payment SDK script (<code className="text-xs font-mono">xendit.min.js</code>) via Next.js <code className="text-xs font-mono">next/script</code> only when users select Online Banking / E-Wallet. I similarly lazy-loaded Google Maps components, recovering over 120ms of main-thread execution time.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent h-fit shrink-0 mt-0.5">
                          <Terminal size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">Webpack SplitChunks Optimization</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            Restructured Webpack’s SplitChunksPlugin configuration in <code className="text-xs font-mono">next.config.js</code> with <code className="text-xs font-mono">chunks: 'initial'</code>, isolating dynamic vendor imports from hydration resources and accelerating first-paint metrics on high-latency mobile networks.
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
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">Post-Hydration Telemetry Deferral</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            Grafana Faro and OpenTelemetry static imports were adding ~140 KB of uncompressed JS. Shifted telemetry initializers into dynamic, asynchronous <code className="text-xs font-mono">import()</code> functions triggered during the React <code className="text-xs font-mono">useEffect</code> post-hydration hook, eliminating rendering blocks.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent h-fit shrink-0 mt-0.5">
                          <CheckCircle size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">Analytics Data Integrity Fix</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            Uncovered and resolved a critical analytics regression where 'Traffic by Source' sessions were double-counted on checkout redirects, restoring true conversion metrics for hundreds of active Philippine merchants.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 bg-neutral-100 dark:bg-neutral-950/60 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-900">
                    <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-wider block mb-2">Automated Benchmark Rig</span>
                    <h5 className="font-bold text-neutral-900 dark:text-white text-sm">Shopify vs. Prosperna Automated User-Flows</h5>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                      Engineered an automated Puppeteer + Lighthouse User-Flow testing suite (<code className="text-xs font-mono">D:\Page Insight Test</code>) benchmarking live Prosperna storefronts against leading Philippine Shopify storefronts (Retail Apparel, Electronics, and Tech/Hardware merchants). Tracked realistic multi-step customer journeys (<code className="text-xs font-mono">Home → PDP → Cart → Checkout</code>), proving Prosperna's post-optimization checkout completed with 58% lower Total Blocking Time (160ms vs 380ms).
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-4">
                  <BrowserMockup 
                    src="/images/Screenshot (1378).png"
                    alt="Storefront Performance Showcase - Mobile Speed Profiling"
                    url="storefront.prosperna.com"
                  />
                  <div className="bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200/50 dark:border-neutral-800/50 rounded-2xl p-4 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans shadow-xs">
                    <strong className="text-neutral-700 dark:text-neutral-300">Showcase Details:</strong> Illustrating mobile speed metrics and load speed graphs showing ~240ms Total Blocking Time (TBT) reduction and perfect Web Vitals scores after telemetry dynamic chunking.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Case Study 2: Bootstrap to Tailwind */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/60 dark:bg-neutral-900/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-neutral-200/60 dark:border-neutral-800/60 shadow-xs hover:shadow-md transition-all duration-300 space-y-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-neutral-150 dark:border-neutral-800 pb-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-md">Merchant Admin Portal Engine</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-md">enhancement/cyril-redesign</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-md">685 Vitest Tests Passed</span>
                  </div>
                  <h3 className="text-3xl font-bold font-display text-neutral-900 dark:text-white">
                    02 / Headless UI Dialog Architecture & Tailwind CSS v4 Redesign
                  </h3>
                </div>
                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 space-y-1">
                  <div>Vitest Suites: <strong className="text-emerald-500 dark:text-emerald-400">685 Pass / 0 Fail</strong></div>
                  <div>Component Primitives: <strong className="text-accent">AppModal (Headless UI)</strong></div>
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7 space-y-6 text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm">
                  <p>
                    <strong>Context & Systems Modernization:</strong> The legacy merchant panel was built using React-Bootstrap, which introduced substantial CSS bloat and restricted custom theme generation. Under Epic 1 (<code className="text-xs font-mono text-accent">86exwu2xu</code>) and branch <code className="text-xs font-mono text-accent">enhancement/cyril-redesign</code>, I spearheaded the systemic 21-part migration to Tailwind CSS v4, authoring 265 Pull Requests on this repository alone. I built reusable Headless UI primitives, authored the migration manual, and refactored the entire admin workspace without regressions.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-4">
                      <h4 className="font-bold text-neutral-900 dark:text-white text-base">AppModal Primitives & Design Tokens</h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        Built and deployed <code className="text-xs font-mono text-accent">AppModal.jsx</code> using <code className="text-xs font-mono">@headlessui/react</code> Dialog primitives as the official replacement for legacy Bootstrap modals, eliminating bundle bloat and resolving focus-trap accessibility issues. Standardized <code className="text-xs font-mono">TooltipIcon</code>, <code className="text-xs font-mono">PopContent</code>, button hierarchies, and encapsulated reusable utility classes into <code className="text-xs font-mono">@layer components</code> inside <code className="text-xs font-mono">tailwind.css</code>.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-neutral-900 dark:text-white text-base">21 Discrete Subtasks Delivered</h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        Systematic migration across core merchant modules:
                      </p>
                      <ul className="text-xs text-neutral-500 dark:text-neutral-400 space-y-2 list-none pl-0">
                        <li className="border-l-2 border-accent pl-2.5 py-0.5">
                          <strong className="text-neutral-900 dark:text-white">P1 Dashboard & P2 Contacts:</strong> Responsive CSS grids, analytics widgets, and contact filter bars.
                        </li>
                        <li className="border-l-2 border-accent pl-2.5 py-0.5">
                          <strong className="text-neutral-900 dark:text-white">P3 Orders & P4 Products:</strong> High-density datatables, multi-step product creation wizards, and variant matrices.
                        </li>
                        <li className="border-l-2 border-accent pl-2.5 py-0.5">
                          <strong className="text-neutral-900 dark:text-white">P5 Categories & P6 Add-Ons:</strong> Category trees, drag-and-drop drawers, and upsell configurations.
                        </li>
                        <li className="border-l-2 border-accent pl-2.5 py-0.5">
                          <strong className="text-neutral-900 dark:text-white">P7 Labels & P8 Reviews:</strong> Tag pagination, photo/video review moderation filters.
                        </li>
                        <li className="border-l-2 border-accent pl-2.5 py-0.5">
                          <strong className="text-neutral-900 dark:text-white">P9 Media Library & P10 Store Settings:</strong> Custom image croppers, flip orientation controls, and store toggles.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 bg-neutral-100 dark:bg-neutral-950/60 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-900">
                    <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-wider block mb-2">Automated Vitest Assertion Alignment & Zero-Tolerance CI</span>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      Refactored all snapshot and DOM-based test assertions, replacing old Bootstrap queries with accessible ARIA roles and labels. Maintained a strict zero-tolerance policy on ESLint, Stylelint, and TypeScript compilation errors, securing a perfect <strong>685 passing tests with 0 failures</strong> and &gt;80% unit test coverage.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-4">
                  <BrowserMockup 
                    src="/images/Screenshot (1926).png"
                    alt="Tailwind UI Showcase - Merchant Analytics Dashboard"
                    url="admin.prosperna.com/dashboard/analytics"
                  />
                  <div className="bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200/50 dark:border-neutral-800/50 rounded-2xl p-4 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans shadow-xs">
                    <strong className="text-neutral-700 dark:text-neutral-300">Showcase Details:</strong> Displays the migrated merchant admin dashboard, illustrating the clean, high-contrast, responsive grids built using Tailwind CSS v4 to replace bulky legacy React-Bootstrap styles.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Case Study 3: High-Conversion Checkout & Multi-Country Localization */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/60 dark:bg-neutral-900/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-neutral-200/60 dark:border-neutral-800/60 shadow-xs hover:shadow-md transition-all duration-300 space-y-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-neutral-150 dark:border-neutral-800 pb-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-md">Cross-Border E-Commerce</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-md">6 Microservices</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-md">ClickUp 86eqqfmv1</span>
                  </div>
                  <h3 className="text-3xl font-bold font-display text-neutral-900 dark:text-white">
                    03 / Multi-Country Address Resolution Engine & Store-Level Preparation Buffer System
                  </h3>
                </div>
                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 space-y-1">
                  <div>Target Regions: <strong className="text-accent">PH, US, CA, AU, NZ</strong></div>
                  <div>Feature: <strong className="text-accent">Order Processing Time Buffers</strong></div>
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7 space-y-6 text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm">
                  <p>
                    <strong>Context & Global Vision:</strong> Historically, Prosperna’s checkout modules were hardcoded for the Philippine domestic market, strictly expecting local regions, provinces, cities, and barangays. Under Epics 3 and 4 (<code className="text-xs font-mono text-accent">86eqqbxed</code>, <code className="text-xs font-mono text-accent">86eqqfmv1</code>), I architected dynamic multi-country address ingestion (Philippines, United States, Canada, Australia, New Zealand) across 4 platform touchpoints: consumer checkout, customer address books, merchant CRM, and manual in-dashboard order creation.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent h-fit shrink-0 mt-0.5">
                          <Globe size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">Cross-Border Address Resolution</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            Standardized address schemas between <code className="text-xs font-mono">Storefront & Checkout Core</code>, <code className="text-xs font-mono">Orders Microservice</code>, and <code className="text-xs font-mono">Identity & Session Service</code>. Swapped Philippine Barangay cascades dynamically for International State/Province/Territory layouts with postal regex validation.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent h-fit shrink-0 mt-0.5">
                          <FileText size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">CSV Export Address Preservation</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            Resolved an international export bug (<code className="text-xs font-mono">z93r0b4ez1</code>) where CSV delivery address columns dropped non-PH country identifiers and distorted international formats, ensuring 100% accurate address exports for global fulfillment.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent h-fit shrink-0 mt-0.5">
                          <Clock size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">Order Processing Time Buffer (ClickUp 86eqqfmv1)</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            Designed store-level preparation buffers across <code className="text-xs font-mono">Merchant Config Service</code>, <code className="text-xs font-mono">Merchant Admin Portal</code>, and <code className="text-xs font-mono">Storefront Engine</code>. Intelligently constrained checkout date/time pickers for scheduled "Later" orders without blocking immediate "Order Now" purchases, democratized across all subscription tiers without paywall gating.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent h-fit shrink-0 mt-0.5">
                          <Smartphone size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">Mobile-Responsive Data Density & Dispatch</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            Resolved mobile viewport clipping on 24-character hexadecimal order IDs using <code className="text-xs font-mono">@utility info-row</code> (down to 280px). Synchronized backend email microservices (<code className="text-xs font-mono">Notification Dispatch Service</code>) for automated fulfillment dispatch notifications.
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

            {/* Case Study 4: Catalog Overhaul, AI-Augmented Engineering & MaxAI */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/60 dark:bg-neutral-900/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-neutral-200/60 dark:border-neutral-800/60 shadow-xs hover:shadow-md transition-all duration-300 space-y-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-neutral-150 dark:border-neutral-800 pb-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-md">Catalog & AI Architecture</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-md">MaxAI Multi-Agent</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-md">Claude Code CLI</span>
                  </div>
                  <h3 className="text-3xl font-bold font-display text-neutral-900 dark:text-white">
                    04 / Catalog Overhaul, AI-Augmented Engineering & MaxAI Integration
                  </h3>
                </div>
                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 space-y-1">
                  <div>Workflow: <strong className="text-accent">Git Worktrees & Claude Code</strong></div>
                  <div>AI Governance: <strong className="text-accent">MaxAI Domain SubAgents</strong></div>
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7 space-y-6 text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm">
                  <p>
                    <strong>Context & AI-Assisted Scale:</strong> Managing 489 Pull Requests across 9 microservices in 6 months required rigorous modern tooling. I combined multi-repo git worktrees with terminal-based Claude Code pair programming, while also contributing directly to Prosperna's own native AI framework, MaxAI.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent h-fit shrink-0 mt-0.5">
                          <Boxes size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">Consolidated Bulk Stock Editor</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            Deprecated and removed legacy <code className="text-xs font-mono">StockEditDrawer</code>, centralizing all per-location stock updates into <code className="text-xs font-mono">BulkUpdateQuantityModal</code> with intuitive "Set All" and "Adjust All" batch actions.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent h-fit shrink-0 mt-0.5">
                          <ShieldCheck size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">Digital Product Upload Error Recovery</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            Hardened the product creation wizard using Formik and Yup, preserving user-entered product titles, descriptions, and pricing matrices when a large digital asset upload encounters a network drop.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent h-fit shrink-0 mt-0.5">
                          <Sparkles size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">MaxAI Architectural Governance</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            Contributed to Prosperna's unified AI Assistant framework (<code className="text-xs font-mono">MaxAI</code>), organizing functionality into dedicated domain SubAgents (<code className="text-xs font-mono">PageBuilder</code>, <code className="text-xs font-mono">Marketing</code>, <code className="text-xs font-mono">Blog</code>, <code className="text-xs font-mono">Products</code>, <code className="text-xs font-mono">Insights</code>, <code className="text-xs font-mono">Copilot</code>) and extending <code className="text-xs font-mono">useMaxAI.js</code> streaming hooks.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent h-fit shrink-0 mt-0.5">
                          <GitPullRequest size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white text-base">Multi-Repo Git Worktrees & Cherry-Picks</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            Managed parallel development branches across multiple worktrees simultaneously, facilitating rapid cherry-picks between <code className="text-xs font-mono">dev</code>, <code className="text-xs font-mono">staging</code>, and <code className="text-xs font-mono">main</code> without context-switching churn.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-4">
                  <BrowserMockup 
                    src="/images/Screenshot (2355).png"
                    alt="Prosperna Media Library and Asset Management"
                    url="admin.prosperna.com/dashboard/media"
                  />
                  <div className="bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200/50 dark:border-neutral-800/50 rounded-2xl p-4 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans shadow-xs">
                    <strong className="text-neutral-700 dark:text-neutral-300">Showcase Details:</strong> Centralized media library and image transformation modules, highlighting clean responsive grid systems and upload error recovery workflows.
                  </div>
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
