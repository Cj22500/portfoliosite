import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  BarChart3, 
  Zap, 
  Layers, 
  Gauge, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  TrendingDown,
  Cpu,
  Smartphone,
  Globe
} from 'lucide-react';

interface CheckoutAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewCaseStudy?: () => void;
}

type TabType = 'stages' | 'vitals' | 'interventions';

export default function CheckoutAuditModal({ isOpen, onClose, onViewCaseStudy }: CheckoutAuditModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('stages');
  const [selectedStage, setSelectedStage] = useState<number>(3); // Default to Checkout stage

  // Keyboard close
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const funnelStages = [
    {
      id: 0,
      name: "1. Storefront Home",
      route: "/",
      prospernaMetric: "1.1s FCP",
      shopifyMetric: "1.5s FCP",
      highlight: "SSR pre-caching + critical CSS inline",
      details: "Initial landing page load. Prosperna Next.js SSR server caching provided rapid time-to-first-byte (TTFB), competing directly with Shopify's CDN Edge delivery."
    },
    {
      id: 1,
      name: "2. Product Detail (PDP)",
      route: "/products/featured-item",
      prospernaMetric: "1.6s LCP",
      shopifyMetric: "2.1s LCP",
      highlight: "Zero-CLS image aspect skeletons",
      details: "High-resolution product variant images rendered with strict container aspect-ratios, completely eliminating layout shifts when switching SKU colorways."
    },
    {
      id: 2,
      name: "3. Dynamic Cart Drawer",
      route: "/cart (Slide-over)",
      prospernaMetric: "52ms Interaction Latency",
      shopifyMetric: "115ms Interaction Latency",
      highlight: "Lightweight Zustand cart state",
      details: "Instant slide-over without re-fetching entire catalog payloads. Item quantity increments and coupon validations compute optimistically."
    },
    {
      id: 3,
      name: "4. Checkout Execution",
      route: "/checkout",
      prospernaMetric: "160ms TBT (Mobile)",
      shopifyMetric: "380ms TBT (Mobile)",
      highlight: "Dynamic payment SDK + SplitChunks",
      details: "Checkout execution funnel. Heavy payment gateways (Xendit) and map locators (Google Maps) inject only when the respective payment/shipping options are chosen."
    }
  ];

  const vitalsComparison = [
    {
      metric: "Total Blocking Time (TBT)",
      prosperna: "160 ms",
      shopify: "380 ms",
      prospernaScore: 92,
      shopifyScore: 68,
      status: "Prosperna 58% Faster",
      impact: "Mobile main thread remains responsive on 3G/4G connections during typing in Philippine address forms."
    },
    {
      metric: "Largest Contentful Paint (LCP)",
      prosperna: "1.8 s",
      shopify: "2.3 s",
      prospernaScore: 88,
      shopifyScore: 74,
      status: "Prosperna 22% Faster",
      impact: "Order summary and primary CTA buttons paint before mobile shoppers encounter navigation delays."
    },
    {
      metric: "Cumulative Layout Shift (CLS)",
      prosperna: "0.015",
      shopify: "0.075",
      prospernaScore: 98,
      shopifyScore: 82,
      status: "Prosperna 80% Lower Shift",
      impact: "Zero accidental clicks or jumps when payment methods, courier rates, and voucher discounts recalculate."
    },
    {
      metric: "Initial JavaScript Bundle",
      prosperna: "185 KB",
      shopify: "325 KB",
      prospernaScore: 85,
      shopifyScore: 55,
      status: "Prosperna 43% Lighter",
      impact: "Saved ~140 KB of uncompressed script payload by isolating Grafana Faro, OpenTelemetry, and legacy polyfills."
    }
  ];

  const interventions = [
    {
      icon: <Zap className="text-amber-500" size={20} />,
      title: "Dynamic Payment Gateway Injection",
      tag: "Next.js Script Optimization",
      desc: "Previously, heavy payment scripts like xendit.min.js loaded synchronously on initial checkout mounting. Refactored checkout to inject gateway scripts only when users select Online Banking / E-Wallet, recovering over 120ms of main-thread execution time."
    },
    {
      icon: <Layers className="text-blue-500" size={20} />,
      title: "Webpack SplitChunks Configuration",
      tag: "next.config.js Tuning",
      desc: "Restructured the vendor compilation graph. Configured SplitChunksPlugin with chunks: 'initial' for core bundles and deferred dynamic vendor chunks, separating hydration dependencies from secondary utilities."
    },
    {
      icon: <Cpu className="text-purple-500" size={20} />,
      title: "Post-Hydration Telemetry Deferral",
      tag: "Observability Architecture",
      desc: "Shifted OpenTelemetry and Grafana Faro browser tracing into dynamic asynchronous import() statements triggered during the React useEffect lifecycle after initial DOM paint, preventing telemetry from blocking user interactions."
    },
    {
      icon: <CheckCircle2 className="text-emerald-500" size={20} />,
      title: "Analytics Traffic Source Attribution Fix",
      tag: "Production Data Integrity",
      desc: "Discovered and resolved a critical telemetry regression where 'Traffic by Source' events were registered twice per session on checkout redirects, restoring accurate merchant conversion funnel analytics across hundreds of stores."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto"
      >
        {/* Header Ribbon */}
        <div className="px-6 sm:px-8 py-5 border-b border-neutral-200 dark:border-neutral-800 flex items-start justify-between gap-4 bg-neutral-50/80 dark:bg-neutral-950/50">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 bg-accent/10 text-accent rounded-full">
                Engineering Case Study
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full">
                Puppeteer + Lighthouse Suite
              </span>
              <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                Philippine MSME Ecosystem
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-neutral-900 dark:text-white">
              E-Commerce Checkout Performance Audit & Optimization Engine
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
              Automated multi-step user-flow benchmarking comparing live Prosperna storefronts against leading Philippine Shopify storefronts (Retail Apparel, Electronics, and Tech/Hardware merchants) across Core Web Vitals to eliminate main-thread bottlenecks.
            </p>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 sm:px-8 pt-4 pb-2 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('stages')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'stages'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Gauge size={14} />
            User-Flow Stages
          </button>
          <button
            onClick={() => setActiveTab('vitals')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'vitals'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <BarChart3 size={14} />
            Core Web Vitals Matrix
          </button>
          <button
            onClick={() => setActiveTab('interventions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'interventions'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Zap size={14} />
            Cyril's Code Fixes & Interventions
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'stages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white font-display">
                    Multi-Step Purchasing Funnel Profiling
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Click each step in the simulated customer purchasing journey to inspect real telemetry benchmarks.
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-accent bg-accent/10 px-3 py-1 rounded-full">
                  <Smartphone size={12} /> Mobile 4G Fast Throttling
                </span>
              </div>

              {/* Stage Selector Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {funnelStages.map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStage(stage.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedStage === stage.id
                        ? 'border-accent bg-accent/5 dark:bg-accent/10 shadow-xs'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50 dark:bg-neutral-950/40'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Step {stage.id + 1}
                    </div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                      {stage.name.replace(/^\d+\.\s*/, '')}
                    </div>
                    <div className="mt-2 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {stage.prospernaMetric}
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Stage Detail Card */}
              {(() => {
                const cur = funnelStages[selectedStage];
                return (
                  <div className="bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent">
                          Route: <code className="bg-neutral-200/60 dark:bg-neutral-800/60 px-1.5 py-0.5 rounded">{cur.route}</code>
                        </span>
                        <h4 className="text-lg font-bold text-neutral-900 dark:text-white mt-1">
                          {cur.name} — Technical Analysis
                        </h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-[10px] text-neutral-400 uppercase font-mono">Prosperna</div>
                          <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">{cur.prospernaMetric}</div>
                        </div>
                        <div className="h-6 w-px bg-neutral-300 dark:bg-neutral-700" />
                        <div>
                          <div className="text-[10px] text-neutral-400 uppercase font-mono">Shopify Benchmark</div>
                          <div className="text-sm font-bold text-neutral-500 dark:text-neutral-400 font-mono">{cur.shopifyMetric}</div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {cur.details}
                    </p>

                    <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-accent">
                      <CheckCircle2 size={16} />
                      Key architectural win: {cur.highlight}
                    </div>
                  </div>
                );
              })()}

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-4 text-xs text-blue-900 dark:text-blue-300 flex items-start gap-3">
                <Globe size={18} className="shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
                <div>
                  <strong className="block font-bold mb-0.5">Automated Test Rig:</strong>
                  Automated headless Puppeteer scripts with Lighthouse CLI (`D:\Page Insight Test`) gathered median results across 5 consecutive runs per store on throttled CPU (4x slow down) and network conditions simulating suburban Philippine cellular towers.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vitals' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white font-display">
                  Core Web Vitals Metric Comparison
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Head-to-head metric comparison between Prosperna storefronts (post-optimization) and Shopify PH stores.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {vitalsComparison.map((item, idx) => (
                  <div key={idx} className="bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">
                        {item.metric}
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                        {item.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-neutral-500">Prosperna:</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{item.prosperna}</span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-full rounded-full transition-all duration-700" 
                            style={{ width: `${item.prospernaScore}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-neutral-500">Shopify PH Stores (Benchmark):</span>
                          <span className="font-bold text-neutral-500 dark:text-neutral-400">{item.shopify}</span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-neutral-400 dark:bg-neutral-600 h-full rounded-full transition-all duration-700" 
                            style={{ width: `${item.shopifyScore}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed border-t border-neutral-200/60 dark:border-neutral-800/60 pt-2">
                      {item.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'interventions' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white font-display">
                  Cyril's Code Interventions & Engineering Wins
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Direct codebase refactoring and performance engineering authored and merged by Cyril during his Prosperna tenure.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {interventions.map((fix, idx) => (
                  <div key={idx} className="bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shrink-0">
                        {fix.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent block">
                          {fix.tag}
                        </span>
                        <h4 className="text-sm font-bold text-neutral-900 dark:text-white mt-0.5">
                          {fix.title}
                        </h4>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {fix.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 sm:px-8 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
            Audit Suite: <span className="text-neutral-800 dark:text-neutral-200">Puppeteer + Lighthouse 11.x</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onViewCaseStudy && (
              <button
                onClick={() => {
                  onClose();
                  onViewCaseStudy();
                }}
                className="w-full sm:w-auto px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                View Full Prosperna Case Study
                <ArrowRight size={14} />
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:shadow-accent/25"
            >
              Done
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
