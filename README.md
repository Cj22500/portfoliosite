# Cyril Justin B. Ayson - Interactive Full-Stack Portfolio & AI Assistant

**Live Deployment (Google Cloud Run):** [https://cyril-justin-b-ayson-portfolio-370079760356.us-west1.run.app/](https://cyril-justin-b-ayson-portfolio-370079760356.us-west1.run.app/)

A production-grade interactive developer portfolio, OCR playground, and security-hardened AI assistant built with **React 19**, **TypeScript**, **Tailwind CSS v4**, **Node.js / Express (`server.ts`)**, **Google Gemini API (`@google/genai`)**, **Tesseract OCR**, and **Firebase Firestore**.

## Key Engineering Highlights
- **Security-Hardened Gemini LLM Assistant (`server.ts` & `security_spec.md`)**: Server-side integration with the Google Gemini SDK featuring multi-layer prompt-injection defense, input length & character sanitization, strict domain/context boundary enforcement, and per-IP rate limiting.
- **Interactive Project Showcases & Case Studies**: Detailed architectural breakdowns, metrics, and interactive previews of enterprise SaaS e-commerce engineering, multi-engine OCR document digitization (*DocuChain*), and cloud AI proctoring (*MakiTest*).
- **On-Demand OCR Demo Endpoint**: Integrated server-side Tesseract OCR (`eng.traineddata`) pipeline for live text extraction demonstrations.
- **Cloud-Native Deployment**: Containerized and deployed on **Google Cloud Run** (`us-west1`) with **Firebase / Cloud Firestore** persistence.

## Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Vite, Framer Motion, Lucide Icons
- **Backend**: Node.js, Express (`server.ts`), `@google/genai` (Gemini API), Tesseract.js
- **Database & Cloud**: Google Cloud Run, Firebase Firestore (`firestore.rules`)

## Local Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env.local` (see `.env.example`):
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
3. Start the full-stack development server:
   ```bash
   npm run dev
   ```
