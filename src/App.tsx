/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  User, 
  Briefcase, 
  Send, 
  ChevronRight,
  Menu,
  X,
  Terminal,
  Cpu,
  Globe,
  Database,
  Moon,
  Sun,
  ArrowUpRight,
  Zap,
  BarChart3,
  Gauge,
  CheckCircle2,
  Activity
} from 'lucide-react';
import Chatbot from './components/Chatbot';
import InternshipPage from './components/InternshipPage';
import Guestbook from './components/Guestbook';
import CheckoutAuditModal from './components/CheckoutAuditModal';
import { db, handleFirestoreError, OperationType } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// --- Types ---

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github: string;
  hasInteractiveAudit?: boolean;
}

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string | string[];
  showDetailsButton?: boolean;
}

// --- Data ---

const PROJECTS: Project[] = [
  {
    id: 5,
    title: "E-Commerce Checkout Performance Audit & Optimization Engine",
    description: "Automated Puppeteer and Lighthouse User-Flow benchmarking suite comparing multi-step purchasing funnels (Home → PDP → Cart → Checkout) across Prosperna and leading Philippine Shopify storefronts, proving a 58% reduction in mobile Total Blocking Time (160ms vs. 380ms) and saving ~140 KB of initial JS.",
    tags: ["Puppeteer", "Lighthouse CI", "Next.js", "Core Web Vitals", "Webpack SplitChunks"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/Cj22500/portfoliosite",
    github: "https://github.com/Cj22500/portfoliosite",
    hasInteractiveAudit: true
  },
  {
    id: 6,
    title: "DocuChain — AI & PreP-OCR Document Digitization Platform",
    description: "End-to-end AI digitization platform for regulated public school records (DepEd Form 137 across 1983–2015 templates). Combines a 3-engine OCR ensemble (INT8-quantized Microsoft TrOCR, Tesseract, EasyOCR), PreP-OCR image restoration (+104% contrast on aged paper), and a React Human-in-the-Loop dual-pane registrar verification workspace, cutting processing time by 85%+ (<2 mins vs. 15–20 mins).",
    tags: ["Python", "Flask", "React", "TrOCR (INT8)", "OpenCV", "EasyOCR"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/Cj22500/docuchain-revamp-investigation",
    github: "https://github.com/Cj22500/docuchain-revamp-investigation"
  },
  {
    id: 3,
    title: "MakiTest (GodsEye) — Cloud-Native AI Exam Supervision Ecosystem",
    description: "Undergraduate CS thesis & cloud-native AI exam proctoring platform using MediaPipe 3D facial/pose landmarks and CNNs to detect suspicious behavior in real time. Deployed on Google Cloud Run with HTTP 206 Partial Content range-request video streaming, paired with a React 19 + Gemini AI Exam Generator.",
    tags: ["Python", "Django", "React 19", "MediaPipe 3D", "WebSockets", "Cloud Run"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/Cj22500/New-MAKITEST-Web-App-Analytics-test",
    github: "https://github.com/Cj22500/New-MAKITEST-Web-App-Analytics-test"
  },
  {
    id: 7,
    title: "AR Test Lab — 3D Spatial Computing & Mobile AR Simulator",
    description: "Interactive 3D mobile augmented reality laboratory simulator built in C# and Unity 3D. Uses AR Foundation (ARCore/ARKit) ARRaycastManager to project 2D touch inputs into 3D world space (Pose, Vector3, Quaternion) with rigid-body collision merging, proximity triggers, and Firebase Firestore persistence.",
    tags: ["C# (.NET)", "Unity 3D", "AR Foundation", "ARCore / ARKit", "Firebase"],
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/Cj22500/AR-Test-Lab",
    github: "https://github.com/Cj22500/AR-Test-Lab"
  },
  {
    id: 1,
    title: "Wizaloon (WizSalon KMP) — Cross-Platform Salon Management",
    description: "Unified cross-platform salon management ecosystem built with Kotlin Multiplatform (KMP) and Compose Multiplatform across Android, iOS, Web, and Desktop clients, backed by Node.js, Django REST Framework, and Firebase Firestore for real-time booking synchronization and RBAC.",
    tags: ["Kotlin Multiplatform", "Compose", "Node.js", "Django REST", "Firebase"],
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/Cj22500/Wizaloon",
    github: "https://github.com/Cj22500/Wizaloon"
  },
  {
    id: 8,
    title: "DevPulse & Aura — React 19 + Real-Time WebSockets Suite",
    description: "Full-stack React 19 + TypeScript applications: DevPulse delivers Agile Sprint & Kanban board management with RBAC and velocity telemetry; Aura provides a real-time WebSocket e-commerce storefront with an embedded Developer API Inspector.",
    tags: ["React 19", "TypeScript", "Tailwind CSS v4", "Express", "WebSockets"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/Cj22500/DevPulse",
    github: "https://github.com/Cj22500/DevPulse"
  },
  {
    id: 9,
    title: "MMCL Seminar Explorer — AI Academic Discovery Platform",
    description: "Full-stack seminar discovery and career path recommendation platform built for Mapúa Malayan Colleges Laguna (CCIS) students using React 19, TypeScript, Express, and the Google Gemini API.",
    tags: ["React 19", "TypeScript", "Gemini API", "Express", "Academic Tool"],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/Cj22500/MMCL-Seminar-Explorer",
    github: "https://github.com/Cj22500/MMCL-Seminar-Explorer"
  },
  {
    id: 2,
    title: "CAESARTRAINER & FlappyWizard",
    description: "Convolutional Neural Network (CNN) action-recognition trainer for classifying human video sequences alongside an interactive 8-bit Java arcade game with custom physics and sprite mechanics.",
    tags: ["CNN", "Deep Learning", "Action Recognition", "Java"],
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=800",
    link: "https://github.com/Cj22500/CAESARTRAINER",
    github: "https://github.com/Cj22500/CAESARTRAINER"
  }
];

const ML_CAPSTONES = [
  {
    title: "Supervised ML: Customer Churn Classification",
    subtitle: "IBM Machine Learning Specialization Capstone",
    metrics: "Logistic Regression, Random Forests & Gradient Boosting",
    tags: ["Scikit-Learn", "Pandas", "SMOTE", "ROC-AUC"],
    description: "Formulated a binary churn prediction pipeline for telecom subscriber retention. Engineered class-imbalance mitigation (SMOTE & class weighting), L1/L2 regularized Logistic Regression, and Gradient Boosted Trees to maximize recall on high-risk churn cohorts."
  },
  {
    title: "Unsupervised ML: Customer Segmentation & PCA",
    subtitle: "IBM Machine Learning Specialization Capstone",
    metrics: "K-Means Clustering, PCA & Hierarchical Dendrograms",
    tags: ["K-Means", "PCA", "Silhouette Score", "Scikit-Learn"],
    description: "Applied Principal Component Analysis (PCA) to compress high-dimensional multi-channel purchasing telemetry while preserving >85% explained variance, isolating distinct customer personas via K-Means and Agglomerative Clustering."
  },
  {
    title: "Deep Learning: Pneumonia CNN & Course Recommender",
    subtitle: "IBM Deep Learning & Recommender Systems Capstones",
    metrics: "Transfer Learning CNNs & Matrix Factorization",
    tags: ["CNNs", "Transfer Learning", "Collaborative Filtering", "SVD"],
    description: "Trained deep Convolutional Neural Networks with spatial augmentation and transfer learning to classify chest X-ray pneumonia pathology, and built a hybrid course recommendation engine combining content-based filtering and SVD matrix factorization."
  }
];

const CERTIFICATIONS = [
  {
    name: "IBM AI Developer Professional Certificate",
    issuer: "IBM / Coursera",
    credentialId: "ID: 5BJMANEHPJIG",
    details: "10-Course Program: Generative AI, Prompt Engineering, Python & Flask AI Microservices, Watson NLP, Full-Stack Software Engineering."
  },
  {
    name: "IBM Machine Learning Professional Certificate",
    issuer: "IBM / Coursera",
    credentialId: "ID: WJ5YVULQONYC",
    details: "6-Course Advanced Program: Exploratory Data Analysis, Supervised & Unsupervised ML, Deep Learning & Reinforcement Learning, ML Capstone."
  },
  {
    name: "Developing AI Applications with Python and Flask",
    issuer: "IBM / Coursera",
    credentialId: "Verified Certificate",
    details: "RESTful AI microservice deployment, Watson NLP integration, unit testing, and PEP8 packaging."
  },
  {
    name: "Building Generative AI-Powered Applications with Python",
    issuer: "IBM / Coursera",
    credentialId: "Verified Certificate",
    details: "LLM orchestration, RAG pipelines, conversational memory, and programmatic guardrail architectures."
  },
  {
    name: "Introduction to Cloud Computing & Google Cloud Skills",
    issuer: "IBM & Google Cloud",
    credentialId: "Verified Credentials",
    details: "Cloud Run serverless containers, Compute Engine, Cloud Storage, IaaS/PaaS/SaaS, and Docker containerization."
  },
  {
    name: "CompTIA Tech+ Certification",
    issuer: "CompTIA",
    credentialId: "ID: 1d7051cce2a74591aec023e85dcf560a",
    details: "Foundational computing architecture, networking, database systems, software development, and security principles."
  }
];

const EXPERIENCES: Experience[] = [
  {
    id: 4,
    role: "Software Engineer Intern",
    company: "Prosperna Inc. (Completed 6-Month Tenure — 480 Verified Practicum Hours)",
    period: "May 2026 – November 2026",
    description: [
      "Independently authored 503 Pull Requests (468 merged — 93.0% merge rate) across 9 microservice repositories, driving end-to-end feature delivery across Next.js storefronts, React admin portals, and Node.js backend services.",
      "Spearheaded the 21-module Merchant Dashboard UI migration off React-Bootstrap to Tailwind CSS v4, re-engineering foundational UI primitives (AppButton, AppModal, Grid, InputGroup, Spinner, TooltipIcon) across 336+ files and 455+ call sites with zero visual regressions.",
      "Cut initial storefront JS payload by 43% (~140 KB saved) via Next.js Webpack splitChunks, deferred post-hydration telemetry (Grafana Faro, OpenTelemetry), and conditional payment SDK loading — achieving 58% lower mobile Total Blocking Time (160ms vs. 380ms) against leading Philippine Shopify storefronts.",
      "Engineered atomic notification state-claim locking (findOneAndUpdate) and retry recovery across order and Amazon SES / SendGrid email microservices, store-timezone UTC offset serialization (scheduled_at), and MongoDB ObjectId createdAt timestamp fallbacks.",
      "Architected the 5-country address and Google Maps coordinate resolution engine (PH, US, CA, AU, NZ) across 4 platform surfaces with country-aware CSV export sanitization, and built store-level Order Processing Time buffers (ClickUp 86eqqfmv1).",
      "Contributed to customer-facing MaxAI chat components and domain sub-agents while maintaining >80% unit test coverage (685+ passing Vitest/Jest tests) and zero-warning ESLint, Stylelint, and TypeScript CI/CD gates."
    ],
    showDetailsButton: true
  },
  {
    id: 1,
    role: "Bachelor of Science in Computer Science",
    company: "Mapúa Malayan Colleges Laguna (CCIS)",
    period: "Coursework Completed Nov 2026 (Graduation: 2027)",
    description: [
      "Completed 100% of academic coursework, undergraduate thesis (MakiTest), and the 480-hour Software Engineering Practicum (awaiting 2027 commencement ceremony; available for immediate full-time work).",
      "Engineered the MMCL Seminar Explorer (React 19, TypeScript, Gemini API) for CCIS students.",
      "Course Highlights: Data Structures & Algorithms, Object-Oriented Programming (C# / Java), Software Engineering 1 & 2 (Agile SDLC), Artificial Intelligence & Machine Learning, Digital Image Processing & Computer Vision, Database Management Systems (SQL), and Cloud / Distributed Computing."
    ]
  },
  {
    id: 2,
    role: "Open Source & Full-Stack Software Developer",
    company: "GitHub Community (github.com/Cj22500)",
    period: "2019 – Present",
    description: [
      "Authored 538+ Pull Requests (499 merged) across enterprise and open-source repositories.",
      "Architected full-stack AI, computer vision, and cross-platform systems including DocuChain (3-engine OCR + INT8 TrOCR), MakiTest (Cloud Run + MediaPipe 3D), AR Test Lab (Unity 3D C# + ARCore), Wizaloon KMP, DevPulse, and Aura."
    ]
  },
  {
    id: 3,
    role: "Freelance Technical Specialist",
    company: "Self-Employed",
    period: "2017 – Present",
    description: [
      "Independently diagnosed and resolved complex OS-level software crashes, hardware/firmware faults, and network bottlenecks for private clients.",
      "Built custom automation scripts and multimedia workflows in fast-paced turnaround environments."
    ]
  }
];

const SKILLS = [
  { category: "Languages & Runtimes", items: ["TypeScript & JavaScript (ES2024)", "Python", "Node.js", "C# (.NET)", "Kotlin & Java", "SQL & C++", "HTML5 & CSS3 / SCSS"] },
  { category: "Frontend & Design Systems", items: ["React 18 / 19 & Next.js (SSR)", "Tailwind CSS v4", "Headless UI (AppModal)", "Redux Toolkit & Zustand", "Formik & Yup", "WCAG 2.1 AA Accessibility"] },
  { category: "Backend & Databases", items: ["Node.js & Express.js", "Django / DRF, Flask & FastAPI", "MongoDB (Mongoose) & PostgreSQL", "Redis & Firebase (Auth/Firestore)", "RESTful APIs & WebSockets", "Amazon SES / SendGrid & JWT RBAC"] },
  { category: "AI, 3D Spatial & Computer Vision", items: ["Google Gemini API (@google/genai)", "TrOCR (INT8 Quantized) & EasyOCR", "Tesseract OCR & PreP-OCR", "MediaPipe 3D & OpenCV", "Unity 3D & AR Foundation (ARCore)", "Scikit-Learn, CNNs, PCA & K-Means"] },
  { category: "Testing & Web Performance", items: ["Vitest & Jest (>80% Coverage)", "Playwright E2E & Puppeteer", "Lighthouse User-Flow Audits", "Webpack SplitChunks Tuning", "Core Web Vitals (TBT / LCP / CLS)", "ESLint & Stylelint Zero-Warning CI"] },
  { category: "DevOps, Cloud & Workflow", items: ["Google Cloud Run & Docker", "GitHub Actions CI/CD", "Multi-Repo Git Worktrees & gh CLI", "Claude Code CLI & AI-Assisted SDLC", "Render, Vercel & Linux/Bash"] }
];

// --- Components ---

const Navbar = ({ 
  isDarkMode, 
  toggleDarkMode, 
  onViewInternship, 
  currentPage, 
  onBack 
}: { 
  isDarkMode: boolean; 
  toggleDarkMode: () => void; 
  onViewInternship: () => void; 
  currentPage: 'portfolio' | 'internship';
  onBack: () => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
    { name: 'Guestbook', href: '#guestbook' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
          className="font-display text-2xl font-bold tracking-tighter text-neutral-900 dark:text-white cursor-pointer"
        >
          CA<span className="text-accent">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => {
                if (currentPage !== 'portfolio') {
                  onBack();
                }
              }}
              className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-accent dark:hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={onViewInternship}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
              currentPage === 'internship'
                ? 'bg-accent text-white border-accent'
                : 'text-accent border-accent/20 hover:bg-accent/10 hover:border-accent/40'
            }`}
          >
            Prosperna Internship ✨
          </button>
          <button 
            onClick={toggleDarkMode}
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-accent dark:hover:text-accent transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a 
            href="#contact" 
            onClick={() => {
              if (currentPage !== 'portfolio') {
                onBack();
              }
            }}
            className="px-5 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-full hover:bg-accent dark:hover:bg-accent dark:hover:text-white transition-all duration-300"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2 text-neutral-600 dark:text-neutral-300"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="text-neutral-900 dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium text-neutral-600 dark:text-neutral-300"
                  onClick={() => {
                    if (currentPage !== 'portfolio') {
                      onBack();
                    }
                    setIsMenuOpen(false);
                  }}
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  onViewInternship();
                  setIsMenuOpen(false);
                }}
                className={`w-full py-3 font-bold text-center rounded-xl text-sm transition-all ${
                  currentPage === 'internship'
                    ? 'bg-accent text-white'
                    : 'bg-accent/15 text-accent hover:bg-accent/25'
                }`}
              >
                Prosperna Internship ✨
              </button>
              <a 
                href="#contact" 
                className="w-full py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-center rounded-xl font-medium"
                onClick={() => {
                  if (currentPage !== 'portfolio') {
                    onBack();
                  }
                  setIsMenuOpen(false);
                }}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="min-h-[100svh] flex flex-col justify-center section-padding pt-40 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden text-neutral-200 dark:text-neutral-800 flex items-center justify-center">
        <motion.div 
          className="absolute top-[20%] left-[15%] text-accent/20 dark:text-accent/30"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Code2 size={120} strokeWidth={1} />
        </motion.div>
        
        <motion.div 
          className="absolute top-[60%] left-[10%]"
          animate={{ y: [0, -30, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Database size={80} strokeWidth={1} />
        </motion.div>
        
        <motion.div 
          className="absolute top-[30%] right-[15%]"
          animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Terminal size={100} strokeWidth={1} />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-[20%] right-[20%] text-accent/20 dark:text-accent/30"
          animate={{ y: [0, 25, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Cpu size={90} strokeWidth={1} />
        </motion.div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNjdXJyZW50Q29sb3IiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      </div>

      <div className="max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
            AI-Native Full-Stack Software Engineer • 503 PRs Authored
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8 text-neutral-900 dark:text-white tracking-tight">
            Cyril Justin <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-accent-light to-neutral-400 dark:from-accent dark:via-accent-light dark:to-neutral-500 font-extrabold">B. Ayson</span>
          </h1>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-2xl mb-12 leading-relaxed">
            <span className="text-neutral-900 dark:text-white font-medium">Full-Stack Software Engineer & Applied Systems Researcher</span> specializing in high-conversion web platforms, federated microservices, and quantized computer vision pipelines. Authored <span className="text-neutral-900 dark:text-white font-medium">503 Pull Requests (468 merged)</span> across 9 production microservices at Prosperna Inc.
          </p>
        </motion.div>
          
        <motion.div 
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
            <a 
              href="#projects" 
              className="px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full font-medium flex items-center gap-2 hover:bg-accent dark:hover:bg-accent dark:hover:text-white transition-all group"
            >
              View Projects
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-6 ml-4">
              <a href="https://github.com/Cj22500" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/cyrilayson/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="mailto:cyriljustin225@gmail.com" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                <Mail size={24} />
              </a>
            </div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 -z-10 opacity-20 hidden lg:block">
        <div className="w-[500px] h-[500px] rounded-full bg-radial from-accent/30 to-transparent blur-3xl"></div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="section-padding bg-neutral-100 dark:bg-neutral-900/50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <img 
              src="/images/profile-pic.jpg" 
              alt="Cyril Justin" 
              className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-accent rounded-2xl flex items-center justify-center text-white p-4 shadow-xl">
              <p className="text-xs font-bold uppercase tracking-tighter leading-tight">
                B.S. CS Completed <br /> 503 PRs Shipped
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold mb-8 text-neutral-900 dark:text-white">About Me</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6 leading-[1.8]">
            I am an AI-Native Full-Stack Software Engineer who has completed 100% of my B.S. Computer Science coursework, thesis, and 480-hour Software Engineering Practicum at Mapúa Malayan Colleges Laguna (available for immediate full-time work ahead of 2027 commencement). During my 6-month enterprise engineering tenure at Prosperna Inc., I authored 503 Pull Requests (468 merged — 93.0% merge rate) across 9 microservice repositories.
          </p>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-12 leading-[1.8]">
            Across React 18/19, Next.js, TypeScript, Node.js, Python, and C#, I specialize in migrating large-scale frontend design systems (336+ files to Tailwind CSS v4), cutting mobile checkout Total Blocking Time by 58%, and engineering production AI/CV systems—from 3-engine quantized OCR pipelines (DocuChain) and Cloud Run exam proctoring (MakiTest) to 3D mobile AR simulators (AR Test Lab).
          </p>

          <div className="grid grid-cols-2 gap-6">
            {SKILLS.map((skillGroup) => (
              <div key={skillGroup.category}>
                <h4 className="text-sm font-bold uppercase tracking-widest text-accent mb-3">{skillGroup.category}</h4>
                <ul className="space-y-2">
                  {skillGroup.items.map(skill => (
                    <li key={skill} className="text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                      <div className="w-1 h-1 bg-neutral-300 dark:bg-neutral-600 rounded-full"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ 
  project: Project;
  onOpenAudit?: () => void;
}> = ({ project, onOpenAudit }) => {
  const isAudit = project.hasInteractiveAudit;

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      className={`group block rounded-3xl overflow-hidden glass-card shadow-xs hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 border border-neutral-200/50 dark:border-neutral-800/50 glow-on-hover relative ${
        isAudit ? 'ring-1 ring-accent/30 hover:border-accent/50' : ''
      }`}
    >
      <div 
        className="aspect-video overflow-hidden relative border-b border-neutral-200/30 dark:border-neutral-800/30 cursor-pointer"
        onClick={() => {
          if (isAudit && onOpenAudit) {
            onOpenAudit();
          } else {
            window.open(project.github, '_blank', 'noopener,noreferrer');
          }
        }}
      >
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        {isAudit && (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 bg-neutral-900/90 backdrop-blur-md text-accent text-[11px] font-mono font-bold rounded-full border border-accent/30 shadow-md">
            <Zap size={13} className="text-accent" />
            Interactive Audit
          </div>
        )}
        <div className="absolute inset-0 bg-neutral-950/10 dark:bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 border border-neutral-200/20 dark:border-neutral-700/20 flex items-center gap-2">
            {isAudit ? (
              <>
                <BarChart3 size={14} className="text-accent" />
                Explore Audit Benchmarks
              </>
            ) : (
              'View Project'
            )}
          </div>
        </div>
      </div>
      <div className="p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-neutral-100/70 dark:bg-neutral-800/70 text-neutral-500 dark:text-neutral-400 rounded-md border border-neutral-200/10 dark:border-neutral-700/10 font-mono">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mb-3">
          <h3 
            onClick={() => {
              if (isAudit && onOpenAudit) onOpenAudit();
              else window.open(project.github, '_blank', 'noopener,noreferrer');
            }}
            className="text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-accent dark:group-hover:text-accent-light transition-colors cursor-pointer"
          >
            {project.title}
          </h3>
          <a 
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on GitHub"
            className="text-neutral-400 dark:text-neutral-500 hover:text-accent dark:group-hover:text-accent-light transition-colors p-1"
          >
            <ExternalLink size={18} />
          </a>
        </div>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-4">{project.description}</p>
        
        {isAudit && (
          <div className="pt-3 border-t border-neutral-200/50 dark:border-neutral-800/50 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={onOpenAudit}
              className="px-4 py-2 bg-accent/10 hover:bg-accent hover:text-white text-accent rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border border-accent/20"
            >
              <BarChart3 size={14} />
              Open Interactive Audit
            </button>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              View Repository <ArrowUpRight size={12} />
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Projects = ({ onOpenAuditModal }: { onOpenAuditModal: () => void }) => {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-5xl font-bold mb-4 text-neutral-900 dark:text-white">Selected Work & Benchmarks</h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-md">A showcase of production software, open-source repositories, and automated performance benchmarking suites.</p>
          </div>
          <a href="https://github.com/Cj22500?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-accent font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View all on GitHub <ChevronRight size={20} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {PROJECTS.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onOpenAudit={onOpenAuditModal}
            />
          ))}
        </div>

        {/* Applied Machine Learning Capstones */}
        <div className="mt-24 pt-16 border-t border-neutral-200/60 dark:border-neutral-800/60">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono block mb-2">
              IBM Machine Learning Specialization
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              Machine Learning Capstones & Applied AI Reports
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {ML_CAPSTONES.map((capstone) => (
              <div
                key={capstone.title}
                className="p-6 rounded-3xl glass-card border border-neutral-200/60 dark:border-neutral-800/60 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent block mb-2">
                    {capstone.subtitle}
                  </span>
                  <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    {capstone.title}
                  </h4>
                  <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-3">
                    {capstone.metrics}
                  </p>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-4">
                    {capstone.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-200/40 dark:border-neutral-800/40">
                  {capstone.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Professional Certifications */}
        <div className="mt-20 pt-16 border-t border-neutral-200/60 dark:border-neutral-800/60">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono block mb-2">
              Verified Credentials
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              Professional Certifications & Specialized Training
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="p-6 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-800/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-0.5 rounded-full">
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {cert.credentialId}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                    {cert.name}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {cert.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <a 
            href="https://github.com/Cj22500" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full font-bold hover:bg-accent dark:hover:bg-accent dark:hover:text-white transition-all"
          >
            View More on GitHub <Github size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

const Experience = ({ onViewInternship }: { onViewInternship: () => void }) => {
  return (
    <section id="experience" className="section-padding bg-neutral-900 dark:bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-16 lg:gap-24">
          <div className="lg:col-span-1">
            <h2 className="text-5xl font-bold mb-8">Experience & <br /> Education</h2>
            <p className="text-neutral-400 mb-12">My academic background and professional growth in the tech industry.</p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-2xl text-accent">
                  <Globe size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Fullstack Development</h4>
                  <p className="text-sm text-neutral-400">Developing responsive client-side applications and integrating them with scalable server-side APIs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-2xl text-accent">
                  <Database size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Backend & Databases</h4>
                  <p className="text-sm text-neutral-400">Designing relational schemas, developing RESTful APIs, and optimizing database queries for high-performance systems.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-2xl text-accent">
                  <Cpu size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Machine Learning & AI</h4>
                  <p className="text-sm text-neutral-400">Implementing machine learning algorithms, preprocessing datasets, and deploying predictive models.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-16">
            {EXPERIENCES.map((exp) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l border-white/10"
              >
                <div className="absolute top-0 left-[-5px] w-[10px] h-[10px] rounded-full bg-accent shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <h3 className="text-2xl font-bold">{exp.role}</h3>
                  <span className="text-sm font-bold text-accent px-3 py-1 bg-accent/10 rounded-full">{exp.period}</span>
                </div>
                <h4 className="text-lg text-neutral-300 mb-4">{exp.company}</h4>
                {Array.isArray(exp.description) ? (
                  <ul className="space-y-2">
                    {exp.description.map((item, index) => (
                      <li key={index} className="text-neutral-400 flex items-start gap-2 leading-relaxed">
                        <div className="w-1 h-1 bg-accent rounded-full mt-2.5 shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-neutral-400 leading-relaxed">{exp.description}</p>
                )}
                {exp.showDetailsButton && (
                  <button 
                    onClick={onViewInternship}
                    className="mt-6 px-5 py-2.5 bg-neutral-800 hover:bg-accent border border-neutral-700 hover:border-accent text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-accent/20"
                  >
                    View Internship Details
                    <ArrowUpRight size={14} />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Save submission to Firestore
      try {
        await addDoc(collection(db, 'messages'), {
          name: formState.name,
          email: formState.email,
          message: formState.message,
          createdAt: serverTimestamp()
        });
      } catch (fbErr) {
        console.error("Firestore message save failed:", fbErr);
        handleFirestoreError(fbErr, OperationType.CREATE, 'messages');
      }

      // 2. Submit to Formspree fallback
      const response = await fetch("https://formspree.io/f/xaqlzajz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setIsSent(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setIsSent(false), 5000);
      } else {
        // Since we successfully saved to Firestore, let the user know their message is received
        setIsSent(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setIsSent(false), 5000);
      }
    } catch (error) {
      // Fallback if both fail, but if Firestore succeeded we are good
      alert("Oops! There was a problem submitting your form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <h2 className="text-5xl font-bold mb-8 text-neutral-900 dark:text-white">Let's build <br /> something great.</h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-12 leading-relaxed">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>

            <div className="space-y-8">
              <a href="mailto:cyriljustin225@gmail.com" className="flex items-center gap-4 group">
                <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-2xl group-hover:bg-accent group-hover:text-white transition-all text-neutral-900 dark:text-white">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email Me</p>
                  <p className="text-lg font-medium text-neutral-900 dark:text-white">cyriljustin225@gmail.com</p>
                </div>
              </a>
              <a href="https://github.com/Cj22500" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-2xl group-hover:bg-accent group-hover:text-white transition-all text-neutral-900 dark:text-white">
                  <Github size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">GitHub</p>
                  <p className="text-lg font-medium text-neutral-900 dark:text-white">github.com/Cj22500</p>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/cyrilayson/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-2xl group-hover:bg-accent group-hover:text-white transition-all text-neutral-900 dark:text-white">
                  <Linkedin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">LinkedIn</p>
                  <p className="text-lg font-medium text-neutral-900 dark:text-white">linkedin.com/in/cyrilayson</p>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-neutral-100 dark:bg-neutral-900/50 p-8 md:p-12 rounded-[40px]">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 ml-1">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="w-full px-6 py-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-2xl border-none focus:ring-2 focus:ring-accent transition-all outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 ml-1">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="w-full px-6 py-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-2xl border-none focus:ring-2 focus:ring-accent transition-all outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 ml-1">Message</label>
                <textarea 
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full px-6 py-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-2xl border-none focus:ring-2 focus:ring-accent transition-all outline-none resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isSent ? 'bg-green-500 text-white' : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-accent dark:hover:bg-accent dark:hover:text-white'}`}
              >
                {isSubmitting ? 'Sending...' : isSent ? 'Message Sent!' : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
          © {new Date().getFullYear()} Cyril Justin B. Ayson. Built with React & Tailwind.
        </p>
        <div className="flex items-center gap-8">
          <a href="https://github.com/Cj22500" target="_blank" rel="noopener noreferrer" className="text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Github</a>
          <a href="https://www.linkedin.com/in/cyrilayson/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">Linkedin</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState<'portfolio' | 'internship'>('portfolio');
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="selection:bg-accent selection:text-white">
      <Navbar 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        onViewInternship={() => setCurrentPage('internship')}
        currentPage={currentPage}
        onBack={() => setCurrentPage('portfolio')}
      />
      {currentPage === 'portfolio' ? (
        <main>
          <Hero />
          <About />
          <Projects onOpenAuditModal={() => setIsAuditModalOpen(true)} />
          <Experience onViewInternship={() => setCurrentPage('internship')} />
          <Contact />
          <section id="guestbook" className="section-padding border-t border-neutral-200/30 dark:border-neutral-800/30 bg-neutral-100/10 dark:bg-neutral-950/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <Guestbook />
            </div>
          </section>
        </main>
      ) : (
        <InternshipPage onBack={() => setCurrentPage('portfolio')} />
      )}
      <Footer />
      <Chatbot />

      {/* Interactive Checkout Performance Audit Modal */}
      <CheckoutAuditModal 
        isOpen={isAuditModalOpen} 
        onClose={() => setIsAuditModalOpen(false)}
        onViewCaseStudy={() => {
          setIsAuditModalOpen(false);
          setCurrentPage('internship');
        }}
      />
    </div>
  );
}
